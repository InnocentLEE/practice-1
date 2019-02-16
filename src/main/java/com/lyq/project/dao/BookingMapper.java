package com.lyq.project.dao;

import com.lyq.project.pojo.Booking;

public interface BookingMapper {
    int deleteByPrimaryKey(String id);

    int insert(Booking record);

    int insertSelective(Booking record);

    Booking selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Booking record);

    int updateByPrimaryKey(Booking record);
}