package com.lyq.project.dao;

import com.lyq.project.pojo.Route;

public interface RouteMapper {
    int deleteByPrimaryKey(String id);

    int insert(Route record);

    int insertSelective(Route record);

    Route selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Route record);

    int updateByPrimaryKey(Route record);
}