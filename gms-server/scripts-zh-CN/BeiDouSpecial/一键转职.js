/**
 * @description 一键转职
 * @author Geoffrey
 */

function start() {
//    var rebornNum = cm.getChar().getReborns()
//    if (rebornNum == 0) {
//        cm.sendOk("只有转生者可以使用该功能。");
//        cm.dispose();
//    }

    levelStart();
}

/**
 * @description 如果是sendSelectLevel，那么会根据玩家的选项自动路由到对应的level+selection方法
 */
function levelStart() {
	let charCurrentLevel = cm.getChar().getLevel();
    let charCurrentJobId = cm.getJob().getId();
    if (Math.floor(charCurrentJobId / 1000) == 0) {
//    冒险家
        if (charCurrentJobId == 0) {
    //    新手
            if (charCurrentLevel > 7 && charCurrentLevel <10) {
    //          可以转职成魔法师
                let text = "你当前只符合成为一名魔法师的条件，想转职成为一名魔法师吗？\r\n\r\n";
                cm.sendYesNoLevel("Dispose", "SelectFirstJob1", text);
            } else if (charCurrentLevel > 9) {
    //           可以转职成任意冒险家一转职业
                let text = "你当前符合一转条件，你想转职成什么职业？\r\n\r\n";
                text += "#L0#战士#l\r\n";
                text += "#L1#魔法师#l\r\n";
                text += "#L2#弓箭手#l\r\n";
                text += "#L3#飞侠#l\r\n";
                text += "#L4#海盗#l\r\n";
                cm.sendSelectLevel("SelectFirstJob", text);
            }
        } else if (charCurrentJobId % 100 == 0 && charCurrentLevel > 29)
        {
    //        可以二转
            if (charCurrentJobId == 100) {
                let text = "你当前符合二转条件，你想转职成什么职业？\r\n\r\n";
                text += "#L0#剑客#l\r\n";
                text += "#L1#骑士#l\r\n";
                text += "#L2#枪战士#l\r\n";
                cm.sendSelectLevel("SelectSecondJob", text);
            } else if (charCurrentJobId == 200) {
               let text = "你当前符合二转条件，你想转职成什么职业？\r\n\r\n";
               text += "#L3#法师（火毒）#l\r\n";
               text += "#L4#法师（冰雷）#l\r\n";
               text += "#L5#牧师#l\r\n";
               cm.sendSelectLevel("SelectSecondJob", text);
            } else if (charCurrentJobId == 300) {
               let text = "你当前符合二转条件，你想转职成什么职业？\r\n\r\n";
               text += "#L6#猎人#l\r\n";
               text += "#L7#弩弓手#l\r\n";
               cm.sendSelectLevel("SelectSecondJob", text);
            } else if (charCurrentJobId == 400) {
               let text = "你当前符合二转条件，你想转职成什么职业？\r\n\r\n";
               text += "#L8#刺客#l\r\n";
               text += "#L9#侠客#l\r\n";
               cm.sendSelectLevel("SelectSecondJob", text);
            } else if (charCurrentJobId == 500) {
               let text = "你当前符合二转条件，你想转职成什么职业？\r\n\r\n";
               text += "#L10#拳手#l\r\n";
               text += "#L11#火枪手#l\r\n";
               cm.sendSelectLevel("SelectSecondJob", text);
            }
        } else if (charCurrentJobId % 10 == 0 && charCurrentLevel > 69) {
    //      可以三转
            let text = "你当前符合三转条件，你想进行三转吗？\r\n\r\n";
            if (charCurrentJobId == 110) {
                cm.sendYesNoLevel("Dispose", "SelectThirdJob0", text);
            } else if (charCurrentJobId == 120){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob1", text);
            } else if (charCurrentJobId == 130){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob2", text);
            } else if (charCurrentJobId == 210){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob3", text);
            } else if (charCurrentJobId == 220){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob4", text);
            } else if (charCurrentJobId == 230){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob5", text);
            } else if (charCurrentJobId == 310){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob6", text);
            } else if (charCurrentJobId == 320){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob7", text);
            } else if (charCurrentJobId == 410){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob8", text);
            } else if (charCurrentJobId == 420){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob9", text);
            } else if (charCurrentJobId == 510){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob10", text);
            } else if (charCurrentJobId == 520){
                cm.sendYesNoLevel("Dispose", "SelectThirdJob11", text);
            }
        } else if (charCurrentJobId % 10 == 1 && charCurrentLevel > 119) {
    //      可以四转
            let text = "你当前符合四转条件，你想进行四转吗？\r\n\r\n";
            if (charCurrentJobId == 111) {
                cm.sendYesNoLevel("Dispose", "SelectForthJob0", text);
            } else if (charCurrentJobId == 121){
                cm.sendYesNoLevel("Dispose", "SelectForthJob1", text);
            } else if (charCurrentJobId == 131){
                cm.sendYesNoLevel("Dispose", "SelectForthJob2", text);
            } else if (charCurrentJobId == 211){
                cm.sendYesNoLevel("Dispose", "SelectForthJob3", text);
            } else if (charCurrentJobId == 221){
                cm.sendYesNoLevel("Dispose", "SelectForthJob4", text);
            } else if (charCurrentJobId == 231){
                cm.sendYesNoLevel("Dispose", "SelectForthJob5", text);
            } else if (charCurrentJobId == 311){
                cm.sendYesNoLevel("Dispose", "SelectForthJob6", text);
            } else if (charCurrentJobId == 321){
                cm.sendYesNoLevel("Dispose", "SelectForthJob7", text);
            } else if (charCurrentJobId == 411){
                cm.sendYesNoLevel("Dispose", "SelectForthJob8", text);
            } else if (charCurrentJobId == 421){
                cm.sendYesNoLevel("Dispose", "SelectForthJob9", text);
            } else if (charCurrentJobId == 511){
                cm.sendYesNoLevel("Dispose", "SelectForthJob10", text);
            } else if (charCurrentJobId == 521){
                cm.sendYesNoLevel("Dispose", "SelectForthJob11", text);
            }
        } else {
            cm.sendOkLevel("Dispose", "你当前不符合转职条件！");
        }
    } else if (Math.floor(charCurrentJobId / 1000) == 2) {
    //  战神
        if (charCurrentJobId % 1000 == 0 && charCurrentLevel > 9) {
            let text = "你当前符合一转条件，你想进行四转吗？\r\n\r\n";
            cm.sendYesNoLevel("Dispose", "SelectFirstJob2100", text);
        } else if (charCurrentJobId % 100 == 0 && charCurrentLevel > 29) {
            let text = "你当前符合二转条件，你想进行四转吗？\r\n\r\n";
            cm.sendYesNoLevel("Dispose", "SelectSecondJob2110", text);
        } else if (charCurrentJobId % 10 == 0 && charCurrentLevel > 69) {
            let text = "你当前符合三转条件，你想进行四转吗？\r\n\r\n";
            cm.sendYesNoLevel("Dispose", "SelectThirdJob2111", text);
        } else if (charCurrentJobId % 10 == 1 && charCurrentLevel > 119) {
            let text = "你当前符合四转条件，你想进行四转吗？\r\n\r\n";
            cm.sendYesNoLevel("Dispose", "SelectForthJob2112", text);
        } else {
            cm.sendOkLevel("Dispose", "你当前不符合转职条件！");
        }

    } else if (charCurrentJobId == 1000) {
    //  骑士团
       cm.sendOkLevel("Dispose", "代码还没写好。。");
    } else {
       cm.sendOkLevel("Dispose", "出了点代码问题。。。");
    }
}
function levelSelectFirstJob0() {
    cm.changeJobById(100)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectFirstJob1() {
    cm.changeJobById(200)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectFirstJob2() {
    cm.changeJobById(300)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectFirstJob3() {
    cm.changeJobById(400)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectFirstJob4() {
    cm.changeJobById(500)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectFirstJob2100() {
    cm.changeJobById(2100)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob0() {
    cm.changeJobById(110)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob1() {
    cm.changeJobById(120)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob2() {
    cm.changeJobById(130)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob3() {
    cm.changeJobById(210)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob4() {
    cm.changeJobById(220)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob5() {
    cm.changeJobById(230)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob6() {
    cm.changeJobById(310)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob7() {
    cm.changeJobById(320)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob8() {
    cm.changeJobById(410)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob9() {
    cm.changeJobById(420)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob10() {
    cm.changeJobById(510)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob11() {
    cm.changeJobById(520)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectSecondJob2110() {
    cm.changeJobById(2110)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob0() {
    cm.changeJobById(111)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob1() {
    cm.changeJobById(121)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob2() {
    cm.changeJobById(131)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob3() {
    cm.changeJobById(211)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob4() {
    cm.changeJobById(221)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob5() {
    cm.changeJobById(231)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob6() {
    cm.changeJobById(311)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob7() {
    cm.changeJobById(321)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob8() {
    cm.changeJobById(411)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob9() {
    cm.changeJobById(421)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob10() {
    cm.changeJobById(511)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob11() {
    cm.changeJobById(521)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectThirdJob2111() {
    cm.changeJobById(2111)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob0() {
    cm.changeJobById(112)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob1() {
    cm.changeJobById(122)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob2() {
    cm.changeJobById(132)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob3() {
    cm.changeJobById(212)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob4() {
    cm.changeJobById(222)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob5() {
    cm.changeJobById(232)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob6() {
    cm.changeJobById(312)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob7() {
    cm.changeJobById(322)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob8() {
    cm.changeJobById(412)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob9() {
    cm.changeJobById(422)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob10() {
    cm.changeJobById(512)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob11() {
    cm.changeJobById(522)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelSelectForthJob2112() {
    cm.changeJobById(2112)
    cm.sendOkLevel("Dispose", "转职成功！");
}

function levelDispose() {
    cm.dispose();
}

