package com.lyq.project.dao;

import com.lyq.project.pojo.Arrange;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArrangeMapper {
    int deleteByPrimaryKey(String id);

    int insert(Arrange record);

    int insertSelective(Arrange record);

    Arrange selectByPrimaryKey(String id);

    List<Arrange> selectArrange(@Param("index") int index, @Param("size") int size,@Param("unitId") String unitId,@Param("num")String num,@Param("routeId")String route,@Param("carId")String car,@Param("arrangeType")Integer arrange);

    int selectArrangeCount(@Param("index") int index, @Param("size") int size,@Param("unitId") String unitId,@Param("num")String num,@Param("routeId")String route,@Param("carId")String car,@Param("arrangeType")Integer arrange);

    List<Arrange> selectBanChe(@Param("index") int index, @Param("size") int size,@Param("unitId") String unitId,@Param("carId")String car);

    int selectBanCheCount(@Param("index") int index, @Param("size") int size,@Param("unitId") String unitId,@Param("carId")String car);

    List<Arrange> selectBaoChe(@Param("index") int index, @Param("size") int size,@Param("unitId") String unitId,@Param("carId")String car);

    int selectBaoCheCount(@Param("index") int index, @Param("size") int size,@Param("unitId") String unitId,@Param("carId")String car);

    int countByNumAndUnitId(@Param("num")String num,@Param("unitId")String id);

    int updateByPrimaryKeySelective(Arrange record);

    int updateByPrimaryKey(Arrange record);
}