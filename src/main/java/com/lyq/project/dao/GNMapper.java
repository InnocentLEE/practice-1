package com.lyq.project.dao;

import com.lyq.project.dto.ShengJiJianGuanBuMenDetail;
import com.lyq.project.dto.ShiJiJianGuanBuMenDetail;
import com.lyq.project.dto.ShiJiJianGuanBuMenListDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface GNMapper {
    // 根据省份找id
    String selectByparentUnitId(String province);

    List<ShiJiJianGuanBuMenListDto> selectShiJiJianGuanBuMen(@Param("index") int index, @Param("size") int size, @Param("unitName") String unitName, @Param("province") String province, @Param("city") String city);

    ShiJiJianGuanBuMenDetail selectShiJiJianGuanBuMenDetail(@Param("id") String id);
}
