/**
 * @description 金猪腰带（BOSS材料收集玩法）
 * @author Geoffrey
 */

const INVENTORY_TYPE_EQUIP = 1;
const EQUIP_SLOT_1 = 1;

const BOSS_ITEM_LIST = [
    2210006, // 彩虹色蜗牛壳儿
    4000124, // 战甲吹泡泡鱼的内存卡
    4032474, // 歇尔夫的珍珠
    4000419, // 紫色液体
    4000040, // 蘑菇王芽孢
    4000176, // 毒菇
    4000418, // 无用的机器心脏
    4031906, // 炎魔之爪
    4000235, // 喷火龙的尾巴
    4000243, // 格瑞芬多角
    4000460, // 古代头盔
    4000461, // 骑士面具
    4000462, // 守护兽之角
    4000175, // 皮亚奴斯模型
    4001024, // 鲁碧安
    4000224, // 木屐
    4000094, // 老板的名牌
    4000138, // 女老板的梳子
    4000385, // 心灯
    4021010 // 时间之石
]
const BOSS_CARD_LIST = [
    2388023, // 扎昆卡片
    2388022, // 闹钟卡片
    2388020, // 鱼王卡片
    2388024, // 黑龙王卡片
    2388043, // 品客缤卡片
    2388055, // 巨蝙蝠卡片
    2388054, // 小吃店卡片
    2388053, // 蓝蘑菇卡片
    2388016, // 驮狼雪人卡片
    2388005, // 提莫卡片
    2388033, // 大海兽卡片
    2388052, // 巨型蜈蚣卡片
    2388013, // 妖怪绅士卡片
    2388039, // 剧毒石头人卡片
    2388014, // 法兰肯卡片
    2388029, // 大宇卡片
    2388015, // 艾利杰卡片
    2388010, // 肯德熊卡片
    2388009, // 九尾狐卡片
    2384022, // 蓝色鬼怪卡片
    2384021, // 黄色鬼怪卡片
    2384023, // 绿色鬼怪卡片
    2388026, // 蝙蝠怪卡片
    2388003, // 冰海螺蟹卡片
    2388017, // 蝙蝠魔卡片
    2388002, // 浮士德卡片
    2388008, // 僵尸蘑菇王卡片
    2388025, // 树妖王卡片
    2388000 // 红蜗牛王卡片
]

const BELT_EXCHANGE_ITEM_COST_MAP = new Map([
    [2210006, 10],
    [4000124, 10],
    [4032474, 10],
    [4000419, 10],
    [2388000, 1],
    [2388025, 1],
    [2388008, 1],
    [2388002, 1],
]);

let BELT_UPGRADE_ITEM_COST_MAP = new Map([
    [2210006, 20],
    [4000124, 20],
    [4032474, 20],
    [4000419, 20],
    [2388000, 2],
    [2388025, 2],
    [2388008, 2],
    [2388002, 2],
]);

const Lupin_Pig_Belt = 1132011;

let costMeso = 0;
let upgradeProb = 100;
let equip;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    let text = "这里可以兑换金猪腰带，现在你希望做什么呢？\r\n #r(注：要强化的装备需放在背包第一格)#l\r\n\r\n";
    text += "#L1##b兑换金猪腰带#k\r\n";
    text += "#L0##b强化金猪腰带#k\r\n";

    cm.sendSelectLevel("CashEquipOption", text);
}

function levelCashEquipOption0() {
    // 通过slot = 1获取到当前金猪腰带等级来判断强化材料
    equip = cm.getChar().getInventory(INVENTORY_TYPE_EQUIP).getItem(EQUIP_SLOT_1);
    if (!equip) {
        cm.sendOkLevel("Dispose", "装备栏第一格是空的。");
        return;
    }
    let equipItemId = equip.getItemId();
    let text = "你想强化#b#t" + equipItemId + "##k #i" + equipItemId + "##k吗？\r\n\r\n";
    if (Lupin_Pig_Belt == equipItemId) {
        let equipCurrentLevel = equip.getLevel();
        switch(equipCurrentLevel) {
            case 0:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [2210006, 20],// 彩虹色蜗牛壳儿
                    [4000124, 20],// 战甲吹泡泡鱼的内存卡
                    [4032474, 20],// 歇尔夫的珍珠
                    [4000419, 20],// 紫色液体
                    [2388000, 2],// 浮士德卡片
                    [2388025, 2],// 僵尸蘑菇王卡片
                    [2388008, 2],// 树妖王卡片
                    [2388002, 2],// 红蜗牛王卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 1:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4000040, 20],// 蘑菇王芽孢
                    [4000176, 20],// 毒菇
                    [4000418, 20],// 无用的机器心脏
                    [4031906, 20],// 炎魔之爪
                    [2388017, 2],// 蝙蝠怪卡片
                    [2388003, 2],// 冰海螺蟹卡片
                    [2388026, 2],// 蝙蝠魔卡片
                    [2388009, 2],// 九尾狐卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 2:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4000235, 20],// 喷火龙的尾巴
                    [4000243, 20],// 格瑞芬多角
                    [4000460, 20],// 古代头盔
                    [4000461, 20],// 骑士面具
                    [2384023, 2],// 蓝色鬼怪卡片
                    [2384021, 2],// 黄色鬼怪卡片
                    [2384022, 2],// 绿色鬼怪卡片
                    [2388010, 2],// 肯德熊卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 3:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4000462, 20],// 守护兽之角
                    [4000175, 20],// 皮亚奴斯模型
                    [4001024, 20],// 鲁碧安
                    [4000224, 20],// 木屐
                    [2388039, 2],// 剧毒石头人卡片
                    [2388014, 2],// 法兰肯卡片
                    [2388029, 2],// 大宇卡片
                    [2388015, 2],// 艾利杰卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 4:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4000224, 20],// 木屐
                    [4000094, 20],// 老板的名牌
                    [4000138, 20],// 女老板的梳子
                    [4000385, 20],// 心灯
                    [2388005, 2],// 提莫卡片
                    [2388033, 2],// 大海兽卡片
                    [2388052, 2],// 巨型蜈蚣卡片
                    [2388013, 2],// 妖怪绅士卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 5:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [2210006, 30],// 彩虹色蜗牛壳儿
                    [4000124, 30],// 战甲吹泡泡鱼的内存卡
                    [4032474, 30],// 歇尔夫的珍珠
                    [4000419, 30],// 紫色液体
                    [2388000, 3],// 浮士德卡片
                    [2388025, 3],// 僵尸蘑菇王卡片
                    [2388008, 3],// 树妖王卡片
                    [2388002, 3],// 红蜗牛王卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 6:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4000040, 30],// 蘑菇王芽孢
                    [4000176, 30],// 毒菇
                    [4000418, 30],// 无用的机器心脏
                    [4031906, 30],// 炎魔之爪
                    [2388017, 3],// 蝙蝠怪卡片
                    [2388003, 3],// 冰海螺蟹卡片
                    [2388026, 3],// 蝙蝠魔卡片
                    [2388009, 3],// 九尾狐卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 7:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4000235, 30],// 喷火龙的尾巴
                    [4000243, 30],// 格瑞芬多角
                    [4000460, 30],// 古代头盔
                    [4000461, 30],// 骑士面具
                    [2384023, 3],// 蓝色鬼怪卡片
                    [2384021, 3],// 黄色鬼怪卡片
                    [2384022, 3],// 绿色鬼怪卡片
                    [2388010, 3],// 肯德熊卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 8:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4000175, 40],// 皮亚奴斯模型
                    [4000385, 40],// 老板的名牌
                    [4000138, 40],// 女老板的梳子
                    [4000385, 40],// 心灯
                    [2388023, 4],// 扎昆卡片
                    [2388022, 4],// 闹钟卡片
                    [2388020, 4],// 鱼王卡片
                    [2388013, 4],// 巨蝙蝠卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            case 9:
                BELT_UPGRADE_ITEM_COST_MAP = new Map([
                    [4001024, 40],// 鲁碧安
                    [4000460, 40],// 古代头盔
                    [4000175, 40],// 皮亚奴斯模型
                    [4021010, 2],// 时间之石
                    [2388024, 2],// 黑龙王卡片
                    [2388023, 2],// 扎昆卡片
                    [2388022, 4],// 闹钟卡片
                    [2388043, 2],// 品客缤卡片
                ]);
                text = buildUpgradeInfoMessage(text, equipCurrentLevel);
                cm.sendYesNoLevel("Dispose", "CashEquipUpgrade", text);
                break;
            default:
                cm.sendLastLevel("Dispose", "#r恭喜你！#b#t" + equipItemId + "##k #i" + equipItemId + "##k已满级！#k");
                break;
        }
    } else {
        cm.sendOkLevel("Dispose", "#b#t" + equipItemId + "##k #i" + equipItemId + "##k不能强化！");
    }
}

function levelCashEquipOption1() {
    let text = "你想兑换兑换金猪腰带吗？\r\n\r\n";
    text = buildExchangeInfoMessage(text);
    cm.sendYesNoLevel("Dispose", "ExchangeBelt", text);
}

function levelCashEquipUpgrade() {
    let checkResult = true;
    let text = "";
    BELT_UPGRADE_ITEM_COST_MAP.forEach((cost, itemId) => {
        if (cost !== 0) {
            let textTemp = checkItems(itemId, cost);
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
    BELT_UPGRADE_ITEM_COST_MAP.forEach((cost, itemId) => {
        if (cost > 0) {
            cm.gainItem(itemId, -cost);
        }
    });

    let states = new Map ([
        ["PAD", 2],
        ["MAD", 4],
        ["STR", 20],
        ["DEX", 20],
        ["INT", 20],
        ["LUK", 20],
    ])
    let scrollResult = cm.getChar().scrollEquipWithEquipSlot(EQUIP_SLOT_1, upgradeProb, false, states);
    if (scrollResult) {
        cm.sendLastLevel("CashEquipOption0", "强化成功！");
    }
}

function checkItems(itemId, cost) {
    let itemQuantity = cm.getItemQuantity(itemId);
    let text = "";
    if (itemQuantity < cost) {
        text = "#b#t" + itemId + "##k#i" + itemId + "#不足#r" + cost + "#k个\r\n";
        return text;
    }
    return null;
}

function levelExchangeBelt() {
    let checkResult = true;
    let text = "";
    BELT_EXCHANGE_ITEM_COST_MAP.forEach((cost, itemId) => {
        if (cost !== 0) {
            let textTemp = checkItems(itemId, cost);
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
    if (cm.getItemQuantity(Lupin_Pig_Belt) > 0 || !cm.canHold(Lupin_Pig_Belt, 1)) {
        cm.sendOkLevel("Dispose", "你已领取过该腰带或者背包空间不足！");
    } else {
        BELT_EXCHANGE_ITEM_COST_MAP.forEach((cost, itemId) => {
            if (cost > 0) {
                cm.gainItem(itemId, -cost);
            }
        });
        successGain(Lupin_Pig_Belt);
    }
}

function buildExchangeInfoMessage(text) {
    text += "兑换金猪腰带需要：\r\n";
    BELT_EXCHANGE_ITEM_COST_MAP.forEach((cost, itemId) => {
        text += buildStampsNeedText(itemId, cost);
    });
    text += "你当前拥有:\r\n";
    BELT_EXCHANGE_ITEM_COST_MAP.forEach((cost, itemId) => {
        text += buildStampsHaveText(itemId, cost);
    });
    text += "确认要兑换#r#z" + Lupin_Pig_Belt + "##k#r#i" + Lupin_Pig_Belt + "##k吗？";
    return text;
}

function buildUpgradeInfoMessage(text, equipCurrentLevel) {
    text += "金猪腰带当前等级为#b" + equipCurrentLevel + "#k级。\r\n";
    text += "强化需要:\r\n";
    BELT_UPGRADE_ITEM_COST_MAP.forEach((cost, itemId) => {
        text += buildStampsNeedText(itemId, cost);
    })
    text += "你当前拥有:\r\n";
    BELT_UPGRADE_ITEM_COST_MAP.forEach((cost, itemId) => {
        text += buildStampsHaveText(itemId, cost);
    })
    text += "确认要强化吗？";
    return text;
}

function buildStampsNeedText(itemId, cost) {
    let text = "";
    if (cost !== 0) {
        text += "#r" + cost + "#k个#r#t" + itemId + "##k#r#i" + itemId + "##k\r\n";
    }
    return text;
}

function buildStampsHaveText(itemId, cost) {
    let text = "";
    if (cost !== 0) {
        text += "#b" + cm.getItemQuantity(itemId) + "#k个#b#t" + itemId + "##k#b#i" + itemId + "##k\r\n";
    }
    return text;
}

function successGain(itemCode) {
    cm.gainItem(itemCode, 1);
    cm.sendOkLevel("Dispose", "兑换成功！");
}

function levelDispose() {
    cm.dispose();
}

