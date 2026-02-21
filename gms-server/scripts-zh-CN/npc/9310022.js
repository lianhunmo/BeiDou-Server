/**
 * @description 金猪兑换
 * 注意，所有的输入的nextLevel都是字符串类型的，不一定是数字
 * @author Geoffrey
 */

const MAPLE_LEAF = 4001126;
const GOLD_MAPLE_LEAF = 4000313;
const MESO_EXCHANGE_GOLD_MAPLE_LEAF_COST = 50000000;

let mapleLeafCount = 0;
let goldMapleLeafCount = 0;
let prePaidPointCount = 0;
let mesoCount = 0;

function start() {
    levelStart();
}

function levelStart() {
    let text = "欢迎来到金猪兑换中心！请问您想换点什么？\r\n\r\n";
    text += "#L0#用#r1片#k#t" + GOLD_MAPLE_LEAF + "# #i" + GOLD_MAPLE_LEAF + "#兑换#r1000万#k金币#i5200002##l\r\n";
    text += "#L1#用#r1片#k#t" + GOLD_MAPLE_LEAF + "# #i" + GOLD_MAPLE_LEAF + "#兑换#r1万#k抵用卷#i4031866##l\r\n";
    text += "#L2#用#r1片#k#t" + GOLD_MAPLE_LEAF + "# #i" + GOLD_MAPLE_LEAF + "#兑换#r88片#k#t" + MAPLE_LEAF + "# #i" + MAPLE_LEAF + "##l\r\n";
    text += "#L3#用#r100片#k#t" + MAPLE_LEAF + "# #i" + MAPLE_LEAF + "#兑换#r1片#k#t" + GOLD_MAPLE_LEAF + "# #i" + GOLD_MAPLE_LEAF + "##l\r\n";
    text += "#L4#用#r5000万#k金币#i5200002#兑换#r1片#k#t" + GOLD_MAPLE_LEAF + "# #i" + GOLD_MAPLE_LEAF + "##l\r\n";
    text += "#L5##r 1 ：1000 #k信用点 兑换 #r金币#i5200002##l\r\n";
    text += "#L6##r 1000 ：1 #k金币#i5200002# 兑换 #r信用点#l\r\n";
    cm.sendSelectLevel("Exchange", text);
}

function levelExchange0() {
    goldMapleLeafCount = cm.getItemQuantity(GOLD_MAPLE_LEAF);
    if (goldMapleLeafCount >= 1) {
        cm.getInputNumberLevel("ExchangeMoneyResult", "请输入兑换使用的黄金枫叶的数量：", 1, 1, 100);
    } else {
        cm.sendOk("你身上没有黄金枫叶~");
        cm.dispose();
    }
}

function levelExchangeMoneyResult(inputNum) {
    let cost = inputNum;
    let gain = inputNum * 10000000;
    if (goldMapleLeafCount < cost) {
        cm.sendLastLevel("Start", "你身上的黄金枫叶不够#r" + cost + "片#k。");
    } else {
        cm.gainItem(GOLD_MAPLE_LEAF, -cost);
        cm.getChar().gainMeso(gain)
        cm.sendLastLevel("Start", "兑换成功！你已获得了#b" + gain + "金币#k。");
    }
}

function levelExchange1() {
    goldMapleLeafCount = cm.getItemQuantity(GOLD_MAPLE_LEAF);
    if (goldMapleLeafCount >= 1) {
        cm.getInputNumberLevel("ExchangeGameCardResult", "请输入兑换使用的黄金枫叶的数量：", 1, 1, 100);
    } else {
        cm.sendOk("你身上没有黄金枫叶~");
        cm.dispose();
    }
}

function levelExchangeGameCardResult(inputNum) {
    let cost = inputNum;
    let gain = inputNum * 10000;
    if (goldMapleLeafCount < cost) {
        cm.sendLastLevel("Start", "你身上的黄金枫叶不够#r" + cost + "片#k。");
    } else {
        cm.gainItem(GOLD_MAPLE_LEAF, -cost);
        cm.getChar().getCashShop().gainCash(2, gain)
        cm.sendLastLevel("Start", "兑换成功！你已获得了#b" + gain + "抵用卷#k。");
    }
}

function levelExchange2() {
    goldMapleLeafCount = cm.getItemQuantity(GOLD_MAPLE_LEAF);
    if (goldMapleLeafCount >= 1) {
        cm.getInputNumberLevel("ExchangeMapleLeafResult", "请输入兑换使用的黄金枫叶的数量：", 1, 1, 100);
    } else {
        cm.sendOk("你身上没有黄金枫叶~");
        cm.dispose();
    }
}

function levelExchangeMapleLeafResult(inputNum) {
    let cost = inputNum;
    let gain = inputNum * 88;
    if (goldMapleLeafCount < cost) {
        cm.sendLastLevel("Start", "你身上的黄金枫叶不够#r" + cost + "片#k。");
    } else {
        if (cm.canHold(MAPLE_LEAF, gain)) {
            cm.gainItem(GOLD_MAPLE_LEAF, -cost);
            cm.gainItem(MAPLE_LEAF, gain);
            cm.sendLastLevel("Start", "兑换成功！你已获得了#b" + gain + "片#k枫叶。");
        } else {
            cm.sendOk("背包空间不足!");
            cm.dispose();
        }
    }
}

function levelExchange3() {
    mapleLeafCount = cm.getItemQuantity(MAPLE_LEAF);
    if (mapleLeafCount >= 1) {
        cm.getInputNumberLevel("ExchangeGoldMapleLeafResult", "请输入希望获得的黄金枫叶的数量：", 1, 1, 100);
    } else {
        cm.sendOk("你身上没有枫叶~");
        cm.dispose();
    }
}

function levelExchangeGoldMapleLeafResult(inputNum) {
    let cost = inputNum * 100;
    let gain = inputNum;
    if (mapleLeafCount < cost) {
        cm.sendLastLevel("Start", "你身上的枫叶不够#r" + cost + "#k片。");
    } else {
        if (cm.canHold(GOLD_MAPLE_LEAF, gain)) {
            cm.gainItem(MAPLE_LEAF, -cost);
            cm.gainItem(GOLD_MAPLE_LEAF, gain);
            cm.sendLastLevel("Start", "兑换成功！你已获得了#b" + gain + "片#k黄金枫叶。");
        } else {
            cm.sendOk("背包空间不足!");
            cm.dispose();
        }
    }
}

function levelExchange4() {
    if (cm.getMeso() > MESO_EXCHANGE_GOLD_MAPLE_LEAF_COST) {
        cm.getInputNumberLevel("MesoExchangeGoldMapleLeafResult", "请输入希望获得的黄金枫叶的数量：", 1, 1, 100);
    } else {
        cm.sendOk("你身上没有#r" + MESO_EXCHANGE_GOLD_MAPLE_LEAF_COST / 10000 + "万#k 金币~");
        cm.dispose();
    }
}

function levelMesoExchangeGoldMapleLeafResult(inputNum) {
    let cost = inputNum * MESO_EXCHANGE_GOLD_MAPLE_LEAF_COST;
    let gain = inputNum;
    if (cm.getMeso() < cost) {
        cm.sendLastLevel("Start", "你身上的金币不够 #r" + cost / 10000 + "万#k。");
    } else {
        if (cm.canHold(GOLD_MAPLE_LEAF, gain)) {
            cm.gainMeso(-cost);
            cm.gainItem(GOLD_MAPLE_LEAF, gain);
            cm.sendLastLevel("Start", "兑换成功！你已获得了#b" + gain + "片#k黄金枫叶。");
        } else {
            cm.sendOk("背包空间不足!");
            cm.dispose();
        }
    }
}

function levelExchange5() {
    prePaidPointCount = cm.getChar().getCashShop().getCash(4);
    if (prePaidPointCount >= 1) {
        cm.getInputNumberLevel("PrePaidExchangeMoneyResult", "请输入兑换使用的信用点数量：", 1, 1, 1000000);
    } else {
        cm.sendOk("你没有信用点~");
        cm.dispose();
    }
}

function levelPrePaidExchangeMoneyResult(inputNum) {
    let cost = inputNum;
    let gain = inputNum * 1000;
    if (prePaidPointCount < cost) {
        cm.sendLastLevel("Start", "你的信用点不够#r " + cost + " #k。");
    } else {
        cm.getChar().getCashShop().gainCash(4, -cost);
        cm.getChar().gainMeso(gain)
        cm.sendLastLevel("Start", "兑换成功！你已获得了#b" + gain + "金币#k。");
    }
}

function levelExchange6() {
    mesoCount = cm.getMeso();
    if (mesoCount >= 1000) {
        cm.getInputNumberLevel("MoneyExchangePrePaidResult", "请输入希望获得的信用点数量：", 1, 1, 1000000);
    } else {
        cm.sendOk("你身上没有1000金币~");
        cm.dispose();
    }
}

function levelMoneyExchangePrePaidResult(inputNum) {
    let cost = inputNum * 1000;
    let gain = inputNum;
    if (mesoCount < cost) {
        cm.sendLastLevel("Start", "你身上的金币不够#r" + cost + "#k。");
    } else {
        cm.getChar().gainMeso(-cost)
        cm.getChar().getCashShop().gainCash(4, gain);
        cm.sendLastLevel("Start", "兑换成功！你已获得了#b" + gain + "信用点#k。");
    }
}

function levelDispose() {
    cm.dispose();
}

function levelnull() {
    cm.dispose();
}
