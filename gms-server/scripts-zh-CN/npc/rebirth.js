/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Rebirth NPC
    @author Ronan
    @author wejrox
*/
let status;
let jobId = 0;
const EVENT_TROPHY = 4000038;
let COST_EVENT_TROPHY = 100;
let choice = 0;
const BOSS_ITEM_LIST = [
    2210006, // 彩虹色蜗牛壳儿
    4000124, // 战甲吹泡泡鱼的内存卡
    4032474, // 歇尔夫的珍珠
    4000419, // 紫色液体
    4000040, // 蘑菇王芽孢
    4000176, // 毒菇
    4000418, // 无用的机器心脏
    4031906, // 炎魔之爪
    4000235, // 喷火龙的尾巴
    4000243, // 格瑞芬多角
    4000460, // 古代头盔
    4000461, // 骑士面具
    4000462, // 守护兽之角
    4000175, // 皮亚奴斯模型
    4001024, // 鲁碧安
    4000224, // 木屐
    4000094, // 老板的名牌
    4000138, // 女老板的梳子
    4000385, // 心灯
    4021010 // 时间之石
]
const BOSS_CARD_LIST = [
    2388023, // 扎昆卡片
    2388022, // 闹钟卡片
    2388020, // 鱼王卡片
    2388024, // 黑龙王卡片
    2388043, // 品客缤卡片
    2388055, // 巨蝙蝠卡片
    2388054, // 小吃店卡片
    2388053, // 蓝蘑菇卡片
    2388016, // 驮狼雪人卡片
    2388005, // 提莫卡片
    2388033, // 大海兽卡片
    2388052, // 巨型蜈蚣卡片
    2388013, // 妖怪绅士卡片
    2388039, // 剧毒石头人卡片
    2388014, // 法兰肯卡片
    2388029, // 大宇卡片
    2388015, // 艾利杰卡片
    2388010, // 肯德熊卡片
    2388009, // 九尾狐卡片
    2384022, // 蓝色鬼怪卡片
    2384021, // 黄色鬼怪卡片
    2384023, // 绿色鬼怪卡片
    2388026, // 蝙蝠怪卡片
    2388003, // 冰海螺蟹卡片
    2388017, // 蝙蝠魔卡片
    2388002, // 浮士德卡片
    2388008, // 僵尸蘑菇王卡片
    2388025, // 树妖王卡片
    2388000 // 红蜗牛王卡片
]

const ITEM_COST_MAP = new Map([
    [2388043, 1],
    [2388024, 1],
    [2388023, 1],
    [2388022, 1],
]);

function start() {
    status = -1;
    const GameConfig = Java.type('org.gms.config.GameConfig');
    if (!GameConfig.getServerBoolean("use_rebirth_system")) {
        cm.sendOk("转生在这个服务器上是不允许的，你是怎么到这里来的？");
        cm.dispose();
        return;
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status === 0) {
        let text = "你的冒险之路出现瓶颈了吗？我可以帮你重生以突破力量的上限。";
        text += "你目前已经历过 #r" + cm.getChar().getReborns() + " #k次重生。";
        cm.sendNext(text);
    } else if (status === 1) {
        let text = "你想让我帮你做什么呢？\r\n\r\n#L0##b我想使用神秘力量进行重生#l\r\n#L3##b我想通过奋斗进行重生#l\r\n#L2##b找回遗失的的属性点#k#l\r\n#L1##b现在什么都不想做...#k#l";
        cm.sendSimple(text);
    } else if (status === 2) {
        if (selection === 0) {
            choice = 0;
            let itemQuantity = cm.getItemQuantity(EVENT_TROPHY);
            if (itemQuantity < COST_EVENT_TROPHY) {
                cm.sendOk("你的 #r#z" + EVENT_TROPHY + "##k 不够" + COST_EVENT_TROPHY + "个，无法转生。");
                cm.dispose();
            } else if (cm.getChar().getLevel() === cm.getChar().getMaxClassLevel()) {
                cm.sendSimple("我明白了... 你想选择哪条路？\r\n\r\n#L0##b冒险家（新手）#l\r\n");
            } else {
                cm.sendOk("看起来你的冒险之旅还没有结束……当你达到等级 " + cm.getChar().getMaxClassLevel() +"时再回来吧。");
                cm.dispose();
            }
        } else if (selection === 3) {
            choice = 1;
            if (cm.getChar().getLevel() === cm.getChar().getMaxClassLevel()) {
                let text = "我明白了... 想要转生需要：\r\n\r\n";
                text = buildExchangeInfoMessage(text);
                text += "你想选择哪条路？\r\n\r\n#L0##b冒险家（新手）#l\r\n";
                cm.sendSimple(text);
            } else {
                cm.sendOk("看起来你的冒险之旅还没有结束……当你达到等级 " + cm.getChar().getMaxClassLevel() +"时再回来吧。");
                cm.dispose();
            }
        } else if (selection === 2) {
            let rebornAPCount = Number(cm.getAccountExtendValue("重生属性点"));
            if (rebornAPCount > 0) {
                cm.getChar().rewardRebirthAp();
                cm.saveOrUpdateAccountExtendValue("重生属性点", "0");
                cm.sendOk(`你已恢复 #b${rebornAPCount}#k 属性点!`)
            } else {
                cm.sendOk(`你本次重生已领取过属性点!`)
            }
            cm.dispose();
        } else if (selection === 1) {
            cm.sendOk("后会有期!")
            cm.dispose();
        }
    } else if (status === 3) {
        // 0 => beginner, 1000 => noblesse, 2000 => legend
        // makes this very easy :-)
        jobId = selection * 1000;

        let job = "";
        if (selection === 0) job = "冒险家（新手）";
        else if (selection === 1) job = "皇家骑士团（初心者）";
        else if (selection === 2) job = "战神（战童）";
        cm.sendYesNo("你确定要重生成为一个 #r" + job + "#k 吗？");
    }
    else if (status === 4) {
        if (choice == 0) {
            cm.gainItem(EVENT_TROPHY, -COST_EVENT_TROPHY);
        } else {
            let checkResult = true;
            let text = "";
            ITEM_COST_MAP.forEach((cost, itemId) => {
                if (cost !== 0) {
                    let textTemp = checkItems(itemId, cost);
                    if (textTemp) {
                        checkResult = false;
                        text += textTemp;
                    }
                }
            });
            if (!checkResult) {
                cm.sendOkLevel("Dispose", text);
                return;
            }
            ITEM_COST_MAP.forEach((cost, itemId) => {
                if (cost > 0) {
                    cm.gainItem(itemId, -cost);
                }
            });
        }
        cm.getChar().executeRebornAsId(jobId);
        let rebornAPCount = cm.getChar().getReborns() * 100;
        cm.saveOrUpdateAccountExtendValue("重生属性点", rebornAPCount.toString());
        cm.sendOk("你现在已经重生了。当前已经历 #r" + cm.getChar().getReborns() + "#k 次重生。当你想要再次重生时，来找我吧。");
        cm.dispose();
    }
}

function buildExchangeInfoMessage(text) {
    ITEM_COST_MAP.forEach((cost, itemId) => {
        text += buildItemNeedText(itemId, cost);
    });
    text += "\r\n你当前拥有:\r\n";
    ITEM_COST_MAP.forEach((cost, itemId) => {
        text += buildItemHaveText(itemId, cost);
    });
    return text;
}

function buildItemNeedText(itemId, cost) {
    let text = "";
    if (cost !== 0) {
        text += "#r" + cost + "#k个#r#t" + itemId + "##k#r#i" + itemId + "##k\r\n";
    }
    return text;
}

function buildItemHaveText(itemId, cost) {
    let text = "";
    if (cost !== 0) {
        text += "#b" + cm.getItemQuantity(itemId) + "#k个#b#t" + itemId + "##k#b#i" + itemId + "##k\r\n";
    }
    return text;
}

function checkItems(itemId, cost) {
    let itemQuantity = cm.getItemQuantity(itemId);
    let text = "";
    if (itemQuantity < cost) {
        text = "#b#t" + itemId + "##k#i" + itemId + "#不足#r" + cost + "#k个\r\n";
        return text;
    }
    return null;
}

function levelDispose() {
    cm.dispose();
}
