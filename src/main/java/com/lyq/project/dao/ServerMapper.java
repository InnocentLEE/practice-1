package com.lyq.project.dao;

import com.lyq.project.pojo.Server;

public interface ServerMapper {
    int deleteByPrimaryKey(String id);

    int insert(Server record);

    int insertSelective(Server record);

    Server selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Server record);

    int updateByPrimaryKey(Server record);
}