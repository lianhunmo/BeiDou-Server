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
/* Adobis
 * 
 * El Nath - The Door to Zakum (211042300)
 * 
 * Vs Zakum Recruiter NPC
 * 
 * Custom Quest 100200 = Whether you can start Zakum PQ
 * Custom Quest 100201 = Whether you have done the trials
*/
const ZAKUM_CERTIFICATE = 4001083;
const SKILL_BOOK_LIST = [2290001,
    2290003,
    2290005,
    2290007,
    2290009,
    2290011,
    2290013,
    2290015,
    2290017,
    2290021,
    2290023,
    2290025,
    2290027,
    2290029,
    2290031,
    2290033,
    2290035,
    2290037,
    2290039,
    2290041,
    2290043,
    2290045,
    2290047,
    2290049,
    2290051,
    2290053,
    2290055,
    2290057,
    2290059,
    2290061,
    2290063,
    2290065,
    2290067,
    2290069,
    2290071,
    2290073,
    2290075,
    2290077,
    2290079,
    2290081,
    2290083,
    2290085,
    2290087,
    2290089,
    2290091,
    2290093,
    2290095,
    2290098,
    2290100,
    2290103,
    2290105,
    2290107,
    2290109,
    2290111,
    2290113,
    2290116,
    2290118,
    2290120,
    2290122,
    2290125,
    2290127,
    2290129,
    2290131,
    2290133,
    2290135,
    2290137,
    2290139
]

var status;
var em;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (cm.haveItem(4001109, 1)) {
            cm.warp(921100000, "out00");
            cm.dispose();
            return;
        }

        if (!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) {   // thanks Vcoc for finding out a need of reapproval from the masters for Zakum expeditions
            if (cm.getPlayer().getLevel() >= 50) {  // thanks Z1peR for noticing not-so-clear unmet requirements message here.
                cm.sendOk("小心，古老的力量并未被遗忘……如果你希望有朝一日击败#r扎昆#k，首先要获得#b首领之家议会#k的批准，然后#b面对考验#k，只有这样你才有资格进行战斗。");
            } else {
                cm.sendOk("小心，古老的力量并未被遗忘……");
            }

            cm.dispose();
            return;
        }

        em = cm.getEventManager("ZakumPQ");
        if (em == null) {
            cm.sendOk("扎昆组队任务遇到了一个错误。");
            cm.dispose();
            return;
        }

        if (status == 0) {
            cm.sendSimple("#e#b<组队任务：扎昆战役>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n小心，古老的力量并未被遗忘...\r\n\r\n可以使用 3个 #b#t" + ZAKUM_CERTIFICATE + "##k#i" + ZAKUM_CERTIFICATE + "#随机抽取一本30级技能上限的能手册。\r\n\r\n #b\r\n#L0#进入未知的死亡矿井（第1阶段）#l\r\n#L1#面对熔岩之息（第2阶段）#l\r\n#L2#锻造火眼（第3阶段）#l\r\n#L4#抽取能手册#l");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("只有当你加入一个队伍时，你才能参加派对任务。");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.sendOk("你的队长必须与我交谈才能开始这个组队任务。");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if (eli.size() > 0) {
                        if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("另一个队伍已经进入了该频道的#r组队任务#k。请尝试其他频道，或者等待当前队伍完成。");
                        }
                    } else {
                        cm.sendOk("你目前无法开始这个组队任务，因为你的队伍可能不符合人数要求，有些队员可能不符合参与条件，或者他们不在这张地图上。如果你找不到队员，可以尝试使用组队搜索功能。");
                    }

                    cm.dispose();
                }
            } else if (selection == 1) {
                if (cm.haveItem(4031061) && !cm.haveItem(4031062)) {
                    cm.sendYesNo("你已经成功通过了第一阶段。你还有很长的路才能到达扎昆的祭台。所以，你想好挑战下一个阶段了吗？");
                } else {
                    if (cm.haveItem(4031062)) {
                        cm.sendNext("你已经得到了#b熔岩之息#k，你不需要完成这个阶段。");
                    } else {
                        cm.sendNext("请先完成之前的试炼。");
                    }
                    cm.dispose();
                }
            } else if (selection == 2) {
                if (cm.haveItem(4031061) && cm.haveItem(4031062)) {
                    if (!cm.haveItem(4000082, 30)) {
                        cm.sendOk("你已经完成了试炼，但是还需要 #b#v4000082##t4000082# * 30#k 来锻造 #b5 个 #v4001017##t4001017##k。");
                    } else {
                        cm.completeQuest(100201);
                        cm.gainItem(4000082, -30);

                        cm.gainItem(4001017, 5);
                        cm.sendNext("你 #r已经完成了试炼#k，从现在开始我批准你挑战扎昆。");
                    }

                    cm.dispose();
                } else {
                    cm.sendOk("你缺少一些必要的物品\r\n#b#v4031061##t4031061# * 1#k\r\n#b#v4031062##t4031062# * 1#k\r\n来锻造#b#v4001017##t4001017##k。");
                    cm.dispose();
                }
            } else {
                let itemQuantity = cm.getItemQuantity(ZAKUM_CERTIFICATE);
                if (itemQuantity < 3) {
                    cm.sendOk("你身上没有 #r3个 #t" + ZAKUM_CERTIFICATE + "##k#i" + ZAKUM_CERTIFICATE + "#");
                    cm.dispose();
                } else if (!cm.canHold(2290000, 1)) {
                    cm.sendOk("背包消耗栏空间不足");
                    cm.dispose();
                } else {
                    cm.gainItem(ZAKUM_CERTIFICATE, -3);
                    successGain();
                }
            }
        } else if (status == 2) {
            cm.warp(280020000, 0);
            cm.dispose();
        }
    }
}

function successGain() {
    let bookId = getRandomElement(SKILL_BOOK_LIST);
    let text = "恭喜你获得了#b#t" + bookId + "##k#i" + bookId + "#";
    cm.gainItem(bookId, 1);
    cm.sendOkLevel("Dispose", text);
}

// 获取随机元素
function getRandomElement(arr) {
    if (arr.length === 0) {
        return 2280019;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
