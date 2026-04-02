let status = -1;
let mh0 = "#fUI/UIWindow/Quest/icon0#";
let mh1   ="#fUI/UIWindow.img/MonsterCarnival/icon1#";
let mh9   ="#fUI/StatusBar.img/base/iconRed#";
let mh10   ="#fUI/StatusBar.img/base/iconBlue#";
let isShifu = 0;
let numberOfGraduatedStudents = 0;
let students;
let selectStudent;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    isShifu = cm.getCharacterExtendValue("师傅");
    numberOfGraduatedStudents = cm.getCharacterExtendValue("出师次数");
    if (!numberOfGraduatedStudents) {
        numberOfGraduatedStudents = 0;
    }
    if (mode == 1) {
        status++;
    } else if (mode == 0 && status != 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {

        let text = "\t\t\t\t\t\t\t\t\t\t<#r#e师徒系统#n#k>\r\n\r\n";
        text += mh1 + mh1 + mh1 + mh1 + mh1 + mh1 + mh1+ mh1+ mh1+ mh1+ mh1+ mh1+ mh1+ mh1+ mh1+ mh1+ mh1 + mh1 + mh1 + "\r\n";
        for (i = 0; i < 10; i++) {
            text += "";
        }

        text += "#L6##b"+mh0+"师徒系统说明#l#k\r\n\r\n"
        if (isShifu) {
            if (numberOfGraduatedStudents > 0) {
                text += `尊敬的大师，您当前已出师过 ${numberOfGraduatedStudents} 名高徒。\r\n请问我能为你做什么？\r\n\r\n`
            }
            text += "#L2#"+mh10+"#b带徒入门#k#l\r\n"
            text += "#L3#"+mh10+"#b带徒出师#k#l\r\n"
            text += "#L8#"+mh10+"#b徒弟列表#k#l\r\n"
            text += "#L4#"+mh9+"#r逐出师门#k#l\r\n"
        } else if(cm.getChar().isAlreadyStudent()) {
            text += "#L5#"+mh9+"#r退出师门#l#k\r\n"
        } else {
            text += "#L1#"+mh10+"#b建立师门#l#k\r\n"
        }
        cm.sendSimple(text);
    } else if (status == 1){
        if (selection == 1){//建立师门
            let rewardAlreadyGainStr = cm.getCharacterExtendValue("肝王勋章领取记录");
            let rewardAlreadyGain;
            if (rewardAlreadyGainStr) {
                rewardAlreadyGain = rewardAlreadyGainStr.split(",").map(Number);
            } else {
                rewardAlreadyGain = [0,0,0,0,0,0,0];
            }

            if (cm.getChar().getLevel() < 140){
                cm.sendOk("#r你的等级不够140级,无法建立师门!");
                cm.dispose();
            } else if (rewardAlreadyGain[6] < 1){
                cm.sendOk("#r你还未完成肝王勋章的全部试炼,无法建立师门!");
                cm.dispose();
            } else if (isShifu < 1){
                cm.saveOrUpdateCharacterExtendValue("师傅", "1");
                cm.sendOk("你成功建立了师门,赶紧去收徒吧!");
                cm.getChar().getWorldServer().dropMessage(6,"【师徒系统】[" + cm.getChar().getName() + "]成功建立了师门,有需要拜师的可以私聊Ta哟~");
                cm.dispose();
            } else {
                cm.sendOk("你已经建立过师门了,去收徒吧!");
                cm.dispose();
            }
        } else if (selection == 2){//拜师
            if (cm.getChar().getParty() == null) {
                cm.sendNext("请组队后在来找我!");
                cm.dispose();
            }
            let partyMembers = cm.getChar().getParty().getMembers();
            let it = partyMembers.iterator();
            let student;
            while (it.hasNext()) {
                student = it.next();
                if (student.getId() != cm.getChar().getId()) {
                    break;
                }
            }

            if (!cm.getChar().isAllPartyMembersOnSameMap() || partyMembers.size() != 2){
                cm.sendOk("请确认队伍中只有一位徒弟且徒弟和师傅在同一个地图!");
                cm.dispose();
            } else if (!cm.getChar().isPartyLeader() || isShifu < 1) {
                cm.sendOk("请让师傅当队长找我对话");
                cm.dispose();
            } else if (cm.getChar().isStudentMoreThanLimit()) {
                cm.sendOk("你已经收了3个徒弟，请好好带他们成长，等出师或逐出师门后再收徒。");
                cm.dispose();
            } else if (student.getLevel() < 10){
                cm.sendOk("徒弟 <"+student.getName()+"> 等级未达到10级，当前等级 "+student.getLevel()+" 级。");
                cm.dispose();
            } else if (student.getLevel() > 30){
                cm.sendOk("徒弟 <"+student.getName()+"> 等级已经超过30级了!徒弟当前等级为: "+student.getLevel()+" 级。");
                cm.dispose();
            } else if (cm.getChar().isAlreadyShiTu(student.getId())){
                cm.sendOk("你已经收过这个徒弟了。");
                cm.dispose();
            } else if (cm.getChar().setShiTuRelation(student.getId())){
                cm.sendOk("你成功收了"+student.getName()+"为徒弟！");
                cm.getChar().getWorldServer().dropMessage(6,"【师徒系统】"+cm.getChar().getName()+"已收"+student.getName()+"为徒弟，祝贺他们！");
                cm.dispose();
            } else {
                cm.sendOk("收徒系统异常，请联系管理员！");
                cm.dispose();
            }
        } else if (selection == 3){ // 带徒出师
            if (cm.getChar().getParty() == null) {
                cm.sendNext("请组队后在来找我!");
                cm.dispose();
            }
            let partyMembers = cm.getChar().getParty().getMembers();
            let it = partyMembers.iterator();
            let student;
            while (it.hasNext()) {
                student = it.next();
                if (student.getId() != cm.getChar().getId()) {
                    break;
                }
            }

            if (!cm.getChar().isAllPartyMembersOnSameMap() || partyMembers.size() != 2){
                cm.sendOk("请确认队伍中只有一位徒弟且徒弟和师傅在同一个地图!");
                cm.dispose();
            } else if (!cm.getChar().isPartyLeader() || isShifu < 1) {
                cm.sendOk("请让师傅当队长找我对话");
                cm.dispose();
            } else if (!cm.getChar().isAlreadyShiTu(student.getId())){
                cm.sendOk("你们并不是师徒关系！");
                cm.dispose();
            } else if (student.getLevel() < 130) {
                cm.sendOk("徒弟 <"+student.getName()+"> 等级未达到130级，不能出师，当前等级 "+student.getLevel()+" 级。");
                cm.dispose();
            } else {
                if (!cm.canHold(2340000, 2)) {
                    cm.sendOk("请确保背包有空位领取出师奖励！");
                    return;
                }
                if (!student.getPlayer().canHold(2049100, 2)) {
                    cm.sendOk("请确保徒儿的背包有空位领取出师奖励！");
                    return;
                }

                //出师奖励;
                cm.gainItem(2340000,2);//给师傅祝福
                cm.gainExp(200000000);
                cm.getPlayer().getCashShop().gainCash(1, 2000);//给师傅点卷
                student.getPlayer().getAbstractPlayerInteraction().gainItem(2049100,2);//给徒弟混沌
                student.getPlayer().getCashShop().gainCash(2,20000);//给徒弟抵用券
                numberOfGraduatedStudents++;
                cm.saveOrUpdateCharacterExtendValue("出师次数", numberOfGraduatedStudents.toString());

                cm.getChar().deleteShiTuRelation(student.getId());//删除师徒表
                cm.worldMessage(6,"【"+cm.getChar().getName()+"】:吾徒 "+student.getName()+" 今日已成人出师,望众江湖侠士多多提携照顾,万分感谢.");
                cm.dispose();
            }
        } else if (selection == 8){ // 徒弟列表
            students = cm.getChar().studentList();
            let text = "您的爱徒如下：\r\n\r\n";
            for (let i = 0; i < students.length; i++) {
                text += `${students.get(i).getName()}\r\n`
            }
            cm.sendOk(text);
            cm.dispose();
        } else if (selection == 4){ // 逐出师门
            students = cm.getChar().studentList();
            if(students.isEmpty()){
                cm.sendOk("你还没有徒弟。");
                cm.dispose();
            } else {
                let text = "你要将谁逐出师门？\r\n\r\n";
                for (let i = 0; i < students.length; i++) {
                    text += `#L${i}##b${students.get(i).getName()}#k#l\r\n\r\n`
                }
                cm.sendSimple(text);
            }
        } else if (selection == 5){ // 退出师门
            if(!cm.getChar().isAlreadyStudent()){
                cm.sendOk("你没有师傅。");
                cm.dispose();
            } else {
                cm.getChar().deleteShiTuRelation(cm.getChar().getId());
                cm.sendOk("#d你已强行退出师门!");
                cm.dispose();
            }
        } else if (selection == 6){
            let text = "师门系统介绍：\r\n";
            text += "徒弟等级：必须大于10级,小于30级\r\n";
            text += "师父等级：必须大于140级，且要求完成肝王勋章全部试炼\r\n\r\n";
            text += "徒弟达到130级即可出师\r\n\r\n";
            text += "徒弟出师徒弟将获得： #r20000# 抵用卷、#v2049100#*2#k\r\n";
            text += "师父将获得：#r经验x2亿、2000点券、#v2340000#*2#k\r\n";
            cm.sendOk(text);
            cm.dispose();
        }
    } else if (status == 2) {
        selectStudent = students.get(selection);
        cm.sendYesNo(`师徒缘分来之不易，你确定要将${selectStudent.getName()}逐出师门吗？`);
    } else if (status == 3) {
        cm.getChar().deleteShiTuRelation(selectStudent.getId());
        cm.sendOk(`#d你已将${selectStudent.getName()}逐出师门!`);
        cm.dispose();
    }
}