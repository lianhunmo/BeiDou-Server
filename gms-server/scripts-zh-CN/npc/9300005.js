/* ==================
 脚本类型: 副本中心
 脚本作者：Geoffrey
 =====================
 */
//------------------------------------------------------------------------
let teamMissions = Array(
    Array(1012112,"迎月花山丘              #r（射手组队任务10-20级）#b"),
    Array(9020000,"第一伴奏               #r（废都组队任务 20-30级）#b"),
    Array(2040034,"时空裂缝               #r（玩具组队任务 30-50级）#b"),
    Array(2013000,"女神之塔            #r（天空之城组队任务 50-70级）#b"),
    Array(2094000,"海盗船               #r（百草堂组队任务 70-90级）#b"),
    Array(2133000,"毒雾森林         #r（艾琳的森林组队任务 90-120级）#b"),
    Array(2112003,"拯救罗密欧       #r（玛加提亚组队任务 120以上）#b"),
    Array(2112004,"拯救朱丽叶       #r（玛加提亚组队任务 120以上）#b"),
);
//------------------------------------------------------------------------

//Start
function start()
{
    levelStart();
}

function levelStart() {
    let text = "亲爱的玩家：#e#b#h ##k#n，您想进入哪个组队副本呢？\r\n\r\n";
    text += "#b";
    for (let i = 0; i < teamMissions.length; i++) {
        text += "#L" + i + "#" + teamMissions[i][1] + "#l\r\n";
    }
    cm.sendNextSelectLevel("ChooseTeamMission", text);
}

//----------------------------------------------------------------------------------
function levelChooseTeamMission(selection) {
    openNpc(teamMissions[selection][0]);
}

function openNpc(scriptName) {
    let api = cm.getChar().getAbstractPlayerInteraction();
    cm.dispose();
    api.openNpc(scriptName, scriptName + "");
}