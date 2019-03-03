package com.lyq.project.dao;

import com.lyq.project.pojo.UnitGather;

import java.util.List;

public interface UnitGatherMapper {
    int deleteByPrimaryKey(String id);

    int deleteByUnitId(String id);

    int insert(UnitGather record);

    int insertSelective(UnitGather record);

    UnitGather selectByPrimaryKey(String id);

    int countChildUnit(String id);

    int updateByPrimaryKeySelective(UnitGather record);

    int updateByPrimaryKey(UnitGather record);

    List<UnitGather> selectByChildUnit(String id);
}