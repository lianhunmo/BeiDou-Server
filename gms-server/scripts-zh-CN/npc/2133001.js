/**
 * @author: Ronan
 * @npc: Ellin
 * @map: Ellin PQ
 * @func: Ellin PQ Coordinator
 */

var status = 0;
var mapid;

function start() {
    mapid = cm.getPlayer().getMapId();

    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            var ellinStr = ellinMapMessage(mapid);

            if (mapid == 930000000) {
                cm.sendNext(ellinStr);
            } else if (mapid == 930000300) {
                var eim = cm.getEventInstance();

                if (eim.getIntProperty("statusStg4") == 0) {
                    eim.showClearEffect(cm.getMap().getId());
                    eim.setIntProperty("statusStg4", 1);
                }

                cm.sendNext(ellinStr);
            } else if (mapid == 930000400) {
                if (cm.haveItem(4001169, 20)) {
                    if (cm.isEventLeader()) {
                        cm.sendNext("哦，你带来了它们！我们现在可以继续了，我们要继续吗？");
                    } else {
                        cm.sendOk("你已经带来了他们，但你不是队长！请让队长把魔核给我……");
                        cm.dispose();

                    }
                } else {
                    if (cm.getEventInstance().gridCheck(cm.getPlayer()) != 1) {
                        cm.sendNext(ellinStr);

                        cm.getEventInstance().gridInsert(cm.getPlayer(), 1);
                        status = -1;
                    } else {
                        var mobs = cm.getMap().countMonsters();

                        if (mobs > 0) {
                            if (!cm.haveItem(2270004)) {
                                if (cm.canHold(2270004, 10)) {
                                    cm.gainItem(2270004, 10);
                                    cm.sendOk("拿10个#t2270004#。首先，#r削弱#o9300174#的力量，一旦它的生命值降低，使用我给你的物品来捕捉它们。");
                                    cm.dispose();

                                } else {
                                    cm.sendOk("在领取净化器之前，请确保你的使用物品栏有足够的空间！");
                                    cm.dispose();

                                }
                            } else {
                                cm.sendYesNo(ellinStr + "\r\n\r\n你或许#r已萌生退意#k？但请再三斟酌，可能你的队友仍在为此番挑战全力以赴。");
                            }
                        } else {
                            cm.sendYesNo("你们已经捕捉到了所有的 #o9300174#。让队长把所有的 #b20 #t4001169##k 给我，然后我们继续。" + "\r\n\r\n你或许#r已萌生退意#k？但请再三斟酌，可能你的队友仍在为此番挑战全力以赴。");
                        }
                    }
                }
            } else {
                cm.sendYesNo(ellinStr + "\r\n\r\n你或许#r已萌生退意#k？但请再三斟酌，可能你的队友仍在为此番挑战全力以赴。");
            }
        } else if (status == 1) {
            if (mapid == 930000000) {
            } else if (mapid == 930000300) {
                cm.getEventInstance().warpEventTeam(930000500);
            } else if (mapid == 930000400) {
                if (cm.haveItem(4001169, 20) && cm.isEventLeader()) {
                    cm.gainItem(4001169, -20);
                    cm.getEventInstance().warpEventTeam(930000500);
                } else {
                    cm.warp(930000800, 0);
                }
            } else {
                cm.warp(930000800, 0);
            }

            cm.dispose();
        }
    }
}

function ellinMapMessage(mapid) {
    switch (mapid) {
        case 930000000:
            return "欢迎来到毒雾森林。请踏入传送门继续前行。";

        case 930000100:
            return "#b#o9300172##k已占据此区域。我们必须清除所有受侵蚀的魔物才能继续前进。";

        case 930000200:
            return "一根巨大的脊刺挡住了前路。要破除这障碍，我们必须取得#b#o9300173##k所携带的毒液来侵蚀这过度生长的脊刺。但天然毒液浓度过高，无法直接处理。请使用那边的#b泉水#k进行稀释。";

        case 930000300:
            return "哦太好了，你终于找到我了。现在我们可以继续深入森林腹地。";

        case 930000400:
            return "#b#o9300175##k已经控制了这片区域。但它们并非普通魔物——再生速度极快，且#r常规武器与魔法对其完全无效#k。我们必须使用#b#t2270004##k来净化这些受侵蚀的怪物！请让你们队伍的队长向我提交20个从它们身上取得的怪物宝珠。";

        case 930000600:
            return "森林灾祸的根源！请将获得的魔法石置于祭坛上，然后准备迎接战斗吧！";

        case 930000700:
            return "成功了，你们真的做到了！非常感谢你们净化了整片森林！！";

    }
}