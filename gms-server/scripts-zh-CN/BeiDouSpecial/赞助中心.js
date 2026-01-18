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

const LEVEL_NEED = [100,500,1000,2000,5000,10000,15000,20000,25000,30000];

let count = 0;
let neededCount = 99999;
let currentLevel = [0,0,0,0,0,0,0,0,0,0];
let flamingFeatherCount = 0;
let whiteScrollCount = 0;
let chaosCount = 0;


function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    flamingFeatherCount = cm.getItemQuantity(FLAMING_FEATHER);
    let text = "这里可以充值火焰羽毛来获取特殊奖励。\r\n";
    count = Number(cm.getAccountExtendValue("角色累充数额"));
    let currentLevelStr = cm.getAccountExtendValue("角色累充已领取数额");
    if (currentLevel) {
        currentLevel = currentLevelStr.split(",").map(Number);
    } else {
        currentLevel = [0,0,0,0,0,0,0,0,0,0];
    }
    text += "你当前已累计充值了 #b" + count + "#k #t" + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "#。\r\n";
    text += "你当前拥有 #b" + flamingFeatherCount + "#k #t" + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "#。\r\n";
    text += "现在你希望做什么呢？\r\n\r\n";

    text += `\t#L0##b充值火焰羽毛#k#l\r\n`;
    text += getRewardListText();

    cm.sendSelectLevel("ExchangeItem", text);
}

function getRewardListText() {
    let listtext = [];
    let CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
    let CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
    let CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";
    let text = "";
    for (let i = 0; i < currentLevel.length; i++) {
        const isReceived = currentLevel[i] === 1;  // 精确检查每一位
        const isClaimable = LEVEL_NEED[i] <= count;
        let levelIndex = i + 1;

        if (!isReceived) {
            listtext.push(1);
            if (isClaimable) {
                text += `\r\n#L` + levelIndex + `##b${CheckBox_0}领取` + LEVEL_NEED[i] + `累充奖励#k#l`;
            } else {
                text += `\r\n#L` + levelIndex + `##r${CheckBox_2}查看` + LEVEL_NEED[i] + `累充奖励#k#l`;
            }
        } else {
            if (i > 0 && listtext[i-1] === 1) text += "\r\n";
            text += `\r\n\t  ${CheckBox_1}已领` + LEVEL_NEED[i] + `累充奖励`;
            listtext.push(0);
        }
    }
    return text;
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
    neededCount = LEVEL_NEED[0];
    chaosCount = 4;
    let text = "本阶段可领取：";
    text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_1 + "##k #b#i" + MEDAL_CODE_1 + "##k\r\n";
    text += "金币 #b5000000#k\r\n";
    text += "点卷 #b1000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward1", text);
    }
}

function levelExchangeItem2() {
    neededCount = LEVEL_NEED[1];
    chaosCount = 8;
    let text = "本阶段可领取：";
    text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_2 + "##k #b#i" + MEDAL_CODE_2 + "##k\r\n";
    text += "金币 #b10000000#k\r\n";
    text += "点卷 #b5000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward2", text);
    }
}

function levelExchangeItem3() {
    neededCount = LEVEL_NEED[2];
    chaosCount = 12;
    let text = "本阶段可领取：";
    text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_3 + "##k #b#i" + MEDAL_CODE_3 + "##k\r\n";
    text += "金币 #b20000000#k\r\n";
    text += "点卷 #b10000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward3", text);
    }
}

function levelExchangeItem4() {
    neededCount = LEVEL_NEED[3];
    chaosCount = 16;
    let text = "本阶段可领取：";
    text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_4 + "##k #b#i" + MEDAL_CODE_4 + "##k\r\n";
    text += "金币 #b40000000#k\r\n";
    text += "点卷 #b20000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward4", text);
    }
}

function levelExchangeItem5() {
    neededCount = LEVEL_NEED[4];
    chaosCount = 20;
    let text = "本阶段可领取：";
    text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_5 + "##k #b#i" + MEDAL_CODE_5 + "##k\r\n";
    text += "金币 #b100000000#k\r\n";
    text += "点卷 #b50000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward5", text);
    }
}

function levelExchangeItem6() {
    neededCount = LEVEL_NEED[5];
    whiteScrollCount = 2;
    let text = "本阶段可领取：";
    text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_6 + "##k #b#i" + MEDAL_CODE_6 + "##k\r\n";
    text += "金币 #b200000000#k\r\n";
    text += "点卷 #b100000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward6", text);
    }
}

function levelExchangeItem7() {
    neededCount = LEVEL_NEED[6];
    whiteScrollCount = 2;
    let text = "本阶段可领取：";
    text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_7 + "##k #b#i" + MEDAL_CODE_7 + "##k\r\n";
    text += "金币 #b300000000#k\r\n";
    text += "点卷 #b150000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward7", text);
    }
}

function levelExchangeItem8() {
    neededCount = LEVEL_NEED[7];
    whiteScrollCount = 4;
    let text = "本阶段可领取：";
    text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_8 + "##k #b#i" + MEDAL_CODE_8 + "##k\r\n";
    text += "金币 #b400000000#k\r\n";
    text += "点卷 #b200000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward8", text);
    }
}

function levelExchangeItem9() {
    neededCount = LEVEL_NEED[8];
    whiteScrollCount = 6;
    let text = "本阶段可领取：";
    text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_9 + "##k #b#i" + MEDAL_CODE_9 + "##k\r\n";
    text += "金币 #b500000000#k\r\n";
    text += "点卷 #b250000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward9", text);
    }
}

function levelExchangeItem10() {
    neededCount = LEVEL_NEED[9];
    whiteScrollCount = 10;
    let text = "本阶段可领取：";
    text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
    text += "#b#t" + MEDAL_CODE_10 + "##k #b#i" + MEDAL_CODE_10 + "##k\r\n";
    text += "金币 #b800000000#k\r\n";
    text += "点卷 #b300000#k\r\n";

    if (neededCount > count) {
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？"
        cm.sendYesNoLevel("Dispose", "GainReward10", text);
    }
}

function levelGainReward1() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);

            currentLevel[0] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());

            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_1 + "##k #b#i" + MEDAL_CODE_1 + "##k\r\n";
            text += "金币 #b5000000#k\r\n";
            text += "点卷 #b1000#k\r\n";
            cm.dropMessage(0,`你已成功领取了100累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward2() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);

            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_2 + "##k #b#i" + MEDAL_CODE_2 + "##k\r\n";
            text += "金币 #b10000000#k\r\n";
            text += "点卷 #b5000#k\r\n";
            cm.dropMessage(0,`你已成功领取了500累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward3() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            currentLevel[2] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_3 + "##k #b#i" + MEDAL_CODE_3 + "##k\r\n";
            text += "金币 #b20000000#k\r\n";
            text += "点卷 #b10000#k\r\n";
            cm.dropMessage(0,`你已成功领取了1000累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward4() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_4 + "##k #b#i" + MEDAL_CODE_4 + "##k\r\n";
            text += "金币 #b40000000#k\r\n";
            text += "点卷 #b20000#k\r\n";
            cm.dropMessage(0,`你已成功领取了2000累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward5() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            currentLevel[4] = 1;
            cm.saveOrUpdateAccountExtendValue("角色累充已领取数额", currentLevel.toString());
            let text = "恭喜你已领取：\r\n";
            text += chaosCount+"张 #b#t" + CHAOS_SCROLL + "##k #b#i" + CHAOS_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_5 + "##k #b#i" + MEDAL_CODE_5 + "##k\r\n";
            text += "金币 #b100000000#k\r\n";
            text += "点卷 #b50000#k\r\n";
            cm.dropMessage(0,`你已成功领取了5000累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward6() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_6 + "##k #b#i" + MEDAL_CODE_6 + "##k\r\n";
            text += "金币 #b200000000#k\r\n";
            text += "点卷 #b100000#k\r\n";
            cm.dropMessage(0,`你已成功领取了10000累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward7() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_7 + "##k #b#i" + MEDAL_CODE_7 + "##k\r\n";
            text += "金币 #b300000000#k\r\n";
            text += "点卷 #b150000#k\r\n";
            cm.dropMessage(0,`你已成功领取了15000累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward8() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_8 + "##k #b#i" + MEDAL_CODE_8 + "##k\r\n";
            text += "金币 #b400000000#k\r\n";
            text += "点卷 #b200000#k\r\n";
            cm.dropMessage(0,`你已成功领取了20000累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward9() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_9 + "##k #b#i" + MEDAL_CODE_9 + "##k\r\n";
            text += "金币 #b500000000#k\r\n";
            text += "点卷 #b250000#k\r\n";
            cm.dropMessage(0,`你已成功领取了25000累充奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你累计充值的数额不够 #r" + neededCount + "#k !")
    }
}

function levelGainReward10() {
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
            let gainCashNum = neededCount * 100;
            cm.getPlayer().getCashShop().gainCash(1, gainCashNum);
            let text = "恭喜你已领取：\r\n";
            text += whiteScrollCount+"张 #b#t" + WHITE_SCROLL + "##k #b#i" + WHITE_SCROLL + "##k\r\n";
            text += "#b#t" + MEDAL_CODE_10 + "##k #b#i" + MEDAL_CODE_10 + "##k\r\n";
            text += "金币 #b800000000#k\r\n";
            text += "点卷 #b300000#k\r\n";
            cm.dropMessage(0,`你已成功领取了30000累充奖励！`);
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

