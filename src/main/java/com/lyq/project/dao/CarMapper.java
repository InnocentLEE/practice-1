package com.lyq.project.dao;

import com.lyq.project.pojo.Car;

public interface CarMapper {
    int deleteByPrimaryKey(String id);

    int insert(Car record);

    int insertSelective(Car record);

    Car selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Car record);

    int updateByPrimaryKey(Car record);
}