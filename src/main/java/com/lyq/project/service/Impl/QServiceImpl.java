package com.lyq.project.service.Impl;

import com.lyq.project.common.LYQResponse;
import com.lyq.project.common.PageList;
import com.lyq.project.common.SearchDto;
import com.lyq.project.common.ShengJiJianGuanBuMenSearchDto;
import com.lyq.project.dao.ContactsMapper;
import com.lyq.project.dao.UnitMapper;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;
import com.lyq.project.dto.ShengJiJianGuanBuMenDetail;
import com.lyq.project.dto.ShengJiJianGuanBuMenListDto;
import com.lyq.project.pojo.Contacts;
import com.lyq.project.pojo.Unit;
import com.lyq.project.service.IQService;
import com.lyq.project.util.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service("iQService")
public class QServiceImpl implements IQService {

    @Autowired
    private UnitMapper unitMapper;
    @Autowired
    private ContactsMapper contactsMapper;


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
}
