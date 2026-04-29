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
const Lupin_Pig_Belt = 1132011;
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
    Lupin_Pig_Belt,
]

const BAN_ITEM_ID_LIST2 = [
    1008956,
    1008955,
    1008953,
    1008950,
    1008948,
    1008946,
    1008960,
    1008942,
    1008940,
    1008939,
    1008933,
    1008959,
    1008927,
    1008926,
    1008923,
    1008918,
    1008913,
    1008910,
    1008901,
    1008900,
    1008906,
    1008929,
    1009911,
    1009912,
    1009913,
    1009914,
    1009915,
    1009916,
    1009917,
    1009918,
    1009919,
    1009920,
    1009921,
    1009923,
    1009930,
    1009943,
    1009922,
    1009924,
    1009927,
    1009937,
    1009938,
    1009939,
    1009928,
    1009929,
    1009931,
    1009932,
    1009925,
    1009926,
    1009934,
    1009933,
    1009935,
    1009936,
    1009940,
    1009941,
    1009942,
    1009944,
    1009945,
    1009946,
    1009947,
    1009948,
    1009949,
    1009950,
    1009951,
    1009952,
    1009953,
    1009954,
    1009955,
    1009956,
    1009957,
    1009958,
    1009959,
    1009960,
    1009961,
    1009962,
    1009963,
    1009964,
    1009965,
    1009966,
    1009967,
    1009968,
    1009969,
    1009970,
    1009971,
    1009972,
    1009973,
    1009974,
    1009975,
    1009976,
    1009977,
    1009978,
    1009979,
    1009980,
    1009981,
    1009982,
    1009983,
    1009984,
    1009985,
    1009986,
    1009987,
    1009988,
    1009989,
    1009990,
    1009991,
    1009992,
    1009993,
    1009994,
    1009995,
    1009996,
    1009997,
    1009998,
    1009999,
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
    let expiration = equip.getExpiration();
    let equipItemId = equip.getItemId();
    if (BAN_ITEM_ID_LIST2.includes(equipItemId) && expiration != -1) {
        cm.sendOkLevel("Dispose", "试用点装#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能强化！");
        return;
    }
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
                costMaple = 10;
                costMeso = 2000000;
                upgradeProb = 90;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 2:
                costMaple = 10;
                costMeso = 3000000;
                upgradeProb = 80;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 3:
                costMaple = 10;
                costMeso = 4000000;
                upgradeProb = 70;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 4:
                costMaple = 10;
                costMeso = 5000000;
                upgradeProb = 60;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 5:
                costMaple = 10;
                costMeso = 6000000;
                upgradeProb = 50;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 6:
                costMaple = 10;
                costMeso = 7000000;
                upgradeProb = 40;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 7:
                costMaple = 10;
                costMeso = 8000000;
                upgradeProb = 30;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 8:
                costMaple = 10;
                costMeso = 9000000;
                upgradeProb = 20;
                text += "点装当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
                text += "强化需要#r" + costMaple + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#r" + costMeso + "#k金币。\r\n";
                text += "你当前拥有#b" + cm.getItemQuantity(GOLD_MAPLE_LEAF) + "#k个#r#t" + GOLD_MAPLE_LEAF + "##k#r#i" + GOLD_MAPLE_LEAF + "##k和#b" + cm.getMeso() + "#k金币。\r\n";
                text += "强化成功率为#r" + upgradeProb + "%#k，失败将#r退回一级#k，确认要强化吗？";
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 9:
                costMaple = 10;
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
    let expiration = equip.getExpiration();
    if (BAN_ITEM_ID_LIST2.includes(equipItemId) && expiration != -1) {
        cm.sendOkLevel("Dispose", "试用点装#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能转移属性！");
        return;
    }
    let toEquipItemId = toEquip.getItemId();
    let toExpiration = toEquip.getExpiration();
    if (BAN_ITEM_ID_LIST2.includes(toEquipItemId) && toExpiration != -1) {
        cm.sendOkLevel("Dispose", "试用点装#b#t" + toEquipItemId + "##k #i" + toEquipItemId + "##k不能被转移属性！");
        return;
    }

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
        let states = new Map ([
            ["PAD", 2],
            ["MAD", 8]
        ])
        let scrollResult = cm.getChar().scrollEquipWithEquipSlot(EQUIP_SLOT_1, upgradeProb, true, states);
        if (scrollResult) {
            cm.sendLastLevel("CashEquipOption0", "强化成功！#r攻击+2 魔攻+8#k");
        } else {
            cm.sendLastLevel("CashEquipOption0", "强化失败。#r攻击-2 魔攻-8#k");
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

