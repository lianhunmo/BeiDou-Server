/**
 * 功能：按物品分类查找爆率
 * 整合版（每页50个，显示ID，无子分类，含职业技能书）
 * 版本：1.1
 * 作者：Jason
 * 时间：2026年2月13日
 */

// 导入Java类
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var MonsterInformationProvider = Java.type('org.gms.server.life.MonsterInformationProvider');
var DatabaseConnection = Java.type('org.gms.util.DatabaseConnection');

// 常量定义
const ITEMS_PER_PAGE = 50;
const MAX_ITEMS = 2000;
const PAGE_PREV = 9000001;
const PAGE_NEXT = 9000002;
const PAGE_BACK = 9000003;
const PAGE_MAIN = 9000004;

// 全局变量
var currentCategory = "";
var categoryItems = [];
var currentPage = 0;
var totalResults = 0;
var currentMainCategory = 0;

// 主分类ID范围（合并后的区间）
var categoryRanges = {
    1: { name: "战士武器", ranges: [[1302000,1302999], [1402000,1402999], [1312000,1312999], [1412000,1412999], [1322000,1322999], [1422000,1422999], [1432000,1432999], [1442000,1442999]] },
    2: { name: "法师武器", ranges: [[1372000,1372999], [1382000,1382999]] },
    3: { name: "弓箭手武器", ranges: [[1452000,1452999], [1462000,1462999]] },
    4: { name: "飞侠武器", ranges: [[1332000,1332999], [1472000,1472999], [1342000,1342999]] },
    5: { name: "海盗武器", ranges: [[1482000,1482999], [1492000,1492999]] },
    6: { name: "防具类", ranges: [[1002000,1003999], [1042000,1042999], [1052000,1052999], [1062000,1062999], [1072000,1072999], [1082000,1082999], [1092000,1092999], [1102000,1102999]] },
    7: { name: "饰品类", ranges: [[1112000,1112999], [1122000,1122999], [1132000,1132999], [1152000,1152999], [1032000,1032999], [1022000,1022999], [1012000,1012999]] },
    8: { name: "消耗品", ranges: [[2000000,2999999]] },
    9: { name: "卷轴/强化", ranges: [[2040000,2049999]] },
    10: { name: "其他物品", ranges: [[4000000,4039999]] },
    11: { name: "职业技能书", ranges: [[2280000,2299999]] }
};

function start() {
    levelStart();
}

/**
 * 主菜单
 */
function levelStart() {
    var text = "#e#b请选择要查找的物品分类：#k#n\r\n\r\n";
    text += "#L1##r战士武器#k#l\r\n";
    text += "#L2##r法师武器#k#l\r\n";
    text += "#L3##r弓箭手武器#k#l\r\n";
    text += "#L4##r飞侠武器#k#l\r\n";
    text += "#L5##r海盗武器#k#l\r\n";
    text += "#L6##r防具类#k#l\r\n";
    text += "#L7##r饰品类#k#l\r\n";
    text += "#L8##r消耗品#k#l\r\n";
    text += "#L9##r卷轴/强化#k#l\r\n";
    text += "#L10##r其他物品#k#l\r\n";
    text += "#L11##r职业技能书#k#l\r\n";
    text += "#L12##r关闭#k#l";

    cm.sendNextSelectLevel('handleMainSelection', text, 2);
}

/**
 * 处理主菜单选择
 */
function levelhandleMainSelection(selection) {
    var sel = parseInt(selection);

    if (sel >= 1 && sel <= 11) {
        currentMainCategory = sel;
        loadCategoryItems(sel);
    } else if (sel == 12) {
        cm.dispose();
    } else {
        levelStart();
    }
}

/**
 * 工具：安全关闭数据库资源
 */
function closeQuietly(resource) {
    if (resource != null) {
        try {
            resource.close();
        } catch (e) {
            // 忽略关闭异常
        }
    }
}

/**
 * 工具：转换为JS字符串
 */
function toJsString(value) {
    if (value == null) {
        return null;
    }
    return "" + value;
}

/**
 * 工具：判断物品名是否有效
 */
function isValidItemName(name) {
    return name != null && name !== "" && name !== "MISSINGNO";
}

/**
 * 查询分类下有掉落记录的物品ID
 */
function queryItemIdsByRanges(ranges) {
    var con = null;
    var ps = null;
    var rs = null;
    var ids = [];

    try {
        con = DatabaseConnection.getConnection();

        var sql = "SELECT itemid FROM drop_data WHERE ";
        var conditions = [];
        var params = [];

        for (var i = 0; i < ranges.length; i++) {
            conditions.push("(itemid BETWEEN ? AND ?)");
            params.push(ranges[i][0]);
            params.push(ranges[i][1]);
        }

        sql += conditions.join(" OR ");
        sql += " GROUP BY itemid LIMIT " + MAX_ITEMS;

        ps = con.prepareStatement(sql);

        for (var j = 0; j < params.length; j++) {
            ps.setInt(j + 1, params[j]);
        }

        rs = ps.executeQuery();

        while (rs.next()) {
            ids.push(rs.getInt("itemid"));
        }

        return ids;
    } finally {
        closeQuietly(rs);
        closeQuietly(ps);
        closeQuietly(con);
    }
}

/**
 * 查询指定物品的掉落信息
 */
function queryDropsByItem(itemId) {
    var con = null;
    var ps = null;
    var rs = null;
    var drops = [];

    try {
        con = DatabaseConnection.getConnection();

        ps = con.prepareStatement(
            "SELECT dropperid, chance, questid FROM drop_data WHERE itemid = ? ORDER BY chance DESC LIMIT 30"
        );
        ps.setInt(1, itemId);

        rs = ps.executeQuery();

        while (rs.next()) {
            drops.push({
                mobId: rs.getInt("dropperid"),
                chance: rs.getInt("chance") / 10000,
                questId: rs.getInt("questid")
            });
        }

        return drops;
    } finally {
        closeQuietly(rs);
        closeQuietly(ps);
        closeQuietly(con);
    }
}

// ============ 加载物品列表 ============
function loadCategoryItems(categoryId) {
    var category = categoryRanges[categoryId];

    if (!category) {
        cm.sendOkLevel('levelStart', "#r无效的物品分类。#k", 2);
        return;
    }

    currentCategory = category.name;
    categoryItems = [];
    currentPage = 0;
    totalResults = 0;

    try {
        var ids = queryItemIdsByRanges(category.ranges);
        var iip = ItemInformationProvider.getInstance();

        for (var i = 0; i < ids.length; i++) {
            var itemId = ids[i];
            var itemName = toJsString(iip.getName(itemId));

            if (isValidItemName(itemName)) {
                categoryItems.push({
                    id: itemId,
                    name: itemName
                });
            }
        }

        if (categoryItems.length == 0) {
            cm.sendOkLevel('levelStart', "#r该分类下没有找到有掉落记录的物品。#k", 2);
            return;
        }

        categoryItems.sort(function(a, b) {
            return a.name.localeCompare(b.name);
        });

        totalResults = categoryItems.length;
        showCategoryItems();

    } catch (e) {
        cm.sendOkLevel('levelStart', "#r加载物品列表时发生错误：#k" + e, 2);
    }
}

/**
 * 显示物品列表（分页，显示ID）
 */
function showCategoryItems() {
    var start = currentPage * ITEMS_PER_PAGE;
    var end = Math.min(start + ITEMS_PER_PAGE, totalResults);

    var text = "#e#b" + currentCategory + "#k#n 物品列表（共 " + totalResults + " 个）：\r\n\r\n";

    if (totalResults >= MAX_ITEMS) {
        text += "#d最多显示前 " + MAX_ITEMS + " 个有掉落记录的物品。#k\r\n\r\n";
    }

    for (var i = start; i < end; i++) {
        var item = categoryItems[i];
        text += "#L" + item.id + "##v" + item.id + "# #b#z" + item.id + "##k (ID: " + item.id + ")#l\r\n";
    }

    text += "\r\n";

    if (currentPage > 0) {
        text += "#L" + PAGE_PREV + "#<< 上一页#l\r\n";
    }

    if (end < totalResults) {
        text += "#L" + PAGE_NEXT + "#下一页 >>#l\r\n";
    }

    if (totalResults > ITEMS_PER_PAGE) {
        text += "\r\n当前第 " + (currentPage + 1) + " 页，共 " + Math.ceil(totalResults / ITEMS_PER_PAGE) + " 页\r\n";
    }

    text += "\r\n#L" + PAGE_BACK + "#返回主菜单#l";

    cm.sendNextSelectLevel('handleItemSelection', text, 2);
}

/**
 * 处理物品列表选择
 */
function levelhandleItemSelection(selection) {
    var sel = parseInt(selection);

    if (sel == PAGE_PREV) {
        if (currentPage > 0) {
            currentPage--;
        }
        showCategoryItems();
    } else if (sel == PAGE_NEXT) {
        if ((currentPage + 1) * ITEMS_PER_PAGE < totalResults) {
            currentPage++;
        }
        showCategoryItems();
    } else if (sel == PAGE_BACK || sel == PAGE_MAIN) {
        levelStart();
    } else if (sel > 0) {
        var itemId = sel;
        var itemName = toJsString(ItemInformationProvider.getInstance().getName(itemId));

        if (isValidItemName(itemName)) {
            showItemDropInfo(itemId, itemName);
        } else {
            cm.sendOkLevel('showCategoryItems', "#r物品信息获取失败。#k", 2);
        }
    } else {
        cm.sendOkLevel('showCategoryItems', "#r选择无效。#k", 2);
    }
}

/**
 * 显示物品掉落信息
 */
function showItemDropInfo(itemId, itemName) {
    var msg = "#e#b" + itemName + "#k#n (ID: " + itemId + ") 的掉落信息：\r\n\r\n";

    try {
        var drops = queryDropsByItem(itemId);

        if (drops.length == 0) {
            msg += "#r没有找到掉落该物品的怪物。#k";
        } else {
            var player = cm.getPlayer();
            var dropRate = player.getDropRate();
            var familyDrop = player.getFamilyDrop();
            var mip = MonsterInformationProvider.getInstance();

            for (var i = 0; i < drops.length; i++) {
                var drop = drops[i];
                var mobName = toJsString(mip.getMobNameFromId(drop.mobId));

                if (!isValidItemName(mobName)) {
                    mobName = "未知怪物";
                }

                msg += "#b" + mobName + "#k (ID: " + drop.mobId + ")\r\n";
                msg += "  #g爆率: " + drop.chance.toFixed(4) + "%#k";

                var playerRate = drop.chance * dropRate * familyDrop;
                if (Math.abs(playerRate - drop.chance) > 0.0001) {
                    msg += " → #d" + playerRate.toFixed(4) + "%#k";
                }

                if (drop.questId > 0) {
                    msg += " #r[任务道具]#k";
                }

                msg += "\r\n\r\n";
            }
        }

        msg += "\r\n#L" + PAGE_BACK + "#返回物品列表#l   #L" + PAGE_MAIN + "#返回主菜单#l";

        cm.sendNextSelectLevel('handleDropInfo', msg, 2);

    } catch (e) {
        cm.sendOkLevel('showCategoryItems', "#r查询过程中发生错误：#k" + e, 2);
    }
}

/**
 * 处理爆率详情页的选择
 */
function levelhandleDropInfo(selection) {
    var sel = parseInt(selection);

    if (sel == PAGE_BACK) {
        showCategoryItems();
    } else if (sel == PAGE_MAIN) {
        levelStart();
    }
}

// 错误处理返回
function levelshowCategoryItems() {
    showCategoryItems();
}