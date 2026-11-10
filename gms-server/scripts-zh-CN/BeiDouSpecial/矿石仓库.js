let stones = Array();
const MAX_STORAGE = 30000;

let itemlist = Array(
    4005000,
    4005001,
    4005002,
    4005003,
    4005004,
    4021000,
    4021001,
    4021002,
    4021003,
    4021004,
    4021005,
    4021006,
    4021007,
    4021008,
    4011008,
    4011006,
    4011005,
    4011004,
    4011003,
    4011002,
    4011001,
    4011000,
    4011007,
    4021009,
);
let itemlist1 = Array(
    4004000,
    4004001,
    4004002,
    4004003,
    4004004,
    4010000,
    4010001,
    4010002,
    4010003,
    4010004,
    4010005,
    4010006,
    4010007,
    4020000,
    4020001,
    4020002,
    4020003,
    4020004,
    4020005,
    4020006,
    4020007,
    4020008,
);

// 用于记录 sendGetNumber 之后待处理的操作
let pendingAction = null;

function start() {
    levelStart();
}

/**
 * 主菜单
 * #L0# 存放成品矿石   #L1# 取回成品矿石
 * #L2# 一键存放成品矿石
 * #L3# 存放散装母矿   #L4# 取回散装母矿
 * #L5# 一键存放散装母矿
 */
function levelStart() {
    let text = "       #L0#存放成品矿石#l\t    #L1#取回成品矿石#l\r\n\r\n";
    text += "       #L3##k存放散装母矿#l\t    #L4#取回散装母矿#l\r\n\r\n";
    text +=
        "     #L2##r一键存放成品矿石#l    #L5##r一键存放散装母矿#l\r\n\r\n";
    cm.sendSelectLevel("MainMenu", text);
}

function levelMainMenu0() {
    let text = "请选择所要存放的矿石：\r\n";
    for (let i = 0; i < itemlist.length; i++) {
        if (!cm.haveItem(itemlist[i])) {
            continue;
        }
        text += `#L${i}##k存放：#b#v${itemlist[i]}##z${itemlist[i]}##l\r\n\r\n`;
        text += ` #d- 当前背包内拥有：#r#c${itemlist[i]}##d 个。\r\n`;
        if (i != 0 && (i + 1) % 99 == 0) {
            text += "\r\n";
        }
    }
    text += `#L999##b离开#k#l\r\n\r\n`;
    cm.sendNextSelectLevel("StoreSelect", text);
}

function levelMainMenu1() {
    let text = "请选择所要取回的矿石：\r\n";
    for (let i = 0; i < itemlist.length; i++) {
        let num = cm.getPlayer().getCharacterStorageInteger(itemlist[i], 0);
        if (num < 1) {
            continue;
        }
        text += `#L${i}##k取回：#b#v${itemlist[i]}##z${itemlist[i]}##l\r\n\r\n`;
        text += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
        if (i != 0 && (i + 1) % 99 == 0) {
            text += "\r\n";
        }
    }
    text += `#L999##b离开#k#l\r\n\r\n`;
    cm.sendNextSelectLevel("WithdrawSelect", text);
}

function levelMainMenu2() {
    let text = "请确定所要存放的矿石：\r\n";
    let havestone = 0;
    for (let i = 0; i < itemlist.length; i++) {
        stones[i] = cm.getPlayer().getItemQuantity(itemlist[i], false);
        if (stones[i] != 0) {
            text += ` #v${itemlist[i]}# X ${stones[i]}  `;
            havestone++;
        }
    }
    if (havestone == 0) {
        cm.sendOkLevel("Dispose", "你的背包里没有任何矿石.");
    } else {
        cm.sendYesNoLevel("Dispose", "AutoStore", text);
    }
}

function levelMainMenu3() {
    let text = "请选择所要存放的母矿：\r\n";
    for (let i = 0; i < itemlist1.length; i++) {
        if (!cm.haveItem(itemlist1[i])) {
            continue;
        }
        text += `#L${i}##k存放：#b#v${itemlist1[i]}##z${itemlist1[i]}##l\r\n\r\n`;
        text += ` #d- 当前背包内拥有：#r#c${itemlist1[i]}##d 个。\r\n`;
        if (i != 0 && (i + 1) % 99 == 0) {
            text += "\r\n";
        }
    }
    text += `#L999##b离开#k#l\r\n\r\n`;
    cm.sendNextSelectLevel("StoreMotherSelect", text);
}

function levelMainMenu4() {
    let text = "请选择所要取回的母矿：\r\n";
    for (let i = 0; i < itemlist1.length; i++) {
        let num = cm.getPlayer().getCharacterStorageInteger(itemlist1[i], 0);
        if (num < 1) {
            continue;
        }
        text += `#L${i}##k取回：#b#v${itemlist1[i]}##z${itemlist1[i]}##l\r\n\r\n`;
        text += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
        if (i != 0 && (i + 1) % 99 == 0) {
            text += "\r\n";
        }
    }
    text += `#L999##b离开#k#l\r\n\r\n`;
    cm.sendNextSelectLevel("WithdrawMotherSelect", text);
}

function levelMainMenu5() {
    let text = "请确定所要存放的母矿：\r\n";
    let havestone = 0;
    for (let i = 0; i < itemlist1.length; i++) {
        stones[i] = cm.getPlayer().getItemQuantity(itemlist1[i], false);
        if (stones[i] != 0) {
            text += ` #v${itemlist1[i]}# X ${stones[i]}  `;
            havestone++;
        }
    }
    if (havestone == 0) {
        cm.sendOkLevel("Dispose", "你的背包里没有任何母矿.");
    } else {
        cm.sendYesNoLevel("Dispose", "AutoStoreMother", text);
    }
}

/**
 * 成品矿石 - 存放选择回调
 */
function levelStoreSelect(selection) {
    if (selection == 999) {
        cm.dispose();
        return;
    }
    let itemId = itemlist[selection];
    let txt = ` - 当前存放矿石：#r#i${itemId}##l\r\n\r\n`;
    txt += ` #d- 当前背包内拥有：#r#c${itemId}##d 个。\r\n`;
    txt += " #k- 请输入存放道具的数值：\r\n\r\n";
    let numbera = Math.min(cm.itemQuantity(itemId), MAX_STORAGE);
    pendingAction = { type: "store", index: selection };
    cm.sendGetNumber(txt, numbera, 1, numbera);
}

/**
 * 成品矿石 - 取回选择回调
 */
function levelWithdrawSelect(selection) {
    if (selection == 999) {
        cm.dispose();
        return;
    }
    let itemId = itemlist[selection];
    let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);
    let txt = ` - 当前取出矿石：#r#i${itemId}##l\r\n\r\n`;
    txt += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
    txt += " #k- 请输入取出道具的数值：\r\n\r\n";
    let numbera = Math.min(num, MAX_STORAGE);
    pendingAction = { type: "withdraw", index: selection };
    cm.sendGetNumber(txt, numbera, 1, numbera);
}

/**
 * 散装母矿 - 存放选择回调
 */
function levelStoreMotherSelect(selection) {
    if (selection == 999) {
        cm.dispose();
        return;
    }
    let itemId = itemlist1[selection];
    let txt = ` - 当前存放母矿：#r#i${itemId}##l\r\n\r\n`;
    txt += ` #d- 当前背包内拥有：#r#c${itemId}##d 个。\r\n`;
    txt += " #k- 请输入存放母矿的数值：\r\n\r\n";
    let numbera = Math.min(cm.itemQuantity(itemId), MAX_STORAGE);
    pendingAction = { type: "storeMother", index: selection };
    cm.sendGetNumber(txt, numbera, 1, numbera);
}

/**
 * 散装母矿 - 取回选择回调
 */
function levelWithdrawMotherSelect(selection) {
    if (selection == 999) {
        cm.dispose();
        return;
    }
    let itemId = itemlist1[selection];
    let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);
    let txt = ` - 当前取出母矿：#r#i${itemId}##l\r\n\r\n`;
    txt += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
    txt += " #k- 请输入取出母矿的数值：\r\n\r\n";
    let numbera = Math.min(num, MAX_STORAGE);
    pendingAction = { type: "withdrawMother", index: selection };
    cm.sendGetNumber(txt, numbera, 1, numbera);
}

/**
 * 成品矿石 - 执行单件存入
 */
function levelStoreQuantity(quantity, index) {
    let itemId = itemlist[index];
    let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);

    if (quantity > cm.itemQuantity(itemId)) {
        cm.sendOkLevel("Dispose", "背包内没有足够的矿石.");
    } else if (num + quantity > MAX_STORAGE) {
        cm.sendOkLevel("Dispose", "存储数量不能大于3W！");
    } else {
        cm.gainItem(itemId, -quantity);
        cm.getPlayer().setCharacterStorageInteger(itemId, num + quantity);
        cm.sendOkLevel("MainMenu0", `存入 #z${itemId}# x ${quantity} 成功。`);
    }
}

/**
 * 成品矿石 - 执行单件取出
 */
function levelWithdrawQuantity(quantity, index) {
    let itemId = itemlist[index];
    let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);

    if (num < quantity) {
        cm.sendOkLevel("Dispose", "仓库内没有足够的矿石.");
    } else if (cm.canHold(itemId, quantity)) {
        cm.gainItem(itemId, quantity);
        cm.getPlayer().setCharacterStorageInteger(itemId, num - quantity);
        cm.sendOkLevel("MainMenu1", `取出 #z${itemId}# x ${quantity} 成功。`);
    } else {
        cm.sendOkLevel("Dispose", "背包空间不足，无法取出矿石.");
    }
}

/**
 * 散装母矿 - 执行单件存入
 */
function levelStoreMotherQuantity(quantity, index) {
    let itemId = itemlist1[index];
    let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);

    if (quantity > cm.itemQuantity(itemId)) {
        cm.sendOkLevel("Dispose", "背包内没有足够的母矿.");
    } else if (num + quantity > MAX_STORAGE) {
        cm.sendOkLevel("Dispose", "存储数量不能大于3W！");
    } else {
        cm.gainItem(itemId, -quantity);
        cm.getPlayer().setCharacterStorageInteger(itemId, num + quantity);
        cm.sendOkLevel("MainMenu3", `存入 #z${itemId}# x ${quantity} 成功。`);
    }
}

/**
 * 散装母矿 - 执行单件取出
 */
function levelWithdrawMotherQuantity(quantity, index) {
    let itemId = itemlist1[index];
    let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);

    if (num < quantity) {
        cm.sendOkLevel("Dispose", "仓库内没有足够的母矿.");
    } else if (cm.canHold(itemId, quantity)) {
        cm.gainItem(itemId, quantity);
        cm.getPlayer().setCharacterStorageInteger(itemId, num - quantity);
        cm.sendOkLevel("MainMenu4", `取出 #z${itemId}# x ${quantity} 成功。`);
    } else {
        cm.sendOkLevel("Dispose", "背包空间不足，无法取出母矿.");
    }
}

/**
 * 一键存放成品矿石
 */
function levelAutoStore() {
    let havestone = 0;
    let text1 = "成功存入\r\n";

    for (let i = 0; i < itemlist.length; i++) {
        stones[i] = cm.getPlayer().getItemQuantity(itemlist[i], false);
        if (stones[i] != 0) {
            let num = cm.getPlayer().getCharacterStorageInteger(itemlist[i], 0);
            if (num + stones[i] > MAX_STORAGE) {
                continue; // 存储数量要超出的，直接不存。
            }
            cm.gainItem(itemlist[i], -stones[i]);
            cm.getPlayer().setCharacterStorageInteger(
                itemlist[i],
                num + stones[i],
            );
            text1 += `#v${itemlist[i]}# X ${stones[i]}  `;
            havestone++;
        }
    }

    if (havestone != 0) {
        cm.sendOkLevel("Dispose", text1);
    } else {
        cm.sendOkLevel("Dispose", "你的背包里没有任何矿石.");
    }
}

/**
 * 一键存放散装母矿
 */
function levelAutoStoreMother() {
    let havestone = 0;
    let text1 = "成功存入\r\n";

    for (let i = 0; i < itemlist1.length; i++) {
        stones[i] = cm.getPlayer().getItemQuantity(itemlist1[i], false);
        if (stones[i] != 0) {
            let num = cm.getPlayer().getCharacterStorageInteger(itemlist1[i], 0);
            if (num + stones[i] > MAX_STORAGE) {
                continue; // 存储数量要超出的，直接不存。
            }
            cm.gainItem(itemlist1[i], -stones[i]);
            cm.getPlayer().setCharacterStorageInteger(
                itemlist1[i],
                num + stones[i],
            );
            text1 += `#v${itemlist1[i]}# X ${stones[i]}  `;
            havestone++;
        }
    }

    if (havestone != 0) {
        cm.sendOkLevel("Dispose", text1);
    } else {
        cm.sendOkLevel("Dispose", "你的背包里没有任何母矿.");
    }
}

/**
 * 处理 sendGetNumber 的数字输入回调
 */
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }

    if (!pendingAction) {
        cm.dispose();
        return;
    }

    const data = pendingAction;
    pendingAction = null;

    if (data.type === "store") {
        levelStoreQuantity(selection, data.index);
    } else if (data.type === "withdraw") {
        levelWithdrawQuantity(selection, data.index);
    } else if (data.type === "storeMother") {
        levelStoreMotherQuantity(selection, data.index);
    } else if (data.type === "withdrawMother") {
        levelWithdrawMotherQuantity(selection, data.index);
    }
}

/**
 * 统一关闭对话
 */
function levelDispose() {
    cm.dispose();
}