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

/**
 * @author: Ronan
 * @npc: Juliet
 * @func: MagatiaPQ area NPC
 */

var status;

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

        var eim = cm.getEventInstance();

        if (!eim.isEventCleared()) {
            if (status == 0) {
                if (eim.getIntProperty("npcShocked") == 0 && cm.haveItem(4001130, 1)) {
                    cm.gainItem(4001130, -1);
                    eim.setIntProperty("npcShocked", 1);

                    cm.sendNext("哦？你收到给我的信？这种时候……会是谁呢……天呐！伙计们，有大事要发生了。全体集合——从现在起，我们要面对前所未有的困难了！");
                    eim.dropMessage(6, "朱丽叶读完罗密欧的信后，似乎十分震惊。");

                    cm.dispose();

                } else if (eim.getIntProperty("statusStg4") == 1) {
                    var door = cm.getMap().getReactorByName("jnr3_out3");

                    if (door.getState() == 0) {
                        cm.sendNext("让我为你开门。");
                        door.hitReactor(cm.getClient());
                    } else {
                        cm.sendNext("请快点，罗密欧有麻烦了。");
                    }

                    cm.dispose();

                } else if (cm.haveItem(4001134, 1) && cm.haveItem(4001135, 1)) {
                    if (cm.isEventLeader()) {
                        cm.gainItem(4001134, -1);
                        cm.gainItem(4001135, -1);
                        cm.sendNext("太好了！你手头上有艾尔卡德诺和泽纳米斯特的文件。现在我们可以继续了。");

                        eim.showClearEffect();
                        eim.giveEventPlayersStageReward(4);
                        eim.setIntProperty("statusStg4", 1);

                        cm.getMap().killAllMonsters();
                        cm.getMap().getReactorByName("jnr3_out3").hitReactor(cm.getClient());
                    } else {
                        cm.sendOk("请让你们的队长把文件给我。");
                    }

                    cm.dispose();

                } else {
                    cm.sendYesNo("我们必须坚持战斗去拯救罗密欧，也请你调整好步伐。若你感到不适难以继续……你的同伴与我都能理解。那么，你准备选择退出吗？");
                }
            } else {
                cm.warp(926110700, 0);
                cm.dispose();
            }
        } else {
            if (status == 0) {
                if (eim.getIntProperty("escortFail") == 0) {
                    cm.sendNext("终于，罗密欧安全了！多亏各位的努力，我们成功将他从犹太的魔掌中解救出来。犹太因背叛玛伽提亚的行径即将接受审判。从今往后，他将踏上回归正途的历程，我们会持续关注他的转变，确保他未来不再制造任何麻烦。");
                } else {
                    cm.sendNext("罗密欧现已平安，尽管战斗对他造成了一些伤害……多亏各位倾力相助，我们才得以将他从犹太的魔掌中解救出来。犹太即将因其背叛玛伽提亚的行径接受审判。感激不尽。");
                    status = 2;
                }
            } else if (status == 1) {
                cm.sendNext("请收下这份奖品作为我们的谢礼。");
            } else if (status == 2) {
                let count = cm.getCharacterExtendValue("邮票获取次数" + 4001160, false)
                if (count >= 3) {
                    if (!cm.canHold(2000005, 30)) {
                        cm.sendOk("请在消耗栏中腾出空间。");
                        cm.dispose();
                        return;
                    }
                    cm.gainItem(2000005, 30);
                } else {
                    if (!cm.canHold(4001160, 10)) {
                        cm.sendOk("请在其他栏中腾出空间。");
                        cm.dispose();
                        return;
                    }
                    cm.gainItem(4001160, 10);
                    count++;
                    cm.saveOrUpdateCharacterExtendValue("邮票获取次数" + 4001160, count.toString(), false);
                }
                cm.gainExp(25500000);
                if (eim.getIntProperty("normalClear") == 1) {
                    cm.warp(926110600, 0);
                } else {
                    cm.warp(926110500, 0);
                }
                cm.dispose();
            } else {
                cm.warp(926110600, 0);
                cm.dispose();
            }
        }
    }
}