/**
 * @description 新人福利
 * @author Geoffrey
 */
const BEGINNER_ADVENTURER_MEDAL = 1142107;
const JUNIOR_ADVENTURER_MEDAL = 1142108;
const VETERAN_ADVENTURER_MEDAL = 1142109;
const MASTER_ADVENTURER_MEDAL = 1142110;
const AP_RESET_SCROLL = 5050000;
const VIP_TELEPORT_ROCK = 5041000;
const ICE_CREAM_POP = 2001001;
const RED_BEAN_SUNDAE = 2001002;
const REMOTE_GACHAPON_TICKET = 5451000;
const GOLD_MAPLE_LEAF = 4000313;

const LEVEL_NEED = [8,30,70,120];
let currentLevel = 0;
let rewardAlreadyGain = [0,0,0,0]
let neededLevel = 250;

function start() {
    levelStart();
}

function levelStart() {
    currentLevel = cm.getLevel();
    let text = "这里可以领取新手奖励。\r\n";
    text += "#r(注：每个账号只能领取一次，请谨慎领取。)#k\r\n";
    rewardAlreadyGainStr = cm.getAccountExtendValue("账号新人奖励领取");
    if (rewardAlreadyGainStr) {
        rewardAlreadyGain = rewardAlreadyGainStr.split(",").map(Number);
    } else {
        vrewardAlreadyGain = [0,0,0,0];
    }
    text += getRewardListText();
    cm.sendSelectLevel("ConfirmReward", text);
}

function getRewardListText() {
    let listtext = [];
    let CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
    let CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
    let CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";
    let text = "";
    for (let i = 0; i < LEVEL_NEED.length; i++) {
        const isReceived = rewardAlreadyGain[i] === 1;  // 精确检查每一位
        const isClaimable = LEVEL_NEED[i] <= currentLevel;
        let levelIndex = i;
        if (!isReceived) {
            listtext.push(1);
            if (isClaimable) {
                text += `\r\n#L` + levelIndex + `##b${CheckBox_0}领取` + LEVEL_NEED[i] + `级奖励#k#l`;
            } else {
                text += `\r\n#L` + levelIndex + `##r${CheckBox_2}查看` + LEVEL_NEED[i] + `级奖励#k#l`;
            }
        } else {
            if (i > 0 && listtext[i-1] === 1) text += "\r\n";
            text += `\r\n\t  ${CheckBox_1}已领` + LEVEL_NEED[i] + `级奖励`;
            listtext.push(0);
        }
    }
    return text;
}

function levelConfirmReward0() {
    neededLevel = LEVEL_NEED[0];
    let text = "本阶段可领取：";
    text += "#b#t" + BEGINNER_ADVENTURER_MEDAL + "##k #b#i" + BEGINNER_ADVENTURER_MEDAL + "##k\r\n";
    text += "#b 20 张#t" + AP_RESET_SCROLL + "##k #b#i" + AP_RESET_SCROLL + "##k\r\n";
    text += "金币 #b50000#k\r\n";
    text += "抵用券 #b10000#k\r\n";

    if (neededLevel > currentLevel) {
        text += "请 #r" + neededLevel + "#k 级再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        text += "#r(注：每个账号只能领取一次，请谨慎领取。)#k\r\n";
        cm.sendYesNoLevel("Dispose", "GainLevelReward0", text);
    }

}

function levelGainLevelReward0() {
    if (rewardAlreadyGain[0] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (neededLevel <= currentLevel) {
        if (cm.getItemQuantity(BEGINNER_ADVENTURER_MEDAL) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(BEGINNER_ADVENTURER_MEDAL, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(AP_RESET_SCROLL, 20)) {
            cm.sendOkLevel("Dispose", "请确保现金栏拥有空间。")
        } else {
            cm.gainItem(BEGINNER_ADVENTURER_MEDAL, 1);
            cm.gainItem(AP_RESET_SCROLL, 20);
            cm.gainMeso(50000);
            cm.getPlayer().getCashShop().gainCash(2, 10000);

            rewardAlreadyGain[0] = 1;
            cm.saveOrUpdateAccountExtendValue("账号新人奖励领取", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#t" + BEGINNER_ADVENTURER_MEDAL + "##k #b#i" + BEGINNER_ADVENTURER_MEDAL + "##k\r\n";
            text += "#b 20张 #t" + AP_RESET_SCROLL + "##k #b#i" + AP_RESET_SCROLL + "##k\r\n";
            text += "金币 #b50000#k\r\n";
            text += "抵用券 #b10000#k\r\n";
            cm.dropMessage(0,"你已成功领取了 "+ neededLevel +" 级奖励！");
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你的等级不够 #r" + neededLevel + "#k 级!")
    }
}

function levelConfirmReward1() {
    neededLevel = LEVEL_NEED[1];
    let text = "本阶段可领取：";
    text += "#b#t" + JUNIOR_ADVENTURER_MEDAL + "##k #b#i" + JUNIOR_ADVENTURER_MEDAL + "##k\r\n";
    text += "#b 10颗 #t" + VIP_TELEPORT_ROCK + "##k #b#i" + VIP_TELEPORT_ROCK + "##k\r\n";

    if (neededLevel > currentLevel) {
        text += "请 #r" + neededLevel + "#k 级再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        text += "#r(注：每个账号只能领取一次，请谨慎领取。)#k\r\n";
        cm.sendYesNoLevel("Dispose", "GainLevelReward1", text);
    }

}

function levelGainLevelReward1() {
    if (rewardAlreadyGain[1] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (neededLevel <= currentLevel) {
        if (cm.getItemQuantity(JUNIOR_ADVENTURER_MEDAL) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(JUNIOR_ADVENTURER_MEDAL, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        }else if (!cm.canHold(VIP_TELEPORT_ROCK, 10)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(JUNIOR_ADVENTURER_MEDAL, 1);
            cm.gainItem(VIP_TELEPORT_ROCK, 10);

            rewardAlreadyGain[1] = 1;
            cm.saveOrUpdateAccountExtendValue("账号新人奖励领取", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#t" + JUNIOR_ADVENTURER_MEDAL + "##k #b#i" + JUNIOR_ADVENTURER_MEDAL + "##k\r\n";
            text += "#b 10颗 #t" + VIP_TELEPORT_ROCK + "##k #b#i" + VIP_TELEPORT_ROCK + "##k\r\n";
            cm.dropMessage(0,`你已成功领取了`+ neededLevel +`级奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你的等级不够 #r" + neededLevel + "#k 级!")
    }
}

function levelConfirmReward2() {
    neededLevel = LEVEL_NEED[2];
    let text = "本阶段可领取：";
    text += "#b#t" + VETERAN_ADVENTURER_MEDAL + "##k #b#i" + VETERAN_ADVENTURER_MEDAL + "##k\r\n";
    text += "#b 1000份 #t" + ICE_CREAM_POP + "##k #b#i" + ICE_CREAM_POP + "##k\r\n";
    text += "#b 1000份 #t" + RED_BEAN_SUNDAE + "##k #b#i" + RED_BEAN_SUNDAE + "##k\r\n";

    if (neededLevel > currentLevel) {
        text += "请 #r" + neededLevel + "#k 级再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        text += "#r(注：请保证背包有足够的空位，空间不足导致奖励丢失不补。每个账号只能领取一次，请谨慎领取。)#k\r\n";
        cm.sendYesNoLevel("Dispose", "GainLevelReward2", text);
    }

}

function levelGainLevelReward2() {
    if (rewardAlreadyGain[2] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (neededLevel <= currentLevel) {
        if (cm.getItemQuantity(VETERAN_ADVENTURER_MEDAL) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(VETERAN_ADVENTURER_MEDAL, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(ICE_CREAM_POP, 1000)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有两个以上空间。")
        } else if (!cm.canHold(RED_BEAN_SUNDAE, 1000)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有两个以上空间。")
        } else {
            cm.gainItem(VETERAN_ADVENTURER_MEDAL, 1);
            cm.gainItem(ICE_CREAM_POP, 1000);
            cm.gainItem(RED_BEAN_SUNDAE, 1000);

            rewardAlreadyGain[2] = 1;
            cm.saveOrUpdateAccountExtendValue("账号新人奖励领取", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#t" + VETERAN_ADVENTURER_MEDAL + "##k #b#i" + VETERAN_ADVENTURER_MEDAL + "##k\r\n";
            text += "#b 1000份 #t" + ICE_CREAM_POP + "##k #b#i" + ICE_CREAM_POP + "##k\r\n";
            text += "#b 1000份 #t" + RED_BEAN_SUNDAE + "##k #b#i" + RED_BEAN_SUNDAE + "##k\r\n";
            cm.dropMessage(0,`你已成功领取了`+ neededLevel +`级奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你的等级不够 #r" + neededLevel + "#k 级!")
    }
}

function levelConfirmReward3() {
    neededLevel = LEVEL_NEED[3];
    let text = "本阶段可领取：";
    text += "#b#t" + MASTER_ADVENTURER_MEDAL + "##k #b#i" + MASTER_ADVENTURER_MEDAL + "##k\r\n";
    text += "#b 10张 #t" + REMOTE_GACHAPON_TICKET + "##k #b#i" + REMOTE_GACHAPON_TICKET + "##k\r\n";
    text += "#b 10片 #t" + GOLD_MAPLE_LEAF + "##k #b#i" + GOLD_MAPLE_LEAF + "##k\r\n";

    if (neededLevel > currentLevel) {
        text += "请 #r" + neededLevel + "#k 级再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        text += "#r(注：请保证背包有足够的空位，空间不足导致奖励丢失不补。每个账号只能领取一次，请谨慎领取。)#k\r\n";
        cm.sendYesNoLevel("Dispose", "GainLevelReward3", text);
    }

}

function levelGainLevelReward3() {
    if (rewardAlreadyGain[3] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (neededLevel <= currentLevel) {
        if (cm.getItemQuantity(MASTER_ADVENTURER_MEDAL) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MASTER_ADVENTURER_MEDAL, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else if (!cm.canHold(REMOTE_GACHAPON_TICKET, 10)) {
            cm.sendOkLevel("Dispose", "请确保消耗栏拥有空间。")
        } else if (!cm.canHold(GOLD_MAPLE_LEAF, 10)) {
            cm.sendOkLevel("Dispose", "请确保其他栏拥有空间。")
        } else {
            cm.gainItem(MASTER_ADVENTURER_MEDAL, 1);
            cm.gainItem(REMOTE_GACHAPON_TICKET, 10);
            cm.gainItem(GOLD_MAPLE_LEAF, 10);

            rewardAlreadyGain[3] = 1;
            cm.saveOrUpdateAccountExtendValue("账号新人奖励领取", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#t" + MASTER_ADVENTURER_MEDAL + "##k #b#i" + MASTER_ADVENTURER_MEDAL + "##k\r\n";
            text += "#b 10张 #t" + REMOTE_GACHAPON_TICKET + "##k #b#i" + REMOTE_GACHAPON_TICKET + "##k\r\n";
            text += "#b 10片 #t" + GOLD_MAPLE_LEAF + "##k #b#i" + GOLD_MAPLE_LEAF + "##k\r\n";
            cm.dropMessage(0,`你已成功领取了`+ neededLevel +`级奖励！`);
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "你的等级不够 #r" + neededLevel + "#k 级!")
    }
}

function levelDispose() {
    cm.dispose();
}

function levelnull() {
    cm.dispose();
}


