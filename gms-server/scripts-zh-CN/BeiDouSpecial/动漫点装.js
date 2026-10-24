const ITEM_COST = 10000;
let itemId = 0;
let ComicList = Array(
    Array(1008956, "佩恩"),
    Array(1008955, "萨博"),
    Array(1008953, "娜美"),
    Array(1008950, "哈尔"),
    Array(1008948, "圣女贞德"),
    Array(1008946, "星见亚砂"),
    Array(1008960, "纲"),
    Array(1008942, "星"),
    Array(1008940, "沢田纲吉"),
    Array(1008939, "天使-艾丽莎"),
    Array(1008933, "露米"),
    Array(1008959, "黑色少女"),
    Array(1008927, "天使"),
    Array(1008926, "迪达拉"),
    Array(1008923, "花江"),
    Array(1008918, "黑岩射手"),
    Array(1008913, "血月"),
    Array(1008910, "潘多拉"),
    Array(1008901, "斗笠死灵"),
    Array(1008900, "带土"),
    Array(1008906, "莉央"),
    Array(1008929, "咖喱柴犬"),
    Array(1009911, "宇智波鼬"),
    Array(1009912, "火影四代目"),
    Array(1009913, "鸣人发光-最终"),
    Array(1009914, "鸣人小新"),
    Array(1009915, "佐助3"),
    Array(1009916, "雏田"),
    Array(1009917, "纲手"),
    Array(1009918, "八门夜凯"),
    Array(1009919, "小南"),
    Array(1009920, "小樱"),
    Array(1009921, "迪达拉"),
    Array(1009923, "止水"),
    Array(1009930, "卡卡西坐下"),
    Array(1009943, "蝎"),
    Array(1009922, "艾斯"),
    Array(1009924, "尼卡路飞"),
    Array(1009927, "海贼王大和"),
    Array(1009937, "四皇路飞"),
    Array(1009938, "威尔"),
    Array(1009939, "夏油杰"),
    Array(1009928, "黑崎一护"),
    Array(1009929, "红发香克斯"),
    Array(1009931, "桔梗X犬夜叉"),
    Array(1009932, "弗利沙"),
    Array(1009925, "不知火舞"),
    Array(1009926, "草薙京"),
    Array(1009934, "魔人布欧"),
    Array(1009933, "eva明日香"),
    Array(1009935, "圣斗士白羊座wu"),
    Array(1009936, "手枪+大刀版吴彦祖（最终版 水印）"),
    Array(1009940, "自在极意 白悟空"),
    Array(1009941, "艾尼路"),
    Array(1009942, "阿拉蕾"),
    Array(1009944, "帝皇龙甲兽"),
    Array(1009945, "粉红幻影大剑 全残影"),
    Array(1009946, "杀生丸"),
    Array(1009947, "天女兽"),
    Array(1009948, "军曹"),
    Array(1009949, "杰尼龟"),
    Array(1009950, "女帝"),
    Array(1009951, "远坂凛"),
    Array(1009952, "黑saber"),
    Array(1009953, "黑saber2"),
    Array(1009954, "高达"),
    Array(1009955, "光能使者阿祖"),
    Array(1009956, "海绵宝宝"),
    Array(1009957, "恐龙小新"),
    Array(1009958, "蜡笔小新 黑道"),
    Array(1009959, "蜡笔小新"),
    Array(1009960, "雷电将军"),
    Array(1009961, "墨镜五条悟"),
    Array(1009962, "尼卡定制3版本混合（水印）"),
    Array(1009963, "尼卡小新"),
    Array(1009964, "尼卡小新~(绝版不出售)"),
    Array(1009965, "骑车小新"),
    Array(1009966, "睡衣小新"),
    Array(1009967, "五条悟合体"),
    Array(1009968, "星见雅"),
    Array(1009969, "星穹1"),
    Array(1009970, "一拳超人"),
    Array(1009971, "一拳超人1"),
    Array(1009972, "泳衣成品"),
    Array(1009973, "泳装枪手"),
    Array(1009974, "圆神"),
    Array(1009975, "天使法"),
    Array(1009976, "天使枪"),
    Array(1009977, "托尔龙女仆"),
    Array(1009978, "家庭教师"),
    Array(1009979, "芙莉莲"),
    Array(1009980, "麻仓叶"),
    Array(1009981, "白贞德"),
    Array(1009982, "ALN4"),
    Array(1009983, "Q版星见雅"),
    Array(1009984, "超天酱"),
    Array(1009985, "纯爱战神"),
    Array(1009986, "独自升级"),
    Array(1009987, "独自升级程小雨"),
    Array(1009988, "红莲暗影"),
    Array(1009989, "瞌睡兔"),
    Array(1009990, "莉央完成"),
    Array(1009991, "千寻"),
    Array(1009992, "蛇女"),
    Array(1009993, "水兵月"),
    Array(1009994, "死灵姐姐"),
    Array(1009995, "妖梦"),
    Array(1009996, "小恶魔"),
    Array(1009997, "铃仙"),
    Array(1009998, "琪露诺"),
    Array(1009999, "蕾米莉亚")
);
var status = -1;
var special = true;
var normalFlag = false;

function start() {
    cm.sendNext("这里可以用1W点卷兑换#b超潮的二次元皮肤#k!");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0) {
            cm.sendOk("祝你幸福，天天开心。");
        }
        cm.dispose();
        return;
    } if (status == 0) {
        if (!(special || normalFlag)) {
            cm.sendOk("没有认真听我说话呀小伙子~");
            cm.dispose();
        } else {
            text = "请选择一款：#b\r\n";
            for (let i = 0; i < ComicList.length; i++){
                text += "#L" + i + "##v" +ComicList[i][0]+ ":#" + ComicList[i][1] + "#l\r\n";
            }
            cm.sendSimple(text);
        }
    } else if (status == 1) {
        itemId = ComicList[selection][0];
        let text = "#L0#试穿5分钟#b#t" + itemId + "##k#i" + itemId + "#\r\n\r\n";
        text += "#L1#用1W点卷兑换永久的#b#t" + itemId + "##k#i" + itemId + "#";
        cm.sendSimple(text);
    } else if (status = 2) {
        if (selection == 0) {
            cm.getPlayer().gainEquip(itemId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5);
            cm.sendOk("成功获取#b#t" + itemId + "##k#i" + itemId + "#皮肤5分钟使用权！");
        } else if (selection == 1) {
            if (cm.getPlayer().getCashShop().getCash(1) < ITEM_COST) {
                cm.sendOkLevel("Dispose", "你的点卷不够。");
            } else if (!cm.canHold(itemId, 1)) {
                cm.sendOkLevel("Dispose", "请保证装备栏有空位。");
            } else {
                cm.getPlayer().getCashShop().gainCash(1, -ITEM_COST);
                cm.getPlayer().gainEquip(itemId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1);
                cm.sendOk("成功兑换永久#b#t" + itemId + "##k#i" + itemId + "#皮肤！");
            }
        }
        cm.dispose();
    }
}