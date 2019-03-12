package com.lyq.project.service.Impl;

import com.alibaba.fastjson.JSON;
import com.lyq.project.common.*;
import com.lyq.project.dao.*;
import com.lyq.project.dto.*;
import com.lyq.project.pojo.*;
import com.lyq.project.service.IQService;
import com.lyq.project.util.CommonUtils;
import com.lyq.project.util.IdCardGenerator;
import com.lyq.project.util.MD5Util;
import com.lyq.project.util.MakeData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.sql.SQLTransactionRollbackException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service("iQService")
public class QServiceImpl implements IQService {

    @Autowired
    private UnitMapper unitMapper;
    @Autowired
    private ContactsMapper contactsMapper;
    @Autowired
    private UnitGatherMapper unitGatherMapper;
    @Autowired
    private CarMapper carMapper;
    @Autowired
    private CarGatherMapper carGatherMapper;
    @Autowired
    private RouteMapper routeMapper;
    @Autowired
    private RouteStationMapper routeStationMapper;
    @Autowired
    private StationMapper stationMapper;
    @Autowired
    private ArrangeMapper arrangeMapper;


    @Override
    @Transactional
    public LYQResponse createShengJiJianGuanBuMen(HttpSession session, CreateShengJiJianGuanBuMenDto dto){
        // 校验联系人身份证是否已存在
        if(contactsMapper.selectCountByCardNo(dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        String password = MD5Util.getMD5(dto.getIdCard().substring(12));
        Contacts contacts = new Contacts(CommonUtils.getUUID(),dto.getName(),dto.getIdCard(),dto.getTel(),password,dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),1,null,null);
        contactsMapper.insert(contacts);
        Unit unit = new Unit(CommonUtils.getUUID(),1,dto.getProvince(),null,dto.getUnitName(),null,dto.getAddress(),null,null,null,null,contacts.getId(),null,null);
        unitMapper.insert(unit);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getShengJiJianGuanBuMenList(HttpSession session, SearchDto<ShengJiJianGuanBuMenSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        String unitName = searchDto.getData().getUnitName();
        String province = searchDto.getData().getProvince();
        List<ShengJiJianGuanBuMenListDto> list = unitMapper.selectShengJiJianGuanBuMen((page-1)*rows,rows,unitName,province);
        PageList<List<ShengJiJianGuanBuMenListDto>> pageList = new PageList<>();
        pageList.setTotalcount(unitMapper.selectShengJiJianGuanBuMenCount((page-1)*rows,rows,unitName,province));
        pageList.setItems(list);
        return LYQResponse.createBySuccess(pageList);
    }

    @Override
    @Transactional
    public LYQResponse getShengJiJianGuanBuMenDetail(HttpSession session, String id){
        ShengJiJianGuanBuMenDetail detail = unitMapper.selectShengJiJianGuanBuMenDetail(id);
        if(detail!= null)
            return LYQResponse.createBySuccess(detail);
        else
            return LYQResponse.createByErrorMessage("查询不到详细信息");
    }

    @Override
    @Transactional
    public LYQResponse updateShengJiJianGuanBuMen(HttpSession session, CreateShengJiJianGuanBuMenDto dto){
        // 校验联系人身份证是否已存在
        if(contactsMapper.selectCountByUnitIdAndCardNo(dto.getId(),dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        Unit unitPre = unitMapper.selectByPrimaryKey(dto.getId());
        Contacts contacts = new Contacts(unitPre.getContactsId(),dto.getName(),dto.getIdCard(),dto.getTel(),null,dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),1,null,null);
        contactsMapper.updateByPrimaryKeySelective(contacts);
        Unit unit = new Unit();
        unit.setId(unitPre.getId());
        unit.setUnitName(dto.getUnitName());
        unit.setProvince(dto.getProvince());
        unit.setAddress(dto.getAddress());
        unitMapper.updateByPrimaryKeySelective(unit);
        return LYQResponse.createBySuccess(null);
    }


    @Override
    @Transactional
    public LYQResponse deleteShengJiJianGuanBuMenDetail(HttpSession session, String id){
        // 判断该单位是否有下级单位
        if(unitGatherMapper.countChildUnit(id) > 0){
            return LYQResponse.createByErrorMessage("该单位有下级单位无法删除");
        }
        String contactId = unitMapper.selectByPrimaryKey(id).getContactsId();
        contactsMapper.deleteByPrimaryKey(contactId);
        unitMapper.deleteByPrimaryKey(id);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse createKeYunQiYe(HttpSession session, CreateKeYunQiYeDto dto){
        if(contactsMapper.selectCountByCardNo(dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        if(unitMapper.countByPermitWord(dto.getPermitWord()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证字已存在");
        }
        if(unitMapper.countByPermitNum(dto.getPermitNum()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证号已存在");
        }
        String password = MD5Util.getMD5(dto.getIdCard().substring(12));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Contacts contacts = new Contacts(CommonUtils.getUUID(),dto.getName(),dto.getIdCard(),dto.getTel(),password,dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),4,null,null);
        contactsMapper.insert(contacts);
        Date date = null;
        try {
            date = sdf.parse(dto.getPermitDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("经营许可证有效日期输入错误已存在");
        }
        Unit unit = new Unit(CommonUtils.getUUID(),4,dto.getProvince(),dto.getCity(),dto.getUnitName(),Integer.parseInt(dto.getBusinessType()),dto.getAddress(),null,dto.getPermitWord(),dto.getPermitNum(),date,contacts.getId(),null,null);
        unitMapper.insert(unit);
        String userInfoJSON = (String) session.getAttribute("current_user");
        UserInfoDto userInfoDto = JSON.parseObject(userInfoJSON, UserInfoDto.class);
        UnitGather unitGather = new UnitGather(CommonUtils.getUUID(),unit.getId(),userInfoDto.getOrganId(),4,Integer.parseInt(userInfoDto.getOrganizationType()),1);
        unitGatherMapper.insert(unitGather);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getKeYunQiYeList(HttpSession session, SearchDto<KeYunQiYeSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        if(searchDto.getData().getOrgType().equals("0")){
            if(searchDto.getData().getBusinessType().equals("")){
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByAdmin((page-1)*rows,rows,searchDto.getData().getUnitName(),0);
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByAdminCount((page-1)*rows,rows,searchDto.getData().getUnitName(),0));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }else{
                int busineeType = Integer.parseInt(searchDto.getData().getBusinessType());
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByAdmin((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType);
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByAdminCount((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }
        }
        if(searchDto.getData().getOrgType().equals("1")){
            if(searchDto.getData().getBusinessType().equals("")){
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByShengJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getUnitName(),0,searchDto.getData().getProvince());
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByShengJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getUnitName(),0,searchDto.getData().getProvince()));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }else{
                int busineeType = Integer.parseInt(searchDto.getData().getBusinessType());
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByShengJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType,searchDto.getData().getProvince());
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByShengJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType,searchDto.getData().getProvince()));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }
        }
        if(searchDto.getData().getOrgType().equals("2")){
            if(searchDto.getData().getBusinessType().equals("")){
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByShiJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getUnitName(),0,searchDto.getData().getProvince(),searchDto.getData().getCity());
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByShiJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getUnitName(),0,searchDto.getData().getProvince(),searchDto.getData().getCity()));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }else{
                int busineeType = Integer.parseInt(searchDto.getData().getBusinessType());
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByShiJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType,searchDto.getData().getProvince(),searchDto.getData().getCity());
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByShiJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType,searchDto.getData().getProvince(),searchDto.getData().getCity()));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }
        }
        if(searchDto.getData().getOrgType().equals("3")){
            if(searchDto.getData().getBusinessType().equals("")){
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByKeYunZhan((page-1)*rows,rows,searchDto.getData().getUnitName(),0,searchDto.getData().getParentUnitId());
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByKeYunZhanCount((page-1)*rows,rows,searchDto.getData().getUnitName(),0,searchDto.getData().getParentUnitId()));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }else{
                int busineeType = Integer.parseInt(searchDto.getData().getBusinessType());
                List<KeYunQiYeListDto> list = unitMapper.selectKeYunQiYeByKeYunZhan((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType,searchDto.getData().getParentUnitId());
                for (KeYunQiYeListDto listDto : list) {
                    listDto.setPopedom(listDto.getProvince()+listDto.getCity());
                }
                PageList<List<KeYunQiYeListDto>> pageList = new PageList<>();
                pageList.setTotalcount(unitMapper.selectKeYunQiYeByKeYunZhanCount((page-1)*rows,rows,searchDto.getData().getUnitName(),busineeType,searchDto.getData().getParentUnitId()));
                pageList.setItems(list);
                return LYQResponse.createBySuccess(pageList);
            }
        }
        return LYQResponse.createByErrorMessage("查询出错");
    }

    @Override
    @Transactional
    public LYQResponse getKeYunQiYeDetail(HttpSession session, String id){
        KeYunQiYeDetail detail = unitMapper.selectKeYunQiYeDetail(id);
        if(detail!= null){
            detail.setPopedom(detail.getProvince()+detail.getCity());
            detail.setPermitDateValue((new java.text.SimpleDateFormat("yyyy-MM-dd")).format(detail.getPermitDate()));
            if(detail.getBusinessType() == 1){
                detail.setBusinessTypeValue("国有企业");
            }
            if(detail.getBusinessType() == 2){
                detail.setBusinessTypeValue("民营企业");
            }
            if(detail.getBusinessType() == 3){
                detail.setBusinessTypeValue("外资独资");
            }
            if(detail.getBusinessType() == 4){
                detail.setBusinessTypeValue("中外合资");
            }
            if(detail.getBusinessType() == 5){
                detail.setBusinessTypeValue("其他");
            }
            return LYQResponse.createBySuccess(detail);
        }
        else
            return LYQResponse.createByErrorMessage("查询不到详细信息");
    }

    @Override
    @Transactional
    public LYQResponse updateKeYunQiYe(HttpSession session, CreateKeYunQiYeDto dto) {
        if(contactsMapper.selectCountByUnitIdAndCardNo(dto.getId(),dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        if(unitMapper.countByPermitWordAndUnitId(dto.getPermitWord(),dto.getId()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证字已存在");
        }
        if(unitMapper.countByPermitNumAndUnitId(dto.getPermitNum(),dto.getId()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证号已存在");
        }
        Unit unitPre = unitMapper.selectByPrimaryKey(dto.getId());
        Contacts contacts = new Contacts(unitPre.getContactsId(),dto.getName(),dto.getIdCard(),dto.getTel(),null,dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),4,null,null);
        contactsMapper.updateByPrimaryKeySelective(contacts);
        Unit unit = new Unit();
        unit.setId(unitPre.getId());
        unit.setBusinessType(Integer.parseInt(dto.getBusinessType()));
        unit.setUnitName(dto.getUnitName());
        unit.setAddress(dto.getAddress());
        unit.setPermitWord(dto.getPermitWord());
        unit.setPermitNum(dto.getPermitNum());
        try {
            unit.setPermitDate(new SimpleDateFormat("yyyy-MM-dd").parse(dto.getPermitDate()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        unitMapper.updateByPrimaryKeySelective(unit);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse deleteKeYunQiYeDetail(HttpSession session, String id){
        String contactId = unitMapper.selectByPrimaryKey(id).getContactsId();
        contactsMapper.deleteByPrimaryKey(contactId);
        unitMapper.deleteByPrimaryKey(id);
        unitGatherMapper.deleteByUnitId(id);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse createKeYunCheDui(HttpSession session, CreateKeYunCheDuiDto dto){
        if(contactsMapper.selectCountByCardNo(dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        if(unitMapper.countByPermitWord(dto.getPermitWord()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证字已存在");
        }
        if(unitMapper.countByPermitNum(dto.getPermitNum()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证号已存在");
        }
        String password = MD5Util.getMD5(dto.getIdCard().substring(12));
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Contacts contacts = new Contacts(CommonUtils.getUUID(),dto.getName(),dto.getIdCard(),dto.getTel(),password,dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),5,null,null);
        contactsMapper.insert(contacts);
        Date date = null;
        try {
            date = sdf.parse(dto.getPermitDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("经营许可证有效日期输入错误已存在");
        }
        Unit unit = new Unit(CommonUtils.getUUID(),5,dto.getProvince(),dto.getCity(),dto.getUnitName(),null,dto.getAddress(),null,dto.getPermitWord(),dto.getPermitNum(),date,contacts.getId(),null,null);
        unitMapper.insert(unit);
        String userInfoJSON = (String) session.getAttribute("current_user");
        UserInfoDto userInfoDto = JSON.parseObject(userInfoJSON, UserInfoDto.class);
        UnitGather unitGather = new UnitGather(CommonUtils.getUUID(),unit.getId(),userInfoDto.getOrganId(),5,Integer.parseInt(userInfoDto.getOrganizationType()),1);
        unitGatherMapper.insert(unitGather);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getKeYunCheDuiList(HttpSession session, SearchDto<KeYunCheDuiSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        if(searchDto.getData().getOrgType().equals("0")){
            List<KeYunCheDuiListDto> list = unitMapper.selectKeYunCheDuiByAdmin((page-1)*rows,rows,searchDto.getData().getUnitName());
            for (KeYunCheDuiListDto listDto : list) {
                listDto.setPopedom(listDto.getProvince()+listDto.getCity());
            }
            PageList<List<KeYunCheDuiListDto>> pageList = new PageList<>();
            pageList.setTotalcount(unitMapper.selectKeYunCheDuiByAdminCount((page-1)*rows,rows,searchDto.getData().getUnitName()));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
        if(searchDto.getData().getOrgType().equals("1")){
            List<KeYunCheDuiListDto> list = unitMapper.selectKeYunCheDuiByShengJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getUnitName(),searchDto.getData().getProvince());
            for (KeYunCheDuiListDto listDto : list) {
                listDto.setPopedom(listDto.getProvince()+listDto.getCity());
            }
            PageList<List<KeYunCheDuiListDto>> pageList = new PageList<>();
            pageList.setTotalcount(unitMapper.selectKeYunCheDuiByShengJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getUnitName(),searchDto.getData().getProvince()));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
        if(searchDto.getData().getOrgType().equals("2")){
            List<KeYunCheDuiListDto> list = unitMapper.selectKeYunCheDuiByShiJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getUnitName(),searchDto.getData().getProvince(),searchDto.getData().getCity());
            for (KeYunCheDuiListDto listDto : list) {
                listDto.setPopedom(listDto.getProvince()+listDto.getCity());
            }
            PageList<List<KeYunCheDuiListDto>> pageList = new PageList<>();
            pageList.setTotalcount(unitMapper.selectKeYunCheDuiByShiJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getUnitName(),searchDto.getData().getProvince(),searchDto.getData().getCity()));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
        if(searchDto.getData().getOrgType().equals("3")){
            List<KeYunCheDuiListDto> list = unitMapper.selectKeYunCheDuiByKeYunZhan((page-1)*rows,rows,searchDto.getData().getUnitName(),searchDto.getData().getParentUnitId());
            for (KeYunCheDuiListDto listDto : list) {
                listDto.setPopedom(listDto.getProvince()+listDto.getCity());
            }
            PageList<List<KeYunCheDuiListDto>> pageList = new PageList<>();
            pageList.setTotalcount(unitMapper.selectKeYunCheDuiByKeYunZhanCount((page-1)*rows,rows,searchDto.getData().getUnitName(),searchDto.getData().getParentUnitId()));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
        return LYQResponse.createByErrorMessage("查询出错");
    }

    @Override
    @Transactional
    public LYQResponse getKeYunCheDuiDetail(HttpSession session, String id){
        KeYunCheDuiDetail detail = unitMapper.selectKeYunCheDuiDetail(id);
        if(detail!= null){
            detail.setPopedom(detail.getProvince()+detail.getCity());
            detail.setPermitDateValue((new java.text.SimpleDateFormat("yyyy-MM-dd")).format(detail.getPermitDate()));
            return LYQResponse.createBySuccess(detail);
        }
        else
            return LYQResponse.createByErrorMessage("查询不到详细信息");
    }

    @Override
    @Transactional
    public LYQResponse updateKeYunCheDui(HttpSession session, CreateKeYunCheDuiDto dto) {
        if(contactsMapper.selectCountByUnitIdAndCardNo(dto.getId(),dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        if(unitMapper.countByPermitWordAndUnitId(dto.getPermitWord(),dto.getId()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证字已存在");
        }
        if(unitMapper.countByPermitNumAndUnitId(dto.getPermitNum(),dto.getId()) > 0){
            return LYQResponse.createByErrorMessage("经营许可证号已存在");
        }
        Unit unitPre = unitMapper.selectByPrimaryKey(dto.getId());
        Contacts contacts = new Contacts(unitPre.getContactsId(),dto.getName(),dto.getIdCard(),dto.getTel(),null,dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),5,null,null);
        contactsMapper.updateByPrimaryKeySelective(contacts);
        Unit unit = new Unit();
        unit.setId(unitPre.getId());
        unit.setUnitName(dto.getUnitName());
        unit.setAddress(dto.getAddress());
        unit.setPermitWord(dto.getPermitWord());
        unit.setPermitNum(dto.getPermitNum());
        try {
            unit.setPermitDate(new SimpleDateFormat("yyyy-MM-dd").parse(dto.getPermitDate()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        unitMapper.updateByPrimaryKeySelective(unit);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse deleteKeYunCheDuiDetail(HttpSession session, String id){
        String contactId = unitMapper.selectByPrimaryKey(id).getContactsId();
        contactsMapper.deleteByPrimaryKey(contactId);
        unitMapper.deleteByPrimaryKey(id);
        unitGatherMapper.deleteByUnitId(id);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse createKeChe(HttpSession session, CreateKeCheDto dto){
        // 校验客车车牌号和车牌号码重复
        if(carMapper.countByCarNumAndType(dto.getCarNum(),Integer.parseInt(dto.getCarType())) > 0){
            return LYQResponse.createByErrorMessage("车牌号码和车牌颜色重复！");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date LicenceRegistDate = null;
        Date LicencePublishDate = null;
        Date ErweiDate = null;
        Date ErweiDateNext = null;
        try {
            LicenceRegistDate = sdf.parse(dto.getLicenceRegistDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("行驶证注册日期输入不准确！");
        }
        try {
            LicencePublishDate = sdf.parse(dto.getLicencePublishDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("行驶证发证日期输入不准确！");
        }
        try {
            ErweiDate = sdf.parse(dto.getErweiDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("二维日期输入不准确！");
        }
        try {
            ErweiDateNext = sdf.parse(dto.getErweiDateNext());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("下次二维日期输入不准确！");
        }
        Integer Weight = null;
        try {
            if(!dto.getWeight().equals("")){
                Weight = Integer.parseInt(dto.getWeight());
            }
        } catch (Exception e){
            return LYQResponse.createByErrorMessage("总质量输入不准确！请输入整数");
        }
        Integer Engine = null;
        try {
            if(!dto.getEngine().equals("")){
                Engine = Integer.parseInt(dto.getEngine());
            }
        } catch (Exception e){
            return LYQResponse.createByErrorMessage("排气量输入不准确！请输入整数");
        }
        Integer SeatNum = null;
        try {
            if(!dto.getSeatNum().equals("")){
                SeatNum = Integer.parseInt(dto.getSeatNum());
            }
        } catch (Exception e){
            return LYQResponse.createByErrorMessage("座位数输入不准确！请输入整数");
        }
        Car car = new Car(CommonUtils.getUUID(),dto.getUnitId(),dto.getUnitName(),dto.getOrgType().equals("3")?2:0,dto.getCarNum(),Integer.parseInt(dto.getCarType()),dto.getPhone(),dto.getLicenceAddress(),LicenceRegistDate,LicencePublishDate,dto.getFuel(),Engine,Weight,dto.getEngineNum(),dto.getCarFrameNum(),ErweiDate,ErweiDateNext,dto.getPermitNum(),SeatNum,null,null,null);
        carMapper.insert(car);
        List<CarGather> carGatherList = new ArrayList<>();
        carGatherList.add(new CarGather(CommonUtils.getUUID(),car.getId(),dto.getUnitId()));
        if(dto.getOrgType() != "3"){
            for (UnitGather unitGather: unitGatherMapper.selectByChildUnit(dto.getUnitId())) {
                carGatherList.add(new CarGather(CommonUtils.getUUID(),car.getId(),unitGather.getParentUnitId()));
            }
        }
        for (CarGather carGather:carGatherList) {
            carGatherMapper.insert(carGather);
        }
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getKeCheList(HttpSession session, SearchDto<KeCheSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        if(searchDto.getData().getOrgType().equals("0")){
            List<KeCheListDto> list = carMapper.selectByAdmin((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType()));
            PageList<List<KeCheListDto>> pageList = new PageList<>();
            pageList.setTotalcount(carMapper.selectByAdminCount((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType())));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
        else if(searchDto.getData().getOrgType().equals("1")){
            List<KeCheListDto> list = carMapper.selectByShengJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType()),searchDto.getData().getUnitId());
            PageList<List<KeCheListDto>> pageList = new PageList<>();
            pageList.setTotalcount(carMapper.selectByShengJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType()),searchDto.getData().getUnitId()));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
        else if(searchDto.getData().getOrgType().equals("2")){
            List<KeCheListDto> list = carMapper.selectByShiJiJianGuanBuMen((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType()),searchDto.getData().getUnitId());
            PageList<List<KeCheListDto>> pageList = new PageList<>();
            pageList.setTotalcount(carMapper.selectByShiJiJianGuanBuMenCount((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType()),searchDto.getData().getUnitId()));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
        else{
            int status = 4;
            if(!searchDto.getData().getStatus().equals("")){
                status = Integer.parseInt(searchDto.getData().getStatus());
            }
            int flag = 0;
            if(searchDto.getData().getOrgType().equals("3")){
                flag = 1;
            }
            List<KeCheListDto> list = carMapper.selectByQiYe((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType()),searchDto.getData().getUnitId(),status,flag);
            PageList<List<KeCheListDto>> pageList = new PageList<>();
            pageList.setTotalcount(carMapper.selectByQiYeCount((page-1)*rows,rows,searchDto.getData().getCarNum(),Integer.parseInt(searchDto.getData().getCarType()),searchDto.getData().getUnitId(),status,flag));
            pageList.setItems(list);
            return LYQResponse.createBySuccess(pageList);
        }
    }

    @Override
    @Transactional
    public LYQResponse submitKeCheDetail(HttpSession session, String id){
        Car updateCar = new Car();
        updateCar.setId(id);
        updateCar.setStatus(1);
        carMapper.updateByPrimaryKeySelective(updateCar);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse checkKeCheDetail(HttpSession session, KeCheCheckDto dto){
        Car updateCar = new Car();
        updateCar.setId(dto.getId());
        updateCar.setStatus(Integer.parseInt(dto.getStatus()));
        carMapper.updateByPrimaryKeySelective(updateCar);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse deleteKeCheDetail(HttpSession session, String id){
        carMapper.deleteByPrimaryKey(id);
        carGatherMapper.deleteByCarId(id);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse getKeCheDetail(HttpSession session, String id){
        Car car = carMapper.selectByPrimaryKey(id);
        KeCheDetail detail = new KeCheDetail();
        //region 查询客车详情
        detail.setId(car.getId());
        detail.setCarNum(car.getCarNum());
        detail.setCarType(car.getCarType());
        if(detail.getCarType()==1){
            detail.setCarTypeValue("蓝色");
        }
        if(detail.getCarType()==2){
            detail.setCarTypeValue("黄色");
        }
        if(detail.getCarType()==3){
            detail.setCarTypeValue("白色");
        }
        if(detail.getCarType()==4){
            detail.setCarTypeValue("黑色");
        }
        if(detail.getCarType()==5){
            detail.setCarTypeValue("绿色");
        }
        detail.setPhone(car.getPhone());
        detail.setStatus(car.getStatus());
        if(detail.getStatus()==0){
            detail.setStatusValue("待提交");
        }
        if(detail.getStatus()==1){
            detail.setStatusValue("待审核");
        }
        if(detail.getStatus()==2){
            detail.setStatusValue("审核通过");
        }
        if(detail.getStatus()==3){
            detail.setStatusValue("审核不通过");
        }
        detail.setUnitName(car.getUnitName());
        detail.setLicenceRegistDate(car.getLicenceRegistDate());
        detail.setLicenceRegistDateValue((new java.text.SimpleDateFormat("yyyy-MM-dd")).format(detail.getLicenceRegistDate()));
        detail.setLicencePublishDate(car.getLicencePublishDate());
        detail.setLicencePublishDateValue((new java.text.SimpleDateFormat("yyyy-MM-dd")).format(detail.getLicencePublishDate()));
        detail.setErweiDate(car.getErweiDate());
        detail.setErweiDateValue((new java.text.SimpleDateFormat("yyyy-MM-dd")).format(detail.getErweiDate()));
        detail.setErweiDateNext(car.getErweiDateNext());
        detail.setErweiDateNextValue((new java.text.SimpleDateFormat("yyyy-MM-dd")).format(detail.getErweiDateNext()));
        detail.setLicenceAddress(car.getLicenceAddress());
        detail.setPermitNum(car.getPermitNum());
        detail.setEngineNum(car.getEngineNum());
        detail.setCarFrameNum(car.getCarframeNum());
        detail.setFuel(car.getFuel());
        if(detail.getFuel().equals("1")){
            detail.setFuelValue("柴油");
        }
        if(detail.getFuel().equals("2")){
            detail.setFuelValue("油气双燃料");
        }
        if(detail.getFuel().equals("3")){
            detail.setFuelValue("节能油电混合动力");
        }
        if(detail.getFuel().equals("4")){
            detail.setFuelValue("纯电动");
        }
        if(detail.getFuel().equals("5")){
            detail.setFuelValue("插电式混合动力");
        }
        if(detail.getFuel().equals("6")){
            detail.setFuelValue("氢燃料");
        }
        if(detail.getFuel().equals("7")){
            detail.setFuelValue("燃油");
        }
        if(detail.getFuel().equals("8")){
            detail.setFuelValue("其他");
        }
        detail.setWeight(car.getWeight());
        detail.setEngine(car.getEngine());
        detail.setSeatNum(car.getSeatNum());
        //endregion
        return LYQResponse.createBySuccess(detail);
    }

    @Override
    @Transactional
    public LYQResponse updateKeChe(HttpSession session, CreateKeCheDto dto) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date LicenceRegistDate = null;
        Date LicencePublishDate = null;
        Date ErweiDate = null;
        Date ErweiDateNext = null;
        try {
            LicenceRegistDate = sdf.parse(dto.getLicenceRegistDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("行驶证注册日期输入不准确！");
        }
        try {
            LicencePublishDate = sdf.parse(dto.getLicencePublishDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("行驶证发证日期输入不准确！");
        }
        try {
            ErweiDate = sdf.parse(dto.getErweiDate());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("二维日期输入不准确！");
        }
        try {
            ErweiDateNext = sdf.parse(dto.getErweiDateNext());
        } catch (ParseException e) {
            return LYQResponse.createByErrorMessage("下次二维日期输入不准确！");
        }
        Integer Weight = null;
        try {
            if(!dto.getWeight().equals("")){
                Weight = Integer.parseInt(dto.getWeight());
            }
        } catch (Exception e){
            return LYQResponse.createByErrorMessage("总质量输入不准确！请输入整数");
        }
        Integer Engine = null;
        try {
            if(!dto.getEngine().equals("")){
                Engine = Integer.parseInt(dto.getEngine());
            }
        } catch (Exception e){
            return LYQResponse.createByErrorMessage("排气量输入不准确！请输入整数");
        }
        Integer SeatNum = null;
        try {
            if(!dto.getSeatNum().equals("")){
                SeatNum = Integer.parseInt(dto.getSeatNum());
            }
        } catch (Exception e){
            return LYQResponse.createByErrorMessage("座位数输入不准确！请输入整数");
        }
        // 校验客车车牌号和车牌号码重复
        if(carMapper.countByCarNumAndTypeAndCarId(dto.getId(),dto.getCarNum(),Integer.parseInt(dto.getCarType())) > 0){
            return LYQResponse.createByErrorMessage("车牌号码和车牌颜色重复！");
        }
        Car updatecar = new Car(dto.getId(),dto.getUnitId(),dto.getUnitName(),dto.getOrgType().equals("3")?2:0,dto.getCarNum(),Integer.parseInt(dto.getCarType()),dto.getPhone(),dto.getLicenceAddress(),LicenceRegistDate,LicencePublishDate,dto.getFuel(),Engine,Weight,dto.getEngineNum(),dto.getCarFrameNum(),ErweiDate,ErweiDateNext,dto.getPermitNum(),SeatNum,null,null,null);
        carMapper.updateByPrimaryKeySelective(updatecar);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse createRouteStation(HttpSession session, CreateRouteStationDto dto){
        if(stationMapper.countByUnitIDAndName(dto.getUnitId(),dto.getStationName()) > 0){
            return LYQResponse.createByErrorMessage("已存在同名站点！");
        }
        Station station = new Station(CommonUtils.getUUID(),dto.getUnitId(),dto.getStationName(),null,null);
        stationMapper.insert(station);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getRouteStation(HttpSession session, String id){
        List<Station> list = stationMapper.selectByUnitId(id);
        /*
        PageList<List<Station>> pageList = new PageList<>();
        pageList.setTotalcount(list.size());
        pageList.setItems(list);
        */
        return LYQResponse.createBySuccess(list);
    }

    @Override
    @Transactional
    public LYQResponse createRoute(HttpSession session, CreateRouteDto dto){
        if(routeMapper.countByRouteNameAndUnitId(dto.getRouteName(),dto.getUnitId()) > 0){
            return LYQResponse.createByErrorMessage("已存在同名路线！");
        }
        String routeId = CommonUtils.getUUID();
        Route route = new Route(routeId,dto.getUnitId(),dto.getRouteName(),1,dto.getStartStation(),dto.getEndStation(),dto.getTotalTime(),null,null);
        routeMapper.insert(route);
        if(!(dto.getStation1().equals("")||dto.getStation1().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation1(),null,1);
            routeStationMapper.insertSelective(routeStation);
        }
        if(!(dto.getStation2().equals("")||dto.getStation2().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation2(),null,2);
            routeStationMapper.insertSelective(routeStation);
        }
        if(!(dto.getStation3().equals("")||dto.getStation3().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation3(),null,3);
            routeStationMapper.insertSelective(routeStation);
        }
        if(!(dto.getStation4().equals("")||dto.getStation4().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation4(),null,4);
            routeStationMapper.insertSelective(routeStation);
        }
        if(!(dto.getStation5().equals("")||dto.getStation5().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation5(),null,5);
            routeStationMapper.insertSelective(routeStation);
        }
        if(!(dto.getStation6().equals("")||dto.getStation6().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation6(),null,6);
            routeStationMapper.insertSelective(routeStation);
        }
        if(!(dto.getStation7().equals("")||dto.getStation7().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation7(),null,7);
            routeStationMapper.insertSelective(routeStation);
        }
        if(!(dto.getStation8().equals("")||dto.getStation8().equals("QingXuanZeBiaoZhiId"))){
            RouteStation routeStation = new RouteStation(CommonUtils.getUUID(),null,null,routeId,dto.getStation8(),null,8);
            routeStationMapper.insertSelective(routeStation);
        }
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getRouteList(HttpSession session, SearchDto<RouteSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        String routeName = null;
        String startId = null;
        String endId = null;
        if(!(searchDto.getData().getRouteName().trim().equals(""))){
            routeName = searchDto.getData().getRouteName().trim();
        }
        if(!(searchDto.getData().getStartStation().trim().equals("") || searchDto.getData().getStartStation().trim().equals("QingXuanZeBiaoZhiId"))){
            startId = searchDto.getData().getStartStation().trim();
        }
        if(!(searchDto.getData().getEndStation().trim().equals("") || searchDto.getData().getEndStation().trim().equals("QingXuanZeBiaoZhiId"))){
            endId = searchDto.getData().getEndStation().trim();
        }
        List<RouteListDto> list = routeMapper.selectByRouteNameStartEnd((page-1)*rows,rows,searchDto.getData().getUnitId(),routeName,startId,endId);
        for (RouteListDto routeListDto : list) {
            routeListDto.setStartStation(stationMapper.selectByPrimaryKey(routeListDto.getStartStationId()).getStationName());
            routeListDto.setEndStation(stationMapper.selectByPrimaryKey(routeListDto.getEndStationId()).getStationName());
            List<RouteStation> routeStations = routeStationMapper.selectByRoutId(routeListDto.getId());
            String station = "";
            for (RouteStation routeStation:routeStations) {
                String append = stationMapper.selectByPrimaryKey(routeStation.getStationId()).getStationName() + "-";
                station += append;
            }
            if(station.equals("")){
                routeListDto.setStation("");
            }else {
                routeListDto.setStation(station.substring(0,station.length()-1));
            }
        }
        PageList<List<RouteListDto>> pageList = new PageList<>();
        pageList.setTotalcount(routeMapper.selectByRouteNameStartEndCount((page-1)*rows,rows,searchDto.getData().getUnitId(),routeName,startId,endId));
        pageList.setItems(list);
        return LYQResponse.createBySuccess(pageList);
    }

    @Override
    @Transactional
    public LYQResponse useRoute(HttpSession session, String id){
        Route route = new Route();
        route.setId(id);
        route.setStatus(1);
        routeMapper.updateByPrimaryKeySelective(route);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse stopRoute(HttpSession session, String id){
        Route route = new Route();
        route.setId(id);
        route.setStatus(0);
        routeMapper.updateByPrimaryKeySelective(route);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse getRouteChoose(HttpSession session, String id){
        List<RouteChooseDto> list = routeMapper.selectChooseByUnit(id);
        for (RouteChooseDto dto:list) {
            dto.setItem(dto.getRouteName()+" - "+dto.getTotalTime());
        }
        return LYQResponse.createBySuccess(list);
    }

    @Override
    @Transactional
    public LYQResponse getCarChoose(HttpSession session, String id){
        List<CarChooseDto> list = carMapper.selectChooseByUnitId(id);
        for (CarChooseDto dto:list) {
            dto.setItem(dto.getCarNum()+"-"+dto.getCarType()+"-"+dto.getSeatNum()+"座-"+dto.getUnitName());
        }
        return LYQResponse.createBySuccess(list);
    }

    @Override
    @Transactional
    public LYQResponse createArrage(HttpSession session, CreateArrageDto dto){
        if(arrangeMapper.countByNumAndUnitId(dto.getNum(),dto.getUnitId())>0){
            return LYQResponse.createByErrorMessage("编号重复！");
        }
        Integer totalNumber = Integer.parseInt(dto.getTotalNumber());
        Integer arrangeType = Integer.parseInt(dto.getArrangeType());
        Integer price = Integer.parseInt(dto.getPrice());
        Arrange arrange = new Arrange();
        arrange.setId(CommonUtils.getUUID());
        arrange.setUnitId(dto.getUnitId());
        arrange.setArrangeType(arrangeType);
        arrange.setRouteId(dto.getRoute());
        arrange.setSatrtTime(dto.getStartDate());
        arrange.setEndTime(dto.getEndDate());
        arrange.setTotalNumber(totalNumber);
        arrange.setLeaveNumber(totalNumber);
        arrange.setPrice(price);
        arrange.setIsCancel(0);
        arrange.setNum(dto.getNum());
        arrange.setCarId(dto.getCar());
        arrangeMapper.insertSelective(arrange);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getArrangeList(HttpSession session, SearchDto<ArrangeSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        String unitId = searchDto.getData().getUnitId();
        String routeId = null;
        String carId = null;
        String num = null;
        Integer arrangeType = null;
        if(!(searchDto.getData().getNum().equals(""))){
            num = searchDto.getData().getNum();
        }
        if(!(searchDto.getData().getArrangeType().equals(""))){
            arrangeType = Integer.parseInt(searchDto.getData().getArrangeType());
        }
        if(!(searchDto.getData().getRoute().equals("") || searchDto.getData().getRoute().equals("QingXuanZeBiaoZhiId"))){
            routeId = searchDto.getData().getRoute();
        }
        if(!(searchDto.getData().getCar().equals("") || searchDto.getData().getCar().equals("QingXuanZeBiaoZhiId"))){
            carId = searchDto.getData().getCar();
        }
        List<Arrange> list = arrangeMapper.selectArrange((page-1)*rows,rows,unitId,num,routeId,carId,arrangeType);
        List<ArrangeListDto> resultList = new ArrayList<>();
        for (Arrange arrange:list) {
            ArrangeListDto dto = new ArrangeListDto();
            dto.setId(arrange.getId());
            dto.setNum(arrange.getNum());
            if(arrange.getArrangeType() == 1){
                dto.setArrangeType("班车");
            }else {
                dto.setArrangeType("包车");
            }
            if(arrange.getIsCancel() == 1){
                dto.setIsCancle("已取消");
            }else {
                dto.setIsCancle("正常");
            }
            String startTime = arrange.getSatrtTime();
            dto.setStartTime(startTime.substring(0,10)+" "+startTime.substring(10));
            String endTime = arrange.getEndTime();
            dto.setEndTime(endTime.substring(0,10)+" "+endTime.substring(10));
            dto.setPrice(arrange.getPrice().toString());
            dto.setLeaveNumber(arrange.getLeaveNumber().toString());
            Car car = carMapper.selectByPrimaryKey(arrange.getCarId());
            dto.setCarNum(car.getCarNum());
            if(car.getCarType()==1){
                dto.setCarType("蓝色");
            }
            if(car.getCarType()==2){
                dto.setCarType("黄色");
            }
            if(car.getCarType()==3){
                dto.setCarType("白色");
            }
            if(car.getCarType()==4){
                dto.setCarType("黑色");
            }
            if(car.getCarType()==5){
                dto.setCarType("绿色");
            }
            Route route = routeMapper.selectByPrimaryKey(arrange.getRouteId());
            String startStation = stationMapper.selectByPrimaryKey(route.getBeginId()).getStationName();
            String endStation = stationMapper.selectByPrimaryKey(route.getEndId()).getStationName();
            String station = "";
            List<RouteStation> routeStations = routeStationMapper.selectByRoutId(route.getId());
            for (RouteStation routeStation:routeStations) {
                String append = stationMapper.selectByPrimaryKey(routeStation.getStationId()).getStationName() + "-";
                station += append;
            }
            if(station.equals("")){
                dto.setStation("");
            }
            else {
                dto.setStation(station.substring(0,station.length()-1));
            }
            dto.setStartStation(startStation);
            dto.setEndStation(endStation);
            resultList.add(dto);
        }
        PageList<List<ArrangeListDto>> pageList = new PageList<>();
        pageList.setTotalcount(arrangeMapper.selectArrangeCount((page-1)*rows,rows,unitId,num,routeId,carId,arrangeType));
        pageList.setItems(resultList);
        return LYQResponse.createBySuccess(pageList);
    }

    @Override
    @Transactional
    public LYQResponse useArrange(HttpSession session, String id){
        Arrange arrange = new Arrange();
        arrange.setIsCancel(0);
        arrange.setId(id);
        arrangeMapper.updateByPrimaryKeySelective(arrange);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse stopArrange(HttpSession session, String id){
        Arrange arrange = new Arrange();
        arrange.setIsCancel(1);
        arrange.setId(id);
        arrangeMapper.updateByPrimaryKeySelective(arrange);
        return LYQResponse.createBySuccess(true);
    }

    @Override
    @Transactional
    public LYQResponse getBanCheList(HttpSession session, SearchDto<BanCheSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        String unitId = searchDto.getData().getUnitId();
        String carId = null;
        if(!(searchDto.getData().getCar().equals("") || searchDto.getData().getCar().equals("QingXuanZeBiaoZhiId"))){
            carId = searchDto.getData().getCar();
        }
        List<Arrange> list = arrangeMapper.selectBanChe((page-1)*rows,rows,unitId,carId);
        List<ArrangeListDto> resultList = new ArrayList<>();
        for (Arrange arrange:list) {
            ArrangeListDto dto = new ArrangeListDto();
            dto.setId(arrange.getId());
            dto.setNum(arrange.getNum());
            if(arrange.getArrangeType() == 1){
                dto.setArrangeType("班车");
            }else {
                dto.setArrangeType("包车");
            }
            if(arrange.getIsCancel() == 1){
                dto.setIsCancle("已取消");
            }else {
                dto.setIsCancle("正常");
            }
            String startTime = arrange.getSatrtTime();
            dto.setStartTime(startTime.substring(0,10)+" "+startTime.substring(10));
            String endTime = arrange.getEndTime();
            dto.setEndTime(endTime.substring(0,10)+" "+endTime.substring(10));
            dto.setPrice(arrange.getPrice().toString());
            dto.setLeaveNumber(arrange.getLeaveNumber().toString());
            Car car = carMapper.selectByPrimaryKey(arrange.getCarId());
            dto.setCarNum(car.getCarNum());
            if(car.getCarType()==1){
                dto.setCarType("蓝色");
            }
            if(car.getCarType()==2){
                dto.setCarType("黄色");
            }
            if(car.getCarType()==3){
                dto.setCarType("白色");
            }
            if(car.getCarType()==4){
                dto.setCarType("黑色");
            }
            if(car.getCarType()==5){
                dto.setCarType("绿色");
            }
            Route route = routeMapper.selectByPrimaryKey(arrange.getRouteId());
            String startStation = stationMapper.selectByPrimaryKey(route.getBeginId()).getStationName();
            String endStation = stationMapper.selectByPrimaryKey(route.getEndId()).getStationName();
            String station = "";
            List<RouteStation> routeStations = routeStationMapper.selectByRoutId(route.getId());
            for (RouteStation routeStation:routeStations) {
                String append = stationMapper.selectByPrimaryKey(routeStation.getStationId()).getStationName() + "-";
                station += append;
            }
            if(station.equals("")){
                dto.setStation("");
            }else {
                dto.setStation(station.substring(0,station.length()-1));
            }
            dto.setStartStation(startStation);
            dto.setEndStation(endStation);
            resultList.add(dto);
        }
        PageList<List<ArrangeListDto>> pageList = new PageList<>();
        pageList.setTotalcount(arrangeMapper.selectBanCheCount((page-1)*rows,rows,unitId,carId));
        pageList.setItems(resultList);
        return LYQResponse.createBySuccess(pageList);
    }

    @Override
    @Transactional
    public LYQResponse getBaoCheList(HttpSession session, SearchDto<BanCheSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        String unitId = searchDto.getData().getUnitId();
        String carId = null;
        if(!(searchDto.getData().getCar().equals("") || searchDto.getData().getCar().equals("QingXuanZeBiaoZhiId"))){
            carId = searchDto.getData().getCar();
        }
        List<Arrange> list = arrangeMapper.selectBaoChe((page-1)*rows,rows,unitId,carId);
        List<ArrangeListDto> resultList = new ArrayList<>();
        for (Arrange arrange:list) {
            ArrangeListDto dto = new ArrangeListDto();
            dto.setId(arrange.getId());
            dto.setNum(arrange.getNum());
            if(arrange.getArrangeType() == 1){
                dto.setArrangeType("班车");
            }else {
                dto.setArrangeType("包车");
            }
            if(arrange.getIsCancel() == 1){
                dto.setIsCancle("已取消");
            }else {
                dto.setIsCancle("正常");
            }
            String startTime = arrange.getSatrtTime();
            dto.setStartTime(startTime.substring(0,10)+" "+startTime.substring(10));
            String endTime = arrange.getEndTime();
            dto.setEndTime(endTime.substring(0,10)+" "+endTime.substring(10));
            dto.setPrice(arrange.getPrice().toString());
            dto.setLeaveNumber(arrange.getLeaveNumber().toString());
            Car car = carMapper.selectByPrimaryKey(arrange.getCarId());
            dto.setCarNum(car.getCarNum());
            if(car.getCarType()==1){
                dto.setCarType("蓝色");
            }
            if(car.getCarType()==2){
                dto.setCarType("黄色");
            }
            if(car.getCarType()==3){
                dto.setCarType("白色");
            }
            if(car.getCarType()==4){
                dto.setCarType("黑色");
            }
            if(car.getCarType()==5){
                dto.setCarType("绿色");
            }
            Route route = routeMapper.selectByPrimaryKey(arrange.getRouteId());
            String startStation = stationMapper.selectByPrimaryKey(route.getBeginId()).getStationName();
            String endStation = stationMapper.selectByPrimaryKey(route.getEndId()).getStationName();
            String station = "";
            List<RouteStation> routeStations = routeStationMapper.selectByRoutId(route.getId());
            for (RouteStation routeStation:routeStations) {
                String append = stationMapper.selectByPrimaryKey(routeStation.getStationId()).getStationName() + "-";
                station += append;
            }
            if(station.equals("")){
                dto.setStation("");
            }else {
                dto.setStation(station.substring(0,station.length()-1));
            }
            dto.setStartStation(startStation);
            dto.setEndStation(endStation);
            resultList.add(dto);
        }
        PageList<List<ArrangeListDto>> pageList = new PageList<>();
        pageList.setTotalcount(arrangeMapper.selectBaoCheCount((page-1)*rows,rows,unitId,carId));
        pageList.setItems(resultList);
        return LYQResponse.createBySuccess(pageList);
    }

    @Override
    @Transactional
    public LYQResponse makeDateCreateKeChe(HttpSession session){
        String userInfoJSON = (String) session.getAttribute("current_user");
        UserInfoDto userInfoDto = JSON.parseObject(userInfoJSON, UserInfoDto.class);
        MakeData md = new MakeData();
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        String parentUnitId = userInfoDto.getOrganId();
        List<Unit> units = unitMapper.selectQiYeCheDuiByParentUnit(parentUnitId);
        Unit parentUnit = new Unit();
        parentUnit.setId(parentUnitId);
        parentUnit.setUnitName(userInfoDto.getOrganizationName());
        parentUnit.setOrgtype(Integer.parseInt(userInfoDto.getOrganizationType()));
        units.add(parentUnit);
        units.add(parentUnit);
        units.add(parentUnit);
        units.add(parentUnit);
        int size = (md.getRondomNumber(5)+units.size())*13;
        for (int i = 0; i < size; i++) {
            CreateKeCheDto dto = new CreateKeCheDto();
            dto.setId(CommonUtils.getUUID());
            dto.setCarNum("粤D"+CommonUtils.getUUID().substring(0,6));
            int carType = md.getRondomNumber(2)+1;
            dto.setCarType(carType+"");
            dto.setPhone(md.randomTel());
            dto.setLicenceRegistDate(md.randomYear(2015,3)+"-"+md.randomMonth()+"-"+md.randomDay());
            dto.setLicencePublishDate(dto.getLicenceRegistDate());
            String year = md.randomYear(2018,1);
            String month = md.randomMonth();
            String day = md.randomDay();
            dto.setErweiDate(year+"-"+month+"-"+day);
            dto.setErweiDateNext(Integer.parseInt(year)+2+"-"+month+"-"+day);
            dto.setPermitNum(CommonUtils.getUUID());
            dto.setLicenceAddress(userInfoDto.getOrganProvince()+"省"+userInfoDto.getOrganCity()+"市"+userInfoDto.getOrganizationName().substring(0,2)+"区");
            dto.setEngineNum(CommonUtils.getUUID().substring(0,15));
            dto.setCarFrameNum(CommonUtils.getUUID().substring(0,15));
            dto.setFuel(md.getRondomNumber(8)+1+"");
            dto.setWeight(2+"");
            dto.setEngine(3+"");
            int[] seatNum = {36,54};
            dto.setSeatNum(seatNum[md.getRondomNumber(2)]+"");
            int index = md.getRondomNumber(units.size());
            dto.setUnitId(units.get(index).getId());
            dto.setUnitName(units.get(index).getUnitName());
            dto.setOrgType(units.get(index).getOrgtype()+"");
            createKeChe(session,dto);
        }
        return LYQResponse.createBySuccess(null);
    }
}
