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
            // var id = item.getItemId();
            // if (sel == 4) {
            //     if (id >= 4130000 && id <= 4130022) {
            //         ShopFactory.getInstance().getShop(11000).sell(cm.getClient(), type, i, item.getQuantity());
            //     }
            // } else {
            //     ShopFactory.getInstance().getShop(11000).sell(cm.getClient(), type, i, item.getQuantity());
            // }
            ShopFactory.getInstance().getShop(11000).sell(cm.getClient(), type, i, item.getQuantity());
        }
    }
    cm.sendOk("出售" + column[sel - 1] + "成功！");
    cm.dispose();
}

// 是否清除选择了是
function levelDoClear() {
    cm.removeAllByInventory(sel);
    // 回到levelStart
    cm.sendOkLevel("Start", "清除完毕！");
    cm.dispose();
}

// 执行删除操作
function levelDoRemove(choose) {
    cm.removeAllByInventorySlot(sel, choose);
    // 回到选择单个道具
    cm.sendOkLevel("ChooseType2", "清除完毕！");
    cm.dispose();
}
