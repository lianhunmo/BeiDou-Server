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
const INVENTORY_TYPE_EQUIP = 1;
const EQUIP_SLOT = 1;

const RINGS_ITEM_ID_LIST = [RING_OF_MOON_STONE_1CARATS, RING_OF_SHINING_STAR_1CARATS, GOLD_HEART_RING_1CARATS, RING_OF_SILVER_WING_1CARATS,
    RING_OF_MOON_STONE_2CARATS, RING_OF_SHINING_STAR_2CARATS, GOLD_HEART_RING_2CARATS, RING_OF_SILVER_WING_2CARATS,
    RING_OF_MOON_STONE_3CARATS, RING_OF_SHINING_STAR_3CARATS, GOLD_HEART_RING_3CARATS, RING_OF_SILVER_WING_3CARATS];
const RINGS_ITEM_ID_EVOLUTION_LIST = [RING_OF_MOON_STONE_1CARATS, RING_OF_SHINING_STAR_1CARATS, GOLD_HEART_RING_1CARATS, RING_OF_SILVER_WING_1CARATS,
    RING_OF_MOON_STONE_2CARATS, RING_OF_SHINING_STAR_2CARATS, GOLD_HEART_RING_2CARATS, RING_OF_SILVER_WING_2CARATS];

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

let costMaple;
let costMeso;
let upgradeProb;
let equip;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    let text = "这里可以打造戒指，现在你希望做什么呢？\r\n #r(注：要升级和升阶的戒指需放在背包第一格)#l\r\n\r\n";
    text += "#L0##b领取戒指#k\r\n";
    text += "#L1##b升级戒指#k\r\n";
    text += "#L2##b戒指升阶#k\r\n";

    cm.sendSelectLevel("RingOption", text);
}

function levelRingOption0() {
    let text = "你可以用100枫叶兑换一种戒指：\r\n\r\n";
    text += "#L" + RING_OF_MOON_STONE_1CARATS + "##b#t" + RING_OF_MOON_STONE_1CARATS + "##k #i" + RING_OF_MOON_STONE_1CARATS + "##l\r\n";
    text += "#L" + RING_OF_SHINING_STAR_1CARATS + "##b#t" + RING_OF_SHINING_STAR_1CARATS + "##k #i" + RING_OF_SHINING_STAR_1CARATS + "##l\r\n";
    text += "#L" + GOLD_HEART_RING_1CARATS + "##b#t" + GOLD_HEART_RING_1CARATS + "##k #i" + GOLD_HEART_RING_1CARATS + "##l\r\n";
    text += "#L" + RING_OF_SILVER_WING_1CARATS + "##b#t" + RING_OF_SILVER_WING_1CARATS + "##k #i" + RING_OF_SILVER_WING_1CARATS + "##l\r\n";
    cm.sendNextSelectLevel("ExchangeRing", text);
}

function levelRingOption1() {
    // 通过slot = 1获取到当前戒指等级来判断升级材料
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT);
    let equipItemId = equip.getItemId();
    let text = "你想升级#b#t" + equipItemId + "##k #i" + equipItemId + "##k吗？\r\n\r\n";
    if (RINGS_ITEM_ID_LIST.includes(equipItemId)) {
        let equipCurrentLevel = equip.getLevel();
        switch(equipCurrentLevel) {
            case 0:
                costMaple = 1000;
                costMeso = 1000000;
                upgradeProb = 100;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 1:
                costMaple = 1500;
                costMeso = 2000000;
                upgradeProb = 90;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 2:
                costMaple = 2000;
                costMeso = 3000000;
                upgradeProb = 80;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 3:
                costMaple = 2500;
                costMeso = 4000000;
                upgradeProb = 70;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 4:
                costMaple = 3000;
                costMeso = 5000000;
                upgradeProb = 60;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 5:
                costMaple = 3500;
                costMeso = 6000000;
                upgradeProb = 50;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 6:
                costMaple = 4000;
                costMeso = 7000000;
                upgradeProb = 40;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 7:
                costMaple = 4500;
                costMeso = 8000000;
                upgradeProb = 30;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 8:
                costMaple = 5000;
                costMeso = 9000000;
                upgradeProb = 20;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            case 9:
                costMaple = 5000;
                costMeso = 10000000;
                upgradeProb = 10;
                text += "戒指当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "升级需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "升级成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要升级吗？";
                cm.sendYesNoLevel("Dispose", "RingUpgrade", text);
                break;
            default:
                cm.sendLastLevel("Start", "#r恭喜你！戒指#b#t" + equipItemId + "##k #i" + equipItemId + "##k已满级！可以升阶了#k");
                break;
        }
    } else {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能升级！");
    }
}

function levelRingOption2() {
    // 通过slot = 1获取到当前戒指等级来判断升级材料
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT);
    let equipItemId = equip.getItemId();
    let equipCurrentLevel = equip.getLevel();
    if (!RINGS_ITEM_ID_EVOLUTION_LIST.includes(equipItemId)) {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能升阶！");
    } else {
        if (equipCurrentLevel >= 10) {
            costMaple = 5000;
            costMeso = 50000000;
            upgradeProb = 50;
            let text = "你想将#b#t" + equipItemId + "##k #i" + equipItemId + "##k升阶吗？升阶后可继续升级。\r\n\r\n";
            text += "升阶需要#r" + costMaple + "#k个枫叶和#r" + costMeso + "#k金币。\r\n";
            text += "你当前拥有#b" + cm.getItemQuantity(MAPLE_LEAF) + "#k个枫叶和#b" + cm.getMeso() + "#k金币。\r\n";
            text += "升阶成功率为#r" + upgradeProb + "%#k，确定要升阶吗？";
            cm.sendYesNoLevel("Dispose", "RingEvolution", text);
        } else {
            cm.sendOkLevel("Dispose", "你还未将#b#t" + equipItemId + "##k #i" + equipItemId + "##k升至#r10级#k，不能升阶！");
        }
    }
}
function levelExchangeRing(itemCode) {
    if (itemCode == null) {
        let text = "请选择一种戒指。"
        cm.sendLastLevel("RingOption0", text);
    } else {
        let cost = 100;
        let itemQuantity = cm.getItemQuantity(MAPLE_LEAF);
        if (itemQuantity < cost) {
            cm.sendOkLevel("Dispose", "枫叶不足#r" + cost + "#k个！");
        } else if (cm.getItemQuantity(itemCode) > 0 || !cm.canHold(itemCode, 1)) {
            cm.sendOkLevel("Dispose", "你已领取过该戒指或者背包空间不足！");
        } else {
            let cost = 100;
            cm.gainItem(MAPLE_LEAF, -cost);
            successGain(itemCode);
        }
    }
}

function levelRingUpgrade() {
    let itemQuantity = cm.getItemQuantity(MAPLE_LEAF);
    let meso = cm.getMeso();
    if (itemQuantity < costMaple) {
        cm.sendOkLevel("Dispose", "枫叶不足#r" + costMaple + "#k个！");
    } else if (meso < costMeso) {
        cm.sendOkLevel("Dispose", "金币不足#r" + costMeso + "#k！");
    } else {
        cm.gainItem(MAPLE_LEAF, -costMaple);
        cm.gainMeso(-costMeso);
        let scrollResult = cm.getChar().scrollEquipWithEquipSlot(EQUIP_SLOT, upgradeProb);
        if (scrollResult) {
            cm.sendLastLevel("RingOption1", "升级成功！#r攻击+1 魔攻+1#k");
        } else {
            cm.sendLastLevel("RingOption1", "升级失败。#r攻击-1 魔攻-1#k");
        }
    }
}

function levelRingEvolution() {
    let itemQuantity = cm.getItemQuantity(MAPLE_LEAF);
    let meso = cm.getMeso();
    if (itemQuantity < costMaple) {
        cm.sendOkLevel("Dispose", "枫叶不足#r" + costMaple + "#k个！");
    } else if (meso < costMeso) {
        cm.sendOkLevel("Dispose", "金币不足#r" + costMeso + "#k！");
    } else {
        cm.gainItem(MAPLE_LEAF, -costMaple);
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

