package com.lyq.project.dao;

import com.lyq.project.dto.KeCheDetail;
import com.lyq.project.dto.KeCheListDto;
import com.lyq.project.pojo.Car;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CarMapper {
    int deleteByPrimaryKey(String id);

    int insert(Car record);

    int insertSelective(Car record);

    Car selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Car record);

    int updateByPrimaryKey(Car record);

    int countByCarNumAndType(@Param("carNum")String carNum,@Param("carType")int carType);

    List<KeCheListDto> selectByAdmin(@Param("index") int index, @Param("size") int size,@Param("carNum")String carNum,@Param("carType")int carType);

    List<KeCheListDto> selectByShengJiJianGuanBuMen(@Param("index") int index, @Param("size") int size,@Param("carNum")String carNum,@Param("carType")int carType,@Param("unitId")String id);

    List<KeCheListDto> selectByShiJiJianGuanBuMen(@Param("index") int index, @Param("size") int size,@Param("carNum")String carNum,@Param("carType")int carType,@Param("unitId")String id);

    List<KeCheListDto> selectByQiYe(@Param("index") int index, @Param("size") int size,@Param("carNum")String carNum,@Param("carType")int carType,@Param("unitId")String id,@Param("status")int status, @Param("flag")int flag);

}