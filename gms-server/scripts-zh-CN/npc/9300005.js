/* ==================
 脚本类型: 副本中心
 脚本作者：Geoffrey
 =====================
 */
//------------------------------------------------------------------------
let teamMissions = Array(
    Array(1012112,"迎月花山丘              #r（射手组队任务10-20级）#b"),
    Array(9020000,"第一伴奏               #r（废都组队任务 20-30级）#b"),
    Array(2040034,"时空裂缝               #r（玩具组队任务 30-50级）#b"),
    Array(2013000,"女神之塔            #r（天空之城组队任务 50-70级）#b"),
    Array(2094000,"海盗船               #r（百草堂组队任务 70-90级）#b"),
    Array(2133000,"毒雾森林         #r（艾琳的森林组队任务 90-120级）#b"),
    Array(2112003,"拯救罗密欧       #r（玛加提亚组队任务 120以上）#b"),
    Array(2112004,"拯救朱丽叶       #r（玛加提亚组队任务 120以上）#b"),
);
//------------------------------------------------------------------------
const FLAMING_FEATHER = 4001006;
const GOLD_MAPLE_LEAF = 4000313;
const QUEST_NAME_LIST = ["月秒组队副本","废弃组队副本","玩具组队副本","天空组队副本","海盗组队副本","毒雾组队副本","罗密欧与朱丽叶组队副本"];
let currentCompletedQuestCount = [0,0,0,0,0,0,0];

let HenesysCount = 0;
let KerningCount = 0;
let LudibriumCount = 0;
let OrbisCount = 0;
let PirateCount = 0;
let EllinCount = 0;
let MagatiaCount = 0;
const CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
const CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";

//Start
function start()
{
    levelStart();
}

function levelStart() {
    let text = "亲爱的玩家：#e#b#h ##k#n，您想进入哪个组队副本呢？\r\n\r\n";
    text += "#b";
    for (let i = 0; i < teamMissions.length; i++) {
        text += "#L" + i + "#" + teamMissions[i][1] + "#l\r\n";
    }
    text += "\r\n#L99##b==============#r领取每日副本奖励#k==============#k#l\r\n";

    cm.sendNextSelectLevel("ChooseTeamMission", text);
}

function getCurrentProgressText() {
    let text = "";
    for (let i = 0; i < QUEST_NAME_LIST.length; i++) {
        text += QUEST_NAME_LIST[i] + "：#b"+currentCompletedQuestCount[i]+"#k 次\r\n";
    }
    return text;
}

//----------------------------------------------------------------------------------
function levelChooseTeamMission(selection) {
    if (selection == 99) {
        HenesysCount = Number(cm.getCharacterExtendValue("月秒组队副本每日通关次数", true));
        KerningCount = Number(cm.getCharacterExtendValue("废弃组队副本每日通关次数", true));
        LudibriumCount = Number(cm.getCharacterExtendValue("玩具组队副本每日通关次数", true));
        OrbisCount = Number(cm.getCharacterExtendValue("天空组队副本每日通关次数", true));
        PirateCount = Number(cm.getCharacterExtendValue("海盗组队副本每日通关次数", true));
        EllinCount = Number(cm.getCharacterExtendValue("毒雾组队副本每日通关次数", true));
        MagatiaCount = Number(cm.getCharacterExtendValue("罗密欧与朱丽叶组队副本每日通关次数", true));
        stageOneRecivedCount = Number(cm.getCharacterExtendValue("副本每日奖励一阶段领取记录", true));
        stageAllRecivedCount = Number(cm.getCharacterExtendValue("副本每日奖励一条龙领取记录", true));
        currentCompletedQuestCount = [HenesysCount, KerningCount, LudibriumCount,
            OrbisCount, PirateCount, EllinCount, MagatiaCount];

        let text = "领取#b#t" + FLAMING_FEATHER + "##k#i" + FLAMING_FEATHER + "#需要完成迎月花山丘，第一伴奏 ，时空裂缝 ，女神之塔各三次。\r\n";
        text += "领取#b#t" + GOLD_MAPLE_LEAF + "##k#i" + GOLD_MAPLE_LEAF + "#需要完成所有组队副本各三次。\r\n";
        text += "你今日副本通关次数为：\r\n";
        text += getCurrentProgressText();
        text += "你要领取哪个奖励呢？\r\n\r\n";
        if (stageOneRecivedCount < 1) {
            text += `#L0##b${CheckBox_0}\t领取#t` + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "##k#l\r\n";
        } else {
            text += `#L99#${CheckBox_1}\t已领取#t` + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "##l\r\n";
        }
        if (stageAllRecivedCount < 1) {
            text += `#L1##b${CheckBox_0}\t领取#t` + GOLD_MAPLE_LEAF + `##i` + GOLD_MAPLE_LEAF + "##k#l\r\n";
        } else {
            text += `#L99#${CheckBox_1}\t已领取#t` + GOLD_MAPLE_LEAF + `##i` + GOLD_MAPLE_LEAF + "##l\r\n";
        }
        text += "\r\n#L99##b离开#k#l\r\n";
        cm.sendNextSelectLevel("GainDailyPQReward", text);
    } else {
        openNpc(teamMissions[selection][0]);
    }
}

function checkStageOneRequire() {
    for (let i = 0; i < 4; i++) {
        if (currentCompletedQuestCount[i] < 3) {
            return false;
        }
    }
    return true;
}

function checkAllStageRequire() {
    for (let i = 0; i < currentCompletedQuestCount.length; i++) {
        if (currentCompletedQuestCount[i] < 3) {
            return false;
        }
    }
    return true;
}

function levelGainDailyPQReward(selection) {
    if (selection == 0) {
        if (checkStageOneRequire()) {
            if (!cm.canHold(FLAMING_FEATHER, 1)) {
                cm.sendOkLevel("Dispose", "请确保其他栏有空间。");
                return;
            }
            cm.gainItem(FLAMING_FEATHER, 1);
            stageOneRecivedCount++;
            cm.saveOrUpdateCharacterExtendValue("副本每日奖励一阶段领取记录", stageOneRecivedCount.toString(), true);
            cm.sendOkLevel("Dispose", "恭喜你获得了#b#t" + FLAMING_FEATHER + "##i" + FLAMING_FEATHER + "##k");
        } else {
            cm.sendOkLevel("Dispose", "你还未到达领取要求，继续努力吧。");
        }
    } else if(selection == 1) {
        if (checkAllStageRequire()) {
            if (!cm.canHold(GOLD_MAPLE_LEAF, 1)) {
                cm.sendOkLevel("Dispose", "请确保其他栏有空间。");
                return;
            }
            cm.gainItem(GOLD_MAPLE_LEAF, 1);
            stageAllRecivedCount++;
            cm.saveOrUpdateCharacterExtendValue("副本每日奖励一条龙领取记录", stageAllRecivedCount.toString(), true);
            cm.sendOkLevel("Dispose", "恭喜你获得了#b#t" + GOLD_MAPLE_LEAF + "##i" + GOLD_MAPLE_LEAF + "##k");
        } else {
            cm.sendOkLevel("Dispose", "你还未到达领取要求，继续努力吧。");
        }
    } else {
        levelDispose();
    }
}

function openNpc(scriptName) {
    let api = cm.getChar().getAbstractPlayerInteraction();
    cm.dispose();
    api.openNpc(scriptName, scriptName + "");
}

function levelDispose() {
    cm.dispose()
}