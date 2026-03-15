/**
 * @description 点装强化
 * @author Geoffrey
 */
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
const MOB_CARD_RING_1 = 1112880;
const MOB_CARD_RING_2 = 1112881;
const MOB_CARD_RING_3 = 1112882;
const MOB_CARD_RING_4 = 1112883;
const MOB_CARD_RING_5 = 1112884;
const MOB_CARD_RING_6 = 1112885;
const MOB_CARD_RING_7 = 1112886;
const MOB_CARD_RING_8 = 1112887;
const MOB_CARD_RING_9 = 1112888;
const MOB_CARD_RING_10 = 1112889;
const BAN_ITEM_ID_LIST = [
    MEDAL_CODE_1,
    MEDAL_CODE_2,
    MEDAL_CODE_3,
    MEDAL_CODE_4,
    MEDAL_CODE_5,
    MEDAL_CODE_6,
    MEDAL_CODE_7,
    MEDAL_CODE_8,
    MEDAL_CODE_9,
    MEDAL_CODE_10,
    MOB_CARD_RING_1,
    MOB_CARD_RING_2,
    MOB_CARD_RING_3,
    MOB_CARD_RING_4,
    MOB_CARD_RING_5,
    MOB_CARD_RING_6,
    MOB_CARD_RING_7,
    MOB_CARD_RING_8,
    MOB_CARD_RING_9,
    MOB_CARD_RING_10,
]

const GOLD_MAPLE_LEAF = 4000313;
const INVENTORY_TYPE_EQUIP = 1;
const EQUIP_SLOT_1 = 1;
const EQUIP_SLOT_2 = 2;
const ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
let ii = ItemInformationProvider.getInstance();

let costMaple;
let costMeso;
let upgradeProb;
let equip;
let toEquip;

function start() {
    levelStart();
}

function levelStart() {
    let text = "这里可以强化点装和转移点装属性，你希望做什么呢？\r\n " +
        "#r(注：要强化和转出属性的点装需放在背包第一格, 要转入属性的点装放在第二格。)#l\r\n\r\n";
    text += "#L0##b强化点装#k\r\n";
    text += "#L1##b属性转移#k\r\n";

    cm.sendSelectLevel("CashEquipOption", text);
}

function levelCashEquipOption0() {
    // 通过slot = 1获取到当前点装等级来判断强化材料
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT_1);
    if (!equip) {
        cm.sendOkLevel("Dispose", "装备栏第一格是空的。");
        return;
    }
    let equipItemId = equip.getItemId();
    let text = "你想强化#b#t" + equipItemId + "##k #i" + equipItemId + "##k吗？\r\n\r\n";
    if (ii.isCash(equipItemId)) {
        let equipCurrentLevel = equip.getLevel();
        switch(equipCurrentLevel) {
            case 0:
                costMaple = 10;
                costMeso = 1000000;
                upgradeProb = 100;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 1:
                costMaple = 15;
                costMeso = 2000000;
                upgradeProb = 90;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 2:
                costMaple = 20;
                costMeso = 3000000;
                upgradeProb = 80;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 3:
                costMaple = 25;
                costMeso = 4000000;
                upgradeProb = 70;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 4:
                costMaple = 30;
                costMeso = 5000000;
                upgradeProb = 60;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 5:
                costMaple = 35;
                costMeso = 6000000;
                upgradeProb = 50;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 6:
                costMaple = 40;
                costMeso = 7000000;
                upgradeProb = 40;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 7:
                costMaple = 45;
                costMeso = 8000000;
                upgradeProb = 30;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 8:
                costMaple = 50;
                costMeso = 9000000;
                upgradeProb = 20;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 9:
                costMaple = 50;
                costMeso = 10000000;
                upgradeProb = 10;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            default:
                cm.sendLastLevel("Start", "#r恭喜你！点装#b#t" + equipItemId + "##k #i" + equipItemId + "##k已满级！#k");
                break;
        }
    } else {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能强化！");
    }
}

function levelCashEquipOption1() {
    // 通过slot = 1获取到要转移属性的点装
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT_1);
    if (!equip) {
        cm.sendOkLevel("Dispose", "装备栏第一格是空的。");
        return;
    }
// 通过slot = 2获取到继承属性的点装
    toEquip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT_2);
    if (!toEquip) {
        cm.sendOkLevel("Dispose", "装备栏第二格是空的。");
        return;
    }
    let equipItemId = equip.getItemId();
    let toEquipItemId = toEquip.getItemId();
    if (!ii.isCash(equipItemId) || BAN_ITEM_ID_LIST.includes(equipItemId)) {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能转移属性！");
    } else if(!ii.isCash(toEquipItemId) || BAN_ITEM_ID_LIST.includes(toEquipItemId)) {
        cm.sendOkLevel("Dispose", "#b#t" + toEquipItemId + "##k #i" + toEquipItemId + "##k不能接受属性转移！");
    } else {
        costMeso = 2000000;
        let text = "你想将#b#t" + equipItemId + "##k #i" + equipItemId + "##k的属性转移到#b#t" + toEquipItemId + "##k #i" + toEquipItemId + "##k吗？。\r\n\r\n";
        text += "转移属性需要#r" + costMeso + "#k金币。\r\n";
        text += "你当前拥有#b" + cm.getMeso() + "#k金币。\r\n";
        cm.sendYesNoLevel("Dispose", "ExtendCashAttribute", text);
    }
}

function levelCashEquipUpgrade() {
    let itemQuantity = cm.getItemQuantity(GOLD_MAPLE_LEAF);
    let meso = cm.getMeso();
    if (itemQuantity < costMaple) {
        cm.sendOkLevel("Dispose", "#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k不足#r" + costMaple + "#k个！");
    } else if (meso < costMeso) {
        cm.sendOkLevel("Dispose", "金币不足#r" + costMeso + "#k！");
    } else {
        cm.gainItem(GOLD_MAPLE_LEAF, -costMaple);
        cm.gainMeso(-costMeso);
        let scrollResult = cm.getChar().scrollEquipWithEquipSlot(EQUIP_SLOT_1, upgradeProb);
        if (scrollResult) {
            cm.sendLastLevel("CashEquipOption0", "强化成功！#r攻击+1 魔攻+1#k");
        } else {
            cm.sendLastLevel("CashEquipOption0", "强化失败。#r攻击-1 魔攻-1#k");
        }
    }
}

function levelExtendCashAttribute() {
    let meso = cm.getMeso();
    if (meso < costMeso) {
        cm.sendOkLevel("Dispose", "金币不足#r" + costMeso + "#k！");
    } else {
        cm.gainMeso(-costMeso);
        let scrollResult = cm.getChar().extendAttributeWithEquipSlot(EQUIP_SLOT_1, EQUIP_SLOT_2, 100);
        if (scrollResult) {
            cm.sendOkLevel("Dispose", "转移属性成功！");
        } else {
            cm.sendLastLevel("CashEquipOption1", "转移属性失败。");
        }
    }
}

function levelDispose() {
    cm.dispose();
}

