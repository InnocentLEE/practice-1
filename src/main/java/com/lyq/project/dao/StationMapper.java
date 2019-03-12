package com.lyq.project.dao;

import com.alibaba.druid.support.spring.stat.annotation.Stat;
import com.lyq.project.pojo.Station;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StationMapper {
    int deleteByPrimaryKey(String id);

    int insert(Station record);

    int insertSelective(Station record);

    Station selectByPrimaryKey(String id);

    List<Station> selectByUnitId(String id);

    int countByUnitIDAndName(@Param("unitId")String id,@Param("name")String name);

    int updateByPrimaryKeySelective(Station record);

    int updateByPrimaryKey(Station record);
}