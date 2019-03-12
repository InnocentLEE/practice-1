package com.lyq.project.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.lyq.project.common.*;
import com.lyq.project.dto.CreateKeYunZhanDto;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;
import com.lyq.project.dto.CreateShiJiJianGuanBuMenDto;
import com.lyq.project.dto.LoginDto;
import com.lyq.project.service.INService;
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
public class NController {

    @Autowired
    private INService inService;

    // region 新增市级监管部门
    @RequestMapping(value = "008808800020",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public  LYQResponse createShiJiJianGuanBuMen(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateShiJiJianGuanBuMenDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateShiJiJianGuanBuMenDto>>(){});
        return inService.createShiJiJianGuanBuMen(session,request.getBody());
    }
    // endregion

    // region 获取市级监管部门列表
    @RequestMapping(value = "008808800021",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getShengJiJianGuanBuMenList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<SearchDto<ShiJiJianGuanBuMenSearchDto>> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<SearchDto<ShiJiJianGuanBuMenSearchDto>>>(){});
        return inService.getShiJiJianGuanBuMenList(session,request.getBody());

    }
    // endregion

    // region 获取市级监管部门详情
    @RequestMapping(value = "008808800022",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getShiJiJianGuanBuMenDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return inService.getShiJiJianGuanBuMenDetail(session,request.getBody());
    }
    // endregion

    // region 修改市级监管部门
    @RequestMapping(value = "008808800023",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse updateShiJiJianGuanBuMen(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateShiJiJianGuanBuMenDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateShiJiJianGuanBuMenDto>>(){});
        return inService.updateShiJiJianGuanBuMen(session,request.getBody());
    }
    // endregion

    // region 批量删除市级监管部门
    @RequestMapping(value = "008808800024",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse deleteShiJiJianGuanBuMenDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return inService.deleteShiJiJianGuanBuMenDetail(session,request.getBody());
    }
    // endregion

    // region 新增客运站
    @RequestMapping(value = "008808800030",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public  LYQResponse createKeYunZhan(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateKeYunZhanDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateKeYunZhanDto>>(){});
        return inService.createKeYunZhan(session,request.getBody());
    }
    // endregion

    // region 获取客运站列表
    @RequestMapping(value = "008808800031",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeYunZhanList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<SearchDto<KeYunZhanSearchDto>> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<SearchDto<KeYunZhanSearchDto>>>(){});
        return inService.getKeYunZhanList(session,request.getBody());
    }
    // endregion

    // region 获取客运站详情
    @RequestMapping(value = "008808800032",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeYunQiYeDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return inService.getKeYunZhanDetail(session,request.getBody());
    }
    // endregion

    // region 修改客运站
    @RequestMapping(value = "008808800033",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse updateKeYunZhan(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateKeYunZhanDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateKeYunZhanDto>>(){});
        return inService.updateKeYunZhan(session,request.getBody());
    }
    // endregion

    // region 批量删除客运站
    @RequestMapping(value = "008808800034",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse deleteKeYunZhanDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return inService.deleteKeYunZhanDetail(session,request.getBody());
    }
    // endregion

    //region 年度售票率
    @RequestMapping(value = "008808800090",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getYearShouPiaoTongJi(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return inService.getYearShouPiaoTongJi(session,request.getBody());
    }
    //endregion

    //region 获取年度列表
    @RequestMapping(value = "008808800091",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getYearList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return inService.getYearList(session,request.getBody());
    }
    //endregion

    //region 月度售票率
    @RequestMapping(value = "008808800092",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getMonthShouPiaoTongJi(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<YueDuShouPiaoLvSearchDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<YueDuShouPiaoLvSearchDto>>(){});
        return inService.getMonthShouPiaoTongJi(session,request.getBody());
    }
    //endregion
}
