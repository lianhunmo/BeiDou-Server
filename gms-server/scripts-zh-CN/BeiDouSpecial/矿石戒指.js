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

const BRONZE_PLATE = 4011000;
const STEEL_PLATE = 4011001;
const MITHRIL_PLATE = 4011002;
const ADAMANTIUM_PLATE = 4011003;
const SILVER_PLATE = 4011004;
const ORIHALCON_PLATE = 4011005;
const GOLD_PLATE = 4011006;

const GARNET = 4021000;
const AMETHYST = 4021001;
const AQUAMARINE = 4021002;
const EMERALD = 4021003;
const OPAL = 4021004;
const SAPPHIRE = 4021005;
const TOPAZ = 4021006;
const DIAMOND = 4021007;
const BLACK_CRYSTAL = 4021008;

const POWER_CRYSTAL = 4005000;
const WISDOM_CRYSTAL = 4005001;
const DEX_CRYSTAL = 4005002;
const LUK_CRYSTAL = 4005003;

const INVENTORY_TYPE_EQUIP = 1;
const EQUIP_SLOT = 1;

const RINGS_ITEM_ID_LIST = [RING_OF_SILVER_WING_1CARATS, RING_OF_SILVER_WING_2CARATS, RING_OF_SILVER_WING_3CARATS];
const RINGS_ITEM_ID_EVOLUTION_LIST = [RING_OF_SILVER_WING_1CARATS, RING_OF_SILVER_WING_2CARATS];

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

let costBronzePlate = 0;
let costSteelPlate = 0;
let cosMithrilPlate = 0;
let costAdamantiumPlate = 0;
let costSilverPlate = 0;
let costOrihalconPlate = 0;
let costGoldPlate = 0;

let costGarnet = 0;
let costAmethyst = 0;
let cosAquaMarine = 0;
let costEmerald = 0;
let costOpal = 0;
let costSapphire = 0;
let costTopaz = 0;
let costDiamond = 0;
let costBlackCrystal = 0;

let costPowerCrystal = 0;
let costWisdomCrystal = 0;
let costDexCrystal = 0;
let costLukCrystal = 0;

let STAMP_ID_COST_MAP = new Map([
    [BRONZE_PLATE, costBronzePlate],
    [MITHRIL_PLATE, cosMithrilPlate],
    [ADAMANTIUM_PLATE, costAdamantiumPlate],
    [SILVER_PLATE, costSilverPlate],
    [ORIHALCON_PLATE, costOrihalconPlate],
    [GOLD_PLATE, costGoldPlate],
    [AMETHYST, costAmethyst],
    [AQUAMARINE, cosAquaMarine],
    [EMERALD, costEmerald],
    [OPAL, costOpal],
    [SAPPHIRE, costSapphire],
    [TOPAZ, costTopaz],
    [BLACK_CRYSTAL, costBlackCrystal]
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
    let text = "你可以用1#b#t" + BRONZE_PLATE + "##k#i" + BRONZE_PLATE + "#兑换一种戒指：\r\n\r\n";
    text += "#L" + RING_OF_SILVER_WING_1CARATS + "##b#t" + RING_OF_SILVER_WING_1CARATS + "##k #i" + RING_OF_SILVER_WING_1CARATS + "##l\r\n";
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
    text += "你当前拥有:\r\n";
    STAMP_ID_COST_MAP.forEach((cost, stampId) => {
        text += buildStampsHaveText(stampId, cost);
    })
    text += "强化成功率为#r" + upgradeProb + "%#k，确认要强化吗？";
    return text;
}

function levelRingOption1() {
    // 通过slot = 1获取到当前戒指等级来判断强化材料
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT);
    if (!equip) {
        cm.sendOkLevel("Dispose", "装备栏第一格是空的。");
        return;
    }
    let equipItemId = equip.getItemId();
    let text = "你想强化#b#t" + equipItemId + "##k #i" + equipItemId + "##k吗？\r\n\r\n";
    if (RINGS_ITEM_ID_LIST.includes(equipItemId)) {
        let equipCurrentLevel = equip.getLevel();
        STAMP_ID_COST_MAP.forEach((cost, itemId) => {
            STAMP_ID_COST_MAP.set(itemId, (equipCurrentLevel + 1) * 5)
        })
        switch(equipCurrentLevel) {
            case 0:
                upgradeProb = 100;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 1:
                upgradeProb = 90;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 2:
                upgradeProb = 80;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 3:
                upgradeProb = 70;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 4:
                upgradeProb = 60;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 5:
                upgradeProb = 50;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 6:
                upgradeProb = 40;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 7:
                upgradeProb = 30;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 8:
                upgradeProb = 20;
                text = buildInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 9:
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
    if (!equip) {
        cm.sendOkLevel("Dispose", "装备栏第一格是空的。");
        return;
    }
    let equipItemId = equip.getItemId();
    let equipCurrentLevel = equip.getLevel();
    if (!RINGS_ITEM_ID_EVOLUTION_LIST.includes(equipItemId)) {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能升阶！");
    } else {
        if (equipCurrentLevel >= 10) {
            STAMP_ID_COST_MAP.forEach((cost, itemId) => {
                STAMP_ID_COST_MAP.set(itemId, 100)
            })
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
    costBronzePlate = 1;
    if (itemCode == null) {
        let text = "请选择一种戒指。"
        cm.sendLastLevel("RingOption0", text);
    } else {
        let itemQuantity = cm.getItemQuantity(BRONZE_PLATE);
        if (itemQuantity < costBronzePlate) {
            cm.sendOkLevel("Dispose", "#r#t" + BRONZE_PLATE + "##k#r#i" + BRONZE_PLATE + "##k不足#r" + costBronzePlate + "#k个！");
        } else if (cm.getItemQuantity(itemCode) > 0
            || cm.getItemQuantity(RINGS_EVOLVE_MAP.get(itemCode)) > 0
            || cm.getItemQuantity(RINGS_EVOLVE_MAP.get(RINGS_EVOLVE_MAP.get(itemCode))) > 0
            || !cm.canHold(itemCode, 1)) {
            cm.sendOkLevel("Dispose", "你已领取过该戒指或者背包空间不足！");
        } else {
            cm.gainItem(BRONZE_PLATE, -costBronzePlate);
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

