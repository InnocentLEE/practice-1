package com.lyq.project.dao;

import com.lyq.project.pojo.RouteStation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RouteStationMapper {
    int deleteByPrimaryKey(String id);

    int insert(RouteStation record);

    int insertSelective(RouteStation record);

    RouteStation selectByPrimaryKey(String id);

    List<RouteStation> selectByRoutId(@Param("id")String id);

    int updateByPrimaryKeySelective(RouteStation record);

    int updateByPrimaryKey(RouteStation record);
}