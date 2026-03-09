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
 * @description 拍卖行中心脚本
 */
var OldTitle ="\t\t\t\t\t#e欢迎来到#r滕王阁#k帮助中心#n\t\t\t\t\r\n";
var status = -1;
var i = 0;
function start() {
    action(1, 0, 0)
}

function action(mode, type, selection) {
    let flamingFeatherAlreadyCount = Number(cm.getAccountExtendValue("角色累充数额"));
    if (mode === 1) {
        status++;
    } else if (mode === -1) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (status === 0) {
        let text = OldTitle;
        text += "当前点券：" + cm.getPlayer().getCashShop().getCash(1) + "\r\n";
        text += "当前抵用券：" + cm.getPlayer().getCashShop().getCash(2) + "\r\n";
        text += "当前信用券：" + cm.getPlayer().getCashShop().getCash(4) + "\r\n";
        text += "当前羽毛累充：" + flamingFeatherAlreadyCount + "\r\n";
        text += " \r\n\r\n";
        text += "#L0##b新人福利#l\t #L2#在线奖励#l\t #L4#爆率一览#l\t #L5#一键转职#l\r\n";
        text += "#L3#传送自由#l\t #L65#删除道具#l\t #L12#羽毛累充#l\t #L13#点券商品#l\r\n";
        text += "#L8#副本戒指#l\t #L9#矿石戒指#l\t #L6#枫叶戒指#l\t #L7#点装强化#l\r\n";
        text += "#L11#每日任务#l\t #L14#肝王勋章#l\t #L16#便利商店#l\t #L10#一键出售#l\r\n";
        text += "#L17#矿石仓库#l\r\n";
        text += "\r\n\r\n#L15#===================#r拍卖行#b===================#k#l\r\n";
        if (cm.getPlayer().isGM()) {
            text += "\r\n\r\n";
            text += "\t\t\t\t#r=====以下内容仅GM可见=====\r\n";
            text += "#L10#一键出售#l\t #L61#超级传送#l \t #L62#超级商店#l \t #L63#整容集合#l \t";
            text += "#L64#UI查询#l \t #L65#删除道具#l \t #L66#生成道具#l\r\n\r\n";
            text += "#L67#有状态脚本示例#l \t #L68#NextLevel脚本示例#l";
        }
        cm.sendSimple(text);
    } else if (status === 1) {
        doSelect(selection);
    } else {
        cm.dispose();
    }
}

function doSelect(selection) {
    switch (selection) {
        // 非GM功能
        case 0:
            openNpc("新人福利_nextLevel");
            break;
        case 1:
            openNpc("每日签到");
            break;
        case 2:
            openNpc("在线奖励_nextlevel");
            break;
        case 3:
            cm.getPlayer().saveLocation("FREE_MARKET");
            cm.warp(910000000, "out00");
            break;
        case 4:
            openNpc("当前地图掉落");
            break;
        case 5:
            openNpc("一键转职");
            break;
        case 6:
            openNpc("戒指打造");
            break;
        case 7:
            openNpc("点装强化");
            break;
        case 8:
            openNpc("副本戒指");
            break;
        case 9:
            openNpc("矿石戒指");
            break;
        case 10:
            openNpc("一键出售");
            break;
        case 11:
            openNpc("每日任务");
            break;
        case 12:
            openNpc("赞助中心");
            break;
        case 13:
            openNpc("点卷商品");
            break;
        case 14:
            openNpc("肝王勋章");
            break;
        case 15:
            const EnterMTSHandler = Java.type("org.gms.net.server.channel.handlers.EnterMTSHandler");
            const client = cm.getPlayer().getClient();
            EnterMTSHandler.enterMTS(client);
            break;
        case 16:
            cm.openShopNPC(2030009); // 便利商店
            cm.dispose();
            break;
        case 17:
            openNpc("矿石仓库");
            break;
// GM功能
        case 61:
            openNpc("万能传送");
            break;
        case 62:
            cm.dispose();
            cm.openShopNPC(9900001);
            cm.dispose();
            break;
        case 63:
            openNpc("Salon");
            break;
        case 64:
            openNpc("UI查询");
            break;
        case 65:
            openNpc("一键删除道具");
            break;
        case 66:
            openNpc("一键刷道具");
            break;
        case 67:
            openNpc("Example1")
            break;
        case 68:
            openNpc("Example2")
            break;
        default:
            cm.sendOk("该功能暂不支持，敬请期待！");
            cm.dispose();
    }
}

function openNpc(scriptName) {
    cm.dispose();
    cm.openNpc(9900001, scriptName);
}

function level() {
    leveldispose();
}
function levelnull() {
    leveldispose();
}
function leveldispose() {
    cm.dispose();
}
