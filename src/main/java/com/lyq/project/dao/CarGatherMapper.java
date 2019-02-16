package com.lyq.project.dao;

import com.lyq.project.pojo.CarGather;

public interface CarGatherMapper {
    int insert(CarGather record);

    int insertSelective(CarGather record);
}