/**
 * @description 月卡功能
 * @author Geoffrey
 */
const SHADOW_MESO = 4000038;
const EXP_COUPON_2X = 5211048;
const EXP_COUPON_3X = 5211060;
const DROP_COUPON_2X = 5360042;
const SILVER_MOON_CARD = 5590000;
const SILVER_MOON_CARD_COST = 98;
const GOLDEN_MOON_CARD = 5600000;
const GOLDEN_MOON_CARD_COST = 198;
const VIP_TELEPORT_ROCK = 5041000;
const CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
const CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
const CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";
const GAIN_CASH_NUM_SILVER = 500;
const GAIN_CASH_NUM_GOLDEN = 1000;
const STAMP0 = 4001101;
const STAMP1 = 4002000;
const STAMP2 = 4002001;
const STAMP3 = 4001158;
const STAMP4 = 4031435;
const STAMP5 = 4001198;
const STAMP6 = 4001160;
const STAMP7 = 4001159;

let flamingFeatherCount = 0;
let currentCashPoint = 0;
let chooseCount1 = 10;
let chooseCount2 = 10;
let chooseCount3 = 10;
let chooseCount4 = 10;
let chooseCount5 = 10;
let chooseCount6 = 10;
let chooseCount7 = 10;
let chooseCount8 = 10;
let chooseCount9 = 10;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    flamingFeatherCount = cm.getItemQuantity(SHADOW_MESO);
    chooseCount1 = Number(cm.getCharacterExtendValue("月卡每日福利1号选择领取次数", true));
    chooseCount2 = Number(cm.getCharacterExtendValue("月卡每日福利2号选择领取次数", true));
    chooseCount3 = Number(cm.getCharacterExtendValue("月卡每日福利3号选择领取次数", true));
    chooseCount4 = Number(cm.getCharacterExtendValue("月卡每日福利4号选择领取次数", true));
    chooseCount5 = Number(cm.getCharacterExtendValue("月卡每日福利5号选择领取次数", true));
    chooseCount6 = Number(cm.getCharacterExtendValue("月卡每日福利6号选择领取次数", true));
    chooseCount7 = Number(cm.getCharacterExtendValue("月卡每日福利7号选择领取次数", true));
    chooseCount8 = Number(cm.getCharacterExtendValue("月卡每日福利8号选择领取次数", true));
    chooseCount9 = Number(cm.getCharacterExtendValue("月卡每日福利9号选择领取次数", true));

    let text = "这里可以兑换月卡会员以及领取月卡福利。\r\n";
    text += "#r注：月卡时效为30天，如果已经兑换了白银月卡，再兑换黄金月卡，将会删除白银月卡证明，白银月卡天数不退还。#k\r\n";
    text += "你当前拥有 #b" + flamingFeatherCount + "#k #t" + SHADOW_MESO + "##i" + SHADOW_MESO + "#。\r\n";
    text += "现在你希望做什么呢？\r\n\r\n";

    if (cm.haveItem(SILVER_MOON_CARD)) {
        text += "#L1##r198 个#t" + SHADOW_MESO + "##i" + SHADOW_MESO + "#兑换黄金月卡会员#k#l\r\n\r\n";
        if (chooseCount1 < 1) {
            text += `#L2##b${CheckBox_0}\t领取2小时双倍经验卡#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取2小时双倍经验卡#l\r\n`;
        }
        if (chooseCount2 < 1) {
            text += `#L3##b${CheckBox_0}\t领取2小时双倍爆率卡#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取2小时双倍爆率卡#l\r\n`;
        }
        if (chooseCount3 < 1) {
            text += `#L4##b${CheckBox_0}\t领取 500 点券#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取 500 点券#l\r\n`;
        }
        if (chooseCount4 < 1) {
            text += `#L5##b${CheckBox_0}\t领取 2 颗高级瞬移之石#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取 2 颗高级瞬移之石#l\r\n`;
        }
    } else if(cm.haveItem(GOLDEN_MOON_CARD)) {
        if (chooseCount5 < 1) {
            text += `#L6##b${CheckBox_0}\t领取2小时三倍经验卡#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取2小时三倍经验卡#l\r\n`;
        }
        if (chooseCount6 < 2) {
            text += `#L7##b${CheckBox_0}\t领取2小时双倍爆率卡#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取2次2小时双倍爆率卡#l\r\n`;
        }
        if (chooseCount7 < 1) {
            text += `#L8##b${CheckBox_0}\t领取 1000 点券#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取 1000 点券#l\r\n`;
        }
        if (chooseCount8 < 1) {
            text += `#L9##b${CheckBox_0}\t领取 4 颗高级瞬移之石#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t已领取 4 颗高级瞬移之石#l\r\n`;
        }
        if (chooseCount9 < 3) {
            text += `#L10##b${CheckBox_0}\t组队副本扫荡#k#l\r\n`;
        } else {
            text += `#L99#${CheckBox_1}\t本日副本扫荡次数已用完#l\r\n`;
        }
    } else {
        text += "#L0##r98 个#t" + SHADOW_MESO + "##i" + SHADOW_MESO + "#兑换白银月卡会员#k#l\r\n\r\n";
        text += "\t白银月卡福利包含：\r\n";
        text += "\t领取2小时双倍经验卡\r\n";
        text += "\t领取2小时双倍爆率卡\r\n";
        text += "\t领取 500 点券\r\n";
        text += "\t领取 2 颗高级瞬移之石\r\n\r\n";

        text += "#L1##r198 个#t" + SHADOW_MESO + "##i" + SHADOW_MESO + "#兑换黄金月卡会员#k#l\r\n\r\n";
        text += "\t黄金月卡福利包含：\r\n";
        text += "\t领取2小时三倍经验卡\r\n";
        text += "\t领取2次2小时双倍爆率卡\r\n";
        text += "\t领取 1000 点券\r\n";
        text += "\t领取 4 颗高级瞬移之石\r\n";
        text += "\t组队副本扫荡\r\n";
    }
    text += "#L99##b离开#k#l\r\n\r\n";

    cm.sendSelectLevel("Choose", text);
}

function levelChoose0() {
    cm.sendYesNoLevel("Dispose", "BuySilverMoonCard", "要花费 #r" + SILVER_MOON_CARD_COST + "#k #t" + SHADOW_MESO + "##i" + SHADOW_MESO + "#购买 #b#t" + SILVER_MOON_CARD + "##k#i" + SILVER_MOON_CARD + "#吗？");
}

function levelBuySilverMoonCard() {
    if (cm.getItemQuantity(SILVER_MOON_CARD) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + SILVER_MOON_CARD + "##k#i" + SILVER_MOON_CARD + "# 了，不能重复购买。");
    } else if (flamingFeatherCount < SILVER_MOON_CARD_COST) {
        cm.sendOkLevel("Dispose", "你的#t" + SHADOW_MESO + "##i" + SHADOW_MESO + "#不够。");
    } else if (!cm.canHold(SILVER_MOON_CARD, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.gainItem(SHADOW_MESO, -SILVER_MOON_CARD_COST);
        cm.gainItem(SILVER_MOON_CARD, 1, false, true, 2592000000);
        cm.sendOkLevel("Dispose", "成功购买#b#t" + SILVER_MOON_CARD + "##k#i" + SILVER_MOON_CARD + "#");
    }
}

function levelChoose1() {
    cm.sendYesNoLevel("Dispose", "BuyGoldenMoonCard", "要花费 #r" + GOLDEN_MOON_CARD_COST + "#k #t" + SHADOW_MESO + "##i" + SHADOW_MESO + "#购买 #b#t" + GOLDEN_MOON_CARD + "##k#i" + GOLDEN_MOON_CARD + "#吗？");
}

function levelBuyGoldenMoonCard() {
    if (cm.getItemQuantity(GOLDEN_MOON_CARD) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + GOLDEN_MOON_CARD + "##k#i" + GOLDEN_MOON_CARD + "# 了，不能重复购买。");
    } else if (flamingFeatherCount < GOLDEN_MOON_CARD_COST) {
        cm.sendOkLevel("Dispose", "你的火焰羽毛不够。");
    } else if (!cm.canHold(GOLDEN_MOON_CARD, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        if (cm.haveItem(SILVER_MOON_CARD)) {
            cm.gainItem(SILVER_MOON_CARD, -1);
        }
        cm.gainItem(SHADOW_MESO, -GOLDEN_MOON_CARD_COST);
        cm.gainItem(GOLDEN_MOON_CARD, 1, false, true, 2592000000);
        cm.sendOkLevel("Dispose", "成功购买#b#t" + GOLDEN_MOON_CARD + "##k#i" + GOLDEN_MOON_CARD + "#");
    }
}

function levelChoose2() {
    cm.sendYesNoLevel("Dispose", "Gain1", "要领取 #b#t" + EXP_COUPON_2X + "##k#i" + EXP_COUPON_2X + "#吗？");
}

function levelGain1() {
    if (cm.getItemQuantity(EXP_COUPON_2X) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + EXP_COUPON_2X + "##k#i" + EXP_COUPON_2X + "# 了。");
    } else if (chooseCount1 >= 1) {
        cm.sendOkLevel("Dispose", "你今日已领取过该福利！");
    } else if (!cm.canHold(EXP_COUPON_2X, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.gainItem(EXP_COUPON_2X, 1, false, true, 7200000);
        chooseCount1++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利1号选择领取次数", chooseCount1.toString(), true);
        cm.sendOkLevel("Start", "成功领取2小时#b#t" + EXP_COUPON_2X + "##k#i" + EXP_COUPON_2X + "#");
    }
}

function levelChoose3() {
    cm.sendYesNoLevel("Dispose", "Gain2", "要领取 #b#t" + DROP_COUPON_2X + "##k#i" + DROP_COUPON_2X + "#吗？");
}

function levelGain2() {
    if (cm.getItemQuantity(DROP_COUPON_2X) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + DROP_COUPON_2X + "##k#i" + DROP_COUPON_2X + "# 了。");
    } else if (chooseCount2 >= 1) {
        cm.sendOkLevel("Dispose", "你今日已领取过该福利！");
    } else if (!cm.canHold(DROP_COUPON_2X, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.gainItem(DROP_COUPON_2X, 1, false, true, 7200000);
        chooseCount2++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利2号选择领取次数", chooseCount2.toString(), true);
        cm.sendOkLevel("Start", "成功领取2小时#b#t" + DROP_COUPON_2X + "##k#i" + DROP_COUPON_2X + "#");
    }
}

function levelChoose4() {
    cm.sendYesNoLevel("Dispose", "Gain3", "要领取 500 #b点券#k#i" + 4031866 + "#吗？");
}

function levelGain3() {
    if (chooseCount3 >= 1) {
        cm.sendOkLevel("Dispose", "你今日已领取过该福利！");
    } else {
        cm.getPlayer().getCashShop().gainCash(1, GAIN_CASH_NUM_SILVER);
        chooseCount3++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利3号选择领取次数", chooseCount3.toString(), true);
        cm.sendOkLevel("Start", "领取成功！您已获得 #b" + GAIN_CASH_NUM_SILVER + "#k 点卷。");
    }
}

function levelChoose5() {
    cm.sendYesNoLevel("Dispose", "Gain4", "要领取 2颗 #b#t" + VIP_TELEPORT_ROCK + "##k#i" + VIP_TELEPORT_ROCK + "#吗？");
}

function levelGain4() {
    if (chooseCount4 >= 1) {
        cm.sendOkLevel("Dispose", "你今日已领取过该福利！");
    } else if (!cm.canHold(VIP_TELEPORT_ROCK, 2)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.gainItem(VIP_TELEPORT_ROCK, 2);
        chooseCount4++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利4号选择领取次数", chooseCount4.toString(), true);
        cm.sendOkLevel("Start", "成功领取 2颗 #b#t" + VIP_TELEPORT_ROCK + "##k#i" + VIP_TELEPORT_ROCK + "#");
    }
}

function levelChoose6() {
    cm.sendYesNoLevel("Dispose", "Gain5", "要领取 #b#t" + EXP_COUPON_3X + "##k#i" + EXP_COUPON_3X + "#吗？");
}

function levelGain5() {
    if (cm.getItemQuantity(EXP_COUPON_3X) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + EXP_COUPON_3X + "##k#i" + EXP_COUPON_3X + "# 了。");
    } else if (chooseCount5 >= 1) {
        cm.sendOkLevel("Dispose", "你今日已领取过该福利！");
    } else if (!cm.canHold(EXP_COUPON_3X, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.gainItem(EXP_COUPON_3X, 1, false, true, 7200000);
        chooseCount5++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利5号选择领取次数", chooseCount5.toString(), true);
        cm.sendOkLevel("Start", "成功领取2小时#b#t" + EXP_COUPON_3X + "##k#i" + EXP_COUPON_3X + "#");
    }
}

function levelChoose7() {
    cm.sendYesNoLevel("Dispose", "Gain6", "要领取 #b#t" + DROP_COUPON_2X + "##k#i" + DROP_COUPON_2X + "#吗？");
}

function levelGain6() {
    if (cm.getItemQuantity(DROP_COUPON_2X) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + DROP_COUPON_2X + "##k#i" + DROP_COUPON_2X + "# 了。");
    } else if (chooseCount6 >= 2) {
        cm.sendOkLevel("Dispose", "你今日已领取过2次该福利！");
    } else if (!cm.canHold(DROP_COUPON_2X, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.gainItem(DROP_COUPON_2X, 1, false, true, 7200000);
        chooseCount6++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利6号选择领取次数", chooseCount6.toString(), true);
        cm.sendOkLevel("Start", "成功领取2小时#b#t" + DROP_COUPON_2X + "##k#i" + DROP_COUPON_2X + "#");
    }
}

function levelChoose8() {
    cm.sendYesNoLevel("Dispose", "Gain7", "要领取 1000 #b点券#k#i" + 4031866 + "#吗？");
}

function levelGain7() {
    if (chooseCount7 >= 1) {
        cm.sendOkLevel("Dispose", "你今日已领取过该福利！");
    } else {
        cm.getPlayer().getCashShop().gainCash(1, GAIN_CASH_NUM_GOLDEN);
        chooseCount7++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利7号选择领取次数", chooseCount7.toString(), true);
        cm.sendOkLevel("Start", "领取成功！您已获得 #b" + GAIN_CASH_NUM_GOLDEN + "#k 点卷。");
    }
}

function levelChoose9() {
    cm.sendYesNoLevel("Dispose", "Gain8", "要领取 4颗 #b#t" + VIP_TELEPORT_ROCK + "##k#i" + VIP_TELEPORT_ROCK + "#吗？");
}

function levelGain8() {
    if (chooseCount8 >= 1) {
        cm.sendOkLevel("Dispose", "你今日已领取过该福利！");
    } else if (!cm.canHold(VIP_TELEPORT_ROCK, 2)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.gainItem(VIP_TELEPORT_ROCK, 4);
        chooseCount8++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利8号选择领取次数", chooseCount8.toString(), true);
        cm.sendOkLevel("Start", "成功领取 4颗 #b#t" + VIP_TELEPORT_ROCK + "##k#i" + VIP_TELEPORT_ROCK + "#");
    }
}

function levelChoose10() {
    let text = "副本扫荡可以快速完成一次选择的组队副本，并获取一次该副本材料。\r\n" +
        "每日可扫荡 3 次，当前已使用 #r" + chooseCount9 + "#k 次\r\n" +
        "要扫荡哪个副本？\r\n\r\n";
    text += "#L0##b迎月花山丘#k（射手组队任务）#l\r\n";
    text += "#L1##b第一伴奏#k （废都组队任务）#l\r\n";
    text += "#L2##b时空裂缝#k （玩具组队任务）#l\r\n";
    text += "#L3##b女神之塔#k （天空之城组队任务）#l\r\n";
    text += "#L4##b海盗船#k （百草堂组队任务）#l\r\n";
    text += "#L5##b毒雾森林#k （艾琳的森林组队任务）#l\r\n";
    text += "#L6##b拯救罗密欧#k （玛加提亚组队任务）#l\r\n";
    text += "#L7##b拯救朱丽叶#k （玛加提亚组队任务）#l\r\n";
    cm.sendSelectLevel("PQChoose", text);
}

function levelPQChoose0() {
    cm.sendYesNoLevel("Choose10", "PQSweep0", "要扫荡 #b迎月花山丘#k（射手组队任务） 吗？");
}

function levelPQSweep0() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP0, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP0, 10);
        let quitTotal = cm.getCharacterExtendValue("月秒组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("月秒组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("月秒组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("月秒组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b迎月花山丘#k（射手组队任务）\r\n获得 10 #b#t" + STAMP0 + "##k#i" + STAMP0 + "#");
    }
}

function levelPQChoose1() {
    cm.sendYesNoLevel("Choose10", "PQSweep1", "要扫荡 #b第一伴奏#k （废都组队任务） 吗？");
}

function levelPQSweep1() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP1, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP1, 10);
        let quitTotal = cm.getCharacterExtendValue("废弃组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("废弃组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("废弃组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("废弃组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b第一伴奏#k （废都组队任务）\r\n获得 10 #b#t" + STAMP1 + "##k#i" + STAMP1 + "#");
    }
}

function levelPQChoose2() {
    cm.sendYesNoLevel("Choose10", "PQSweep2", "要扫荡 #b时空裂缝#k （玩具组队任务） 吗？");
}

function levelPQSweep2() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP2, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP2, 10);
        let quitTotal = cm.getCharacterExtendValue("玩具组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("玩具组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("玩具组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("玩具组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b时空裂缝#k （玩具组队任务）\r\n获得 10 #b#t" + STAMP2 + "##k#i" + STAMP2 + "#");
    }
}

function levelPQChoose3() {
    cm.sendYesNoLevel("Choose10", "PQSweep3", "要扫荡 #b女神之塔#k （天空之城组队任务） 吗？");
}

function levelPQSweep3() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP3, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP3, 10);
        let quitTotal = cm.getCharacterExtendValue("天空组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("天空组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("天空组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("天空组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b女神之塔#k （天空之城组队任务）\r\n获得 10 #b#t" + STAMP3 + "##k#i" + STAMP3 + "#");
    }
}

function levelPQChoose4() {
    cm.sendYesNoLevel("Choose10", "PQSweep4", "要扫荡 #b海盗船#k （百草堂组队任务）吗？");
}

function levelPQSweep4() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP4, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP4, 10);
        let quitTotal = cm.getCharacterExtendValue("海盗组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("海盗组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("海盗组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("海盗组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b海盗船#k （百草堂组队任务）\r\n获得 10 #b#t" + STAMP4 + "##k#i" + STAMP4 + "#");
    }
}

function levelPQChoose5() {
    cm.sendYesNoLevel("Choose10", "PQSweep5", "要扫荡 #b毒雾森林#k （艾琳的森林组队任务）吗？");
}

function levelPQSweep5() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP5, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP5, 10);
        let quitTotal = cm.getCharacterExtendValue("毒雾组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("毒雾组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("毒雾组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("毒雾组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b毒雾森林#k （艾琳的森林组队任务）\r\n获得 10 #b#t" + STAMP5 + "##k#i" + STAMP5 + "#");
    }
}

function levelPQChoose6() {
    cm.sendYesNoLevel("Choose10", "PQSweep6", "要扫荡 #b拯救罗密欧#k （玛加提亚组队任务）吗？");
}

function levelPQSweep6() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP6, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP6, 10);
        let quitTotal = cm.getCharacterExtendValue("罗密欧与朱丽叶组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("罗密欧与朱丽叶组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("罗密欧与朱丽叶组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("罗密欧与朱丽叶组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b拯救罗密欧#k （玛加提亚组队任务）\r\n获得 10 #b#t" + STAMP6 + "##k#i" + STAMP6 + "#");
    }
}

function levelPQChoose7() {
    cm.sendYesNoLevel("Choose10", "PQSweep7", "要扫荡 #b拯救朱丽叶#k （玛加提亚组队任务）吗？");
}

function levelPQSweep7() {
    if (chooseCount9 >= 3) {
        cm.sendOkLevel("Dispose", "今日扫荡次数已用完！");
    } else if (!cm.canHold(STAMP7, 10)) {
        cm.sendOkLevel("Dispose", "请保证其他栏有空位。");
    } else {
        chooseCount9++;
        cm.saveOrUpdateCharacterExtendValue("月卡每日福利9号选择领取次数", chooseCount9.toString(), true);
        cm.gainItem(STAMP7, 10);
        let quitTotal = cm.getCharacterExtendValue("罗密欧与朱丽叶组队副本累计通关次数");
        quitTotal++;
        cm.saveOrUpdateCharacterExtendValue("罗密欧与朱丽叶组队副本累计通关次数", quitTotal.toString());
        let quitDaily = cm.getCharacterExtendValue("罗密欧与朱丽叶组队副本每日通关次数", true);
        quitDaily++;
        cm.saveOrUpdateCharacterExtendValue("罗密欧与朱丽叶组队副本每日通关次数", quitDaily.toString(), true);
        cm.sendOkLevel("Start", "成功扫荡 #b拯救朱丽叶#k （玛加提亚组队任务）\r\n获得 10 #b#t" + STAMP7 + "##k#i" + STAMP7 + "#");
    }
}

function levelChoose99() {
    cm.dispose();
}

function levelDispose() {
    cm.dispose();
}


