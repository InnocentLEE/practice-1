package com.lyq.project.dao;

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

    ShengJiJianGuanBuMenDetail selectShengJiJianGuanBuMenDetail(@Param("id") String id);

    Unit selectByContactId(String id);

    int updateByPrimaryKeySelective(Unit record);

    int updateByPrimaryKey(Unit record);
}