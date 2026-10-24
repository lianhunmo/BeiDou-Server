/*
冒险岛083 木桩DPS自动统计脚本 (HeavenMS/Beidou)
功能：
- 对话开启 → 传送修炼场 → 生成木桩 → 60秒计时 → 自动统计总伤/DPS/DPM
- 数字格式化、防移动、防干扰
*/

let mh0 = "#fUI/StatusBar.img/StatKey/normal/0#";
let status = 0;
let damageTotal = 0;
let startMs = 0;
let testSec = 60;       // 测试时长（秒）
let dummyId = 9400598;  // 083木桩ID：仙人岩（不掉血、不反击）
let mapId = 970000104;  // 修炼场地图ID（可改你私服的木桩地图）
// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function start() {
    status = 0;
    cm.sendYesNo(
        `${mh0} 木桩秒伤测试\r\n` +
        "------------------------\r\n" +
        "测试时长：" + testSec + "秒\r\n" +
        "结束自动统计：DPS/DPM/总伤\r\n" +
        "请站定不动，不要移动/换位\r\n\r\n" +
        "开始测试？"
    );
}

async function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();
        return;
    }
    status++;

    if (status == 1) {
        // 1. 传送到修炼场
        cm.warp(mapId);
        // await sleep(1000); // 等待1秒
        // 2. 清空当前伤害
        cm.getChar().clearTotalDamage();
        // 3. 生成木桩（不掉血、无敌）
        spawnMob(dummyId, cm.getChar().getMap());
        // 4. 记录开始时间
        startMs = Date.now();
        // 5. 提示开始
        cm.sendOk("测试开始！\r\n\r\n全力攻击木桩 " + testSec + " 秒...");
        // 6. 定时结束
        cm.getChar().schedule(endTest, testSec * 1000);
    }
}

// 测试结束：统计伤害
function endTest() {
    // 083核心API：获取玩家总伤害
    damageTotal = cm.getPlayer().getTotalDamage();
    let dps = Math.round(damageTotal / testSec);
    let dpm = dps * 60;

    // 结果弹窗
    cm.sendOk(
        `${mh0} 【木桩测试完成】\r\n` +
        "------------------------\r\n" +
        "总伤害：" + format(damageTotal) + "\r\n" +
        "时长：" + testSec + "秒\r\n" +
        "------------------------\r\n" +
        "每秒伤害 (DPS)：" + format(dps) + "\r\n" +
        "每分钟伤害 (DPM)：" + format(dpm) + "\r\n" +
        "------------------------\r\n" +
        "注：稳定输出建议测2~3次取均值"
    );
    cm.dispose();
}

// 数字格式化（加逗号）
function format(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function spawnMob(id, map) {
    if (map.getMonsterById(id) != null) {
        return;
    }

    const LifeFactory = Java.type('org.gms.server.life.LifeFactory');
    let mob = LifeFactory.getMonster(id);
    map.spawnMonsterOnGroundBelow(mob, cm.getChar().getPosition());
}

