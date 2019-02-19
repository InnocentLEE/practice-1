package com.lyq.project.service.Impl;

import com.alibaba.fastjson.JSON;
import com.lyq.project.common.*;
import com.lyq.project.dao.ContactsMapper;
import com.lyq.project.dao.GNMapper;
import com.lyq.project.dao.UnitGatherMapper;
import com.lyq.project.dao.UnitMapper;
import com.lyq.project.dto.*;
import com.lyq.project.pojo.Contacts;
import com.lyq.project.pojo.Unit;
import com.lyq.project.pojo.UnitGather;
import com.lyq.project.service.INService;
import com.lyq.project.service.IQService;
import com.lyq.project.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service("inService")
public class NServiceImpl implements INService {

    @Autowired
    private GNMapper gnMapper;
    @Autowired
    private ContactsMapper contactsMapper;
    @Autowired
    private UnitMapper unitMapper;
    @Autowired
    private UnitGatherMapper unitGatherMapper;


    @Override
    @Transactional
    public LYQResponse createShiJiJianGuanBuMen(HttpSession session, CreateShiJiJianGuanBuMenDto dto) {
        // 校验联系人身份证是否已存在
        if(contactsMapper.selectCountByCardNo(dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        Contacts contacts = new Contacts(CommonUtils.getUUID(), dto.getName(), dto.getIdCard(), dto.getTel(), "111111", dto.getPhone(), dto.getEmail(), dto.getQQ(), dto.getMemo(), 2, null, null);
        contactsMapper.insert(contacts);
        Unit unit = new Unit(CommonUtils.getUUID(), 2, dto.getProvince(), dto.getCity(), dto.getUnitName(), null, dto.getAddress(), null, null, null, null, contacts.getId(), null, null);
        unitMapper.insert(unit);
        //String povinceId = gnMapper.selectByparentUnitId(unit.getProvince());
        UserInfoDto userInfoDto = JSON.parseObject((String)session.getAttribute("current_user"), UserInfoDto.class);
        UnitGather unitGather = new UnitGather(CommonUtils.getUUID(), unit.getId(), userInfoDto.getOrganId(), 2, 1, 1);
        unitGatherMapper.insert(unitGather);
        return LYQResponse.createBySuccess(null);
    }

    @Override
    @Transactional
    public LYQResponse getShiJiJianGuanBuMenList(HttpSession session, SearchDto<ShiJiJianGuanBuMenSearchDto> searchDto){
        int page = searchDto.getPage();
        int rows = searchDto.getRows();
        String unitName = searchDto.getData().getUnitName();
        String city = searchDto.getData().getCity();
        List<ShiJiJianGuanBuMenListDto> list = gnMapper.selectShiJiJianGuanBuMen((page-1)*rows,rows,unitName,city);
        PageList<List<ShiJiJianGuanBuMenListDto>> pageList = new PageList<>();
        pageList.setTotalcount(list.size());
        pageList.setItems(list);
        return LYQResponse.createBySuccess(pageList);
    }
}
