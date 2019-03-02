package com.lyq.project.dao;

import com.lyq.project.dto.KeYunQiYeDetail;
import com.lyq.project.dto.KeYunQiYeListDto;
import com.lyq.project.dto.ShengJiJianGuanBuMenDetail;
import com.lyq.project.dto.ShengJiJianGuanBuMenListDto;
import com.lyq.project.pojo.Unit;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UnitMapper {
    int deleteByPrimaryKey(String id);

    int insert(Unit record);

    int insertSelective(Unit record);

    Unit selectByPrimaryKey(String id);

    List<ShengJiJianGuanBuMenListDto> selectShengJiJianGuanBuMen(@Param("index") int index, @Param("size") int size, @Param("unitName") String unitName, @Param("province") String province);

    List<KeYunQiYeListDto> selectKeYunQiYeByAdmin(@Param("index") int index, @Param("size") int size, @Param("unitName") String unitName, @Param("businessType") int businessType);

    List<KeYunQiYeListDto> selectKeYunQiYeByShengJiJianGuanBuMen(@Param("index") int index, @Param("size") int size, @Param("unitName") String unitName, @Param("businessType") int businessType, @Param("province") String province);

    List<KeYunQiYeListDto> selectKeYunQiYeByShiJiJianGuanBuMen(@Param("index") int index, @Param("size") int size, @Param("unitName") String unitName, @Param("businessType") int businessType, @Param("province") String province, @Param("city") String city);

    List<KeYunQiYeListDto> selectKeYunQiYeByKeYunZhan(@Param("index") int index, @Param("size") int size, @Param("unitName") String unitName, @Param("businessType") int businessType, @Param("parentId") String parentId);

    ShengJiJianGuanBuMenDetail selectShengJiJianGuanBuMenDetail(@Param("id") String id);

    KeYunQiYeDetail selectKeYunQiYeDetail(@Param("id") String id);

    Unit selectByContactId(String id);

    int countByPermitWord(@Param("permitWord") String permitWord);

    int countByPermitWordAndUnitId(@Param("permitWord") String permitWord,@Param("id") String id);

    int countByPermitNum(@Param("permitNum") String permitNum);

    int countByPermitNumAndUnitId(@Param("permitNum") String permitNum,@Param("id") String id);

    int updateByPrimaryKeySelective(Unit record);

    int updateByPrimaryKey(Unit record);
}