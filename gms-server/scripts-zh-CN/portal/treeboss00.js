let timeLimit = 2;
function enter(pi) {
	if (pi.getPlayerCount(541020800) <= 0) {//BOSS地图无人
		let player = pi.getPlayer();
		let party = player.getParty();
		if (party == null) {
			pi.playerMessage(5, "你不在一个队伍中,请组队进入挑战"); return false;
		} else {
			if (party.getLeaderId() != player.getId()) {
				pi.playerMessage(5, "队长才可以穿过传送门"); return false;
			} else {
				let members = party.getPartyMembers();
				if (members.size() != player.getPartyMembersOnSameMap().size()) {
					pi.playerMessage(5, "队伍里有人不在,无法穿过传送门"); return false;
				}
				let canGoIn = true;
				let cause;
			for (let i = 0; i < members.size(); i++) {
					let chr = members.get(i).getPlayer();
					let count = pi.getCharacterExtendValue(chr.getId(), "每日挑战克雷塞尔次数", true);
					if (chr.getQuestStatus(4528) != 2) {
						canGoIn = false;
						cause = chr.getName() + "没完成前置任务获得<扳手>,无法进入";
						break;
					} else if (count >= 3) {
						canGoIn = false;
						cause = chr.getName() + "今日已经挑战过3次克雷塞尔，请他明天再来吧。";
						break;
					}
				}
				if (canGoIn) {
					let krexMap = pi.getMap(541020800);
					krexMap.resetFully();
					pi.playPortalSound();
					pi.warpParty(541020800, 0);
					for (let i = 0; i < members.size(); i++) {
						let chr = members.get(i).getPlayer();
						let count = Number(pi.getCharacterExtendValue(chr.getId(), "每日挑战克雷塞尔次数", true));
						count++;
						pi.saveOrUpdateCharacterExtendValue(chr.getId(), "每日挑战克雷塞尔次数", count.toString(), true);
					}
					return true;
				} else {
					pi.playerMessage(5, cause); return false;
				}
			}
		}
	} else {
		pi.playerMessage(5, "与BOSS的战斗已经开始了，所以你不能进入这个地方。");
		return false;
	}
	//if (pi.getPlayerCount(541020800) <= 0) { //  后面是speedrun相关脚本，有问题，会造成打完boss后无法正确计时、服务端卡住，关闭使用。
	//	let krexMap = pi.getMap(541020800);
	//	krexMap.resetFully();

	//	pi.playPortalSound();
	//	pi.warp(541020800, "sp");
	//	return true;
	//} else {
	//	if (pi.getMap(541020800).getSpeedRunStart() == 0 && (pi.getMonsterCount(541020800) <= 0 || pi.getMap(541020800).isDisconnected(pi.getPlayer().getId()))) {
	//		pi.playPortalSound();
	//		pi.warp(541020800, "sp");
	//		return true;
	//	} else {
	//		pi.playerMessage(5, "与BOSS的战斗已经开始了，所以你不能进入这个地方。");
	//		return false;
	//	}
	//}
}