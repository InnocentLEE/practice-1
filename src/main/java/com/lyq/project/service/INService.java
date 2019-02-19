package com.lyq.project.service;

import com.lyq.project.common.LYQResponse;
import com.lyq.project.common.SearchDto;
import com.lyq.project.common.ShengJiJianGuanBuMenSearchDto;
import com.lyq.project.common.ShiJiJianGuanBuMenSearchDto;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;
import com.lyq.project.dto.CreateShiJiJianGuanBuMenDto;

import javax.servlet.http.HttpSession;

public interface INService {
    LYQResponse createShiJiJianGuanBuMen(HttpSession session, CreateShiJiJianGuanBuMenDto createShiJiJianGuanBuMenDto);
    LYQResponse getShiJiJianGuanBuMenList(HttpSession session, SearchDto<ShiJiJianGuanBuMenSearchDto> searchDto);
}
