package com.lyq.project.dao;

import com.lyq.project.pojo.Contacts;
import org.apache.ibatis.annotations.Param;

public interface ContactsMapper {
    int deleteByPrimaryKey(String id);

    int insert(Contacts record);

    int insertSelective(Contacts record);

    Contacts selectByPrimaryKey(String id);

    Contacts selectByCardNoAndPassword(@Param("cardNo")String cardNo, @Param("password")String password);

    int selectCountByCardNo(@Param("cardNo")String cardNo);

    int selectCountByUnitIdAndCardNo(@Param("id")String id, @Param("cardNo")String cardNo);

    int updateByPrimaryKeySelective(Contacts record);

    int updateByPrimaryKey(Contacts record);
}