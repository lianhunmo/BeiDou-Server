/**
 * @description 点卷商品专卖
 * @author Geoffrey
 */
const FLAMING_FEATHER = 4001006;
const EXP_COUPON_2X_4H = 5211048;
const EXP_COUPON_2X_4H_COST = 400;
const DROP_COUPON_2X_4H = 5360042;
const DROP_COUPON_2X_4H_COST = 800;
const REMOTE_GACHAPON_TICKET = 5451000;
const REMOTE_GACHAPON_TICKET_COST = 200;
const SCISSORS_OF_KARMA = 5520000;
const SCISSORS_OF_KARMA_COST = 2000;
const VICIOUS_HAMMER = 5570000;
const VICIOUS_HAMMER_COST = 1000;
const WHEEL_OF_DESTINY = 5510000;
const WHEEL_OF_DESTINY_COST = 500;

let flamingFeatherCount = 0;
let currentCashPoint = 0;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    currentCashPoint = cm.getPlayer().getCashShop().getCash(1);
    flamingFeatherCount = cm.getItemQuantity(FLAMING_FEATHER);
    let text = "这里可以购买点卷专属物品，点卷可以用火焰羽毛兑换。\r\n";
    text += "当前点券：#b" + currentCashPoint + "#k\r\n";
    text += "你当前拥有 #b" + flamingFeatherCount + "#k #t" + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "#。\r\n";
    text += "现在你希望做什么呢？\r\n\r\n";

    text += "#L0##b火焰羽毛兑换点卷#k\r\n";
    text += "#L1##b购买双倍经验卡(4小时)#k\r\n";
    text += "#L2##b购买双倍爆率卡(4小时)#k\r\n";
    text += "#L3##b购买高级快乐百宝券#k\r\n";
    text += "#L4##b购买宿命剪刀#k\r\n";
    text += "#L5##b购买金锤子#k\r\n";
    text += "#L6##b购买原地复活术#k\r\n";

    cm.sendSelectLevel("ExchangeItem", text);
}

function levelExchangeItem0() {
    if (flamingFeatherCount >= 1) {
        cm.getInputNumberLevel("ExchangeCashPoint", "请输入使用火焰羽毛的数量：", 1, 1, 1000);
    } else {
        cm.sendOkLevel("Dispose", "你身上没有#r#t" + FLAMING_FEATHER + "##k#i" + FLAMING_FEATHER + "#k~")
    }
}

function levelExchangeCashPoint(inputNum) {
    let cost = inputNum;
    if (flamingFeatherCount < cost) {
        cm.sendNextLevel("ExchangeItem0", "#r#t" + FLAMING_FEATHER + "##k#i" + FLAMING_FEATHER + "#不足!")
    } else {
        cm.gainItem(FLAMING_FEATHER, -cost);
        let gainCashNum = inputNum * 100;
        cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
        cm.sendOkLevel("Dispose", "兑换成功！您已获得 #b" + gainCashNum + "#k 点卷。");
    }
}

function levelExchangeItem1() {
    cm.sendYesNoLevel("Dispose", "BuyCashItem1", "要花费" + EXP_COUPON_2X_4H_COST + "点卷购买 #b#t" + EXP_COUPON_2X_4H + "##k#i" + EXP_COUPON_2X_4H + "#吗？");
}

function levelBuyCashItem1() {
    if (cm.getItemQuantity(EXP_COUPON_2X_4H) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + EXP_COUPON_2X_4H + "##k#i" + EXP_COUPON_2X_4H + "# 了，不能重复购买。");
    } else if (currentCashPoint < EXP_COUPON_2X_4H_COST) {
        cm.sendOkLevel("Dispose", "你的点卷不够。");
    } else if (!cm.canHold(EXP_COUPON_2X_4H, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。");
    } else {
        cm.getPlayer().getCashShop().gainCash(1, -EXP_COUPON_2X_4H_COST);
        cm.gainItem(EXP_COUPON_2X_4H, 1, false, true, 14400000);
        cm.sendOkLevel("Dispose", "成功购买#b#t" + EXP_COUPON_2X_4H + "##k#i" + EXP_COUPON_2X_4H + "#");
    }
}

function levelExchangeItem2() {
    cm.sendYesNoLevel("Dispose", "BuyCashItem2", "要花费" + DROP_COUPON_2X_4H_COST + "点卷购买 #b#t" + DROP_COUPON_2X_4H + "##k#i" + DROP_COUPON_2X_4H + "#吗？");
}

function levelBuyCashItem2() {
    if (cm.getItemQuantity(DROP_COUPON_2X_4H) > 0) {
        cm.sendOkLevel("Dispose", "你身上已经有 #r#t" + DROP_COUPON_2X_4H + "##k#i" + DROP_COUPON_2X_4H + "# 了，不能重复购买。")
    } else if (currentCashPoint < DROP_COUPON_2X_4H_COST) {
        cm.sendOkLevel("Dispose", "你的点卷不够。")
    } else if (!cm.canHold(DROP_COUPON_2X_4H, 1)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。")
    } else {
        cm.getPlayer().getCashShop().gainCash(1, -DROP_COUPON_2X_4H_COST);
        cm.gainItem(DROP_COUPON_2X_4H, 1, false, true, 14400000);
        cm.sendOkLevel("Dispose", "成功购买#b#t" + DROP_COUPON_2X_4H + "##k#i" + DROP_COUPON_2X_4H + "#")
    }
}

function levelExchangeItem3() {
    let text = "每个 #b#t" + REMOTE_GACHAPON_TICKET + "##k#i" + REMOTE_GACHAPON_TICKET + "#需要 " + REMOTE_GACHAPON_TICKET_COST + "点卷。\r\n你要购买多少张？\r\n"
    cm.getInputNumberLevel("BuyCashItem3", text, 1, 1, 1000);
}

function levelBuyCashItem3(inputNum) {
    let totalCost = REMOTE_GACHAPON_TICKET_COST * inputNum;
    if (currentCashPoint < totalCost) {
        cm.sendOkLevel("Dispose", "你的点卷不够。")
    } else if (!cm.canHold(REMOTE_GACHAPON_TICKET, inputNum)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。")
    } else {
        cm.getPlayer().getCashShop().gainCash(1, -totalCost);
        cm.gainItem(REMOTE_GACHAPON_TICKET, inputNum);
        cm.sendOkLevel("Dispose", "成功购买 " + inputNum + " 张 #b#t" + REMOTE_GACHAPON_TICKET + "##k#i" + REMOTE_GACHAPON_TICKET + "#")
    }
}

function levelExchangeItem4() {
    let text = "每个 #b#t" + SCISSORS_OF_KARMA + "##k#i" + SCISSORS_OF_KARMA + "#需要 " + SCISSORS_OF_KARMA_COST + "点卷。\r\n你要购买多少个？\r\n"
    cm.getInputNumberLevel("BuyCashItem4", text, 1, 1, 1000);
}

function levelBuyCashItem4(inputNum) {
    let totalCost = SCISSORS_OF_KARMA_COST * inputNum;
    if (currentCashPoint < totalCost) {
        cm.sendOkLevel("Dispose", "你的点卷不够。")
    } else if (!cm.canHold(SCISSORS_OF_KARMA, inputNum)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。")
    } else {
        cm.getPlayer().getCashShop().gainCash(1, -totalCost);
        cm.gainItem(SCISSORS_OF_KARMA, inputNum);
        cm.sendOkLevel("Dispose", "成功购买 " + inputNum + " 个 #b#t" + SCISSORS_OF_KARMA + "##k#i" + SCISSORS_OF_KARMA + "#")
    }
}

function levelExchangeItem5() {
    let text = "每个 #b#t" + VICIOUS_HAMMER + "##k#i" + VICIOUS_HAMMER + "#需要 " + VICIOUS_HAMMER_COST + "点卷。\r\n你要购买多少个？\r\n"
    cm.getInputNumberLevel("BuyCashItem5", text, 1, 1, 1000);
}

function levelBuyCashItem5(inputNum) {
    let totalCost = VICIOUS_HAMMER_COST * inputNum;
    if (currentCashPoint < totalCost) {
        cm.sendOkLevel("Dispose", "你的点卷不够。")
    } else if (!cm.canHold(VICIOUS_HAMMER, inputNum)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。")
    } else {
        cm.getPlayer().getCashShop().gainCash(1, -totalCost);
        cm.gainItem(VICIOUS_HAMMER, inputNum);
        cm.sendOkLevel("Dispose", "成功购买 " + inputNum + " 个 #b#t" + VICIOUS_HAMMER + "##k#i" + VICIOUS_HAMMER + "#")
    }
}

function levelExchangeItem6() {
    let text = "每个 #b#t" + WHEEL_OF_DESTINY + "##k#i" + WHEEL_OF_DESTINY + "#需要 " + WHEEL_OF_DESTINY_COST + "点卷。\r\n你要购买多少个？\r\n"
    cm.getInputNumberLevel("BuyCashItem5", text, 1, 1, 1000);
}

function levelBuyCashItem6(inputNum) {
    let totalCost = WHEEL_OF_DESTINY_COST * inputNum;
    if (currentCashPoint < totalCost) {
        cm.sendOkLevel("Dispose", "你的点卷不够。")
    } else if (!cm.canHold(WHEEL_OF_DESTINY, inputNum)) {
        cm.sendOkLevel("Dispose", "请保证现金栏有空位。")
    } else {
        cm.getPlayer().getCashShop().gainCash(1, -totalCost);
        cm.gainItem(WHEEL_OF_DESTINY, inputNum);
        cm.sendOkLevel("Dispose", "成功购买 " + inputNum + " 个 #b#t" + WHEEL_OF_DESTINY + "##k#i" + WHEEL_OF_DESTINY + "#")
    }
}

function levelDispose() {
    cm.dispose();
}


