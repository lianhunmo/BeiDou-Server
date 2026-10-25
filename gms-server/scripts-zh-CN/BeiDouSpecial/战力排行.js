// ========== 常量定义 ==========
let Icon = [
	["警报器", "#fUI/Basic/BtClaim/disabled/0#"],
	["奖杯", "#fUI/UIAchievement.img/achievement/pages/main/achievementForm/basic/difficultyIcon/unique#"]
];

// 装备槽位ID（负数）与对应名称（需严格对应）
let TemporaryGroup = [-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-15,-16,-17,-18,-19,-26,-27,-28,-29,-101,-102,-103,-104,-105,-106,-107,-108,-109,-110,-111,-112,-113,-114,-115,-116,-118,-119,-121,-127,-128];
let NameGroup = ["帽子","脸视","眼饰","耳环","衣服","裤子","鞋子","手套","披风","盾牌","武器","戒指","戒指","戒指","戒指","项链","骑宠","鞍子","勋章","戒指","戒指","腰带","时帽","时脸","时眼","时耳","时衣","时裤","时鞋","时手","时披","时盾","时武","时戒","时戒","宠装","时戒","时戒","时骑","时鞍","时项","时戒","时戒"];

let status = 0;          // 对话状态
let currentRankPage = 0; // 当前排行榜页码
let rankingData = [];    // 缓存排行榜数据
let selectedCharId = 0;  // 当前查看的角色ID
let targetEquipList = []; // 缓存他人装备列表

// ========== 工具函数 ==========
// 计算单件装备战力
function calcEquipScore(equip) {
	return equip.getStr()*10 + equip.getDex()*10 + equip.getInt()*10 + equip.getLuk()*10 +
		equip.getWatk()*50 + equip.getMatk()*50 + equip.getMdef() + equip.getWdef();
}

// 简单字符串填充（半角空格）
function padRight(str, len) {
	let s = String(str);
	while (s.length < len) s += " ";
	return s;
}

// 显示装备详情（通用）
function showEquipDetail(equip) {
	let txt = "#i" + equip.getItemId() + "#\r\n";
	txt += "#d力量 : #r" + padRight(equip.getStr(), 8) + " ";
	txt += "#d敏捷 : #r" + padRight(equip.getDex(), 8) + " ";
	txt += "#d智力 : #r" + padRight(equip.getInt(), 8) + "\r\n";
	txt += "#d运气 : #r" + padRight(equip.getLuk(), 8) + " ";
	txt += "#d物攻 : #r" + padRight(equip.getWatk(), 8) + " ";
	txt += "#d魔攻 : #r" + padRight(equip.getMatk(), 8) + "\r\n";
	txt += "#d物防 : #r" + padRight(equip.getWdef(), 8) + " ";
	txt += "#d魔防 : #r" + padRight(equip.getMdef(), 8) + " ";
	txt += "#d可升 : #r" + padRight(equip.getUpgradeSlots(), 8) + "\r\n";
	txt += "#d已升 : #r" + padRight(equip.getLevel(), 8) + " ";
	cm.sendOk(txt);
	cm.dispose();
}

// 获取装备战力详情（用于他人装备列表）
function getEquipListByCharId(charId) {
	let rs = cm.sqlSelect(
		"SELECT it.itemid, it.position, " +
		"men.str, men.dex, men.int, men.luk, " +
		"men.watk, men.matk, men.wdef, men.mdef, " +
		"men.upgradeslots, men.level, " +
		"(men.str*10 + men.dex*10 + men.int*10 + men.luk*10 + " +
		" men.watk*50 + men.matk*50 + men.wdef + men.mdef) AS score " +
		"FROM inventoryitems it, inventoryequipment men " +
		"WHERE it.position < 0 AND it.inventoryitemid = men.inventoryitemid " +
		"AND it.characterid = ?", charId
	);
	let list = [];
	for (let i = 0; i < rs.size(); i++) {
		let row = rs.get(i);
		list.push({
			itemid: row.get("itemid"),
			position: parseInt(row.get("position")),
			str: row.get("str"),
			dex: row.get("dex"),
			int: row.get("int"),
			luk: row.get("luk"),
			watk: row.get("watk"),
			matk: row.get("matk"),
			wdef: row.get("wdef"),
			mdef: row.get("mdef"),
			upgradeslots: row.get("upgradeslots"),
			level: row.get("level"),
			score: parseInt(row.get("score"))
		});
	}
	return list;
}

// 获取全服战力排行（仅非GM）
function getRankingList() {
	let rs = cm.sqlSelect(
		"SELECT chr.id, chr.name, chr.job, " +
		"SUM(men.str*10 + men.dex*10 + men.int*10 + men.luk*10 + " +
		"    men.watk*50 + men.matk*50 + men.wdef + men.mdef) AS total_score " +
		"FROM characters chr " +
		"LEFT JOIN inventoryitems it ON it.characterid = chr.id AND it.position < 0 " +
		"LEFT JOIN inventoryequipment men ON men.inventoryitemid = it.inventoryitemid " +
		"WHERE chr.gm <= 0 " +
		"GROUP BY chr.id " +
		"ORDER BY total_score DESC"
	);
	let list = [];
	for (let i = 0; i < rs.size(); i++) {
		let row = rs.get(i);
		list.push({
			id: row.get("id"),
			name: row.get("name"),
			job: row.get("job"),
			score: row.get("total_score") ? parseInt(row.get("total_score")) : 0
		});
	}
	return list;
}

// 更新玩家战力到数据库（战力提升时才更新，且每日限一次）
function updatePlayerPower(score, charId) {
	let today = java.util.Calendar.getInstance();
	let todayStr = today.get(java.util.Calendar.YEAR) + "-" +
		(today.get(java.util.Calendar.MONTH)+1) + "-" +
		today.get(java.util.Calendar.DAY_OF_MONTH);
	// 检查今日是否已更新且战力未变
	let rs = cm.sqlSelect(
		"SELECT combat, last_update FROM bastrranking WHERE characterid = ?", charId.toString()
	);
	if (rs.size() == 0) {
		// 首次插入
		cm.sqlInsert(
			"INSERT INTO bastrranking(characterid, combat, last_update) VALUES(?, ?, ?)",
			charId, score, todayStr
		);
	} else {
		let oldScore = rs.get(0).get("combat");
		let lastUpdate = rs.get(0).get("last_update");
		if (score > oldScore || lastUpdate != todayStr) {
			// 战力提升或跨天时更新
			cm.sqlUpdate(
				"UPDATE bastrranking SET combat = ?, last_update = ? WHERE characterid = ?",
				score, todayStr, charId
			);
		}
	}
}

// ========== 界面显示 ==========
// 主菜单
function showMainMenu() {
	let myTotalScore = 0;
	// 计算自身战力
	for (let i = 0; i < TemporaryGroup.length; i++) {
		let equip = cm.getInventory(-1).getItem(TemporaryGroup[i]);
		if (equip != null) myTotalScore += calcEquipScore(equip);
	}

	let txt = "#L998#" + Icon[0][1] + " #r战力评分榜#k " + Icon[0][1] + "#l\r\n\r\n";
	txt += "#d[ #r" + cm.getPlayer().getName() + " #d]#b 最强战力评分 : #r" + myTotalScore + "\r\n";

	for (let i = 0; i < TemporaryGroup.length; i++) {
		if (i % 4 == 0) txt += "\r\n";
		let equip = cm.getInventory(-1).getItem(TemporaryGroup[i]);
		let score = equip ? calcEquipScore(equip) : 0;
		txt += "#L" + i + "##d" + NameGroup[i] + " #b" + padRight(score, 7) + "#l";
	}
	txt += "\r\n\r\n";

	// 非GM且小于22点时更新战力（每日首次/战力提升时）
	if (!cm.getPlayer().isGM()) {
		let hour = java.util.Calendar.getInstance().get(java.util.Calendar.HOUR_OF_DAY);
		if (hour < 22) {
			updatePlayerPower(myTotalScore, cm.getPlayer().getId());
		}
	}

	cm.sendSimple(txt);
}

// 排行榜菜单（分页）
function showRankingPage(page) {
	let pageSize = 10;
	let start = page * pageSize;
	let end = Math.min(start + pageSize, rankingData.length);
	let totalPages = Math.ceil(rankingData.length / pageSize);

	let txt = "\t\t\t\t #d" + Icon[0][1] + " 排行中心 " + Icon[0][1] + "\r\n\r\n";
	txt += "#d　" + Icon[0][1] + " 职业 " + Icon[0][1] + "\t　" + Icon[0][1] + " 角色 " + Icon[0][1] + "\t　" + Icon[0][1] + " 评分 " + Icon[0][1] + "\r\n";

	for (let i = start; i < end; i++) {
		let entry = rankingData[i];
		txt += "　#L" + i + "#" + padRight(cm.getJobName(entry.job.toString()), 25);
		txt += padRight(entry.name, 25) + "　";
		txt += entry.score + "　";
		txt += "#l\r\n";
	}

	// 分页控制
	if (page > 0) txt += "#Lprev#上一页#l ";
	if (page + 1 < totalPages) txt += "#Lnext#下一页#l ";
	txt += "#Lback#返回主菜单#l";
	cm.sendSimple(txt);
}

// 显示他人装备列表
function showOtherEquipList(charId, charName) {
	let list = getEquipListByCharId(charId);
	targetEquipList = list;

	let totalScore = 0;
	for (let i = 0; i < list.length; i++) totalScore += list[i].score;

	let txt = "#d[ #r" + charName + " #d]#b 最强战力评分 : #r" + totalScore + "\r\n";
	for (let i = 0; i < list.length; i++) {
		if (i % 4 == 0) txt += "\r\n";
		let equip = list[i];
		let idx = TemporaryGroup.indexOf(equip.position);
		let name = (idx != -1) ? NameGroup[idx] : "未知";
		txt += "#L" + i + "##d" + name + " #b" + padRight(equip.score, 7) + "#l";
	}
	txt += "\r\n\r\n#Lback#返回排行榜#l";
	cm.sendSimple(txt);
}

// 显示他人装备详情（通过索引）
function showOtherEquipDetail(index) {
	let equip = targetEquipList[index];
	if (!equip) {
		cm.sendOk("装备不存在");
		cm.dispose();
		return;
	}
	// 构造一个临时的Equip对象供显示（原函数期望一个装备对象）
	// 这里直接手动拼接，因为原showEquipDetail需要装备对象的方法
	let txt = "#i" + equip.itemid + "#\r\n";
	txt += "#d力量 : #r" + padRight(equip.str, 8) + " ";
	txt += "#d敏捷 : #r" + padRight(equip.dex, 8) + " ";
	txt += "#d智力 : #r" + padRight(equip.int, 8) + "\r\n";
	txt += "#d运气 : #r" + padRight(equip.luk, 8) + " ";
	txt += "#d物攻 : #r" + padRight(equip.watk, 8) + " ";
	txt += "#d魔攻 : #r" + padRight(equip.matk, 8) + "\r\n";
	txt += "#d物防 : #r" + padRight(equip.wdef, 8) + " ";
	txt += "#d魔防 : #r" + padRight(equip.mdef, 8) + " ";
	txt += "#d可升 : #r" + padRight(equip.upgradeslots, 8) + "\r\n";
	txt += "#d已升 : #r" + padRight(equip.level, 8) + " ";
	cm.sendOk(txt);
	cm.dispose();
}

// ========== 主流程 ==========
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	}
	if (status >= 0 && mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) status++;
	else status--;

	if (status == 0) {
		// 初始主菜单
		showMainMenu();
	}
	else if (status == 1) {
		if (selection == 998) {
			// 打开战力奖励（需实现）
			cm.openNpc(9040004, "战力奖励");
			cm.dispose();
		}
		else if (selection == 997) {
			// 查看排行榜
			rankingData = getRankingList();
			currentRankPage = 0;
			showRankingPage(currentRankPage);
		}
		else {
			// 查看自身某件装备详情
			let idx = parseInt(selection);
			let equip = cm.getInventory(-1).getItem(TemporaryGroup[idx]);
			if (equip == null) {
				cm.sendOk("该部位没有装备");
				cm.dispose();
			} else {
				showEquipDetail(equip);
			}
		}
	}
	else if (status == 2) {
		if (selection == "prev") {
			currentRankPage--;
			showRankingPage(currentRankPage);
		}
		else if (selection == "next") {
			currentRankPage++;
			showRankingPage(currentRankPage);
		}
		else if (selection == "back") {
			status = 0;
			showMainMenu();
		}
		else {
			// 选择了某玩家
			let idx = parseInt(selection);
			let entry = rankingData[idx];
			if (entry) {
				selectedCharId = entry.id;
				showOtherEquipList(selectedCharId, entry.name);
			} else {
				cm.sendOk("数据错误");
				cm.dispose();
			}
		}
	}
	else if (status == 3) {
		if (selection == "back") {
			// 返回排行榜
			status = 1;
			showRankingPage(currentRankPage);
		}
		else {
			// 查看他人装备详情
			let idx = parseInt(selection);
			showOtherEquipDetail(idx);
		}
	}
}