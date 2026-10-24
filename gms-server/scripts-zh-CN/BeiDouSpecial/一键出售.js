let status;
let text;
let column = ["装备", "消耗", "设置", "其他", "商城"];
let inventoryType;
let chooseType;

function start() {
    levelStart();
}

// 对话开始
function levelStart() {
    text = "#e出售道具#n\r\n#r注：前3页（72格）的道具都会被卖出，请注意将不出售的物品放在第4页#k\r\n\r\n";
    for (let i = 1; i <= 5; i++) {
        if (i === 1 || i === 2 || i === 4) {
            text += "#L" + i + "##b出售" + column[i - 1] + "栏的道具#k#l\r\n\r\n";
        }
    }
    // 选择出售哪一栏
    cm.sendNextSelectLevel("ChooseInventory", text);
}

// 选择了背包栏
function levelChooseInventory(choose) {
    const InventoryType = Java.type('org.gms.client.inventory.InventoryType');
    chooseType = choose;
    if (chooseType == 2) {
        inventoryType = InventoryType.USE;
    } else if (chooseType == 4) {
        inventoryType = InventoryType.ETC
    } else if (chooseType == 1) {
        inventoryType = InventoryType.EQUIP
    } else {
        cm.sendOk("不支持这种背包类型。。。");
        cm.dispose();
        return;
    }
    let text = "请确认是否售出：\r\n";
    for (let i = 0; i <= 72; i++) {
        let item = cm.getInventory(chooseType).getItem(i);
        if (item) {
            text += "#b#z" + item.getItemId() + "##k#i" + item.getItemId() + "#\t";
        }
    }
    cm.sendYesNoLevel("Dispose", "SellInventory", text);

}

function levelSellInventory() {
    const ShopFactory = Java.type('org.gms.server.ShopFactory');
    for (let i = 0; i <= 72; i++) {
        let item = cm.getInventory(chooseType).getItem(i);
        if (item) {
            ShopFactory.getInstance().getShop(11000).sell(cm.getClient(), inventoryType, i, item.getQuantity());
        }
    }
    cm.sendOk("出售" + column[chooseType - 1] + "成功！");
    cm.dispose();
}

function levelDispose() {
    cm.dispose();
}
