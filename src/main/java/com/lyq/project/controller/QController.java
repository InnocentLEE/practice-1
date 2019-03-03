package com.lyq.project.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.lyq.project.common.*;
import com.lyq.project.dto.*;
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

    // region 获取省级监管部门详情
    @RequestMapping(value = "008808800012",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getShengJiJianGuanBuMenDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.getShengJiJianGuanBuMenDetail(session,request.getBody());
    }
    // endregion

    // region 修改省级监管部门
    @RequestMapping(value = "008808800013",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse updateShengJiJianGuanBuMen(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateShengJiJianGuanBuMenDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateShengJiJianGuanBuMenDto>>(){});
        return iqService.updateShengJiJianGuanBuMen(session,request.getBody());
    }
    // endregion


    // region 批量删除省级监管部门
    @RequestMapping(value = "008808800014",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse deleteShengJiJianGuanBuMenDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.deleteShengJiJianGuanBuMenDetail(session,request.getBody());
    }
    // endregion

    // region 新增客运企业
    @RequestMapping(value = "008808800040",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createKeYunQiYe(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateKeYunQiYeDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateKeYunQiYeDto>>(){});
        return iqService.createKeYunQiYe(session,request.getBody());
    }
    // endregion

    // region 获取客运企业列表
    @RequestMapping(value = "008808800041",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeYunQiYeList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<SearchDto<KeYunQiYeSearchDto>> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<SearchDto<KeYunQiYeSearchDto>>>(){});
        return iqService.getKeYunQiYeList(session,request.getBody());
    }
    // endregion

    // region 获取客运企业详情
    @RequestMapping(value = "008808800042",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeYunQiYeDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.getKeYunQiYeDetail(session,request.getBody());
    }
    // endregion

    // region 修改客运企业
    @RequestMapping(value = "008808800043",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse updateKeYunQiYe(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateKeYunQiYeDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateKeYunQiYeDto>>(){});
        return iqService.updateKeYunQiYe(session,request.getBody());
    }
    // endregion

    // region 批量删除客运企业
    @RequestMapping(value = "008808800044",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse deleteKeYunQiYeDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.deleteKeYunQiYeDetail(session,request.getBody());
    }
    // endregion

    // region 新增客运车队
    @RequestMapping(value = "008808800050",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createKeYunCheDui(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateKeYunCheDuiDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateKeYunCheDuiDto>>(){});
        return iqService.createKeYunCheDui(session,request.getBody());
    }
    // endregion

    // region 获取客运车队列表
    @RequestMapping(value = "008808800051",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeYunCheDuiList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<SearchDto<KeYunCheDuiSearchDto>> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<SearchDto<KeYunCheDuiSearchDto>>>(){});
        return iqService.getKeYunCheDuiList(session,request.getBody());
    }
    // endregion

    // region 获取客运车队详情
    @RequestMapping(value = "008808800052",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeYunCheDuiDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.getKeYunCheDuiDetail(session,request.getBody());
    }
    // endregion

    // region 修改客运车队
    @RequestMapping(value = "008808800053",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse updateKeYunCheDui(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateKeYunCheDuiDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateKeYunCheDuiDto>>(){});
        return iqService.updateKeYunCheDui(session,request.getBody());
    }
    // endregion

    // region 批量删除客运车队
    @RequestMapping(value = "008808800054",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse deleteKeYunCheDuiDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.deleteKeYunCheDuiDetail(session,request.getBody());
    }
    // endregion

    // region 新增客车
    @RequestMapping(value = "008808800060",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createKeChe(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<CreateKeCheDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<CreateKeCheDto>>(){});
        return iqService.createKeChe(session,request.getBody());
    }
    // endregion

    // region 获取客运车队列表
    @RequestMapping(value = "008808800061",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeCheList(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<SearchDto<KeCheSearchDto>> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<SearchDto<KeCheSearchDto>>>(){});
        return iqService.getKeCheList(session,request.getBody());
    }
    // endregion

    // region 提交客车
    @RequestMapping(value = "008808800066",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse submitKeCheDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.submitKeCheDetail(session,request.getBody());
    }
    // endregion

    // region 审核客车
    @RequestMapping(value = "008808800065",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse checkKeCheDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<KeCheCheckDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<KeCheCheckDto>>(){});
        return iqService.checkKeCheDetail(session,request.getBody());
    }
    // endregion

    // region 审核客车
    @RequestMapping(value = "008808800064",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse deleteKeCheDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.deleteKeCheDetail(session,request.getBody());
    }
    // endregion

    // region 获取客运车队详情
    @RequestMapping(value = "008808800062",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse getKeCheDetail(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<String> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<String>>(){});
        return iqService.getKeCheDetail(session,request.getBody());
    }
    // endregion
}
