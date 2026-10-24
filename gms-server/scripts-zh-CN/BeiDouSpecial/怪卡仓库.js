let a = 0;
let text;
let selects;
let nx;
let scrolls = Array();
let selstatus = -1;
const MAX_STORAGE = 30000;
let mobCard = Array(
    2380000, 2380001, 2380002, 2380003, 2380004, 2380005, 2380006, 2380007, 2380008, 2380009, 2380010, 2380011, 2380012, 2381000, 2381001, 2381002, 2381003, 2381004, 2381005, 2381006, 2381007, 2381008, 2381009, 2381010, 2381011, 2381012, 2381013, 2381014, 2381015, 2381016, 2381017, 2381018, 2381019, 2381020, 2381021, 2381022, 2381023, 2381024, 2381025, 2381026, 2381027, 2381028, 2381029, 2381030, 2381031, 2381032, 2381033, 2381034, 2381035, 2381036, 2381037, 2381038, 2382000, 2382001, 2382002, 2382003, 2382004, 2382005, 2382006, 2382007, 2382008, 2382009, 2382010, 2382011, 2382012, 2382013, 2382014, 2382015, 2382016, 2382017, 2382018, 2382019, 2382020, 2382021, 2382022, 2382023, 2382024, 2382025, 2382026, 2382027, 2382028, 2382029, 2382030, 2382031, 2382032, 2382033, 2382034, 2382035, 2382036, 2382037, 2382038, 2382039, 2382040, 2382041, 2382042, 2382043, 2382044, 2382045, 2382046, 2382047, 2382048, 2382049, 2382050, 2382051, 2382052, 2382053, 2382054, 2382055, 2382056, 2382057, 2382058, 2382059, 2382060, 2382061, 2382062, 2382063, 2382064, 2382065, 2382066, 2382067, 2382068, 2382069, 2382070, 2382071, 2382072, 2382076, 2383000, 2383001, 2383002, 2383003, 2383004, 2383005, 2383006, 2383007, 2383008, 2383009, 2383010, 2383011, 2383012, 2383013, 2383014, 2383015, 2383016, 2383017, 2383018, 2383019, 2383020, 2383021, 2383022, 2383023, 2383024, 2383025, 2383026, 2383027, 2383028, 2383029, 2383030, 2383031, 2383032, 2383033, 2383034, 2383035, 2383036, 2383037, 2383038, 2383039, 2383040, 2383041, 2383042, 2383043, 2383044, 2383045, 2383046, 2383047, 2383048, 2383049, 2383056, 2383057, 2383058, 2383059, 2384000, 2384001, 2384002, 2384003, 2384004, 2384005, 2384006, 2384007, 2384008, 2384009, 2384010, 2384011, 2384012, 2384013, 2384014, 2384015, 2384016, 2384017, 2384018, 2384019, 2384020, 2384021, 2384022, 2384023, 2384024, 2384025, 2384026, 2384027, 2384028, 2384029, 2384030, 2384031, 2384032, 2384033, 2384034, 2384035, 2384036, 2384037, 2384038, 2384039, 2384040, 2385000, 2385001, 2385002, 2385003, 2385004, 2385005, 2385006, 2385007, 2385008, 2385009, 2385010, 2385011, 2385012, 2385013, 2385014, 2385015, 2385016, 2385017, 2385018, 2385019, 2385020, 2385021, 2385022, 2385023, 2385025, 2386000, 2386001, 2386002, 2386003, 2386004, 2386005, 2386006, 2386007, 2386008, 2386009, 2386010, 2386011, 2386012, 2386013, 2386014, 2386015, 2386016, 2386017, 2386021, 2386022, 2386023, 2386024, 2387000, 2387001, 2387002, 2387003, 2387004, 2387006, 2387007, 2387008, 2387009, 2387010, 2387011, 2387012, 2387013, 2388000, 2388001, 2388002, 2388003, 2388004, 2388005, 2388006, 2388007, 2388008, 2388009, 2388010, 2388011, 2388012, 2388013, 2388014, 2388015, 2388016, 2388017, 2388018, 2388019, 2388020, 2388021, 2388022, 2388023, 2388024, 2388025, 2388026, 2388027, 2388028, 2388029, 2388030, 2388031, 2388032, 2388033, 2388039, 2388040, 2388041, 2388042, 2380013, 2388046, 2388055, 2380014, 2380015, 2380016, 2380017, 2380018, 2380019, 2381082, 2381083, 2382092, 2382093, 2382094, 2382095, 2382096, 2388052, 2388053, 2388054, 2388067, 2388068, 2388069, 2388070
);
let slot = Array();

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
            text = "       #L0##b存放怪物卡#k#l	    #L1##b取回怪物卡#k#l\r\n\r\n";
            text += "     #L2##r一键存放怪物卡#k#l\r\n\r\n";
            cm.sendSimple(text);
        } else if (a == 1) {
            if (selection == 0) {
                nx = 0;
                text = "请选择所要存放的怪物卡：\r\n";
                for (let i = 0; i < mobCard.length; i++) {
                    if (!cm.haveItem(mobCard[i])) {
                        continue;
                    }
                    text += `#L${i}##k存放：#b#z${mobCard[i]}##l\r\n\r\n`;
                    text += ` #d- 当前背包内拥有：#r#c${mobCard[i]}##d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }
                text += `#L999##b离开#k#l\r\n\r\n`;
                cm.sendSimple(text);
            } else if (selection == 1) {
                nx = 1;
                text = "请选择所要取回的怪物卡：\r\n";
                for (let i = 0; i < mobCard.length; i++) {
                    let num = cm.getPlayer().getCharacterStorageInteger(mobCard[i], 0);
                    if (num < 1) {
                        continue;
                    }
                    text += `#L${i}##k取回：#b#z${mobCard[i]}##l\r\n\r\n`;
                    text += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }
                text += `#L999##b离开#k#l\r\n\r\n`;
                cm.sendSimple(text);
            } else if (selection == 2) {
                nx = 2;
                text = `请确定所要存放的怪物卡：${cm
                    .getPlayer()
                    .getItemQuantity(mobCard[1], false)}\r\n`;
                let havestone = 0;
                for (let i = 0; i < mobCard.length; i++) {
                    scrolls[i] = cm.getPlayer().getItemQuantity(mobCard[i], false);
                    if (scrolls[i] != 0) {
                        text += ` #b#z${mobCard[i]}##k X ${scrolls[i]}  `;
                        havestone++;
                    }
                }
                if (havestone == 0) {
                    cm.sendOk("你的背包里没有任何怪物卡.");
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
                if (selects == 999) {
                    cm.dispose();
                    return;
                }
                nx = 0;
                let txt = ` - 当前存放怪物卡：#r#i${mobCard[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前背包内拥有：#r#c${mobCard[selects]}##d 个。\r\n`;
                txt += " #k- 请输入存放道具的数值：\r\n\r\n";
                let numbera = Math.min(cm.itemQuantity(mobCard[selects]), MAX_STORAGE);
                cm.sendGetNumber(txt, numbera, 1, numbera);
            } else if (nx == 1) {
                nx = 1;
                selects = selection;
                if (selects == 999) {
                    cm.dispose();
                    return;
                }
                let num = cm
                    .getPlayer()
                    .getCharacterStorageInteger(mobCard[selects], 0);
                let txt = ` - 当前取出怪物卡：#r#i${mobCard[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                txt += " #k- 请输入取出道具的数值：\r\n\r\n";
                let numbera = Math.min(num, MAX_STORAGE);
                cm.sendGetNumber(txt, numbera, 1, numbera);
            }
        } else if (a == 3) {
            if (nx == 0) {
                let itemId = mobCard[selects];
                let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);
                console.log(itemId, cm.itemQuantity(itemId), num, selection);
                if (selection > cm.itemQuantity(itemId)) {
                    cm.sendOk("背包内没有足够的怪物卡.");
                } else if (num + selection > MAX_STORAGE) {
                    cm.sendOk("存储数量不能大于3W！");
                } else {
                    cm.gainItem(itemId, -selection);
                    cm.getPlayer().setCharacterStorageInteger(itemId, num + selection);
                    cm.sendOk(`存入 #z${itemId}# x ${selection} 成功。`);
                }
                cm.dispose();
            } else if (nx == 1) {
                let num = cm
                    .getPlayer()
                    .getCharacterStorageInteger(mobCard[selects], 0);
                if (num < selection) {
                    cm.sendOk("仓库内没有足够的怪物卡.");
                } else {
                    if (cm.canHold(mobCard[selects], selection)) {
                        cm.gainItem(mobCard[selects], selection);
                        cm.getPlayer().setCharacterStorageInteger(
                            mobCard[selects],
                            num - selection,
                        );
                        cm.sendOk(`取出 #z${mobCard[selects]}# x ${selection} 成功。`);
                    } else {
                        cm.sendOk("背包空间不足，无法取出怪物卡.");
                    }
                }
                cm.dispose();
            } else if (nx == 2) {
                let havestone = 0;
                let text1 = "成功存入\r\n";
                for (let i = 0; i < mobCard.length; i++) {
                    scrolls[i] = cm.getPlayer().getItemQuantity(mobCard[i], false);
                    if (scrolls[i] != 0) {
                        let num = cm.getPlayer().getCharacterStorageInteger(mobCard[i], 0);
                        if (num + scrolls[i] > MAX_STORAGE) {
                            continue; //存储数量要超出的，直接不存。
                        }
                        cm.gainItem(mobCard[i], -scrolls[i]);
                        cm.getPlayer().setCharacterStorageInteger(
                            mobCard[i],
                            num + scrolls[i],
                        );
                        text1 += `#v${mobCard[i]}# X ${scrolls[i]}  `;
                        havestone++;
                    }
                }

                if (havestone != 0) {
                    cm.sendOk(text1);
                } else {
                    cm.sendOk("你的背包里没有任何怪物卡.");
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