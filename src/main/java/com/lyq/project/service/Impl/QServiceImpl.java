package com.lyq.project.service.Impl;

import com.alibaba.fastjson.JSON;
import com.lyq.project.common.LYQResponse;
import com.lyq.project.common.PageList;
import com.lyq.project.common.SearchDto;
import com.lyq.project.common.ShengJiJianGuanBuMenSearchDto;
import com.lyq.project.dao.ContactsMapper;
import com.lyq.project.dao.UnitGatherMapper;
import com.lyq.project.dao.UnitMapper;
import com.lyq.project.dto.*;
import com.lyq.project.pojo.Contacts;
import com.lyq.project.pojo.Unit;
import com.lyq.project.pojo.UnitGather;
import com.lyq.project.service.IQService;
import com.lyq.project.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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


    @Override
    @Transactional
    public LYQResponse createShengJiJianGuanBuMen(HttpSession session, CreateShengJiJianGuanBuMenDto dto){
        // 校验联系人身份证是否已存在
        if(contactsMapper.selectCountByCardNo(dto.getIdCard()) > 0){
            return LYQResponse.createByErrorMessage("联系人身份证号已被使用");
        }
        Contacts contacts = new Contacts(CommonUtils.getUUID(),dto.getName(),dto.getIdCard(),dto.getTel(),"111111",dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),1,null,null);
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
        pageList.setTotalcount(list.size());
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
        contactsMapper.updateByPrimaryKey(contacts);
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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Contacts contacts = new Contacts(CommonUtils.getUUID(),dto.getName(),dto.getIdCard(),dto.getTel(),"111111",dto.getPhone(),dto.getEmail(),dto.getQQ(),dto.getMemo(),1,null,null);
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
}
