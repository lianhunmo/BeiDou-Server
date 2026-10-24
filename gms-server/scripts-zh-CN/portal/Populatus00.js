/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* @author RonanLana */

function enter(pi) {
    if (!((pi.isQuestStarted(6361) && pi.haveItem(4031870, 1)) || (pi.isQuestCompleted(6361) && !pi.isQuestCompleted(6363)))) {
        var em = pi.getEventManager("PapulatusBattle");
        let count = pi.getCharacterExtendValue("每日挑战帕普拉图斯次数", true)
        let eli = em.getEligibleParty(pi.getParty());
        for (let i = 0; i < eli.length; i++) {
            count = Math.max(pi.getCharacterExtendValue(eli[i].getPlayer().getId(), "每日挑战帕普拉图斯次数", true), count);
        }

        if (pi.getParty() == null) {
            pi.playerMessage(5, "你当前未加入队伍，请创建队伍后再挑战BOSS。");
            return false;
        } else if (count >= 2) {
            pi.playerMessage(5, "你的队伍中有人今日已经挑战过2次帕普拉图斯，请他明天再来吧。");
            return false;
        } else if (!pi.isLeader()) {
            pi.playerMessage(5, "你的队伍队长必须进入传送门才能开始战斗。");
            return false;
        } else {
            if (eli.size() > 0) {
                if (!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                    pi.playerMessage(5, "你的队伍队长必须进入传送门才能开始战斗。");
                    return false;
                }
            } else {  //this should never appear
                pi.playerMessage(5, "你暂时无法开始这场战斗，可能是因为队伍人数不符合要求、部分队员未满足挑战条件或不在当前地图。若组队遇到困难，请尝试使用队伍搜索功能。");
                return false;
            }
            if (count) {
                count++;
            } else {
                count = 1;
            }
            pi.saveOrUpdateCharacterExtendValue("每日挑战帕普拉图斯次数", count.toString(), true);
            for (let i = 0; i < eli.length; i++) {
                pi.saveOrUpdateCharacterExtendValue(eli[i].getPlayer().getId(), "每日挑战帕普拉图斯次数", count.toString(), true);
            }

            pi.playPortalSound();
            return true;
        }
    } else {
        pi.playPortalSound();
        pi.warp(922020300, 0);
        return true;
    }
}