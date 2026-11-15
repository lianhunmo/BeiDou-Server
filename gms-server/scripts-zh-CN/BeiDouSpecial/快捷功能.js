 /**
 * @description 领取快捷功能箱子, 箱子可放入键盘中使用
 * @author hzh
 */
var 皇冠 = "#fUI/UIWindow.img/UserList/Guild/GuildRank/icon0#";
var text;
var itemsNeed = {4000313: 2, 4001129: 5, 4310000: 1, 4001006: 10};
var vacTime;

function start() {
	text = "#e请选择需要领取的快捷箱子, #r领取之后可双击，或放入键盘中使用~#n\r\n#k";
	text += "#L2022552##i2022552# 快捷菜单#l\t\t\t";
	cm.sendNextSelectLevel("Binding", text);
}

function levelBinding(itemId) {
	if (itemId == 0) {
		var enough = true;
		vacTime = cm.getCharacterExtendValue("mobvacLimit", true);
		text = `#e#r提示 : #d\r\n\t\t一 : 当天的吸怪时间超过30分钟后才可充值\r\n\t\t\t\t#r(目前已吸怪${vacTime == null ? 0 : (vacTime/1000/60).toFixed(2)}分钟)\r\n\t\t#d二 : 充值成功后将消除30分钟的已吸怪时间\r\n`;
		text += "\t\t三 : 充值所需材料如下\r\n\r\n";
		for (i in itemsNeed) {
			var h = cm.getItemQuantity(parseInt(i));
			var n = itemsNeed[i];
			enough = enough ? h >= n : false;
			text += `\t\t\t\t#v${i}##z${i}#[${h} / ${n}] ${h >= n ? "" : "#r(材料不足)#d"}\r\n`;
		}
		if (parseInt(vacTime) < 1800000) {
			text += "\r\n\t\t#r#e 目前还有闲余的吸怪时间, 请稍后再来~ ";
			cm.sendOk(text);
			return;
		}
		if (enough) {
			text += "\r\n\t\t#r#e 材料充足, 点击下一步即可获得30分钟吸怪时间~ ";
			cm.sendNextLevel("Recharge", text);
		} else {
			text += "\r\n\t\t#r#e 材料不足, 请获取到足够的材料后再来~ ";
			cm.sendOk(text);
		}
	} else if (cm.getPlayer().haveItem(itemId)) {
		cm.dropMessage(1, "你已拥有该功能, 无需重复领取!");
		cm.dispose();
		return;
	} else {
		cm.gainItem(itemId, 1);
		cm.dispose();
	}
}

function levelRecharge() {
	for (i in itemsNeed) {
		if (itemsNeed[i] <= 0) return;
		cm.gainItem(parseInt(i), -itemsNeed[i], true);
	}
	cm.saveOrUpdateCharacterExtendValue("mobvacLimit", String(parseInt(vacTime) - 1800000), true);
	cm.sendOk("时间充值成功, 物品已成功扣除! \r\n你当前的吸怪耗时已重置为 : #r#e" + ((parseInt(vacTime) - 1800000)/1000/60).toFixed(2) + "分钟");
}
