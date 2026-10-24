function enter(pi) {
    if (Math.random() < 1) {
        pi.playPortalSound();
        pi.warp(930000300, "16st");
    } else {
        pi.playPortalSound();
        pi.warp(930000300, "02st");
    }

    return true;
}