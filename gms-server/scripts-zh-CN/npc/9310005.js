/**
 * 东方神州系列地图脚本
 * 北斗项目组	https://github.com/BeiDouMS/BeiDou-Server
 * 作者：@Magical-H
 *
 */

const QuestMode = false; //true = 采用任务模式，false = 采用脚本模式
const QuestID = 4109;	//任务ID，收集50个黑羊毛
const itemID = 4000194;//黑羊毛
const itemCount = 50;
const mapPortal = 'h000';	//h000 = 传送到 警察 江 旁边（也就是起始位置） ; st07 = 直接传送到 警察 许 旁边（适合速刷省流程）
var mapID;
var mapID_enter;
var mapID_out;
var QuestObj;
var quest;
var text = '';
let challengeCount = 10;

function start() {
	if(mapID == null) {
		QuestObj = Java.type('org.gms.server.quest.Quest');
		quest = QuestObj.getInstance(QuestID);
		mapID = cm.getMapId();
		mapID_enter = mapID + 1;
		mapID_out = mapID - 1;
		collected = cm.getItemQuantity(itemID);
		collected = (QuestMode && cm.isQuestCompleted(QuestID)) ? (itemCount + collected) : collected;
		challengeCount = Number(cm.getCharacterExtendValue("每日大王蜈蚣挑战次数", true));
		text = `你需要收集 #e#b#v${itemID}##t${itemID}##k#n × #r#e${itemCount}#k#n  #B${collected / itemCount * 100}#  \r\n才能证明你有点本事，否则我不放心让你去白给！\r\n`;
		text += `你今日已经挑战过${challengeCount}次大王蜈蚣\r\n`;
		text += `#L1#进入 #b#e#m${mapID_enter}##k#n 继续调查#l\r\n`;
		text += `#L2#离开 #b#e#m${mapID}##k#n 回到 #b#e#m${mapID_out}##k#n#l`;
	}
	if(QuestMode && cm.getQuestStatus(QuestID) == 0) {
		levelQuest1();
	} else {
		cm.sendSelectLevel(text);
	}
}
function level() {
	leveldispose();
}
function levelnull() {
	leveldispose();
}
function leveldispose() {
	cm.dispose();
}
function levelEnter() {
	if (QuestMode == false) {
		cm.gainItem(itemID, -itemCount);
	}
	resetQuest();
	cm.warp(mapID + 1,mapPortal);	//进入指定地图指定传送点
	challengeCount++;
	cm.saveOrUpdateCharacterExtendValue("每日大王蜈蚣挑战次数", challengeCount.toString(), true);
	leveldispose();

}
function levelOut(){
	resetQuest();
	cm.warp(mapID - 1);
	leveldispose();
}
function resetQuest(){
	if (QuestMode && cm.isQuestCompleted(QuestID)) {
		if(quest != null) quest.reset(cm.getPlayer());//重新开始任务
	}
}
function level1() {
	if (challengeCount >= 10) {
		cm.sendOkLevel('','你今天已经挑战过10次大王蜈蚣，请明天再来吧！');
		return;
	}
	if ((QuestMode && cm.isQuestCompleted(QuestID)) || (QuestMode == false && cm.haveItem(itemID ,itemCount))) {
		cm.sendYesNoLevel('','Enter',`我现在送你进入#b#e#m${mapID_enter}##k#n，准备好了吗？`);
	} else {
		cm.sendOkLevel('','连这小小的要求都做不到，没点儿本事你难道还想去白给啊？');
	}
}
function level2() {
	cm.sendYesNoLevel('','Out',`你已经决定要离开吗？\r\n当你准备好去#b#e#m${mapID_enter}##k#n的时候再来找我。`);
}
function levelQuest1(){
	cm.sendNextLevel('Quest2','敬礼！\r\n要做一些检查！\r\n这里是禁区，闲人免进。\r\n没有许可的人是不允许进入的！\r\n什么？已经获得许可了？');
}
function levelQuest2(){
	cm.sendYesNoLevel('Quest2_no','Quest2_yes','哦...刚刚接到信息。您是特别行动小组的人啊。看来是位了不起的人啊，如果您帮我个小忙的话，我就让您通过。您可以帮我吗？');
}
function levelQuest2_yes(){
	cm.startQuest(QuestID);
	leveldispose();
}
function levelQuest2_no(){
	cm.sendOkLevel('','如果不协助执行公务的话，就不能让你通过。请回吧。');
}