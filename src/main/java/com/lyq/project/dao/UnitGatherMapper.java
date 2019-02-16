package com.lyq.project.dao;

import com.lyq.project.pojo.UnitGather;

public interface UnitGatherMapper {
    int deleteByPrimaryKey(String id);

    int insert(UnitGather record);

    int insertSelective(UnitGather record);

    UnitGather selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(UnitGather record);

    int updateByPrimaryKey(UnitGather record);
}