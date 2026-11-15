// ============================================================
// 冒险炒股 v3 — 点券/金币双市场独立（修复版 v2）
// 每天 00:00（凌晨12点）结算一次，离线最多补算 7 天
// ============================================================

// ===== 货币与存储前缀 =====
var CURRENCY_CASH = 0;
var CURRENCY_MESO = 1;
var CURRENCY_NAMES = ["点券", "金币"];
var PREFIX_CASH = "";
var PREFIX_MESO = "meso_";

// ===== 交易配置 =====
var MAX_CASH_PER_TRADE = 50000;
var MAX_MESO_PER_TRADE = 100000000;
var STAMP_TAX_RATE = 0.01;
var EXTEND_TYPE_STOCK_PROFIT = 21;
var MAX_SLOTS = 15;
var PAGE_SIZE = 3;
var MAX_MONEY = 2000000000;      // 金币/通用金额上限
var MAX_CASH_MONEY = 2147483647; // 点券实际上限（与 doGainCash 一致）
var MAX_SETTLE_DAYS = 7;

// ===== 全局键名（无前缀）=====
var GK_PROFIT = "stock_profit";
var GK_YESTERDAY = "yesterday_profit";
var GK_DAY = "stock_day";
var GK_LAST_DAY = "stock_lastday";
var GK_LAST_SETTLE = "stock_lastsettle";

// ===== 槽位字段 =====
var SLOT_FIELDS = ["plate", "id", "money", "daychange", "yesterday"];

// ===== 上下文变量 =====
var a = 0;
var selection = 0;
var currentPlate = 0;
var currentStockId = 0;
var operateSlot = 0;
var operatePlate = 0;   // 【修复A】记录加/减仓时的仓位身份
var operateSid = 0;     // 【修复A】
var operateType = "";
var currentPrefix = PREFIX_CASH;
var currentCurrency = CURRENCY_CASH;
var exchangePage = 1;
var selectPage = 1;

// 导入点券类
var CashShop = Java.type('org.gms.server.CashShop');

// ===== 工具函数 =====
function clampMoney(v) {
    if (v > MAX_MONEY) return MAX_MONEY;
    if (v < -MAX_MONEY) return -MAX_MONEY;
    return v;
}

function doGainCash(chr, type, quantity) {
    if (quantity === 0) return;
    var cash = chr.getCashShop().getCash(type);
    var sum = cash + quantity;
    if (sum < 0) quantity = -cash;
    if (sum > MAX_CASH_MONEY) quantity = MAX_CASH_MONEY - cash;
    if (quantity !== 0) chr.getCashShop().gainCash(type, quantity);
}

function doGainMeso(chr, quantity) {
    if (quantity === 0) return;
    var meso = chr.getMeso();
    var sum = meso + quantity;
    if (sum < 0) quantity = -meso;
    if (sum > MAX_MONEY) quantity = MAX_MONEY - meso;
    if (quantity !== 0) chr.gainMeso(quantity, true);
}

function doGainCurrency(chr, currency, quantity) {
    if (currency === CURRENCY_CASH) doGainCash(chr, CashShop.NX_CREDIT, quantity);
    else doGainMeso(chr, quantity);
}

function getPlayerBalance(p, currency) {
    return currency === CURRENCY_CASH
        ? p.getCashShop().getCash(CashShop.NX_CREDIT)
        : p.getMeso();
}

function getCurrencyCap(currency) {
    return currency === CURRENCY_CASH ? MAX_CASH_MONEY : MAX_MONEY;
}

function currencyName(currency) {
    return CURRENCY_NAMES[currency] || "点券";
}

function getSingleLimit(currency) {
    return currency === CURRENCY_CASH ? MAX_CASH_PER_TRADE : MAX_MESO_PER_TRADE;
}

function calcTax(amount) {
    return Math.max(1, Math.floor(amount * STAMP_TAX_RATE));
}

function formatMoney(amount) {
    if (amount >= 100000000) return (amount / 100000000).toFixed(1) + "E";
    if (amount >= 10000) return (amount / 10000).toFixed(1) + "万";
    return amount.toString();
}

function formatTaxRate(rate) {
    if (rate >= 0.01) {
        var v = (rate * 100).toFixed(2).replace('.00', '').replace('.0', '');
        return "百分之" + v;
    } else if (rate >= 0.001) {
        var v = (rate * 1000).toFixed(2).replace('.00', '').replace('.0', '');
        return "千分之" + v;
    } else {
        var v = (rate * 10000).toFixed(2).replace('.00', '').replace('.0', '');
        return "万分之" + v;
    }
}

// 【修复F】0 中性显示
function signedStr(v) {
    if (v > 0) return "#r+" + v + "#k";
    if (v < 0) return "#g" + v + "#k";
    return "0";
}

// ===== 存储访问 =====
function gk(prefix, name) { return prefix + name; }
function slotKey(prefix, slot, field) { return prefix + "s" + slot + "_" + field; }

function getExt(key) { return parseInt(cm.getCharacterExtendValue(key)) || 0; }
function setExt(key, v) { cm.saveOrUpdateCharacterExtendValue(key, "" + v); }

function getProfit(prefix) { return clampMoney(getExt(gk(prefix, GK_PROFIT))); }
function setProfit(prefix, v) { setExt(gk(prefix, GK_PROFIT), clampMoney(v)); }

function getYesterdayProfit(prefix) { return clampMoney(getExt(gk(prefix, GK_YESTERDAY))); }
function setYesterdayProfit(prefix, v) { setExt(gk(prefix, GK_YESTERDAY), clampMoney(v)); }

function getDay(prefix) { return getExt(gk(prefix, GK_DAY)); }

function getSlotMoney(prefix, slot) { return clampMoney(getExt(slotKey(prefix, slot, "money"))); }
function setSlotMoney(prefix, slot, v) { setExt(slotKey(prefix, slot, "money"), clampMoney(v)); }
function getSlotPlate(prefix, slot) { return getExt(slotKey(prefix, slot, "plate")); }
function getSlotId(prefix, slot) { return getExt(slotKey(prefix, slot, "id")); }
function getSlotDayChange(prefix, slot) { return getExt(slotKey(prefix, slot, "daychange")); }
function setSlotDayChange(prefix, slot, v) { setExt(slotKey(prefix, slot, "daychange"), v); }
function getSlotYesterday(prefix, slot) { return getExt(slotKey(prefix, slot, "yesterday")); }
function setSlotYesterday(prefix, slot, v) { setExt(slotKey(prefix, slot, "yesterday"), v); }

function clearSlot(prefix, slot) {
    for (var i = 0; i < SLOT_FIELDS.length; i++) {
        setExt(slotKey(prefix, slot, SLOT_FIELDS[i]), 0);
    }
}

function isSlotValid(prefix, slot) {
    return getSlotMoney(prefix, slot) > 0
        && getSlotPlate(prefix, slot) > 0
        && getSlotId(prefix, slot) > 0;
}

function saveStockSlot(prefix, slot, plate, sid, money) {
    setExt(slotKey(prefix, slot, "plate"), plate);
    setExt(slotKey(prefix, slot, "id"), sid);
    setExt(slotKey(prefix, slot, "money"), clampMoney(money));
    setExt(slotKey(prefix, slot, "daychange"), 0);
    setExt(slotKey(prefix, slot, "yesterday"), 0);
}

function getStockSlotList(prefix) {
    var list = [];
    for (var s = 1; s <= MAX_SLOTS; s++) {
        if (isSlotValid(prefix, s)) list.push(s);
    }
    return list;
}

function hasStock(prefix, plate, sid) {
    for (var s = 1; s <= MAX_SLOTS; s++) {
        if (getSlotPlate(prefix, s) == plate && getSlotId(prefix, s) == sid && getSlotMoney(prefix, s) > 0) {
            return true;
        }
    }
    return false;
}

function findEmptySlot(prefix) {
    for (var s = 1; s <= MAX_SLOTS; s++) {
        if (!isSlotValid(prefix, s)) return s;
    }
    return 0;
}

function getTotalStockMoney(prefix) {
    var total = 0;
    for (var s = 1; s <= MAX_SLOTS; s++) total += getSlotMoney(prefix, s);
    return total;
}

// ===== 板块浮动率 =====
var RATES_GOLD = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10];
var RATES_ICE  = [-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var RATES_WATER = [-30,-29,-28,-27,-26,-25,-24,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

function getPlateRates(plateId) {
    if (plateId === 2) return RATES_ICE;
    if (plateId === 3) return RATES_WATER;
    return RATES_GOLD;
}

// ===== 股票名称 =====
var stockNameArr = [
    ["勇士部落矿业", "废弃都市影城", "射手村旅游团", "魔法密林医药", "明珠港海运队"],
    ["雪域冰原能源", "扎昆狩猎公司", "雪域温泉文旅", "冰封锻造工厂", "野狼快运物流"],
    ["海底珊瑚养殖", "海豚快运集团", "深海水晶矿业", "鱼王海鲜餐饮", "海底隧道基建"],
];
var plateNameArr = ["", "金银岛屿板块", "冰封雪域板块", "水下世界板块"];
var plateRateDesc = ["", "±10%", "±20%", "±30%"];

// ===== 每日 00:00 结算 =====
function calcStockFloat(prefix) {
    var today = Math.floor(new Date().getTime() / 86400000);
    var settleKey = gk(prefix, GK_LAST_SETTLE);
    var lastSettle = getExt(settleKey);

    if (lastSettle === 0) {
        setExt(settleKey, today);
        return;
    }
    if (today <= lastSettle) return;

    var days = today - lastSettle;
    if (days > MAX_SETTLE_DAYS) days = MAX_SETTLE_DAYS;

    var totalChange = 0;
    var lastDayTotal = 0;

    for (var d = 0; d < days; d++) {
        var dayTotal = 0;
        for (var s = 1; s <= MAX_SLOTS; s++) {
            var mon = getSlotMoney(prefix, s);
            if (mon <= 0) continue;
            var plate = getSlotPlate(prefix, s);
            var rates = getPlateRates(plate);
            var per = rates[Math.floor(Math.random() * rates.length)];
            var change = Math.round(mon * per / 100);
            setSlotYesterday(prefix, s, mon);
            setSlotDayChange(prefix, s, change);

            var newMon = mon + change;
            if (newMon <= 0) {
                clearSlot(prefix, s);
            } else {
                setSlotMoney(prefix, s, clampMoney(newMon));
            }
            dayTotal += change;
        }
        lastDayTotal = dayTotal;
        totalChange += dayTotal;
    }

    setYesterdayProfit(prefix, lastDayTotal);
    setProfit(prefix, clampMoney(getProfit(prefix) + totalChange));
    setExt(settleKey, today);
}

// 股龄：按真实天数累加（若需与 MAX_SETTLE_DAYS 对齐，可把 diff 也 clamp）
function calcDayFresh(prefix) {
    var today = Math.floor(new Date().getTime() / 86400000);
    var lastDayKey = gk(prefix, GK_LAST_DAY);
    var dayKey = gk(prefix, GK_DAY);
    var lastDay = getExt(lastDayKey);
    var cur = getExt(dayKey);
    if (lastDay === 0) {
        setExt(dayKey, cur + 1);
        setExt(lastDayKey, today);
    } else if (today > lastDay) {
        setExt(dayKey, cur + (today - lastDay));
        setExt(lastDayKey, today);
    }
}

// 统一的跨天检查入口
function tick() {
    calcDayFresh(PREFIX_CASH);
    calcDayFresh(PREFIX_MESO);
    calcStockFloat(PREFIX_CASH);
    calcStockFloat(PREFIX_MESO);
}

// ===== 主菜单 =====
function start() {
    tick();
    showMainMenu();
}

function showMainMenu() {
    a = 0;
    var p = cm.getPlayer();
    var cash = p.getCashShop().getCash(CashShop.NX_CREDIT);
    var meso = p.getMeso();

    var cashProfit = getProfit(PREFIX_CASH);
    var mesoProfit = getProfit(PREFIX_MESO);
    var cashHold = getStockSlotList(PREFIX_CASH).length;
    var mesoHold = getStockSlotList(PREFIX_MESO).length;
    var cashTotal = getTotalStockMoney(PREFIX_CASH);
    var mesoTotal = getTotalStockMoney(PREFIX_MESO);
    var cashDay = getDay(PREFIX_CASH);
    var mesoDay = getDay(PREFIX_MESO);

    cm.sendSimple(
        "\r\n                       #i03994060# #i03994063# #i03994067# #i03994062# #i03994073# #i03994079#\r\n\r\n#n" +
        "欢迎#d" + cm.getName() + "#k来到#r#e【冒险炒股】#k#n\r\n\r\n" +
        "#r#e炒股有风险！投资需谨慎！#k#n\r\n" +
        "#d印花税：买入/卖出各扣" + formatTaxRate(STAMP_TAX_RATE) + "#k\r\n" +
        "#d结算：每天 00:00（凌晨12点），离线最多补算 " + MAX_SETTLE_DAYS + " 天#k\r\n\r\n" +
        "#e【点券账户】#k\r\n" +
        "  余额：" + cash + "\r\n" +
        "  持仓：" + cashHold + " 只 | 市值：" + cashTotal + "\r\n" +
        "  累计盈亏：" + signedStr(cashProfit) + " | 股龄：" + cashDay + " 天\r\n\r\n" +
        "#e【金币账户】#k\r\n" +
        "  余额：" + meso + "\r\n" +
        "  持仓：" + mesoHold + " 只 | 市值：" + mesoTotal + "\r\n" +
        "  累计盈亏：" + signedStr(mesoProfit) + " | 股龄：" + mesoDay + " 天\r\n\r\n" +
        "#L1##r 【点券市场】#k\r\n" +
        "#L2##b 【金币市场】#k\r\n" +
        "#L3##k 【板块介绍】#k\r\n" +
        "#L4##r 【点券排行榜】#k\r\n" +
        "#L5##b 【金币排行榜】#k"
    );
}

// ===== 子市场 =====
function showCurrencyMenu(prefix, currency) {
    a = (currency === CURRENCY_CASH) ? 20 : 21;
    currentPrefix = prefix;
    currentCurrency = currency;
    var cName = currencyName(currency);
    var balance = getPlayerBalance(cm.getPlayer(), currency);
    var profit = getProfit(prefix);
    var yesterday = getYesterdayProfit(prefix);
    var day = getDay(prefix);
    var hold = getStockSlotList(prefix).length;
    var total = getTotalStockMoney(prefix);

    cm.sendSimple(
        "\r\n                       #i03994060# #i03994063# #i03994067# #i03994062# #i03994073# #i03994079#\r\n\r\n#n" +
        "=========== 【" + cName + (currency === CURRENCY_CASH ? "商城" : "市场") + "】 ===========\r\n\r\n" +
        "余额：" + balance + "\r\n" +
        "持仓：" + hold + " 只 | 市值：" + total + "\r\n" +
        "昨日盈亏：" + signedStr(yesterday) + "\r\n" +
        "累计盈亏：" + signedStr(profit) + "\r\n" +
        "股龄：" + day + " 天\r\n\r\n" +
        "#L1##k 【金银岛屿板块】 " + plateRateDesc[1] + "#k\r\n" +
        "#L2##k 【冰封雪域板块】 " + plateRateDesc[2] + "#k\r\n" +
        "#L3##k 【水下世界板块】 " + plateRateDesc[3] + "#k\r\n" +
        "#L4##r 【交易所】\r\n" +
        "#L5##d 【返回主菜单】"
    );
}

// ===== 板块选股 =====
function openPlate(prefix, plateId) {
    a = 1;
    currentPlate = plateId;
    currentPrefix = prefix;
    currentCurrency = (prefix === PREFIX_CASH) ? CURRENCY_CASH : CURRENCY_MESO;

    var names = stockNameArr[plateId - 1];
    var msg = "\r\n                       #i03994060# #i03994063# #i03994067# #i03994062# #i03994073# #i03994079#\r\n\r\n#n";
    msg += "===============【" + plateNameArr[plateId] + "】=================\r\n\r\n";
    msg += "#r    (浮动率：" + plateRateDesc[plateId] + ")#k\r\n";
    msg += "#d（每日 00:00 随机涨跌）" + currencyName(currentCurrency) + "交易#k\r\n\r\n";

    for (var i = 0; i < names.length; i++) {
        var sid = i + 1;
        var owned = hasStock(prefix, plateId, sid);
        msg += "#L" + sid + "#<" + names[i] + ">" + (owned ? "  #d[已持有]#k" : "") + "\r\n\r\n";
    }
    msg += "#L6##d ← 返回市场#k";
    cm.sendSimple(msg);
}

// ===== 交易所 =====
function showExchange(prefix) {
    a = 5;
    currentPrefix = prefix;
    currentCurrency = (prefix === PREFIX_CASH) ? CURRENCY_CASH : CURRENCY_MESO;

    var list = getStockSlotList(prefix);
    var totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (exchangePage > totalPages) exchangePage = totalPages;
    if (exchangePage < 1) exchangePage = 1;

    var msg = "\r\n                       #i03994060# #i03994063# #i03994067# #i03994062# #i03994073# #i03994079#\r\n\r\n#n";
    msg += "========== 【" + currencyName(currentCurrency) + "交易所】 ==========\r\n\r\n";
    msg += "#d第 " + exchangePage + "/" + totalPages + " 页，共 " + list.length + " 个持仓#k\r\n\r\n";

    if (list.length == 0) {
        msg += "暂无持仓\r\n\r\n";
        // 【修复H】空仓时只显示返回
        msg += "#L5# #d ← 返回市场\r\n";
        cm.sendSimple(msg);
        return;
    }

    var start = (exchangePage - 1) * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, list.length);
    for (var i = start; i < end; i++) {
        var s = list[i];
        var plate = getSlotPlate(prefix, s);
        var sid = getSlotId(prefix, s);
        var mon = getSlotMoney(prefix, s);
        var dayChange = getSlotDayChange(prefix, s);
        var yesterday = getSlotYesterday(prefix, s);

        msg += (i + 1) + ".【" + plateNameArr[plate] + "】\r\n";
        msg += "股票：<" + stockNameArr[plate - 1][sid - 1] + ">\r\n";
        msg += "持仓市值：" + mon + "\r\n";
        msg += "浮动率：" + plateRateDesc[plate] + "\r\n";
        msg += "当日浮动：" + signedStr(dayChange) + "\r\n";
        if (yesterday > 0) {
            var rate = Math.round(dayChange * 100 / yesterday);
            msg += "当日浮动率：" + signedStr(rate) + "%\r\n\r\n";
        } else {
            msg += "当日浮动率：0%\r\n\r\n";
        }
    }

    msg += "-------------------------\r\n";
    msg += "#L1# #r加仓\r\n";
    msg += "#L2# #b减仓\r\n";
    if (exchangePage > 1) msg += "#L3# #d← 上一页\r\n";
    if (exchangePage < totalPages) msg += "#L4# #d下一页 →\r\n";
    msg += "#L5# #d ← 返回市场\r\n";

    cm.sendSimple(msg);
}

// ===== 选股（加仓/减仓）=====
function showStockSelect(prefix) {
    a = 10;
    currentPrefix = prefix;
    currentCurrency = (prefix === PREFIX_CASH) ? CURRENCY_CASH : CURRENCY_MESO;

    var list = getStockSlotList(prefix);
    if (list.length == 0) { cm.sendOk("暂无持仓"); cm.dispose(); return; }
    var totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (selectPage > totalPages) selectPage = totalPages;
    if (selectPage < 1) selectPage = 1;

    var actionName = operateType == "add" ? "加仓" : "减仓";
    var txt = "\r\n                       #i03994060# #i03994063# #i03994067# #i03994062# #i03994073# #i03994079#\r\n\r\n#n";
    txt += "选择要" + actionName + "的股票：\r\n";
    txt += "#d第 " + selectPage + "/" + totalPages + " 页，共 " + list.length + " 个持仓#k\r\n\r\n";

    var start = (selectPage - 1) * PAGE_SIZE;
    var end = Math.min(start + PAGE_SIZE, list.length);
    for (var i = start; i < end; i++) {
        var s = list[i];
        var plate = getSlotPlate(prefix, s);
        var sid = getSlotId(prefix, s);
        var mon = getSlotMoney(prefix, s);
        var idx = i - start + 1;
        txt += "#L" + idx + "# 【" + plateNameArr[plate] + "】 | <" + stockNameArr[plate - 1][sid - 1] + "> #b仓位：" + mon + "#k\r\n\r\n";
    }
    if (selectPage > 1) txt += "#L98# #d← 上一页\r\n";
    if (selectPage < totalPages) txt += "#L99# #d下一页 →\r\n";

    cm.sendSimple(txt);
}

// ===== 加仓 =====
function doAdd(prefix, slot, addVal) {
    var p = cm.getPlayer();
    var currency = (prefix === PREFIX_CASH) ? CURRENCY_CASH : CURRENCY_MESO;
    var cName = currencyName(currency);
    var balance = getPlayerBalance(p, currency);
    var limit = getSingleLimit(currency);

    // 【修复C】槽必须有效（防止清仓后脏写）
    if (!isSlotValid(prefix, slot)) { cm.sendOk("仓位已不存在，请重新选择！"); return; }

    if (addVal <= 0 || balance < addVal) { cm.sendOk(cName + "不足！"); return; }
    if (addVal > limit) { cm.sendOk("单次加仓上限" + formatMoney(limit) + cName + "！"); return; }

    var tax = calcTax(addVal);
    var actualVal = addVal - tax;
    if (actualVal <= 0) { cm.sendOk("金额过小，扣除印花税后为0！"); return; }

    var nowVal = getSlotMoney(prefix, slot);
    if (nowVal + actualVal > MAX_MONEY) {
        cm.sendOk("仓位已达上限（" + MAX_MONEY + "）！");
        return;
    }

    var newTotal = nowVal + actualVal;
    setSlotMoney(prefix, slot, newTotal);
    doGainCurrency(p, currency, -addVal);
    cm.sendOk(
        "#r加仓成功！#k\r\n\r\n支付：" + addVal + " " + cName +
        "\r\n#d印花税：" + tax + "#k\r\n#b入仓金额：" + actualVal +
        "#k\r\n最新持仓：" + newTotal
    );
}

// ===== 减仓 =====
function doSell(prefix, slot, sellVal) {
    var p = cm.getPlayer();
    var currency = (prefix === PREFIX_CASH) ? CURRENCY_CASH : CURRENCY_MESO;
    var cName = currencyName(currency);
    var nowVal = getSlotMoney(prefix, slot);

    if (!isSlotValid(prefix, slot)) { cm.sendOk("仓位已不存在，请重新选择！"); return; }
    if (sellVal <= 0 || sellVal > nowVal) { cm.sendOk("金额错误！"); return; }

    var tax = calcTax(sellVal);
    var actualGain = sellVal - tax;

    // 【修复B】金币与点券都做上限检查
    if (getPlayerBalance(p, currency) + actualGain > getCurrencyCap(currency)) {
        cm.sendOk(cName + "已达上限（" + getCurrencyCap(currency) + "），无法减持，请先消耗" + cName + "！");
        return;
    }

    var left = nowVal - sellVal;
    if (left <= 0) clearSlot(prefix, slot);
    else setSlotMoney(prefix, slot, left);
    doGainCurrency(p, currency, actualGain);
    cm.sendOk(
        "#b减持成功！#k\r\n\r\n减持：" + sellVal + " " + cName +
        "\r\n#d印花税：" + tax + "#k\r\n#b实际到账：" + actualGain + " " + cName +
        "\r\n最新仓位：" + left
    );
}

// ===== 板块介绍 =====
function showIntro() {
    cm.sendOk(
        "\r\n                       #i03994060# #i03994063# #i03994067# #i03994062# #i03994073# #i03994079#\r\n\r\n\r\n#n" +
        "#b【金银岛屿板块】  浮动率：±10%（整数档）\r\n" +
        "#b【冰封雪域板块】  浮动率：±20%（整数档）\r\n" +
        "#b【水下世界板块】  浮动率：±30%（整数档）\r\n\r\n" +
        "#r结算时间：每天 00:00（凌晨12点）#k\r\n" +
        "所有持仓按所在板块浮动率随机涨跌一次\r\n" +
        "离线期间最多补算 " + MAX_SETTLE_DAYS + " 天\r\n\r\n" +
        "#k点券与金币【两套独立系统】互不干扰\r\n" +
        "同一板块可持有多只不同股票（最多 15 只）\r\n" +
        "同一只股票仅可买入一次，后续请用加仓\r\n" +
        "#d同一仓位货币固定，加仓/减仓沿用该货币#k\r\n" +
        "#r盈利+红色#k、#g亏损-绿色#k"
    );
    cm.dispose();
}

// ===== 排行榜 =====
function showRankList(prefix) {
    var DatabaseConnection = Java.type("org.gms.util.DatabaseConnection");
    var extendName = gk(prefix, GK_PROFIT);
    var title = (prefix === PREFIX_CASH) ? "点券" : "金币";
    var conn = null, ps = null, rs = null;

    var msg = "\r\n                       #i03994060# #i03994063# #i03994067# #i03994062# #i03994073# #i03994079#\r\n\r\n#n";
    msg += "========== 【" + title + "股神排行榜】 ==========\r\n\r\n";

    try {
        conn = DatabaseConnection.getConnection();
        ps = conn.prepareStatement(
            "SELECT c.name, ev.extend_value AS profit " +
            "FROM extend_value ev JOIN characters c ON c.id = ev.extend_id " +
            "WHERE ev.extend_type = ? AND ev.extend_name = ? " +
            "ORDER BY CAST(ev.extend_value AS SIGNED) DESC LIMIT 100"
        );
        ps.setInt(1, EXTEND_TYPE_STOCK_PROFIT);
        ps.setString(2, extendName);
        rs = ps.executeQuery();
        var i = 0;
        while (rs.next()) {
            var profit = clampMoney(parseInt(rs.getString("profit")) || 0);
            msg += "#r【" + (++i) + "】#k#b" + rs.getString("name") + "#k 累计盈亏：" + signedStr(profit) + "\r\n";
        }
        if (i === 0) msg += "暂无数据\r\n";
    } catch (e) {
        msg += "#b排行榜加载失败，请稍后再试#k\r\n";
    } finally {
        if (rs) try { rs.close(); } catch (e) {}
        if (ps) try { ps.close(); } catch (e) {}
        if (conn) try { conn.close(); } catch (e) {}
    }

    cm.sendOk(msg);
    cm.dispose();
}

// ===== 主分发 =====
function action(mode, type, sel) {
    if (mode == 0) { cm.dispose(); return; }
    selection = sel;
    tick();

    if (a == 0) {
        if (sel == 1) showCurrencyMenu(PREFIX_CASH, CURRENCY_CASH);
        else if (sel == 2) showCurrencyMenu(PREFIX_MESO, CURRENCY_MESO);
        else if (sel == 3) showIntro();
        else if (sel == 4) showRankList(PREFIX_CASH);
        else if (sel == 5) showRankList(PREFIX_MESO);
    } else if (a == 20 || a == 21) {
        var prefix = (a == 20) ? PREFIX_CASH : PREFIX_MESO;
        if (sel == 1) openPlate(prefix, 1);
        else if (sel == 2) openPlate(prefix, 2);
        else if (sel == 3) openPlate(prefix, 3);
        else if (sel == 4) { exchangePage = 1; showExchange(prefix); }
        else if (sel == 5) showMainMenu();
    } else if (a == 1) {
        if (sel == 6) { showCurrencyMenu(currentPrefix, currentCurrency); return; }
        currentStockId = sel;
        if (hasStock(currentPrefix, currentPlate, currentStockId)) {
            cm.sendOk("#r已持有该股票，请使用【加仓】功能！");
            cm.dispose();
            return;
        }
        a = 2;
        var p = cm.getPlayer();
        var limit = getSingleLimit(currentCurrency);
        var balance = getPlayerBalance(p, currentCurrency);
        var maxBuy = Math.max(1, Math.min(limit, balance));
        var name = stockNameArr[currentPlate - 1][currentStockId - 1];
        cm.sendGetNumber(
            "买入：" + name + "（" + currencyName(currentCurrency) + "）\r\n\r\n" +
            "余额：" + balance + "\r\n" +
            "单次上限：" + formatMoney(limit) + "\r\n\r\n请输入买入金额：",
            1, 1, maxBuy
        );
    } else if (a == 2) {
        var cost = sel;
        var p = cm.getPlayer();
        var currency = currentCurrency;
        var cName = currencyName(currency);
        var balance = getPlayerBalance(p, currency);
        var limit = getSingleLimit(currency);

        if (cost <= 0 || balance < cost) { cm.sendOk(cName + "不足！"); cm.dispose(); return; }
        if (cost > limit) { cm.sendOk("单次上限" + formatMoney(limit) + cName + "！"); cm.dispose(); return; }
        var slot = findEmptySlot(currentPrefix);
        if (slot === 0) { cm.sendOk("持仓已满（最多 " + MAX_SLOTS + " 只）！"); cm.dispose(); return; }

        var tax = calcTax(cost);
        var actualVal = cost - tax;
        if (actualVal <= 0) { cm.sendOk("金额过小，扣除印花税后为0！"); cm.dispose(); return; }

        doGainCurrency(p, currency, -cost);
        saveStockSlot(currentPrefix, slot, currentPlate, currentStockId, actualVal);
        cm.sendOk(
            "#r买入成功！#k\r\n\r\n支付：" + cost + " " + cName +
            "\r\n#d印花税：" + tax + "#k\r\n#b入仓金额：" + actualVal
        );
        cm.dispose();
    } else if (a == 5) {
        if (sel == 1) { operateType = "add"; selectPage = 1; showStockSelect(currentPrefix); }
        else if (sel == 2) { operateType = "sell"; selectPage = 1; showStockSelect(currentPrefix); }
        else if (sel == 3) { exchangePage--; showExchange(currentPrefix); }
        else if (sel == 4) { exchangePage++; showExchange(currentPrefix); }
        else if (sel == 5) { showCurrencyMenu(currentPrefix, currentCurrency); }
    } else if (a == 10) {
        var list = getStockSlotList(currentPrefix);
        var totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
        if (selectPage > totalPages) selectPage = totalPages;
        if (selectPage < 1) selectPage = 1;

        if (sel == 98) { selectPage--; showStockSelect(currentPrefix); return; }
        if (sel == 99) { selectPage++; showStockSelect(currentPrefix); return; }

        var start = (selectPage - 1) * PAGE_SIZE;
        var idx = start + sel - 1;
        if (idx < 0 || idx >= list.length) { cm.sendOk("选择无效！"); cm.dispose(); return; }

        operateSlot = list[idx];
        // 【修复A】记录仓位身份，回调时校验
        operatePlate = getSlotPlate(currentPrefix, operateSlot);
        operateSid = getSlotId(currentPrefix, operateSlot);
        a = 11;
        var mon = getSlotMoney(currentPrefix, operateSlot);
        var currency = currentCurrency;
        var cName = currencyName(currency);

        if (operateType == "add") {
            var p = cm.getPlayer();
            var balance = getPlayerBalance(p, currency);
            var limit = getSingleLimit(currency);
            var maxAdd = Math.max(1, Math.min(limit, balance));
            cm.sendGetNumber(
                "#r加仓金额（" + cName + "）：#k\r\n\r\n持仓：" + mon +
                "\r\n余额：" + balance + "\r\n单次上限：" + formatMoney(limit) +
                "\r\n\r\n请输入加仓金额：",
                1, 1, maxAdd
            );
        } else {
            cm.sendGetNumber(
                "#b减仓金额（" + cName + "）：#k\r\n\r\n持仓：" + mon + "\r\n\r\n请输入减仓金额：",
                1, 1, mon
            );
        }
    } else if (a == 11) {
        // 【修复A】校验仓位身份未变（防止清仓后复用槽导致加错股票/脏数据）
        if (getSlotPlate(currentPrefix, operateSlot) != operatePlate ||
            getSlotId(currentPrefix, operateSlot) != operateSid) {
            cm.sendOk("仓位已变更，请重新操作！");
            cm.dispose();
            return;
        }
        if (operateType == "add") doAdd(currentPrefix, operateSlot, selection);
        if (operateType == "sell") doSell(currentPrefix, operateSlot, selection);
        cm.dispose();
    }
}