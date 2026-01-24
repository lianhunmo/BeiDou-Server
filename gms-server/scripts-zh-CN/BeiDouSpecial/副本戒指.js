/**
 * @description 打造超强戒指
 * @author Geoffrey
 */
const RING_OF_MOON_STONE_1CARATS = 1112300;
const RING_OF_SHINING_STAR_1CARATS = 1112303;
const GOLD_HEART_RING_1CARATS = 1112306;
const RING_OF_SILVER_WING_1CARATS = 1112309;
const RING_OF_MOON_STONE_2CARATS = 1112301;
const RING_OF_SHINING_STAR_2CARATS = 1112304;
const GOLD_HEART_RING_2CARATS = 1112307;
const RING_OF_SILVER_WING_2CARATS = 1112310;
const RING_OF_MOON_STONE_3CARATS = 1112302;
const RING_OF_SHINING_STAR_3CARATS = 1112305;
const GOLD_HEART_RING_3CARATS = 1112308;
const RING_OF_SILVER_WING_3CARATS = 1112311;
const MAPLE_LEAF = 4001126;
const STAMP1 = 4002000;
const STAMP2 = 4002001;
const STAMP3 = 4001158;
const STAMP4 = 4031435;
const STAMP5 = 4001198;
const STAMP6 = 4001160;
const STAMP7 = 4001159;
const INVENTORY_TYPE_EQUIP = 1;
const EQUIP_SLOT = 1;

const RINGS_ITEM_ID_LIST = [GOLD_HEART_RING_1CARATS, GOLD_HEART_RING_2CARATS, GOLD_HEART_RING_3CARATS];
const RINGS_ITEM_ID_EVOLUTION_LIST = [GOLD_HEART_RING_1CARATS, GOLD_HEART_RING_2CARATS];

const RINGS_EVOLVE_MAP = new Map([
    [RING_OF_MOON_STONE_1CARATS, RING_OF_MOON_STONE_2CARATS],
    [RING_OF_SHINING_STAR_1CARATS, RING_OF_SHINING_STAR_2CARATS],
    [GOLD_HEART_RING_1CARATS, GOLD_HEART_RING_2CARATS],
    [RING_OF_SILVER_WING_1CARATS, RING_OF_SILVER_WING_2CARATS],
    [RING_OF_MOON_STONE_2CARATS, RING_OF_MOON_STONE_3CARATS],
    [RING_OF_SHINING_STAR_2CARATS, RING_OF_SHINING_STAR_3CARATS],
    [GOLD_HEART_RING_2CARATS, GOLD_HEART_RING_3CARATS],
    [RING_OF_SILVER_WING_2CARATS, RING_OF_SILVER_WING_3CARATS]
]);

let costStamp1 = 0;
let costStamp2 = 0;
let costStamp3 = 0;
let costStamp4 = 0;
let costStamp5 = 0;
let costStamp6 = 0;
let costStamp7 = 0;

let STAMP_ID_COST_MAP = new Map([
    [STAMP1, costStamp1],
    [STAMP2, costStamp2],
    [STAMP3, costStamp3],
    [STAMP4, costStamp4],
    [STAMP5, costStamp5],
    [STAMP6, costStamp6],
    [STAMP7, costStamp7]
]);

let costMeso = 0;
let upgradeProb;
let equip;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    let text = "这里可以打造副本戒指，现在你希望做什么呢？\r\n #r(注：要强化和升阶的戒指需放在背包第一格)#l\r\n\r\n";
    text += "#L0##b领取戒指#k\r\n";
    text += "#L1##b强化戒指#k\r\n";
    text += "#L2##b戒指升阶#k\r\n";

    cm.sendSelectLevel("RingOption", text);
}

function levelRingOption0() {
    let text = "你可以用10张#b#t" + STAMP1 + "##k#i" + STAMP1 + "#兑换一种戒指：\r\n\r\n";
    text += "#L" + GOLD_HEART_RING_1CARATS + "##b#t" + GOLD_HEART_RING_1CARATS + "##k #i" + GOLD_HEART_RING_1CARATS + "##l\r\n";
    cm.sendNextSelectLevel("ExchangeRing", text);
}

function buildStampsNeedText(stampId, cost) {
    let text = "";
    if (cost !== 0) {
        text += "#r" + cost + "#k个#r#t" + stampId + "##k#r#i" + stampId + "##k\r\n";
    }
    return text;
}

function buildStampsHaveText(stampId, cost) {
    let text = "";
    if (cost !== 0) {
        text += "#b" + cm.getItemQuantity(stampId) + "#k个#b#t" + stampId + "##k#b#i" + stampId + "##k\r\n";
    }
    return text;
}

function buildInfoMessage(text, equipCurrentLevel) {
    text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
    text += "强化需要:\r\n";
    STAMP_ID_COST_MAP.forEach((cost, stampId) => {
        text += buildStampsNeedText(stampId, cost);
    })
    text += "和#r" + costMeso + "#k金币。\r\n";
    text += "你当前拥有:\r\n";
    STAMP_ID_COST_MAP.forEach((cost, stampId) => {
        text += buildStampsHaveText(stampId, cost);
    })
    text += "和#b" + cm.getMeso() + "#k金币。\r\n";
    text += "强化成功率为#r" + upgradeProb + "%#k，确认要强化吗？";
    return text;
}

function levelRingOption1() {
    // 通过slot = 1获取到当前戒指等级来判断强化材料
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT);
    let equipItemId = equip.getItemId();
    let text = "你想强化#b#t" + equipItemId + "##k #i" + equipItemId + "##k吗？\r\n\r\n";
    if (RINGS_ITEM_ID_LIST.includes(equipItemId)) {
        let equipCurrentLevel = equip.getLevel();
        switch(equipCurrentLevel) {
            case 0:
                costStamp1 = 15;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costMeso = 100000;
                upgradeProb = 100;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 1:
                costStamp1 = 15;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 15;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costMeso = 500000;
                upgradeProb = 90;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 2:
                costStamp1 = 15;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 15;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 15;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costMeso = 1000000;
                upgradeProb = 80;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 3:
                costStamp1 = 15;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 15;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 15;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costStamp4 = 15;
                STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
                costMeso = 2000000;
                upgradeProb = 70;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 4:
                costStamp1 = 15;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 15;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 15;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costStamp4 = 15;
                STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
                costStamp5 = 15;
                STAMP_ID_COST_MAP.set(STAMP5, costStamp5);
                costMeso = 5000000;
                upgradeProb = 60;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 5:
                costStamp1 = 15;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 15;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 15;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costStamp4 = 15;
                STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
                costStamp5 = 15;
                STAMP_ID_COST_MAP.set(STAMP5, costStamp5);
                costStamp6 = 15;
                STAMP_ID_COST_MAP.set(STAMP6, costStamp6);
                costMeso = 8000000;
                upgradeProb = 50;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 6:
                costStamp1 = 15;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 15;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 15;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costStamp4 = 15;
                STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
                costStamp5 = 15;
                STAMP_ID_COST_MAP.set(STAMP5, costStamp5);
                costStamp6 = 15;
                STAMP_ID_COST_MAP.set(STAMP6, costStamp6);
                costStamp7 = 15;
                STAMP_ID_COST_MAP.set(STAMP7, costStamp7);
                costMeso = 10000000;
                upgradeProb = 40;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 7:
                costStamp1 = 20;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 20;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 20;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costStamp4 = 20;
                STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
                costStamp5 = 20;
                STAMP_ID_COST_MAP.set(STAMP5, costStamp5);
                costStamp6 = 20;
                STAMP_ID_COST_MAP.set(STAMP6, costStamp6);
                costStamp7 = 20;
                STAMP_ID_COST_MAP.set(STAMP7, costStamp7);
                costMeso = 15000000;
                upgradeProb = 30;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 8:
                costStamp1 = 25;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 25;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 25;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costStamp4 = 25;
                STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
                costStamp5 = 25;
                STAMP_ID_COST_MAP.set(STAMP5, costStamp5);
                costStamp6 = 25;
                STAMP_ID_COST_MAP.set(STAMP6, costStamp6);
                costStamp7 = 25;
                STAMP_ID_COST_MAP.set(STAMP7, costStamp7);
                costMeso = 20000000;
                upgradeProb = 20;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 9:
                costStamp1 = 30;
                STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
                costStamp2 = 30;
                STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
                costStamp3 = 30;
                STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
                costStamp4 = 30;
                STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
                costStamp5 = 30;
                STAMP_ID_COST_MAP.set(STAMP5, costStamp5);
                costStamp6 = 30;
                STAMP_ID_COST_MAP.set(STAMP6, costStamp6);
                costStamp7 = 30;
                STAMP_ID_COST_MAP.set(STAMP7, costStamp7);
                costMeso = 25000000;
                upgradeProb = 10;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            default:
                if (RINGS_ITEM_ID_EVOLUTION_LIST.includes(equipItemId)) {
                    cm.sendLastLevel("Start", "#r恭喜你！#k#b#t" + equipItemId + "##k #i" + equipItemId + "##k已满级！可以升阶了#k");
                } else {
                    cm.sendLastLevel("Start", "#r恭喜你！#k#b#t" + equipItemId + "##k #i" + equipItemId + "##k已是顶级戒指！#k");
                }
                break;
        }
    } else {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能强化！");
    }
}

function levelRingOption2() {
    // 通过slot = 1获取到当前戒指等级来判断强化材料
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT);
    let equipItemId = equip.getItemId();
    let equipCurrentLevel = equip.getLevel();
    if (!RINGS_ITEM_ID_EVOLUTION_LIST.includes(equipItemId)) {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能升阶！");
    } else {
        if (equipCurrentLevel >= 10) {
            costStamp1 = 30;
            STAMP_ID_COST_MAP.set(STAMP1, costStamp1);
            costStamp2 = 30;
            STAMP_ID_COST_MAP.set(STAMP2, costStamp2);
            costStamp3 = 30;
            STAMP_ID_COST_MAP.set(STAMP3, costStamp3);
            costStamp4 = 30;
            STAMP_ID_COST_MAP.set(STAMP4, costStamp4);
            costStamp5 = 30;
            STAMP_ID_COST_MAP.set(STAMP5, costStamp5);
            costStamp6 = 30;
            STAMP_ID_COST_MAP.set(STAMP6, costStamp6);
            costStamp7 = 30;
            STAMP_ID_COST_MAP.set(STAMP7, costStamp7);
            costMeso = 50000000;
            upgradeProb = 50;
            let text = "你想将#b#t" + equipItemId + "##k #i" + equipItemId + "##k升阶吗？升阶后可继续强化。\r\n\r\n";
            text += "你需要消耗:\r\n";
            STAMP_ID_COST_MAP.forEach((cost, stampId) => {
                text += buildStampsNeedText(stampId, cost);
            })
            text += "你当前拥有:\r\n";
            STAMP_ID_COST_MAP.forEach((cost, stampId) => {
                text += buildStampsHaveText(stampId, cost);
            })
            text += "升阶成功率为#r" + upgradeProb + "%#k，确定要升阶吗？";
            cm.sendYesNoLevel("Dispose", "RingEvolution", text);
        } else {
            cm.sendOkLevel("Dispose", "你还未将#b#t" + equipItemId + "##k #i" + equipItemId + "##k升至#r10级#k，不能升阶！");
        }
    }
}
function levelExchangeRing(itemCode) {
    costStamp1 = 10;
    if (itemCode == null) {
        let text = "请选择一种戒指。"
        cm.sendLastLevel("RingOption0", text);
    } else {
        let itemQuantity = cm.getItemQuantity(STAMP1);
        if (itemQuantity < costStamp1) {
            cm.sendOkLevel("Dispose", "#r#t" + STAMP1 + "##k#r#i" + STAMP1 + "##k不足#r" + costStamp1 + "#k个！");
        } else if (cm.getItemQuantity(itemCode) > 0
            || cm.getItemQuantity(RINGS_EVOLVE_MAP.get(itemCode)) > 0
            || cm.getItemQuantity(RINGS_EVOLVE_MAP.get(RINGS_EVOLVE_MAP.get(itemCode))) > 0
            || !cm.canHold(itemCode, 1)) {
            cm.sendOkLevel("Dispose", "你已领取过该戒指或者背包空间不足！");
        } else {
            cm.gainItem(STAMP1, -costStamp1);
            successGain(itemCode);
        }
    }
}

function checkStamps(stampId, cost) {
    let itemQuantity = cm.getItemQuantity(stampId);
    let text = "";
    if (itemQuantity < cost) {
        text = "#b#t" + stampId + "##k#i" + stampId + "#不足#r" + cost + "#k个\r\n";
        return text;
    }
    return null;
}

function levelRingUpgrade() {
    let meso = cm.getMeso();
    if (meso < costMeso) {
        cm.sendOkLevel("Dispose", "金币不足#r" + costMeso + "#k！");
    } else {
        let checkResult = true;
        let text = "";
        STAMP_ID_COST_MAP.forEach((cost, stampId) => {
            if (cost !== 0) {
                let textTemp = checkStamps(stampId, cost);
                if (textTemp) {
                    checkResult = false;
                    text += textTemp;
                }
            }
        });
        if (!checkResult) {
            cm.sendOkLevel("Dispose", text);
            return;
        }
    }
    STAMP_ID_COST_MAP.forEach((cost, stampId) => {
        if (cost !== 0) {
            cm.gainItem(stampId, -cost);
        }
    })
    cm.gainMeso(-costMeso);
    let equipCurrentLevel = equip.getLevel();
    let states = new Map ([
        ["STR", 1],
        ["DEX", 1],
        ["INT", 1],
        ["LUK", 1],
    ])
    if (equipCurrentLevel < 9) {
        let scrollResult = cm.getChar().scrollEquipWithEquipSlot(EQUIP_SLOT, upgradeProb, false, states);
        if (scrollResult) {
            cm.sendLastLevel("RingOption1", "强化成功！#r四维属性+1#k");
        } else {
            cm.sendLastLevel("RingOption1", "强化失败。");
        }
    } else {
        states.set("PAD", 10);
        states.set("MAD", 10);
        let scrollResult = cm.getChar().scrollEquipWithEquipSlot(EQUIP_SLOT, upgradeProb, false, states);
        if (scrollResult) {
            cm.sendLastLevel("RingOption1", "强化成功！#r四维属性+1 物攻+10 魔攻+10#k");
        } else {
            cm.sendLastLevel("RingOption1", "强化失败。");
        }
    }
}

function levelRingEvolution() {
    let checkResult = true;
    let text = "";
    STAMP_ID_COST_MAP.forEach((cost, stampId) => {
        if (cost !== 0) {
            let textTemp = checkStamps(stampId, cost);
            if (textTemp) {
                checkResult = false;
                text += textTemp;
            }
        }
    });
    if (!checkResult) {
        cm.sendOkLevel("Dispose", text);
        return;
    }
    let meso = cm.getMeso();
    if (meso < costMeso) {
        cm.sendOkLevel("Dispose", "金币不足#r" + costMeso + "#k！");
    } else {
        STAMP_ID_COST_MAP.forEach((cost, stampId) => {
            if (cost !== 0) {
                cm.gainItem(stampId, -cost);
            }
        })
        cm.gainMeso(-costMeso);
        let scrollResult = cm.getChar().evolveEquipWithEquipSlot(EQUIP_SLOT, upgradeProb, RINGS_EVOLVE_MAP.get(equip.getItemId()));
        if (scrollResult) {
            cm.sendOkLevel("Dispose", "升阶成功！");
        } else {
            cm.sendLastLevel("Dispose", "升阶失败。");
        }
    }
}

function successGain(itemCode) {
    cm.gainItem(itemCode, 1);
    cm.sendOkLevel("Dispose", "兑换成功！");
}

function levelDispose() {
    cm.dispose();
}

