/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
const PAPULATUS_CERTIFICATE = 4001084;
const SKILL_BOOK_LIST = [
    2290000,
    2290002,
    2290004,
    2290006,
    2290008,
    2290010,
    2290012,
    2290014,
    2290016,
    2290018,
    2290019,
    2290020,
    2290022,
    2290024,
    2290026,
    2290028,
    2290030,
    2290032,
    2290034,
    2290036,
    2290038,
    2290040,
    2290042,
    2290044,
    2290046,
    2290048,
    2290050,
    2290052,
    2290054,
    2290056,
    2290058,
    2290060,
    2290062,
    2290064,
    2290066,
    2290068,
    2290070,
    2290072,
    2290074,
    2290076,
    2290078,
    2290080,
    2290082,
    2290084,
    2290086,
    2290088,
    2290090,
    2290092,
    2290094,
    2290096,
    2290097,
    2290099,
    2290101,
    2290102,
    2290104,
    2290106,
    2290108,
    2290110,
    2290112,
    2290114,
    2290115,
    2290117,
    2290119,
    2290121,
    2290123,
    2290124,
    2290126,
    2290128,
    2290130,
    2290132,
    2290134,
    2290136,
    2290138,
    2280012,
    2280013,
    2280014,
    2280015,
    2280016,
    2280017,
    2280018,
    2280019
];

function start() {
    levelStart();
}

function levelStart() {
    let text = "对于那些能够完成伟大壮举并拥有坚定决心的人来说，#b最终目的地#k就在门后。机房一次只接受#r一个队伍#k，所以当穿过门时，请确保你的队伍已经准备好。\r\n";
    text += "可以使用 10个 #b#t" + PAPULATUS_CERTIFICATE + "##k#i" + PAPULATUS_CERTIFICATE + "#随机抽取一本20级技能上限的能手册或者一本技能书。\r\n\r\n";
    text += "#L0##b抽取#k#l\r\n";
    cm.sendSelectLevel(text);
}

function level0() {
    let itemQuantity = cm.getItemQuantity(PAPULATUS_CERTIFICATE);
    if (itemQuantity < 10) {
        cm.sendOk("你身上没有 #r10个 #t" + PAPULATUS_CERTIFICATE + "##k#i" + PAPULATUS_CERTIFICATE + "#");
        cm.dispose();
    } else if (!cm.canHold(2290000, 1)) {
        cm.sendOk("背包消耗栏空间不足");
        cm.dispose();
    } else {
        cm.gainItem(PAPULATUS_CERTIFICATE, -10);
        successGain();
    }
}

function successGain() {
    let bookId = getRandomElement(SKILL_BOOK_LIST);
    let text = "恭喜你获得了#b#t" + bookId + "##k#i" + bookId + "#";
    cm.gainItem(bookId, 1);
    cm.sendOkLevel("Dispose", text);
}

// 获取随机元素
function getRandomElement(arr) {
    if (arr.length === 0) {
        return 2280019;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function levelDispose() {
    cm.dispose();
}
