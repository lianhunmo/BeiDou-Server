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

var mogu = "#fUI/UIWindow.img/Minigame/Omok/stone/0/black/0#";
var ui = "#fUI/Basic.img/BtCoin/normal/0#";
var OldTitle ="\t\t\t\t\t"+mogu+"#e欢迎来到#r小时候#k帮助中心"+mogu+"#n\t\t\t\t\r\n\r\n";
var status = -1;

// 维护补偿入口显示时间：开始时间起 3 天内（月份从 0 开始，10 表示 11 月）
var COMPENSATION_START_TIME = new Date(2026, 10, 17, 0, 0, 0).getTime();
var COMPENSATION_DURATION_DAYS = 3;
var COMPENSATION_END_TIME = COMPENSATION_START_TIME + COMPENSATION_DURATION_DAYS * 24 * 60 * 60 * 1000 - 1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (mode === -1) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (status === 0) {
        cm.sendSimple(buildMenuText());
    } else if (status === 1) {
        doSelect(selection);
    } else {
        cm.dispose();
    }
}

/**
 * 构建主菜单文本（分类 + 对齐排版）
 */
function buildMenuText() {
    var player = cm.getPlayer();
    var cashShop = player.getCashShop();

    var text = OldTitle;
    text += "\r\n";

    // ---------- 账户信息 ----------
    text += ""+ui+"当前点券：" + cm.getPlayer().getCashShop().getCash(1) + "\r\n";
    text += ""+ui+"当前抵用券：" + cm.getPlayer().getCashShop().getCash(2) + "\r\n";
    text += ""+ui+"当前信用券：" + cm.getPlayer().getCashShop().getCash(4) + "\r\n";
    text += ""+ui+"当前金币：" + cm.getPlayer().getMeso() + "\r\n";
    text += ""+ui+"当前羽毛累充：" + Number(cm.getAccountExtendValue("角色累充数额")) + "\r\n";
    text += "\r\n";

    // ---------- 成长福利 ----------
    if (isCompensationVisible()) {
        text += "  #L73#"+mogu+"#e#r维护补偿#k#l\r\n\r\n";
    } else {
        text += "\r\n";
    }
    text += "  #L72#"+mogu+"#e#b领取帮助快捷按钮#k#l\r\n\r\n";

    text += "  #L12##r羽毛累充#l  #L13#点券商品#l  #L26#月卡功能#l  #L7#点装强化#l\r\n\r\n";

    // ---------- 日常福利 ----------
    text += "  #L0##b新人福利#l  #L2#在线奖励#l  #L11#每日任务#l  #L4#爆率一览#l\r\n";

    // ---------- 便捷功能 ----------
    text += "  #L3##b传送自由#l  #L16#便利商店#l  #L10#一键出售#l  #L65#删除道具#l\r\n\r\n";

    // ---------- 装备打造 ----------
    text += "  #L8##b副本戒指#l  #L9#矿石戒指#l  #L6#枫叶戒指#l  #L19#怪物卡戒#l\r\n";
    text += "  #L20#血衣合成#l  #L30#装备合成#l  #L27#金猪腰带#l  #L14#肝王勋章#l\r\n\r\n";

    // ---------- 仓库管理 ----------
    text += "  #L17##b矿石仓库#l  #L18#卷轴仓库#l  #L24#怪卡仓库#l  #L29#卷轴兑换#l\r\n";

    // ---------- 外观时尚 ----------
    text += "  #L21##b皇家发型#l  #L22#皇家整容#l  #L23#时尚点装#l  #L28#动漫点装#l\r\n\r\n";

    // ---------- 拍卖行 ----------
    text += "  #L71##b#e=============  #k冒 险 股 神  #b=============#l\r\n\r\n";
    text += "  #L15##e========  #k拍 卖 行（#r信用点交易#k）  #b========#l\r\n";

    // ---------- GM 专用 ----------
    // if (player.isGM()) {
    //     text += "\r\n#e#r【GM 专用功能】#n\r\n";
    //     text += "  #L61##b超级传送#l    #L62#超级商店#l    #L63#整容集合#l    #L64#UI查询#l\r\n";
    //     text += "  #L66#生成道具#l    #L70#秒伤测试#l    #L25#战力排行#l    #L69#遗忘技能#l\r\n";
    //     text += "  #L67#有状态脚本示例#l    #L68#NextLevel脚本示例#l\r\n";
    // }

    return text;
}

/**
 * 选项分发
 */
function doSelect(selection) {
    switch (selection) {
        // ---------- 日常福利 ----------
        case 0:
            openNpc("新人福利_nextLevel");
            break;
        case 1:
            openNpc("每日签到");
            break;
        case 2:
            openNpc("在线奖励_nextlevel");
            break;
        case 11:
            openNpc("每日任务");
            break;
        case 14:
            openNpc("肝王勋章");
            break;

        // ---------- 成长福利 ----------
        case 12:
            openNpc("赞助中心");
            break;
        case 13:
            openNpc("点卷商品");
            break;
        case 26:
            openNpc("月卡功能");
            break;
        case 4:
            openNpc("当前地图掉落");
            break;

        // ---------- 装备打造 ----------
        case 8:
            openNpc("副本戒指");
            break;
        case 9:
            openNpc("矿石戒指");
            break;
        case 6:
            openNpc("戒指打造");
            break;
        case 19:
            openNpc("2006"); // 明珠港怪物卡戒指NPC
            break;
        case 20:
            openNpc("血衣合成");
            break;
        case 30:
            openNpc("装备合成");
            break;
        case 27:
            openNpc("金猪腰带");
            break;
        case 7:
            openNpc("点装强化");
            break;

        // ---------- 仓库管理 ----------
        case 17:
            openNpc("矿石仓库");
            break;
        case 18:
            openNpc("卷轴仓库");
            break;
        case 24:
            openNpc("怪卡仓库");
            break;
        case 29:
            openNpc("卷轴兑换");
            break;

        // ---------- 外观时尚 ----------
        case 21:
            openNpc("皇家发型");
            break;
        case 22:
            openNpc("皇家整容");
            break;
        case 23:
            openNpc("时尚点装");
            break;
        case 28:
            openNpc("动漫点装");
            break;

        // ---------- 便捷功能 ----------
        case 3:
            cm.getPlayer().saveLocation("FREE_MARKET");
            cm.warp(910000000, "out00");
            break;
        case 16:
            cm.openShopNPC(2030009); // 便利商店
            cm.dispose();
            break;
        case 10:
            openNpc("一键出售");
            break;
        case 65:
            openNpc("一键删除道具");
            break;
        case 5:
            openNpc("一键转职");
            break;

        // ---------- 拍卖行 ----------
        case 15:
            var EnterMTSHandler = Java.type("org.gms.net.server.channel.handlers.EnterMTSHandler");
            var client = cm.getPlayer().getClient();
            EnterMTSHandler.enterMTS(client);
            break;
        case 71:
            openNpc("冒险炒股");
            break;
        case 72:
            openNpc("快捷功能");
            break;
        case 73:
            if (isCompensationVisible()) {
                openNpc("维护补偿");
            } else {
                cm.sendOk("维护补偿活动尚未开始或已结束，敬请期待！");
                cm.dispose();
            }
            break;
        // ---------- GM 专用 ----------
        // case 61:
        //     openNpc("万能传送");
        //     break;
        // case 62:
        //     cm.dispose();
        //     cm.openShopNPC(9900001);
        //     cm.dispose();
        //     break;
        // case 63:
        //     openNpc("Salon");
        //     break;
        // case 64:
        //     openNpc("UI查询");
        //     break;
        // case 66:
        //     openNpc("一键刷道具");
        //     break;
        // case 67:
        //     openNpc("Example1");
        //     break;
        // case 68:
        //     openNpc("Example2");
        //     break;
        // case 69:
        //     openNpc("遗忘技能");
        //     break;
        // case 70:
        //     openNpc("秒伤测试");
        //     break;
        // case 25:
        //     openNpc("战力排行");
        //     break;
        default:
            cm.sendOk("该功能暂不支持，敬请期待！");
            cm.dispose();
    }
}

function openNpc(scriptName) {
    cm.dispose();
    cm.openNpc(1002006, scriptName);
}

/**
 * 维护补偿入口是否在显示时间内（开始时间起 3 天内）
 */
function isCompensationVisible() {
    var now = java.lang.System.currentTimeMillis();
    return now >= COMPENSATION_START_TIME && now <= COMPENSATION_END_TIME;
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