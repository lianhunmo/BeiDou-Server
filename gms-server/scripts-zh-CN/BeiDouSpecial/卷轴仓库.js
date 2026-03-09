let a = 0;
let text;
let selects;
let nx;
let scrolls = Array();
let selstatus = -1;
const MAX_STORAGE = 30000;
let scrollList = Array(
    // 2040009,//头盔防御诅咒卷轴
    // 2040011,//头盔体力诅咒卷轴
    // 2040015,//头盔命中率诅咒卷轴
    // 2040103,//脸部装饰生命诅咒卷轴
    // 2040108,//脸部装饰回避率诅咒卷轴
    // 2040203,//脸部装饰命中诅咒卷轴
    // 2040203,//眼部装饰智力诅咒卷轴
    // 2040208,//眼部装饰智力诅咒卷轴
    // 2040305,//耳环智力诅咒卷轴
    // 2040309,//耳环防御诅咒卷轴
    // 2040405,//上衣防御诅咒卷轴
    // 2040411,//上衣运气防御卷轴
    // 2040509,//全身铠甲敏捷诅咒卷轴
    // 2040511,//全身铠甲防御诅咒卷轴
    // 2040605,//裙裤防御诅咒卷轴
    // 2040607,//裙裤条约诅咒卷轴
    // 2040609,//裙裤体力诅咒卷轴
    // 2040611,//裙裤敏捷诅咒卷轴
    // 2040713,//鞋子敏捷诅咒卷轴
    // 2040715,//鞋子跳跃诅咒卷轴
    // 2040717,//鞋子速度诅咒卷轴
    // 2040809,//手套敏捷诅咒卷轴
    // 2040811,//手套攻击诅咒卷轴
    // 2040815,//手套魔力诅咒卷轴
    // 2040905,//盾牌防御诅咒卷轴
    // 2040917,//盾牌攻击诅咒卷轴
    // 2040922,//盾牌魔力诅咒卷轴
    // 2041027,//披风魔防诅咒卷轴
    // 2041029,//披风防御诅咒卷轴
    // 2041031,//披风体力诅咒卷轴
    // 2041033,//披风魔力诅咒卷轴
    // 2041035,//披风力量诅咒卷轴
    // 2041037,//披风智力诅咒卷轴
    // 2041039,//披风敏捷诅咒卷轴
    // 2041041,//披风运气诅咒卷轴
    // 2041204,//披风运气诅咒卷轴
    // 2041209,//项链力量诅咒卷轴
    // 2043005,//单手剑攻击诅咒卷轴
    // 2043007,//单手剑魔力诅咒卷轴
    // 2043105,//单手斧攻击诅咒卷轴
    // 2043205,//单手钝器攻击诅咒卷轴
    // 2043305,//短剑攻击诅咒卷轴
    // 2043705,//短仗魔力诅咒卷轴
    // 2043805,//长仗魔力诅咒卷轴
    // 2044005,//双手剑攻击诅咒卷轴
    // 2044105,//双手斧攻击诅咒卷轴
    // 2044205,//双手钝器攻击诅咒卷轴
    // 2044305,//枪攻击诅咒卷轴
    // 2044405,//矛攻击诅咒卷轴
    // 2044505,//弓攻击诅咒卷轴
    // 2044605,//驽攻击诅咒卷轴
    // 2044705,//拳套攻击诅咒卷轴
    // 2048005,//宠物跳跃力卷轴10
    2040802,//手套敏捷10
    2040816,//手套魔力10
    2040805,//手套攻击10
    2040825,//手套体力10
    2040915,//盾牌攻击卷轴10
    2040920,//盾牌魔力卷轴10
    // 2040902,//盾牌防御10
    2040925,//盾牌运气10
    // 2040928,//盾牌体力10
    2040933,//盾牌力量10
    // 2041002,//披风魔防10
    // 2041005,//披风防御10
    // 2041008,//披风体力10
    2041011,//披风魔力10
    2041014,//披风力量10
    2041017,//披风智力10
    2041020,//披风敏捷10
    2041023,//披风运气10
    // 2041201,//项链运气10
    // 2041206,//项链力量10
    // 2040002,//头盔防御10
    // 2040005,//头盔体力10
    // 2040016,//头盔命中10
    2040026,//头盔智力10
    2040031,//头盔敏捷10
    // 2040100,//脸部装饰生命10
    // 2040105,//脸部装饰回避率10
    // 2040200,//眼部装饰命中率10
    2040205,//眼部装饰智力10
    2040302,//耳环智力10
    // 2040310,//耳环防御力10
    2040323,//耳环运气10
    2040318,//耳环敏捷10
    // 2040328,//耳环装饰体力10
    // 2040402,//上衣防御10
    2040412,//上衣运气10
    2040419,//上衣力量10
    // 2040422,//上衣体力10
    2040412,//上衣运气10
    2040502,//全身铠甲敏捷10
    2040514,//全身铠甲智力10
    2040517,//全身铠甲运气10
    // 2040505,//全身铠甲防御10
    2040534,//全身盔甲力量10
    // 2040602,//裤裙防御10
    2040612,//裤裙敏捷10
    // 2040619,//裤裙跳跃10
    // 2040622,//裤裙体力10
    2040702,//鞋子敏捷10
    // 2040705,//鞋子跳跃10
    2043102,//单手斧头攻击10
    // 2043114,//单手斧头命中10
    2043002,//单手剑攻击10
    // 2043019,//单手剑命中10
    2043202,//单手钝器攻击10
    // 2043214,//单手钝器命中10
    2044002,//双手剑攻击10
    // 2044014,//双手剑命中10
    2044102,//双手斧攻击10
    // 2044114,//双手斧命中10
    2044202,//双手钝器攻击10
    // 2044214,//双手钝器命中10
    // 2043402,//刀攻击卷轴10

    2044302,//枪攻击10
    // 2044314,//枪命中10
    2044402,//矛攻击10
    // 2044414,//矛命中10
    2043702,//短杖魔力10
    2043802,//长杖魔力10
    2044502,//弓攻击10
    2044602,//弩攻击10
    2043302,//短剑攻击10
    2044902,//短枪攻击10
    2044702,//拳套攻击10
    2044802,//拳甲攻击10
    2044809,//拳甲命中10
    // 2048004,//宠物跳跃力卷轴60
    2040801,//手套敏捷60
    // 2040845,//手套魔力60
    2040804,//手套攻击60
    // 2040824,//手套体力60
    2040914,//盾牌攻击卷轴60
    2040919,//盾牌魔力卷轴60
    // 2040901,//盾牌防御60
    2040924,//盾牌运气60
    // 2040927,//盾牌体力60
    2040931,//盾牌力量60
    // 2041001,//披风魔防60
    // 2041004,//披风防御60
    // 2041007,//披风体力60
    2041010,//披风魔力60
    2041013,//披风力量60
    2041016,//披风智力60
    2041019,//披风敏捷60
    2041022,//披风运气60
    // 2041202,//项链运气60
    // 2041207,//项链力量60
    // 2040001,//头盔防御60
    // 2040004,//头盔体力60
    // 2040017,//头盔命中60
    2040025,//头盔智力60
    2040029,//头盔敏捷60
    // 2040101,//脸部装饰生命60
    // 2040106,//脸部装饰回避率60
    // 2040201,//眼部装饰命中率60
    2040206,//眼部装饰智力60
    2040301,//耳环智力60
    // 2040311,//耳环防御力60
    2040317,//耳环敏捷60
    // 2040326,//耳环装饰体力60
    // 2040401,//上衣防御60
    2040413,//上衣运气60
    2040418,//上衣力量60
    // 2040421,//上衣体力60
    2040413,//上衣运气60
    2040501,//全身铠甲敏捷60
    2040513,//全身铠甲智力60
    2040516,//全身铠甲运气60
    // 2040504,//全身铠甲防御60
    2040532,//全身盔甲力量60
    // 2040601,//裤裙防御60
    2040613,//裤裙敏捷60
    // 2040618,//裤裙跳跃60
    // 2040621,//裤裙体力60
    2040701,//鞋子敏捷60
    // 2040704,//鞋子跳跃60
    2043101,//单手斧头攻击60
    // 2043112,//单手斧头命中60
    2043001,//单手剑攻击60
    // 2043017,//单手剑命中60
    2043201,//单手钝器攻击60
    // 2043212,//单手钝器命中60
    2044001,//双手剑攻击60
    // 2044012,//双手剑命中60
    2044101,//双手斧攻击60
    // 2044112,//双手斧命中60
    2044201,//双手钝器攻击60
    // 2044212,//双手钝器命中60
    // 2043401,//刀攻击卷轴60
    2044301,//枪攻击60
    // 2044312,//枪命中60
    2044401,//矛攻击60
    // 2044412,//矛命中60
    2043701,//短杖魔力60
    2043801,//长杖魔力60
    2044501,//弓攻击60
    2044601,//弩攻击60
    2043301,//短剑攻击60
    2044901,//短枪攻击60
    2044701,//拳套攻击60
    2044801//拳甲攻击60
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
            text = "       #L0##b存放卷轴#k#l	    #L1##b取回卷轴#k#l\r\n\r\n";
            text += "     #L2##r一键存放卷轴#k#l\r\n\r\n";
            cm.sendSimple(text);
        } else if (a == 1) {
            if (selection == 0) {
                nx = 0;
                text = "请选择所要存放的卷轴：\r\n";
                for (let i = 0; i < scrollList.length; i++) {
                    text += `#L${i}##k存放：#b#z${scrollList[i]}##l\r\n\r\n`;
                    text += ` #d- 当前背包内拥有：#r#c${scrollList[i]}##d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }
                cm.sendSimple(text);
            } else if (selection == 1) {
                nx = 1;
                text = "请选择所要取回的卷轴：\r\n";
                for (let i = 0; i < scrollList.length; i++) {
                    let num = cm.getPlayer().getCharacterStorageInteger(scrollList[i], 0);
                    text += `#L${i}##k取回：#b#z${scrollList[i]}##l\r\n\r\n`;
                    text += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                    if (i != 0 && (i + 1) % 99 == 0) {
                        text += "\r\n";
                    }
                }
                cm.sendSimple(text);
            } else if (selection == 2) {
                nx = 2;
                text = `请确定所要存放的卷轴：${cm
                    .getPlayer()
                    .getItemQuantity(scrollList[1], false)}\r\n`;
                let havestone = 0;
                for (let i = 0; i < scrollList.length; i++) {
                    scrolls[i] = cm.getPlayer().getItemQuantity(scrollList[i], false);
                    if (scrolls[i] != 0) {
                        text += ` #b#z${scrollList[i]}##k X ${scrolls[i]}  `;
                        havestone++;
                    }
                }
                if (havestone == 0) {
                    cm.sendOk("你的背包里没有任何卷轴.");
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
                let txt = ` - 当前存放卷轴：#r#i${scrollList[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前背包内拥有：#r#c${scrollList[selects]}##d 个。\r\n`;
                txt += " #k- 请输入存放道具的数值：\r\n\r\n";
                let numbera = Math.min(cm.itemQuantity(scrollList[selects]), MAX_STORAGE);
                cm.sendGetNumber(txt, numbera, 1, numbera);
            } else if (nx == 1) {
                nx = 1;
                selects = selection;
                let num = cm
                    .getPlayer()
                    .getCharacterStorageInteger(scrollList[selects], 0);
                let txt = ` - 当前取出卷轴：#r#i${scrollList[selects]}##l\r\n\r\n`;
                txt += ` #d- 当前仓库内拥有：#r${num}#d 个。\r\n`;
                txt += " #k- 请输入取出道具的数值：\r\n\r\n";
                let numbera = Math.min(num, MAX_STORAGE);
                cm.sendGetNumber(txt, numbera, 1, numbera);
            }
        } else if (a == 3) {
            if (nx == 0) {
                let itemId = scrollList[selects];
                let num = cm.getPlayer().getCharacterStorageInteger(itemId, 0);
                console.log(itemId, cm.itemQuantity(itemId), num, selection);
                if (selection > cm.itemQuantity(itemId)) {
                    cm.sendOk("背包内没有足够的卷轴.");
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
                    .getCharacterStorageInteger(scrollList[selects], 0);
                if (num < selection) {
                    cm.sendOk("仓库内没有足够的卷轴.");
                } else {
                    if (cm.canHold(scrollList[selects], selection)) {
                        cm.gainItem(scrollList[selects], selection);
                        cm.getPlayer().setCharacterStorageInteger(
                            scrollList[selects],
                            num - selection,
                        );
                        cm.sendOk(`取出 #z${scrollList[selects]}# x ${selection} 成功。`);
                    } else {
                        cm.sendOk("背包空间不足，无法取出卷轴.");
                    }
                }
                cm.dispose();
            } else if (nx == 2) {
                let havestone = 0;
                let text1 = "成功存入\r\n";
                for (let i = 0; i < scrollList.length; i++) {
                    scrolls[i] = cm.getPlayer().getItemQuantity(scrollList[i], false);
                    if (scrolls[i] != 0) {
                        let num = cm.getPlayer().getCharacterStorageInteger(scrollList[i], 0);
                        if (num + scrolls[i] > MAX_STORAGE) {
                            continue; //存储数量要超出的，直接不存。
                        }
                        cm.gainItem(scrollList[i], -scrolls[i]);
                        cm.getPlayer().setCharacterStorageInteger(
                            scrollList[i],
                            num + scrolls[i],
                        );
                        text1 += `#v${scrollList[i]}# X ${scrolls[i]}  `;
                        havestone++;
                    }
                }

                if (havestone != 0) {
                    cm.sendOk(text1);
                } else {
                    cm.sendOk("你的背包里没有任何卷轴.");
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