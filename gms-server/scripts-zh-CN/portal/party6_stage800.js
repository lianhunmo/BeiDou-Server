function enter(pi) {
    pi.removeAll(4001162);
    pi.removeAll(4001163);
    pi.removeAll(4001164);
    pi.removeAll(4001169);
    pi.removeAll(2270004);

    var spring = pi.getMap().getReactorById(3008000);  // thanks Chloek3, seth1 for noticing fragments not being awarded properly
    if (spring != null && spring.getState() > 0) {
        let api = pi.getPlayer().getAbstractPlayerInteraction();
        let count = api.getCharacterExtendValue("邮票获取次数" + 4001198, false)
        if (count >= 3) {
            if (!pi.canHold(2000005, 50)) {
                pi.playerMessage(5, "进入传送门前请给背包的 消耗栏 空出至少1个空格子。");
                return false;
            }
            pi.gainItem(2000005, 50);
        } else {
            if (!pi.canHold(4001198, 10)) {
                pi.playerMessage(5, "进入传送门前请给背包的 其他栏 空出至少1个空格子。");
                return false;
            }
            count++;
            api.saveOrUpdateCharacterExtendValue("邮票获取次数" + 4001198, count.toString(), false);
            pi.gainItem(4001198, 10);
        }
    }

    pi.playPortalSound();
    pi.warp(910000000, 0);
    return true;
}