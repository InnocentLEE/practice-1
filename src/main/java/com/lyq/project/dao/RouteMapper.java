package com.lyq.project.dao;

import com.lyq.project.dto.RouteChooseDto;
import com.lyq.project.dto.RouteListDto;
import com.lyq.project.pojo.Route;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RouteMapper {
    int deleteByPrimaryKey(String id);

    int insert(Route record);

    int insertSelective(Route record);

    Route selectByPrimaryKey(String id);

    List<RouteListDto> selectByRouteNameStartEnd(@Param("index")int index,@Param("size")int size,@Param("unitId")String id,@Param("routeName")String name,@Param("start")String start,@Param("end")String end);

    int selectByRouteNameStartEndCount(@Param("index")int index,@Param("size")int size,@Param("unitId")String id,@Param("routeName")String name,@Param("start")String start,@Param("end")String end);

    int countByRouteNameAndUnitId(@Param("routeName")String name,@Param("unitId")String id);

    int updateByPrimaryKeySelective(Route record);

    int updateByPrimaryKey(Route record);

    List<RouteChooseDto> selectChooseByUnit(@Param("id")String id);
}