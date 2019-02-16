package com.lyq.project.dao;

import com.lyq.project.pojo.RouteStation;

public interface RouteStationMapper {
    int deleteByPrimaryKey(String id);

    int insert(RouteStation record);

    int insertSelective(RouteStation record);

    RouteStation selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(RouteStation record);

    int updateByPrimaryKey(RouteStation record);
}