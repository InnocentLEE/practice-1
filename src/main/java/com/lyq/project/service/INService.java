package com.lyq.project.service;

import com.lyq.project.common.*;
import com.lyq.project.dto.CreateKeYunZhanDto;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;
import com.lyq.project.dto.CreateShiJiJianGuanBuMenDto;

import javax.servlet.http.HttpSession;

public interface INService {
    LYQResponse createShiJiJianGuanBuMen(HttpSession session, CreateShiJiJianGuanBuMenDto createShiJiJianGuanBuMenDto);
    LYQResponse getShiJiJianGuanBuMenList(HttpSession session, SearchDto<ShiJiJianGuanBuMenSearchDto> searchDto);
    LYQResponse getShiJiJianGuanBuMenDetail(HttpSession session, String id);
    LYQResponse updateShiJiJianGuanBuMen(HttpSession session, CreateShiJiJianGuanBuMenDto createShiJiJianGuanBuMenDto);
    LYQResponse deleteShiJiJianGuanBuMenDetail(HttpSession session, String id);

    LYQResponse createKeYunZhan(HttpSession session, CreateKeYunZhanDto createKeYunZhanDto);
    LYQResponse getKeYunZhanList(HttpSession session, SearchDto<KeYunZhanSearchDto> searchDto);
    LYQResponse getKeYunZhanDetail(HttpSession session, String id);
    LYQResponse updateKeYunZhan(HttpSession session, CreateKeYunZhanDto createKeYunZhanDto);
    LYQResponse deleteKeYunZhanDetail(HttpSession session, String id);

    LYQResponse getYearShouPiaoTongJi(HttpSession session, String id);
    LYQResponse getYearList(HttpSession session, String id);
    LYQResponse getMonthShouPiaoTongJi(HttpSession session, YueDuShouPiaoLvSearchDto searchDto);

}
