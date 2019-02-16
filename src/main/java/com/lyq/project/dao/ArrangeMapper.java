package com.lyq.project.dao;

import com.lyq.project.pojo.Arrange;

public interface ArrangeMapper {
    int deleteByPrimaryKey(String id);

    int insert(Arrange record);

    int insertSelective(Arrange record);

    Arrange selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Arrange record);

    int updateByPrimaryKey(Arrange record);
}