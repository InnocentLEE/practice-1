package com.lyq.project.service;

import com.lyq.project.common.*;
import com.lyq.project.dto.CreateKeCheDto;
import com.lyq.project.dto.CreateKeYunCheDuiDto;
import com.lyq.project.dto.CreateKeYunQiYeDto;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface IQService {
    LYQResponse createShengJiJianGuanBuMen(HttpSession session, CreateShengJiJianGuanBuMenDto createShengJiJianGuanBuMenDto);
    LYQResponse getShengJiJianGuanBuMenList(HttpSession session, SearchDto<ShengJiJianGuanBuMenSearchDto> searchDto);
    LYQResponse getShengJiJianGuanBuMenDetail(HttpSession session, String id);
    LYQResponse updateShengJiJianGuanBuMen(HttpSession session, CreateShengJiJianGuanBuMenDto createShengJiJianGuanBuMenDto);
    LYQResponse deleteShengJiJianGuanBuMenDetail(HttpSession session, String id);
    LYQResponse createKeYunQiYe(HttpSession session, CreateKeYunQiYeDto createKeYunQiYeDto);
    LYQResponse getKeYunQiYeList(HttpSession session, SearchDto<KeYunQiYeSearchDto> searchDto);
    LYQResponse getKeYunQiYeDetail(HttpSession session, String id);
    LYQResponse updateKeYunQiYe(HttpSession session, CreateKeYunQiYeDto createKeYunQiYeDto);
    LYQResponse deleteKeYunQiYeDetail(HttpSession session, String id);
    LYQResponse createKeYunCheDui(HttpSession session, CreateKeYunCheDuiDto createKeYunCheDuiDto);
    LYQResponse getKeYunCheDuiList(HttpSession session, SearchDto<KeYunCheDuiSearchDto> searchDto);
    LYQResponse getKeYunCheDuiDetail(HttpSession session, String id);
    LYQResponse updateKeYunCheDui(HttpSession session, CreateKeYunCheDuiDto createKeYunCheDuiDto);
    LYQResponse deleteKeYunCheDuiDetail(HttpSession session, String id);
    LYQResponse createKeChe(HttpSession session, CreateKeCheDto createKeCheDto);
    LYQResponse getKeCheList(HttpSession session, SearchDto<KeCheSearchDto> searchDto);
    LYQResponse submitKeCheDetail(HttpSession session, String id);
    LYQResponse checkKeCheDetail(HttpSession session, KeCheCheckDto keCheCheckDto);
    LYQResponse deleteKeCheDetail(HttpSession session, String id);
    LYQResponse getKeCheDetail(HttpSession session, String id);
    LYQResponse updateKeChe(HttpSession session, CreateKeCheDto createKeCheDto);
}
