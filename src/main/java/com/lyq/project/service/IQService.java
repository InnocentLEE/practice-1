package com.lyq.project.service;

import com.lyq.project.common.LYQResponse;
import com.lyq.project.common.SearchDto;
import com.lyq.project.common.ShengJiJianGuanBuMenSearchDto;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;

import javax.servlet.http.HttpSession;

public interface IQService {
    LYQResponse createShengJiJianGuanBuMen(HttpSession session, CreateShengJiJianGuanBuMenDto createShengJiJianGuanBuMenDto);
    LYQResponse getShengJiJianGuanBuMenList(HttpSession session, SearchDto<ShengJiJianGuanBuMenSearchDto> searchDto);
    LYQResponse getShengJiJianGuanBuMenDetail(HttpSession session, String id);
}
