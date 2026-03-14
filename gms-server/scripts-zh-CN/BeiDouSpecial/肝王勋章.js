/**
 * @description 肝王勋章
 * @author Geoffrey
 */
const MEDAL0 = 1142014;
const MEDAL1 = 1142015;
const MEDAL2 = 1142016;
const MEDAL3 = 1142017;
const MEDAL4 = 1142018;
const MEDAL5 = 1142019;
const MEDAL6 = 1142020;

const LEVEL_NEED = [1000,200,300,300,300,300,300];
const REWARD_NAME_LIST = ["初入肝路勋章","铁肝试炼者勋章","睡眠参数篡改者勋章","肾上腺素常驻民勋章","时间管理大师勋章","生物节律征服者勋章","不朽传说·赛博磐石勋章"];
const QUEST_NAME_LIST = ["月秒组队副本","废弃组队副本","玩具组队副本","天空组队副本","海盗组队副本","毒雾组队副本","罗密欧与朱丽叶"];
let currentCompletedQuestCount = [0,0,0,0,0,0,0];
let rewardAlreadyGain = [0,0,0,0,0,0,0]

function start() {
    levelStart();
}

function levelStart() {
    let HenesysCount = cm.getCharacterExtendValue("月秒组队副本累计通关次数");
    let KerningCount = cm.getCharacterExtendValue("废弃组队副本累计通关次数");
    let LudibriumCount = cm.getCharacterExtendValue("玩具组队副本累计通关次数");
    let OrbisCount = cm.getCharacterExtendValue("天空组队副本累计通关次数");
    let PirateCount = cm.getCharacterExtendValue("海盗组队副本累计通关次数");
    let EllinCount = cm.getCharacterExtendValue("毒雾组队副本累计通关次数");
    let MagatiaCount = cm.getCharacterExtendValue("罗密欧与朱丽叶组队副本累计通关次数");
    currentCompletedQuestCount = [Number(HenesysCount), Number(KerningCount), Number(LudibriumCount),
        Number(OrbisCount), Number(PirateCount), Number(EllinCount), Number(MagatiaCount)];

    let text = "这里可以领取肝王勋章。\r\n";
    text += "每个阶段领取奖励都需要完成上个阶段任务。\r\n";
    text += "你当前已完成：\r\n";
    text += getCurrentProgressText();
    rewardAlreadyGainStr = cm.getCharacterExtendValue("肝王勋章领取记录");
    if (rewardAlreadyGainStr) {
        rewardAlreadyGain = rewardAlreadyGainStr.split(",").map(Number);
    } else {
        vrewardAlreadyGain = [0,0,0,0,0,0,0];
    }

    text += getRewardListText();
    cm.sendSelectLevel("ConfirmReward", text);
}

function getCurrentProgressText() {
    let text = "";
    for (let i = 0; i < QUEST_NAME_LIST.length; i++) {
        text += QUEST_NAME_LIST[i] + "：#b"+currentCompletedQuestCount[i]+"#k 次\r\n";
    }
    return text;
}
function getRewardListText() {
    let listtext = [];
    let CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
    let CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
    let CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";
    let text = "";
    for (let i = 0; i < LEVEL_NEED.length; i++) {
        const isReceived = rewardAlreadyGain[i] === 1;  // 精确检查每一位
        const isClaimable = LEVEL_NEED[i] <= currentCompletedQuestCount[i];
        let levelIndex = i;
        if (!isReceived) {
            listtext.push(1);
            if (isClaimable) {
                text += `\r\n#L` + levelIndex + `##b${CheckBox_0}领取` + REWARD_NAME_LIST[i] + `奖励#k#l`;
            } else {
                text += `\r\n#L` + levelIndex + `##r${CheckBox_2}查看` + REWARD_NAME_LIST[i] + `奖励#k#l`;
            }
        } else {
            if (i > 0 && listtext[i-1] === 1) text += "\r\n";
            text += `\r\n\t  ${CheckBox_1}已领取` + REWARD_NAME_LIST[i] + `奖励`;
            listtext.push(0);
        }
    }
    return text;
}

function levelConfirmReward0() {
    let text = "本阶段可领取：";
    text += "#b#z" + MEDAL0 + "##k #b#i" + MEDAL0 + "##k\r\n";

    if (LEVEL_NEED[0] > currentCompletedQuestCount[0]) {
        text += "请完成 "+QUEST_NAME_LIST[0]+" #r" + LEVEL_NEED[0] + "#k 次再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        cm.sendYesNoLevel("Dispose", "GainLevelReward0", text);
    }
}

function levelGainLevelReward0() {
    if (rewardAlreadyGain[0] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (LEVEL_NEED[0] <= currentCompletedQuestCount[0]) {
        if (cm.getItemQuantity(MEDAL0) > 0) {
            cm.sendOkLevel("Dispose", "你已领取过该奖励。")
        } else if (!cm.canHold(MEDAL0, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(MEDAL0, 1);

            rewardAlreadyGain[0] = 1;
            cm.saveOrUpdateCharacterExtendValue("肝王勋章领取记录", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#z" + MEDAL0 + "##k #b#i" + MEDAL0 + "##k\r\n";
            cm.dropMessage(0,"你成功领取了"+REWARD_NAME_LIST[0]+"！");
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "请完成 "+QUEST_NAME_LIST[0]+" #r" + LEVEL_NEED[0] + "#k 次再来领取吧！")
    }
}

function levelConfirmReward1() {
    let text = "本阶段可领取：";
    text += "#b#z" + MEDAL1 + "##k #b#i" + MEDAL1 + "##k\r\n";

    if (LEVEL_NEED[1] > currentCompletedQuestCount[1]) {
        text += "请完成 "+QUEST_NAME_LIST[1]+" #r" + LEVEL_NEED[1] + "#k 次再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        cm.sendYesNoLevel("Dispose", "GainLevelReward1", text);
    }
}

function levelGainLevelReward1() {
    if (rewardAlreadyGain[1] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (LEVEL_NEED[1] <= currentCompletedQuestCount[1]) {
        if (rewardAlreadyGain[0] < 1) {
            cm.sendOkLevel("Dispose", "#r你还没完成上个阶段任务！#k")
        } else if (!cm.canHold(MEDAL1, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(MEDAL1, 1);

            rewardAlreadyGain[1] = 1;
            cm.saveOrUpdateCharacterExtendValue("肝王勋章领取记录", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#z" + MEDAL1 + "##k #b#i" + MEDAL1 + "##k\r\n";
            cm.dropMessage(0,"你成功领取了"+REWARD_NAME_LIST[1]+"！");
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "请完成 "+QUEST_NAME_LIST[1]+" #r" + LEVEL_NEED[1] + "#k 次再来领取吧！")
    }
}

function levelConfirmReward2() {
    let text = "本阶段可领取：";
    text += "#b#z" + MEDAL2 + "##k #b#i" + MEDAL2 + "##k\r\n";

    if (LEVEL_NEED[2] > currentCompletedQuestCount[2]) {
        text += "请完成 "+QUEST_NAME_LIST[2]+" #r" + LEVEL_NEED[2] + "#k 次再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        cm.sendYesNoLevel("Dispose", "GainLevelReward2", text);
    }
}

function levelGainLevelReward2() {
    if (rewardAlreadyGain[2] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (LEVEL_NEED[2] <= currentCompletedQuestCount[2]) {
        if (rewardAlreadyGain[1] < 1) {
            cm.sendOkLevel("Dispose", "#r你还没完成上个阶段任务！#k")
        } else if (!cm.canHold(MEDAL2, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(MEDAL2, 1);

            rewardAlreadyGain[2] = 1;
            cm.saveOrUpdateCharacterExtendValue("肝王勋章领取记录", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#z" + MEDAL2 + "##k #b#i" + MEDAL2 + "##k\r\n";
            cm.dropMessage(0,"你成功领取了"+REWARD_NAME_LIST[2]+"！");
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "请完成 "+QUEST_NAME_LIST[2]+" #r" + LEVEL_NEED[2] + "#k 次再来领取吧！")
    }
}


function levelConfirmReward3() {
    let text = "本阶段可领取：";
    text += "#b#z" + MEDAL3 + "##k #b#i" + MEDAL3 + "##k\r\n";

    if (LEVEL_NEED[3] > currentCompletedQuestCount[3]) {
        text += "请完成 "+QUEST_NAME_LIST[3]+" #r" + LEVEL_NEED[3] + "#k 次再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        cm.sendYesNoLevel("Dispose", "GainLevelReward3", text);
    }
}

function levelGainLevelReward3() {
    if (rewardAlreadyGain[3] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (LEVEL_NEED[3] <= currentCompletedQuestCount[3]) {
        if (rewardAlreadyGain[2] < 1) {
            cm.sendOkLevel("Dispose", "#r你还没完成上个阶段任务！#k")
        } else if (!cm.canHold(MEDAL3, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(MEDAL3, 1);

            rewardAlreadyGain[3] = 1;
            cm.saveOrUpdateCharacterExtendValue("肝王勋章领取记录", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#z" + MEDAL3 + "##k #b#i" + MEDAL3 + "##k\r\n";
            cm.dropMessage(0,"你成功领取了"+REWARD_NAME_LIST[3]+"！");
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "请完成 "+QUEST_NAME_LIST[3]+" #r" + LEVEL_NEED[3] + "#k 次再来领取吧！")
    }
}


function levelConfirmReward4() {
    let text = "本阶段可领取：";
    text += "#b#z" + MEDAL4 + "##k #b#i" + MEDAL4 + "##k\r\n";

    if (LEVEL_NEED[4] > currentCompletedQuestCount[4]) {
        text += "请完成 "+QUEST_NAME_LIST[4]+" #r" + LEVEL_NEED[4] + "#k 次再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        cm.sendYesNoLevel("Dispose", "GainLevelReward4", text);
    }
}

function levelGainLevelReward4() {
    if (rewardAlreadyGain[4] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (LEVEL_NEED[4] <= currentCompletedQuestCount[4]) {
        if (rewardAlreadyGain[3] < 1) {
            cm.sendOkLevel("Dispose", "#r你还没完成上个阶段任务！#k")
        } else if (!cm.canHold(MEDAL4, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(MEDAL4, 1);

            rewardAlreadyGain[4] = 1;
            cm.saveOrUpdateCharacterExtendValue("肝王勋章领取记录", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#z" + MEDAL4 + "##k #b#i" + MEDAL4 + "##k\r\n";
            cm.dropMessage(0,"你成功领取了"+REWARD_NAME_LIST[4]+"！");
            cm.sendOkLevel("Dispose", text);
        }
    } else {
        cm.sendOkLevel("Dispose", "请完成 "+QUEST_NAME_LIST[4]+" #r" + LEVEL_NEED[4] + "#k 次再来领取吧！")
    }
}


function levelConfirmReward5() {
    let text = "本阶段可领取：";
    text += "#b#z" + MEDAL5 + "##k #b#i" + MEDAL5 + "##k\r\n";

    if (LEVEL_NEED[5] > currentCompletedQuestCount[5]) {
        text += "请完成 "+QUEST_NAME_LIST[5]+" #r" + LEVEL_NEED[5] + "#k 次再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        cm.sendYesNoLevel("Dispose", "GainLevelReward5", text);
    }
}

function levelGainLevelReward5() {
    if (rewardAlreadyGain[5] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (LEVEL_NEED[5] <= currentCompletedQuestCount[5]) {
        if (rewardAlreadyGain[4] < 1) {
            cm.sendOkLevel("Dispose", "#r你还没完成上个阶段任务！#k")
        } else if (!cm.canHold(MEDAL5, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(MEDAL5, 1);

            rewardAlreadyGain[5] = 1;
            cm.saveOrUpdateCharacterExtendValue("肝王勋章领取记录", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#z" + MEDAL5 + "##k #b#i" + MEDAL5 + "##k\r\n";
            cm.dropMessage(0,"你成功领取了"+REWARD_NAME_LIST[5]+"！");
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "请完成 "+QUEST_NAME_LIST[5]+" #r" + LEVEL_NEED[5] + "#k 次再来领取吧！")
    }
}


function levelConfirmReward6() {
    let text = "本阶段可领取：";
    text += "#b#z" + MEDAL6 + "##k #b#i" + MEDAL6 + "##k\r\n";

    if (LEVEL_NEED[6] > currentCompletedQuestCount[6]) {
        text += "请完成 "+QUEST_NAME_LIST[6]+" #r" + LEVEL_NEED[6] + "#k 次再来领取吧！"
        cm.sendOkLevel("Dispose", text);
    } else {
        text += "是否确认领取？\r\n"
        cm.sendYesNoLevel("Dispose", "GainLevelReward6", text);
    }
}

function levelGainLevelReward6() {
    if (rewardAlreadyGain[6] === 1) {
        cm.sendOkLevel("Dispose", "你已领取过该档位奖励。")
    } else if (LEVEL_NEED[6] <= currentCompletedQuestCount[6]) {
        if (rewardAlreadyGain[5] < 1) {
            cm.sendOkLevel("Dispose", "#r你还没完成上个阶段任务！#k")
        } else if (!cm.canHold(MEDAL6, 1)) {
            cm.sendOkLevel("Dispose", "请确保装备栏拥有空间。")
        } else {
            cm.gainItem(MEDAL6, 1);

            rewardAlreadyGain[6] = 1;
            cm.saveOrUpdateCharacterExtendValue("肝王勋章领取记录", rewardAlreadyGain.toString());

            let text = "恭喜你已领取：\r\n";
            text += "#b#z" + MEDAL6 + "##k #b#i" + MEDAL6 + "##k\r\n";
            cm.dropMessage(0,"你成功领取了"+REWARD_NAME_LIST[6]+"！");
            cm.sendOkLevel("Dispose", text)
        }
    } else {
        cm.sendOkLevel("Dispose", "请完成 "+QUEST_NAME_LIST[6]+" #r" + LEVEL_NEED[6] + "#k 次再来领取吧！")
    }
}


function levelDispose() {
    cm.dispose();
}

function levelnull() {
    cm.dispose();
}
