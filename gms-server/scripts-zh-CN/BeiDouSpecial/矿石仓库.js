var a = 0;
var text;
var selects;
var nx;
var status;
var selstatus = -1;
var MAX_STORAGE = 30000;

var itemlist = Array(
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
);
var itemlist1 = Array(
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
var bagitemlist = Array();
var stones = Array();
function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) a++;
        else a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "       #L0#存放成品矿石#l	    #L1#取回成品矿石#l\r\n\r\n";
            text += "       #L3##k存放散装母矿#l	    #L4#取回散装母矿#l\r\n\r\n";
            text +=
                "     #L2##r一键存放成品矿石#l    #L5##r一键存放散装母矿#l\r\n\r\n";
            cm.sendSimple(text);
        } else if (a == 1) {
            if (selection == 0) {
                nx = 0;
                text = "请选择所要存放的矿石：\r\n";
                for (var i = 0; i < itemlist.length; i++) {
                    text += `#L${i}##k存放：#b#v${itemlist[i]}##z${itemlist[i]}##l\r\n\r\n`;
                    text += ` #d- 当前背包内拥有：#r#c${itemlist[i]}##d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }
                cm.sendSimple(text);
            } else if (selection == 1) {
                nx = 1;
                text = "请选择所要取回的矿石：\r\n";
                for (var i = 0; i < itemlist.length; i++) {
                    var num = cm.getPlayer().getCharacterStorageInteger(itemlist[i], 0);
                    text += `#L${i}##k取回：#b#v${itemlist[i]}##z${itemlist[i]}##l\r\n\r\n`;
                    text += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }
                cm.sendSimple(text);
            } else if (selection == 2) {
                nx = 2;
                text = "请确定所要存放的矿石：\r\n";
                var havestone = 0;
                for (var i = 0; i < itemlist.length; i++) {
                    stones[i] = cm.getPlayer().getItemQuantity(itemlist[i], false);
                    if (stones[i] != 0) {
                        text += ` #v${itemlist[i]}# X ${stones[i]}  `;
                        havestone++;
                    }
                }
                if (havestone == 0) {
                    cm.sendOk("你的背包里没有任何矿石.");
                    cm.dispose();
                } else {
                    cm.sendYesNo(text);
                }
                a++;
                if (selstatus == -1) {
                    selstatus = selection;
                }
            } else if (selection == 3) {
                nx = 3;
                text = "请选择所要存放的母矿：\r\n";
                for (var i = 0; i < itemlist1.length; i++) {
                    text += `#L${i}##k存放：#b#v${itemlist1[i]}##z${itemlist1[i]}##l\r\n\r\n`;
                    text += ` #d- 当前背包内拥有：#r#c${itemlist1[i]}##d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }
                cm.sendSimple(text);
                if (selstatus == -1) {
                    selstatus = selection;
                }
            } else if (selection == 4) {
                nx = 4;
                text = "请选择所要取回的母矿：\r\n";
                for (var i = 0; i < itemlist1.length; i++) {
                    var num = cm.getPlayer().getCharacterStorageInteger(itemlist1[i], 0);
                    text += `#L${i}##k取回：#b#v${itemlist1[i]}##z${itemlist1[i]}##l\r\n\r\n`;
                    text += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }

                cm.sendSimple(text);
                if (selstatus == -1) {
                    selstatus = selection;
                }
            } else if (selection == 5) {
                nx = 5;
                text = `请确定所要存放的母矿：${cm
                    .getPlayer()
                    .getItemQuantity(itemlist1[1], false)}\r\n`;
                var havestone = 0;
                for (var i = 0; i < itemlist1.length; i++) {
                    stones[i] = cm.getPlayer().getItemQuantity(itemlist1[i], false);
                    if (stones[i] != 0) {
                        text += ` #v${itemlist1[i]}# X ${stones[i]}  `;
                        havestone++;
                    }
                }
                if (havestone == 0) {
                    cm.sendOk("你的背包里没有任何母矿.");
                    cm.dispose();
                } else {
                    cm.sendYesNo(text);
                }
                a++;
                if (selstatus == -1) {
                    selstatus = selection;
                }
            }
        } else if (a == 2) {
            if (nx == 0) {
                selects = selection;
                nx = 0;
                var txt = ` - 当前存放矿石：#r#i${itemlist[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前背包内拥有：#r#c${itemlist[selects]}##d 个。\r\n`;
                txt += " #k- 请输入存放道具的数值：\r\n\r\n";
                var numbera = Math.min(cm.itemQuantity(itemlist[selects]), MAX_STORAGE);
                cm.sendGetNumber(txt, numbera, 1, numbera);
            } else if (nx == 1) {
                nx = 1;
                selects = selection;
                var num = cm
                    .getPlayer()
                    .getCharacterStorageInteger(itemlist[selects], 0);
                var txt = ` - 当前取出矿石：#r#i${itemlist[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                txt += " #k- 请输入取出道具的数值：\r\n\r\n";
                var numbera = Math.min(num, MAX_STORAGE);
                cm.sendGetNumber(txt, numbera, 1, numbera);
            } else if (nx == 3) {
                nx = 3;
                selects = selection;
                var txt = ` - 当前存放母矿：#r#i${itemlist1[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前背包内拥有：#r#c${itemlist1[selects]}##d 个。\r\n`;
                txt += " #k- 请输入存放母矿的数值：\r\n\r\n";
                var numbera = Math.min(
                    cm.itemQuantity(itemlist1[selects]),
                    MAX_STORAGE,
                );
                cm.sendGetNumber(txt, numbera, 1, numbera);
            } else if (nx == 4) {
                nx = 4;
                selects = selection;
                var num = cm
                    .getPlayer()
                    .getCharacterStorageInteger(itemlist1[selects], 0);
                var txt = ` - 当前取出母矿：#r#i${itemlist1[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                txt += " #k- 请输入取出母矿的数值：\r\n\r\n";
                var numbera = Math.min(num, MAX_STORAGE);
                cm.sendGetNumber(txt, numbera, 1, numbera);
            }
        } else if (a == 3) {
            if (nx == 0) {
                var itemId = itemlist[selects];
                var num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);
                console.log(itemId, cm.itemQuantity(itemId), num, selection);
                if (selection > cm.itemQuantity(itemId)) {
                    cm.sendOk("背包内没有足够的矿石.");
                } else if (num + selection > MAX_STORAGE) {
                    cm.sendOk("存储数量不能大于3W！");
                } else {
                    cm.gainItem(itemId, -selection);
                    cm.getPlayer().setCharacterStorageInteger(itemId, num + selection);
                    cm.sendOk(`存入 #z${itemId}# x ${selection} 成功。`);
                }
                cm.dispose();
            } else if (nx == 1) {
                var num = cm
                    .getPlayer()
                    .getCharacterStorageInteger(itemlist[selects], 0);
                if (num < selection) {
                    cm.sendOk("仓库内没有足够的矿石.");
                } else {
                    if (cm.canHold(itemlist[selects], selection)) {
                        cm.gainItem(itemlist[selects], selection);
                        cm.getPlayer().setCharacterStorageInteger(
                            itemlist[selects],
                            num - selection,
                        );
                        cm.sendOk(`取出 #z${itemlist[selects]}# x ${selection} 成功。`);
                    } else {
                        cm.sendOk("背包空间不足，无法取出矿石.");
                    }
                }
                cm.dispose();
            } else if (nx == 2) {
                var havestone = 0;
                var text1 = "成功存入\r\n";
                for (var i = 0; i < itemlist.length; i++) {
                    stones[i] = cm.getPlayer().getItemQuantity(itemlist[i], false);
                    if (stones[i] != 0) {
                        var num = cm.getPlayer().getCharacterStorageInteger(itemlist[i], 0);
                        if (num + stones[i] > MAX_STORAGE) {
                            continue; //存储数量要超出的，直接不存。
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
                    cm.sendOk(text1);
                } else {
                    cm.sendOk("你的背包里没有任何矿石.");
                }

                cm.dispose();
            } else if (nx == 3) {
                var itemId = itemlist1[selects];
                var num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);
                if (selection > cm.itemQuantity(itemId)) {
                    cm.sendOk("背包内没有足够的母矿.");
                } else if (num + selection > MAX_STORAGE) {
                    cm.sendOk("存储数量不能大于3W！");
                } else {
                    cm.gainItem(itemId, -selection);
                    cm.getPlayer().setCharacterStorageInteger(itemId, num + selection);
                    cm.sendOk(`存入 #v${itemId}# x ${selection} 成功。`);
                }
                cm.dispose();
            } else if (nx == 4) {
                var num = cm
                    .getPlayer()
                    .getCharacterStorageInteger(itemlist1[selects], 0);
                if (num < selection) {
                    cm.sendOk("仓库内没有足够的母矿.");
                } else {
                    if (cm.canHold(itemlist1[selects], selection)) {
                        cm.gainItem(itemlist1[selects], selection);
                        cm.getPlayer().setCharacterStorageInteger(
                            itemlist1[selects],
                            num - selection,
                        );
                        cm.sendOk(`取出 #v${itemlist1[selects]}# x ${selection} 成功。`);
                    } else {
                        cm.sendOk("背包空间不足，无法取出母矿.");
                    }
                }
                cm.dispose();
            } else if (nx == 5) {
                var havestone = 0;
                var text1 = "成功存入\r\n";
                for (var i = 0; i < itemlist1.length; i++) {
                    stones[i] = cm.getPlayer().getItemQuantity(itemlist1[i], false);
                    if (stones[i] != 0) {
                        var num = cm
                            .getPlayer()
                            .getCharacterStorageInteger(itemlist1[i], 0);
                        if (num + stones[i] > MAX_STORAGE) {
                            continue; //存储数量要超出的，直接不存。
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
                    cm.sendOk(text1);
                } else {
                    cm.sendOk("你的背包里没有任何母矿.");
                }

                cm.dispose();
            }
        } else if (a == 4) {
            cm.sendOk("祝你游戏愉快~");
            a = 0;
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}