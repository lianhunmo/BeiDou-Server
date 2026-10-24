//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package org.gms.dao.mapper;

import com.mybatisflex.core.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.gms.dao.entity.CharacterStorageDO;

public interface CharacterStorageMapper extends BaseMapper<CharacterStorageDO> {
    @Insert({"INSERT INTO character_storage (`id`, `key`, `value`) " +
            "VALUES (#{id}, #{key}, #{value}) " +
            "ON DUPLICATE KEY UPDATE" +
            " `value` = VALUES(`value`)"})
    void set(@Param("id") Integer var1, @Param("key") String var2, @Param("value") String var3);

    @Select({"SELECT * FROM character_storage WHERE id = #{id} AND `key` = #{key}"})
    CharacterStorageDO get(@Param("id") Integer var1, @Param("key") String var2);
}
