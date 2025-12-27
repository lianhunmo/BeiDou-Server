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
var status;
var jobId = 0;
const Flaming_Feather = 4001006;
var Cost_Flaming_Feather = 2000;

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
        cm.sendNext("当你想要再次重生时，来找我吧。你目前总共转生过 #r" + cm.getChar().getReborns() + " #k次。");
    } else if (status === 1) {
        cm.sendSimple("你今天想让我做什么呢：\r\n\r\n#L0##b我想转生！（消耗2000根火焰羽毛）#l\r\n#L1##b现在什么都不想做...#k#l");
    } else if (status === 2) {
        if (selection === 0) {
            let itemQuantity = cm.getItemQuantity(Flaming_Feather);
            if (itemQuantity < Cost_Flaming_Feather) {
                cm.sendOk("你的火焰羽毛不够2000根，无法转生。");
                cm.dispose();
            } else if (cm.getChar().getLevel() === cm.getChar().getMaxClassLevel()) {
                cm.sendSimple("我明白了... 你想选择哪条路？\r\n\r\n#L0##b冒险家（新手）#l\r\n#L2##b战神（战童）#l");
            } else {
                cm.sendOk("看起来你的冒险之旅还没有结束……当你达到等级 " + cm.getChar().getMaxClassLevel() +"时再回来吧。");
                cm.dispose();
            }
        } else if (selection === 1) {
            cm.sendOk("后会有期!")
            cm.dispose();
        }
    } else if (status === 3) {
        // 0 => beginner, 1000 => noblesse, 2000 => legend
        // makes this very easy :-)
        jobId = selection * 1000;

        var job = "";
        if (selection === 0) job = "冒险家（新手）";
//        else if (selection === 1) job = "皇家骑士团（初心者）";
        else if (selection === 2) job = "战神（战童）";
        cm.sendYesNo("你确定要转职成为一个 #r" + job + "#k 吗？");
    }
    else if (status === 4) {
        cm.gainItem(Flaming_Feather, -Cost_Flaming_Feather);
        cm.getChar().executeRebornAsId(jobId);
        cm.sendOk("你现在已经重生了。总共 #r" + cm.getChar().getReborns() + "#k 次重生。");
        cm.dispose();
    }
}