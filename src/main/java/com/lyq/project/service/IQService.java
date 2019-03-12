package com.lyq.project.service;

import com.lyq.project.common.*;
import com.lyq.project.dto.*;

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
    LYQResponse createRouteStation(HttpSession session, CreateRouteStationDto createRouteStationDto);
    LYQResponse getRouteStation(HttpSession session, String id);
    LYQResponse createRoute(HttpSession session, CreateRouteDto createRouteDto);
    LYQResponse getRouteList(HttpSession session, SearchDto<RouteSearchDto> searchDto);
    LYQResponse useRoute(HttpSession session, String id);
    LYQResponse stopRoute(HttpSession session, String id);
    LYQResponse getRouteChoose(HttpSession session, String id);
    LYQResponse getCarChoose(HttpSession session, String id);
    LYQResponse createArrage(HttpSession session, CreateArrageDto createArrageDto);
    LYQResponse getArrangeList(HttpSession session, SearchDto<ArrangeSearchDto> searchDto);
    LYQResponse useArrange(HttpSession session, String id);
    LYQResponse stopArrange(HttpSession session, String id);
    LYQResponse getBanCheList(HttpSession session, SearchDto<BanCheSearchDto> searchDto);
    LYQResponse getBaoCheList(HttpSession session, SearchDto<BanCheSearchDto> searchDto);
    LYQResponse makeDateCreateKeChe(HttpSession session);
}
