package com.lyq.project.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.lyq.project.common.LYQRequest;
import com.lyq.project.common.LYQResponse;
import com.lyq.project.common.SearchDto;
import com.lyq.project.common.ShengJiJianGuanBuMenSearchDto;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;
import com.lyq.project.dto.LoginDto;
import com.lyq.project.service.IQService;
import com.lyq.project.util.ValidateCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpSession;

@Controller
public class QController {

    @Autowired
    private IQService iqService;

    // region 新增省级监管部门
    @RequestMapping(value = "008808800010",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createShengJiJianGuanBuMen(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateShengJiJianGuanBuMenDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateShengJiJianGuanBuMenDto>>(){});
        return iqService.createShengJiJianGuanBuMen(session,request.getBody());
    }
    // endregion

    // region 获取省级监管部门列表
    @RequestMapping(value = "008808800011",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getShengJiJianGuanBuMenList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<SearchDto<ShengJiJianGuanBuMenSearchDto>> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<SearchDto<ShengJiJianGuanBuMenSearchDto>>>(){});
        return iqService.getShengJiJianGuanBuMenList(session,request.getBody());

    }
    // endregion
}
