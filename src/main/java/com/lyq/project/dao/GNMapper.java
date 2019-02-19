package com.lyq.project.dao;

import com.lyq.project.dto.ShiJiJianGuanBuMenListDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GNMapper {
    // 根据省份找id
    String selectByparentUnitId(String province);

    List<ShiJiJianGuanBuMenListDto> selectShiJiJianGuanBuMen(@Param("index") int index, @Param("size") int size, @Param("unitName") String unitName, @Param("city") String city);
}
