/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

/**
 * @author: Ronan
 * @npc: Juliet
 * @map: Magatia - Alcadno - Hidden Room (261000021)
 * @func: Magatia PQ (Alcadno)
 */

var status = 0;
var em = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (cm.getMapId() != 261000021 && cm.getMapId() != 910000000) {
            if (status == 0) {
                cm.sendYesNo("我们必须坚持战斗去拯救罗密欧，也请你调整好步伐。若你感到不适难以继续……你的同伴与我都能理解。那么，你准备选择退出吗？");
            } else if (status == 1) {
                cm.warp(926110700, 0);
                cm.dispose();
            }
        } else {
            if (status == 0) {
                em = cm.getEventManager("MagatiaPQ_A");
                if (em == null) {
                    cm.sendOk("玛加提亚组队任务（阿尔卡德诺）遇到了一个错误。");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<组队任务：罗密欧与朱丽叶>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我的心爱的罗密欧被绑架了！虽然他是泽尼玛斯的人，但我不能坐视不理，看着他因为这场愚蠢的冲突而受苦。我需要你和你的同事们帮助我救他！拜托，帮帮我们！！请让你的#b队伍领袖#k和我交谈。#b\r\n#L0#我想参加这个组队任务。\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索。\r\n#L2#我想兑换物品。\r\n#L3#我想了解更多细节。");
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("只有当你加入一个队伍时，你才能参加组队任务。");
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
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("你的组队搜索状态现在是：#b" + (psState ? "enabled" : "disabled") + "#k。想要改变状态时随时找我。");
                    cm.dispose();
                } else if (selection == 2) {
                    if (cm.haveItem(4001159, 25) && cm.haveItem(4001160, 25) && !cm.haveItemWithId(1122010, true)) {
                        if (cm.canHold(1122010)) {
                            cm.gainItem(4001159, -25);
                            cm.gainItem(4001160, -25);
                            cm.gainItem(1122010, 1);

                            cm.sendOk("感谢你找回了这些弹珠。接受这个吊坠作为我的感激之情。");
                            cm.dispose();
                        } else {
                            cm.sendNext("在领取奖励之前，请在你的装备栏中腾出一个空位。");
                            cm.dispose();
                        }
                    } else if (cm.haveItem(4001159, 10) && cm.haveItem(4001160, 10)) {
                        if (cm.canHold(2041212)) {
                            cm.gainItem(4001159, -10);
                            cm.gainItem(4001160, -10);
                            cm.gainItem(2041212, 1);

                            cm.sendOk("感谢你找回了这些弹珠。这块石头，我给你的，可以用来提升 #b#t1122010##k 的属性。拿着它作为我的感激之情，并明智地使用它。");
                            cm.dispose();
                        } else {
                            cm.sendNext("在领取奖励之前，请在你的消耗栏中腾出一个空位。");
                            cm.dispose();
                        }
                    } else {
                        let text = "";
                        if (!cm.haveItemWithId(1122010, true)) {
                            text += "至少需要 #b25个#t4001159##i4001159##k 和 #b#t4001160##i4001160##k 才能帮你兑换#b#t1122010##i1122010##k。\r\n祝你一路顺风。";
                        } else {
                            text += "至少需要 #b10个#t4001159##i4001159##k 和 #b#t4001160##i4001160##k 才能帮你兑换#b#t2041212##i2041212##k。\r\n祝你一路顺风。"
                        }
                        cm.sendNext(text);
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("不久前，一位名叫犹太的科学家因为他对阿尔卡德诺和泽诺米斯的合成炼金术的研究而被这个城镇放逐。由于这种组合所带来的巨大力量，根据法律是禁止研究的。然而，他无视了这项法律，同时进行了这两项研究。结果，他被流放了。\r\n他现在在报复，已经带走了我心爱的人，下一个目标是我，因为我们是玛加提亚的重要人物，是这两个社会的继承者。但我不害怕。我们必须不惜一切代价把他救回来！");
                    cm.dispose();
                }
            }
        }
    }
}