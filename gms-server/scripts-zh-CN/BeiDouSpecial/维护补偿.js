/**
 * @description 维护补偿
 * @author
 */
const COMPENSATION_START_TIME = new Date(2026, 10, 17, 0, 0, 0).getTime();  // 注意：月份从0开始，10表示11月
const COMPENSATION_END_TIME   = new Date(2026, 10, 24, 23, 59, 59).getTime(); // 2026-11-24 23:59:59

const ACCOUNT_COMPENSATION_KEY = "维护补偿领取_20261117";

const EXP_COUPON_2X_1H30M = 5211049;
const AP_RESET_SCROLL = 5050000;
const VIP_TELEPORT_ROCK = 5041000;

const EXP_COUPON_COUNT = 1;
const AP_RESET_SCROLL_COUNT = 20;
const VIP_TELEPORT_ROCK_COUNT = 10;
const COMPENSATION_MESOS = 100000;
const COMPENSATION_CASH = 10000;

function start() {
    compensationStart();
}

function compensationStart() {
    const now = java.lang.System.currentTimeMillis();

    let text = "服务器维护补偿\r\n";
    text += "领取时间：#b" + formatTime(COMPENSATION_START_TIME) + "#k 至 #b" + formatTime(COMPENSATION_END_TIME) + "#k\r\n";
    text += "#r(注：每个账号只能领取一次，请谨慎领取。)#k\r\n\r\n";

    if (now < COMPENSATION_START_TIME) {
        text += "#r补偿领取尚未开始，请稍后再来。#k";
        cm.sendOkLevel("Dispose", text);
        return;
    }

    if (now > COMPENSATION_END_TIME) {
        text += "#r补偿领取已结束，感谢你的支持。#k";
        cm.sendOkLevel("Dispose", text);
        return;
    }

    const received = cm.getAccountExtendValue(ACCOUNT_COMPENSATION_KEY);
    if (received === "1") {
        text += "#r本账号已领取过维护补偿，无法重复领取。#k";
        cm.sendOkLevel("Dispose", text);
        return;
    }

    text += getRewardListText();
    text += "\r\n#L0##b领取补偿#k#l\r\n";
    text += "#L1##b离开#k#l";
    cm.sendSelectLevel("ConfirmReward", text);
}

function getRewardListText() {
    let text = "本次补偿内容：\r\n";
    text += "#b#z" + EXP_COUPON_2X_1H30M + "##k #b#i" + EXP_COUPON_2X_1H30M + "##k x" + EXP_COUPON_COUNT + "\r\n";
    text += "#b" + AP_RESET_SCROLL_COUNT + "张 #z" + AP_RESET_SCROLL + "##k #b#i" + AP_RESET_SCROLL + "##k\r\n";
    text += "#b" + VIP_TELEPORT_ROCK_COUNT + "颗 #z" + VIP_TELEPORT_ROCK + "##k #b#i" + VIP_TELEPORT_ROCK + "##k\r\n";
    text += "金币 #b" + COMPENSATION_MESOS + "#k\r\n";
    text += "抵用券 #b" + COMPENSATION_CASH + "#k\r\n";
    return text;
}

function levelConfirmReward0() {
    const now = java.lang.System.currentTimeMillis();

    if (now < COMPENSATION_START_TIME) {
        cm.sendOkLevel("Dispose", "补偿领取尚未开始，请稍后再来。");
        return;
    }

    if (now > COMPENSATION_END_TIME) {
        cm.sendOkLevel("Dispose", "补偿领取已结束，感谢你的支持。");
        return;
    }

    const received = cm.getAccountExtendValue(ACCOUNT_COMPENSATION_KEY);
    if (received === "1") {
        cm.sendOkLevel("Dispose", "本账号已领取过维护补偿，无法重复领取。");
        return;
    }

    let text = "是否确认领取维护补偿？\r\n\r\n";
    text += getRewardListText();
    text += "\r\n#r(注：每个账号只能领取一次，请谨慎领取。)#k";
    cm.sendYesNoLevel("Dispose", "GainMaintenanceReward", text);
}

function levelConfirmReward1() {
    cm.dispose();
}

function levelGainMaintenanceReward() {
    const now = java.lang.System.currentTimeMillis();

    if (now < COMPENSATION_START_TIME) {
        cm.sendOkLevel("Dispose", "补偿领取尚未开始，请稍后再来。");
        return;
    }

    if (now > COMPENSATION_END_TIME) {
        cm.sendOkLevel("Dispose", "补偿领取已结束，感谢你的支持。");
        return;
    }

    const received = cm.getAccountExtendValue(ACCOUNT_COMPENSATION_KEY);
    if (received === "1") {
        cm.sendOkLevel("Dispose", "本账号已领取过维护补偿，无法重复领取。");
        return;
    }

    if (!cm.canHold(EXP_COUPON_2X_1H30M, EXP_COUPON_COUNT)) {
        cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。");
        return;
    }

    if (!cm.canHold(AP_RESET_SCROLL, AP_RESET_SCROLL_COUNT)) {
        cm.sendOkLevel("Dispose", "请确保现金栏拥有空间。");
        return;
    }

    if (!cm.canHold(VIP_TELEPORT_ROCK, VIP_TELEPORT_ROCK_COUNT)) {
        cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。");
        return;
    }

    cm.gainItem(EXP_COUPON_2X_1H30M, 1, false, true, 7200000);
    cm.gainItem(AP_RESET_SCROLL, AP_RESET_SCROLL_COUNT);
    cm.gainItem(VIP_TELEPORT_ROCK, VIP_TELEPORT_ROCK_COUNT);
    cm.gainMeso(COMPENSATION_MESOS);
    cm.getPlayer().getCashShop().gainCash(2, COMPENSATION_CASH);

    cm.saveOrUpdateAccountExtendValue(ACCOUNT_COMPENSATION_KEY, "1");

    let text = "恭喜你已领取维护补偿：\r\n";
    text += "#b#z" + EXP_COUPON_2X_1H30M + "##k #b#i" + EXP_COUPON_2X_1H30M + "##k x" + EXP_COUPON_COUNT + "\r\n";
    text += "#b" + AP_RESET_SCROLL_COUNT + "张 #z" + AP_RESET_SCROLL + "##k #b#i" + AP_RESET_SCROLL + "##k\r\n";
    text += "#b" + VIP_TELEPORT_ROCK_COUNT + "颗 #z" + VIP_TELEPORT_ROCK + "##k #b#i" + VIP_TELEPORT_ROCK + "##k\r\n";
    text += "金币 #b" + COMPENSATION_MESOS + "#k\r\n";
    text += "抵用券 #b" + COMPENSATION_CASH + "#k\r\n";

    cm.dropMessage(0, "你已成功领取了维护补偿！");
    cm.sendOkLevel("Dispose", text);
}

function formatTime(ms) {
    const sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    return sdf.format(new java.util.Date(ms));
}

function levelDispose() {
    cm.dispose();
}

function levelnull() {
    cm.dispose();
}