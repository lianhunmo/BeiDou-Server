/**
 * @description 示例脚本2-nextLevel实现
 * 注意，所有的输入的nextLevel都是字符串类型的，不一定是数字
 * @author 昨日小睡
 */

const BEI_DOU_SATELLITE_MANUAL = 2430033;
const MAPLE_LEAF = 4001126;

function start() {
    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
    let text = "\r\n\r\n";
    text += "#L0#重置锻造技能为1级#l\r\n";
    text += "#L1#遗忘匠人之魂技能#l\r\n";
    cm.sendSelectLevel(text);

}

function level0() {
    const skillFactory = Java.type('org.gms.client.SkillFactory');

    skill = skillFactory.getSkill(1007);
    cm.getChar().changeSkillLevel(skill, 1, 1, -1);
}

function level1() {
    const skillFactory = Java.type('org.gms.client.SkillFactory');

    skill = skillFactory.getSkill(1003);
    cm.getChar().changeSkillLevel(skill, -1, -1, -1);
}
