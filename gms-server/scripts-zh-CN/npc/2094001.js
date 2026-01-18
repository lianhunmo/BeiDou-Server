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

var status = -1;

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

        if (cm.getMapId() == 925100500) {
            if (status == 0) {
                if (cm.isEventLeader()) {
                    cm.sendOk("多亏了你们的努力，我得救了！谢谢，伙计们！");
                } else {
                    cm.sendOk("多亏了你们的努力，我得救了！谢谢你们！在我给你们奖励之前，让你们的队长先和我说话...");
                    cm.dispose();
                }
            } else {
                cm.getEventInstance().clearPQ();
                cm.dispose();
            }
        } else {
            if (status == 0) {
                cm.sendSimple("谢谢你救了我！我能帮你什么忙吗？\r\n#b#L0#带我离开这里。#k\r\n#L1##b我要兑换升级#t1002572##k #i1002572#。");
            } else if (status == 1) {
                if (selection == 0) {
                    let count = cm.getCharacterExtendValue("邮票获取次数" + 4031435, false)
                    if (count >= 3) {
                        if (!cm.canHold(2000005, 10)) {
                            cm.sendOk("请在消耗栏中腾出空间。");
                            cm.dispose();
                            return;
                        }
                        cm.gainItem(2000005, 10);
                    } else {
                        if (!cm.canHold(4031435, 10)) {
                            cm.sendOk("请在杂项栏中腾出空间。");
                            cm.dispose();
                            return;
                        }
                        cm.gainItem(4031435, 10);
                        count++;
                        let quitTotal = cm.getCharacterExtendValue("海盗组队副本累计通关次数");
                        quitTotal += Number(quitTotal);
                        cm.saveOrUpdateCharacterExtendValue("海盗组队副本累计通关次数", quitTotal.toString());
                        cm.saveOrUpdateCharacterExtendValue("邮票获取次数" + 4031435, count.toString(), false);
                    }
                    cm.gainExp(1800000);
                    cm.warp(910000000, 0);
                } else {
                    if (cm.haveItem(1002574, 1)) {
                        cm.sendOk("你有最好的帽子。");
                    } else if (cm.haveItem(1002573, 1)) {
                        if (cm.haveItem(4031435, 20)) {
                            if (cm.canHold(1002574, 1)) {
                                cm.gainItem(1002573, -1);
                                cm.gainItem(4031435, -20);
                                cm.gainItem(1002574, 1);
                                cm.sendOk("我已经给你帽子了。");
                            } else {
                                cm.sendOk("在收到帽子之前，请在您的装备物品栏中腾出空间。");
                            }
                        } else {
                            cm.sendOk("你需要20个#t4031435#来升级海盗船长帽。");
                        }
                    } else if (cm.haveItem(1002572, 1)) {
                        if (cm.haveItem(4031435, 20)) {
                            if (cm.canHold(1002573, 1)) {
                                cm.gainItem(1002572, -1);
                                cm.gainItem(4031435, -20);
                                cm.gainItem(1002573, 1);
                                cm.sendOk("我已经给你帽子了。");
                            } else {
                                cm.sendOk("在收到帽子之前，请在您的装备物品栏中腾出空间。");
                            }
                        } else {
                            cm.sendOk("你需要20个#t4031435#来升级海盗船长帽。");
                        }
                    } else {
                        if (cm.haveItem(4031435, 20)) {
                            if (cm.canHold(1002572, 1)) {
                                cm.gainItem(4031435, -20);
                                cm.gainItem(1002572, 1);
                                cm.sendOk("我已经给你帽子了。");
                            } else {
                                cm.sendOk("在收到帽子之前，请在您的装备物品栏中腾出空间。");
                            }
                        } else {
                            cm.sendOk("你需要20个#t4031435#来升级海盗船长帽。");
                        }
                    }
                }

                cm.dispose();
            }
        }

    }
}