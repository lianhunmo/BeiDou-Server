var status;
var text;
var column = ["装备", "消耗", "设置", "其他", "商城"];
var sel;


function start() {
    levelStart();
}

// 对话开始
function levelStart() {
    text = "#e出售道具#n\r\n#r注：前3页（72格）的道具都会被卖出，请注意将不出售的物品放在第4页#k\r\n\r\n";
    for (let i = 1; i <= 5; i++) {
        if (i === 1 || i === 2 || i === 4) {
            text += "#L" + i + "#出售" + column[i - 1] + "栏的道具#l\r\n";
        }
    }
    // 选择出售哪一栏
    cm.sendNextSelectLevel("ChooseInventory", text);
}

// 选择了背包栏
function levelChooseInventory(choose) {
    sel = choose;
    const ShopFactory = Java.type('org.gms.server.ShopFactory');
    const InventoryType = Java.type('org.gms.client.inventory.InventoryType');
    var type = InventoryType.EQUIP;
    if (sel == 2) {
        type = InventoryType.USE;
    } else if (sel == 4) {
        type = InventoryType.ETC
    }
    for (let i = 0; i <= 72; i++) {
        let item = cm.getInventory(sel).getItem(i);
        if (item) {
            ShopFactory.getInstance().getShop(11000).sell(cm.getClient(), type, i, item.getQuantity());
        }
    }
    cm.sendOk("出售" + column[sel - 1] + "成功！");
    cm.dispose();
}
