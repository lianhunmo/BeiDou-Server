/**
 * @description 每日任务
 * @author Geoffrey
 */

// [等级匹配阶段, [任务编号1, 任务编号2...]]
const STAGE_QUEST_ID_MAP = new Map([
    ["FirstStage", ["30005", "30006", "30007", "30008", "30009", "30010", "30011", "30012", "30013", "30014", "30015"]],
    ["SecondStage", ["30016", "30017", "30018", "30019", "30020", "30021", "30022", "30023", "30024", "30025"]],
    ["ThirdStage", ["30026", "30027", "30028", "30029", "30030", "30031", "30032", "30033", "30034", "30035"]],
    ["ForthStage", ["30036", "30037", "30038", "30039", "30040", "30041", "30042", "30043", "30044", "30045"]]
]);
// 每日任务内容表：[任务编号, [0等级匹配阶段, 1任务类型（杀怪：1，收集物品：2）, 2任务目标ID, 3任务数量, 4所在地图ID]]
const QUEST_MAP = new Map([
    ["30005", ["FirstStage", 1, 4230101, 20, 100040103]],
    ["30006", ["FirstStage", 1, 3110100, 20, 107000000]],
    ["30007", ["FirstStage", 2, 4000032, 20, 107000000]],
    ["30008", ["FirstStage", 1, 3110101, 20, 220010300]],
    ["30009", ["FirstStage", 2, 4000107, 20, 220010300]],
    ["30010", ["FirstStage", 1, 3210200, 20, 200010110]],
    ["30011", ["FirstStage", 2, 4000073, 20, 200010110]],
    ["30012", ["FirstStage", 1, 3210206, 20, 221022700]],
    ["30013", ["FirstStage", 2, 4000103, 20, 221022700]],
    ["30014", ["FirstStage", 1, 4230121, 20, 221030500]],
    ["30015", ["FirstStage", 2, 4000122, 20, 221030500]],
    ["30016", ["SecondStage", 1, 6130208, 20, 251010401]],
    ["30017", ["SecondStage", 2, 4000296, 20, 251010401]],
    ["30018", ["SecondStage", 1, 6230400, 20, 220070000]],
    ["30019", ["SecondStage", 2, 4000143, 20, 220070000]],
    ["30020", ["SecondStage", 1, 7130100, 20, 105090500]],
    ["30021", ["SecondStage", 2, 4000028, 20, 105090500]],
    ["30022", ["SecondStage", 1, 6300100, 20, 220060100]],
    ["30023", ["SecondStage", 2, 4000130, 20, 220060100]],
    ["30024", ["SecondStage", 1, 8141000, 20, 220060300]],
    ["30025", ["SecondStage", 2, 4000134, 20, 220060300]],
    ["30026", ["ThirdStage", 1, 8150101, 20, 230040400]],
    ["30027", ["ThirdStage", 2, 4000181, 20, 230040400]],
    ["30028", ["ThirdStage", 1, 8150301, 20, 240040210]],
    ["30029", ["ThirdStage", 2, 4000269, 20, 240040210]],
    ["30030", ["ThirdStage", 1, 7130300, 20, 220070201]],
    ["30031", ["ThirdStage", 2, 4000148, 20, 220070201]],
    ["30032", ["ThirdStage", 1, 7140000, 20, 220060200]],
    ["30033", ["ThirdStage", 2, 4000132, 20, 220060200]],
    ["30034", ["ThirdStage", 1, 8140703, 20, 240030300]],
    ["30035", ["ThirdStage", 2, 4000265, 20, 240030300]],
    ["30036", ["ForthStage", 1, 8143000, 30, 220070301]],
    ["30037", ["ForthStage", 2, 4000150, 30, 220070301]],
    ["30038", ["ForthStage", 1, 8141000, 30, 220060300]],
    ["30039", ["ForthStage", 2, 4000134, 30, 220060300]],
    ["30040", ["ForthStage", 1, 7130010, 30, 220070200]],
    ["30041", ["ForthStage", 2, 4000147, 30, 220070200]],
    ["30042", ["ForthStage", 1, 6400100, 30, 220060100]],
    ["30043", ["ForthStage", 2, 4000131, 30, 220060100]],
    ["30044", ["ForthStage", 1, 8142000, 30, 220070300]],
    ["30045", ["ForthStage", 2, 4000149, 30, 220070300]]
]);
// 任务奖励：[等级匹配阶段, [奖励物品ID1, 奖励物品个数, 奖励物品ID2, 奖励物品个数...]]
// id解释：0：金币;  1：点券;  2：抵用券;  4、信用点; 5、经验值;  id ≥ 1_000_000 的为有效物品ID，自动区分，你只需要操心客户端有没有填入的物品即可。
const REWARD_MAP = new Map([
    ["FirstStage", [2000002, 100, 2000006, 100, 2, 1000, 5, 3000]],
    ["SecondStage", [2022003, 100, 2022000, 100, 2, 1000, 5, 50000]],
    ["ThirdStage", [2001001, 100, 2001002, 100, 2, 1000, 5, 200000]],
    ["ForthStage", [2001001, 200, 2001002, 200, 2, 1000, 5, 500000]],
]);

//每日任务全部完成最终奖励
const FINAL_REWARD_MAP = new Map([
    [4001006, 1]
]);

let questCount = 0;
let questFinishCount = 0;
let questId = 0;
let QuestActionHandler;
let Quest;
let questStage;

function start() {
    QuestActionHandler = Java.type('org.gms.net.server.channel.handlers.QuestActionHandler');//导入 任务动作处理类
    Quest = Java.type('org.gms.server.quest.Quest');//导入 任务类
    levelStart();
}

function levelStart() {
    let questCountStr = cm.getCharacterExtendValue("每日任务完成次数", true)
    if (questCountStr) {
        questCount = questCountStr.charAt(1);
        questFinishCount = questCountStr.charAt(0);

    }
    let finalReward = cm.getCharacterExtendValue("每日任务最终奖励领取", true);

    let text = "这里是每日任务中心，每天可以接取 #b5次#k 日常任务。\r\n你今日已接取#b" + questCount + "#k次任务，完成了#b" + questFinishCount + "#k次任务。\r\n";
    questId = cm.getCharacterExtendValue("每日任务编号", true);
    if (finalReward === "1") {
        cm.sendOkLevel("Dispose", "你今天已领取每日任务最终奖励，请明天再来吧。");
    } else if (questCount >= 5 && questFinishCount >= 5 && questId === "0") {
        text += "是否要领取最终奖励？\r\n\r\n";
        FINAL_REWARD_MAP.forEach((num, itemId) => {
            text += "#b#t" + itemId + "##i" + itemId + "##k " + num + "个\r\n";
        })
        cm.sendYesNoLevel("Dispose", "GetFinalReward", text);
    } else if (questCount >= 5 && questId === "0") {
        cm.sendOkLevel("Dispose", "你今天未完成 #b5次#k 每日任务且机会已用完，请明天再来吧。");
    } else if (QUEST_MAP.has(questId)) {
        let quest = QUEST_MAP.get(questId);
        text += "当前任务：\r\n";
        if (quest[1] === 1) {
            let Quest = Java.type('org.gms.server.quest.Quest');//导入 任务类
            let status = cm.getChar().getQuest(Quest.getInstance(Number(questId)));
            let progress = Number(status.getProgress(quest[2]));
            text += "击杀#r#o" + quest[2] + "# " + quest[3] + " #k只。\r\n"
            text += "当前已击杀#b#o" + quest[2] + "##k #b" + progress + " #k只。\r\n\r\n"
            if (progress < quest[3]) {
                text += "#L0##b传送到任务地点。#l\r\n"
                cm.sendSelectLevel("WarpMap", text);
            } else {
                text += "是否交付任务？"
                cm.sendYesNoLevel("Dispose", "GetReward", text);
            }
        } else {
            text += "收集#r#t" + quest[2] + "##k#i" + quest[2] + "# #b" + quest[3] + " #k个。\r\n"
            let itemQuantity = cm.getItemQuantity(quest[2]);
            text += "当前已收集#b#t" + quest[2] + "##k#i" + quest[2] + "# #b" + itemQuantity + " #k个。\r\n\r\n"
            if (itemQuantity < quest[3]) {
                text += "#L0##b传送到任务地点。#l\r\n"
                cm.sendSelectLevel("WarpMap", text);
            } else {
                text += "是否交付任务？"
                cm.sendYesNoLevel("Dispose", "GetReward", text);
            }
        }
    } else {
        text += "你当前还未接取任务。是否接取任务？\r\n";
        cm.sendYesNoLevel("Dispose", "AcceptQuest", text);
    }
}

function levelWarpMap0() {
    let quest = QUEST_MAP.get(questId);
    cm.warp(quest[4]);
    cm.dispose();
}

function levelAcceptQuest() {
    let charCurrentLevel = cm.getChar().getLevel();
    if (charCurrentLevel >= 30 && charCurrentLevel < 70) {
        questStage = "FirstStage";
        let questId = getRandomElement(STAGE_QUEST_ID_MAP.get("FirstStage"));
        Quest.getInstance(Number(questId)).forfeit(cm.getPlayer());
        cm.saveOrUpdateCharacterExtendValue("每日任务编号", questId, true);
        QuestActionHandler.handleDailyQuest(1, Number(questId), cm.getClient());
    } else if (charCurrentLevel >= 70 && charCurrentLevel < 100) {
        questStage = "SecondStage";
        let questId = getRandomElement(STAGE_QUEST_ID_MAP.get("SecondStage"));
        Quest.getInstance(Number(questId)).forfeit(cm.getPlayer());
        cm.saveOrUpdateCharacterExtendValue("每日任务编号", questId, true);
        QuestActionHandler.handleDailyQuest(1, Number(questId), cm.getClient());
    } else if (charCurrentLevel >= 100 && charCurrentLevel < 120) {
        questStage = "ForthStage";
        let questId = getRandomElement(STAGE_QUEST_ID_MAP.get("ForthStage"));
        Quest.getInstance(Number(questId)).forfeit(cm.getClient().getPlayer());
        cm.saveOrUpdateCharacterExtendValue("每日任务编号", questId, true);
        QuestActionHandler.handleDailyQuest(1, Number(questId), cm.getClient());
    } else if (charCurrentLevel >= 120) {
        questStage = "ForthStage";
        let questId = getRandomElement(STAGE_QUEST_ID_MAP.get("ForthStage"));
        Quest.getInstance(Number(questId)).forfeit(cm.getClient().getPlayer());
        cm.saveOrUpdateCharacterExtendValue("每日任务编号", questId, true);
        QuestActionHandler.handleDailyQuest(1, Number(questId), cm.getClient());
    } else {
        cm.sendOkLevel("Dispose", "角色需要#r30级#k才能领取每日任务。");
        return;
    }
    questCount++;
    cm.saveOrUpdateCharacterExtendValue("每日任务完成次数", questFinishCount+""+questCount, true);
    cm.sendNextLevel('Start','任务接取成功。');
}

function levelGetReward() {
    let questInfo = QUEST_MAP.get(questId);
    let rewardList = REWARD_MAP.get(questInfo[0]);
    let testText;
    if (!cm.canHold(rewardList[0], rewardList[1])) {
        testText = "您无法继续携带#b#t" + itemId + "##k #i" + itemId + "#。\r\n";
    }
    if (!cm.canHold(rewardList[2], rewardList[3])) {
        testText = "您无法继续携带#b#t" + itemId + "##k #i" + itemId + "#。\r\n";
    }
    if (testText) {
        cm.sendOkLevel('Dispose', testText);
        return;
    }

    cm.saveOrUpdateCharacterExtendValue("每日任务编号", "0", true);
    QuestActionHandler.handleDailyQuest(2, Number(questId), cm.getClient());
    if(questInfo[1] === 2) {
        cm.gainItem(questInfo[2], -questInfo[3]);
    }
    cm.gainItem(rewardList[0], rewardList[1]);
    cm.gainItem(rewardList[2], rewardList[3]);
    cm.getChar().getCashShop().gainCash(rewardList[4], rewardList[5]);
    cm.gainExp(rewardList[7]);
    questFinishCount++;
    cm.saveOrUpdateCharacterExtendValue("每日任务完成次数", questFinishCount+""+questCount, true);
    let text = "恭喜你完成了每日任务，获得了：\r\n";
    text += "#b#t" + rewardList[0] + "##k #i" + rewardList[0] + "# " + rewardList[1] + "个。\r\n";
    text += "#b#t" + rewardList[2] + "##k #i" + rewardList[2] + "# " + rewardList[3] + "个。\r\n";
    text += "抵用券 " + rewardList[5] +"。\r\n";
    text += "经验 " + rewardList[7] +"。\r\n";
    cm.sendNextLevel('Start', text);
}

function levelGetFinalReward() {
    let testText;
    FINAL_REWARD_MAP.forEach((num, itemId) => {
        if (!cm.canHold(Number(itemId), num)) {
            testText = "您无法继续携带#b#t" + itemId + "##k #i" + itemId + "#。\r\n";
        }
    })
    if (testText) {
        cm.sendOkLevel('Dispose', testText);
        return;
    }
    cm.saveOrUpdateCharacterExtendValue("每日任务最终奖励领取", "1", true);
    let text = "恭喜你完成了全部每日任务，获得了：\r\n";
    FINAL_REWARD_MAP.forEach((num, itemId) => {
        cm.gainItem(Number(itemId), num);
        text += "#b#t" + itemId + "##k #i" + itemId + "# " + num + "个。\r\n";
    })
    cm.sendOkLevel('Dispose', text);
}

function levelDispose() {
    cm.dispose();
}

// 生成随机索引
function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}