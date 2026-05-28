/**
 * @description 各种装备合成消消乐
 * @author Geoffrey
 */

const INVENTORY_TYPE_EQUIP = 1;

const GIANT_EYE_LIST = [
    1022228,
    1022224,
    1022225,
    1022226
]

const EXCHANGE_ITEM_COST_MAP = new Map([
    [1022228, 3],
    [1022224, 3],
    [1022225, 3]
]);

let costEquipId;
let gainEquipId;
let costItemCount;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    let text = "这里可以进行多种装备合成，请问你想做什么呢？\r\n\r\n";
    text += "#L0##b合成独眼巨人之眼#k\r\n";
    // text += "#L1##b合成冒险之心#k\r\n";

    cm.sendSelectLevel("SynthesizeEquipment", text);
}

function levelSynthesizeEquipment0() {
    let text = "你希望合成什么等级的？\r\n\r\n";
    for (let i = 0; i < GIANT_EYE_LIST.length-1; i++) {
        text += `#L${i}##b合成#z${GIANT_EYE_LIST[i+1]}##k\r\n`;
    }
    cm.sendNextSelectLevel("SynthesizeGiantEye", text);
}

function levelSynthesizeGiantEye(choose) {
    let text = `合成#b#z${GIANT_EYE_LIST[choose+1]}##k需要消耗 #r${EXCHANGE_ITEM_COST_MAP.get(GIANT_EYE_LIST[choose])}#k 个#b#z${GIANT_EYE_LIST[choose]}##k  \r\n\r\n`;
    text += `#r合成会优先消耗背包装备栏靠前的装备，是否确定要合成？#k\r\n`;
    costEquipId = GIANT_EYE_LIST[choose];
    gainEquipId = GIANT_EYE_LIST[choose+1];
    costItemCount = EXCHANGE_ITEM_COST_MAP.get(GIANT_EYE_LIST[choose]);
    cm.sendYesNoLevel("Dispose", "ConfirmSynthesis", text);
}

function levelConfirmSynthesis() {
    let haveItemCount = cm.getItemQuantity(costEquipId);
    if (haveItemCount < costItemCount) {
        cm.sendOkLevel("Dispose", `你身上的#b#z${costEquipId}##k不够#r${costItemCount}个#k。`);
    } else {
        cm.gainItem(costEquipId, -costItemCount);
        successGain(gainEquipId);
    }
}

function successGain(itemCode) {
    cm.gainItem(itemCode, 1);
    cm.sendOkLevel("Dispose", `合成#b#z${itemCode}##k成功！ \r\n\r\n`);
}

function levelDispose() {
    cm.dispose();
}

