/**
 * @description 赞助中心
 * @author Geoffrey
 */
const FLAMING_FEATHER = 4001006;
const MEDAL_CODE_1 = 1142085;
const MEDAL_CODE_2 = 1142086;
const MEDAL_CODE_3 = 1142087;
const MEDAL_CODE_4 = 1142088;
const MEDAL_CODE_5 = 1142089;
const MEDAL_CODE_6 = 1142090;
const MEDAL_CODE_7 = 1142091;
const MEDAL_CODE_8 = 1142092;
const MEDAL_CODE_9 = 1142093;
const MEDAL_CODE_10 = 1142094;
const WHITE_SCROLL = 2340000;
const CHAOS_SCROLL = 2049100;

let count = 0;
let currentLevel = [0,0,0,0,0,0,0,0,0,0];
let flamingFeatherCount = 0;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    flamingFeatherCount = cm.getItemQuantity(FLAMING_FEATHER);
    let text = "这里可以充值火焰羽毛来获取特殊勋章。\r\n";
    count = Number(cm.getAccountExtendValue("角色累充数额"));
    let currentLevelStr = cm.getAccountExtendValue("角色累充已领取数额");
    if (!currentLevel) {
        currentLevel = [0,0,0,0,0,0,0,0,0,0];
    } else {
        currentLevel = currentLevelStr.split(",").map(Number);
    }
    text += "你当前已累计充值了 #b" + count + "#k #t" + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "#。\r\n";
    text += "你当前拥有 #b" + flamingFeatherCount + "#k #t" + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "#。";
    text += "现在你希望做什么呢？\r\n\r\n";

    text += "#L0##b充值火焰羽毛#k\r\n";
    text += "#L1##b领取100累充奖励#k\r\n";
    text += "#L2##b领取500累充奖励#k\r\n";
    text += "#L3##b领取1000累充奖励#k\r\n";
    text += "#L4##b领取2000累充奖励#k\r\n";
    text += "#L5##b领取5000累充奖励#k\r\n";
    text += "#L6##b领取10000累充奖励#k\r\n";
    text += "#L7##b领取15000累充奖励#k\r\n";
    text += "#L8##b领取20000累充奖励#k\r\n";
    text += "#L9##b领取25000累充奖励#k\r\n";
    text += "#L10##b领取30000累充奖励#k\r\n";

    cm.sendSelectLevel("ExchangeItem", text);
}

function levelExchangeItem0() {
    if (flamingFeatherCount >= 1) {
        cm.getInputNumberLevel("CostFlamingFeather", "请输入充值数量：", 1, 1, 9999);
    } else {
        cm.sendOkLevel("Dispose", "你身上没有#r#t" + FLAMING_FEATHER + "##k#i" + FLAMING_FEATHER + "#k~")
    }
}

function levelCostFlamingFeather(inputNum) {
    let cost = inputNum;
    if (flamingFeatherCount < cost) {
        cm.sendOkLevel("Dispose", "#r#t" + FLAMING_FEATHER + "##k#i" + FLAMING_FEATHER + "#不足!")
    } else {
        cm.gainItem(FLAMING_FEATHER, -cost);
        count += cost;
        cm.saveOrUpdateAccountExtendValue("角色累充数额", count.toString());
        cm.sendOkLevel("Dispose", "充值成功！当前累计充值 #b" + count + "#k 。")
    }
}

function levelExchangeItem1() {
    let neededCount = 100;
    let chaosCount = 4;
    if (currentLevel[0] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_1) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_1, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(CHAOS_SCROLL, chaosCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(CHAOS_SCROLL, chaosCount);
            cm.gainItem(MEDAL_CODE_1, 1);
            cm.gainMeso(5000000);
            cm.getPlayer().getCashShop().gainCash(1, 1000);

            currentLevel[0] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());

            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_1 + "##k #b#i" + MEDAL_CODE_1 + "##k\r\n";
            text += "金币 #b5000000#k\r\n";
            text += "点卷 #b1000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem2() {
    let neededCount = 500;
    let chaosCount = 8;
    if (currentLevel[1] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_2) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_2, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(CHAOS_SCROLL, chaosCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(CHAOS_SCROLL, chaosCount);
            cm.gainItem(MEDAL_CODE_2, 1);
            cm.gainMeso(10000000);
            currentLevel[1] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            cm.getPlayer().getCashShop().gainCash(1, 5000);

            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_2 + "##k #b#i" + MEDAL_CODE_2 + "##k\r\n";
            text += "金币 #b10000000#k\r\n";
            text += "点卷 #b5000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem3() {
    let neededCount = 1000;
    let chaosCount = 12;
    if (currentLevel[2] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_3) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_3, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(CHAOS_SCROLL, chaosCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(CHAOS_SCROLL, chaosCount);
            cm.gainItem(MEDAL_CODE_3, 1);
            cm.gainMeso(20000000);
            cm.getPlayer().getCashShop().gainCash(1, 10000);
            currentLevel[2] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_3 + "##k #b#i" + MEDAL_CODE_3 + "##k\r\n";
            text += "金币 #b20000000#k\r\n";
            text += "点卷 #b10000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem4() {
    let neededCount = 2000;
    let chaosCount = 16;
    if (currentLevel[3] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_4) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_4, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(CHAOS_SCROLL, chaosCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(CHAOS_SCROLL, chaosCount);
            cm.gainItem(MEDAL_CODE_4, 1);
            cm.gainMeso(40000000);
            currentLevel[3] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            cm.getPlayer().getCashShop().gainCash(1, 20000);
            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_4 + "##k #b#i" + MEDAL_CODE_4 + "##k\r\n";
            text += "金币 #b40000000#k\r\n";
            text += "点卷 #b20000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem5() {
    let neededCount = 5000;
    let chaosCount = 20;
    if (currentLevel[4] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_5) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_5, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(CHAOS_SCROLL, chaosCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(CHAOS_SCROLL, chaosCount);
            cm.gainItem(MEDAL_CODE_5, 1);
            cm.gainMeso(100000000);
            cm.getPlayer().getCashShop().gainCash(1, 50000);
            currentLevel[4] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_5 + "##k #b#i" + MEDAL_CODE_5 + "##k\r\n";
            text += "金币 #b100000000#k\r\n";
            text += "点卷 #b50000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem6() {
    let neededCount = 10000;
    let whiteScrollCount = 2;
    if (currentLevel[5] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_6) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_6, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(WHITE_SCROLL, whiteScrollCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(WHITE_SCROLL, whiteScrollCount);
            cm.gainItem(MEDAL_CODE_6, 1);
            cm.gainMeso(200000000);
            currentLevel[5] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            cm.getPlayer().getCashShop().gainCash(1, 100000);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_6 + "##k #b#i" + MEDAL_CODE_6 + "##k\r\n";
            text += "金币 #b200000000#k\r\n";
            text += "点卷 #b100000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem7() {
    let neededCount = 15000;
    let whiteScrollCount = 2;
    if (currentLevel[6] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_7) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_7, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(WHITE_SCROLL, whiteScrollCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(WHITE_SCROLL, whiteScrollCount);
            cm.gainItem(MEDAL_CODE_7, 1);
            cm.gainMeso(300000000);
            currentLevel[6] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            cm.getPlayer().getCashShop().gainCash(1, 150000);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_7 + "##k #b#i" + MEDAL_CODE_7 + "##k\r\n";
            text += "金币 #b300000000#k\r\n";
            text += "点卷 #b150000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem8() {
    let neededCount = 20000;
    let whiteScrollCount = 4;
    if (currentLevel[7] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_8) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_8, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(WHITE_SCROLL, whiteScrollCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(WHITE_SCROLL, whiteScrollCount);
            cm.gainItem(MEDAL_CODE_8, 1);
            cm.gainMeso(400000000);
            currentLevel[7] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            cm.getPlayer().getCashShop().gainCash(1, 200000);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_8 + "##k #b#i" + MEDAL_CODE_8 + "##k\r\n";
            text += "金币 #b400000000#k\r\n";
            text += "点卷 #b200000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem9() {
    let neededCount = 25000;
    let whiteScrollCount = 6;
    if (currentLevel[8] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_9) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_9, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(WHITE_SCROLL, whiteScrollCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(WHITE_SCROLL, whiteScrollCount);
            cm.gainItem(MEDAL_CODE_9, 1);
            cm.gainMeso(500000000);
            currentLevel[8] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            cm.getPlayer().getCashShop().gainCash(1, 250000);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_9 + "##k #b#i" + MEDAL_CODE_9 + "##k\r\n";
            text += "金币 #b500000000#k\r\n";
            text += "点卷 #b250000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelExchangeItem10() {
    let neededCount = 30000;
    let whiteScrollCount = 10;
    if (currentLevel[9] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (count >= neededCount) {
        if (cm.getItemQuantity(MEDAL_CODE_10) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL_CODE_10, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(WHITE_SCROLL, whiteScrollCount)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else {
            cm.gainItem(WHITE_SCROLL, whiteScrollCount);
            cm.gainItem(MEDAL_CODE_10, 1);
            cm.gainMeso(800000000);
            currentLevel[9] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            cm.getPlayer().getCashShop().gainCash(1, 300000);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_10 + "##k #b#i" + MEDAL_CODE_10 + "##k\r\n";
            text += "金币 #b800000000#k\r\n";
            text += "点卷 #b300000#k\r\n";
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelDispose() {
    cm.dispose();
}

function levelNull() {
    cm.sendOkLevel("Dispose", "该档位奖励未上线，敬请期待。")
}

