package com.lyq.project.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.lyq.project.common.LYQRequest;
import com.lyq.project.common.LYQResponse;
import com.lyq.project.dto.*;
import com.lyq.project.service.IBaseService;
import com.lyq.project.service.INService;
import com.lyq.project.service.IQService;
import com.lyq.project.util.IdCardGenerator;
import com.lyq.project.util.MakeData;
import com.lyq.project.util.ValidateCodeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import redis.clients.jedis.Jedis;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Lee on 2018/8/31.
 */
@Controller
public class BaseController {

    @Autowired
    private IBaseService iBaseService;
    @Autowired
    private IQService iqService;
    @Autowired
    private INService inService;

    //测试
    @RequestMapping(value = "base/test",method = RequestMethod.POST)
    @ResponseBody
    public String test() {
        return "cece";
    }
    // region 获取验证码
    @RequestMapping(value = "base/ValidCode",method = RequestMethod.POST)
    @ResponseBody
    public LYQResponse getValidCode(HttpSession session , @RequestBody LYQRequest<String> request) {
        ValidateCodeUtil.Validate vcode = ValidateCodeUtil.getRandomCode();
        // 将验证码的信息存入缓存中，并设置两分钟过期
        Jedis jedis = new Jedis("119.23.253.135",6379,10000,10000);
        jedis.setex(session.getId(),120, JSON.toJSONString(vcode));
        LYQResponse response =  LYQResponse.createBySuccess(vcode.getBase64Str());
        return response;
    }
    // endregion

    // region 登录
    @RequestMapping(value = "base/Login",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse login(HttpSession session , @RequestBody JSONObject jsonParam) {
        LYQRequest<LoginDto> request = JSON.parseObject(jsonParam.toJSONString(),new TypeReference<LYQRequest<LoginDto>>(){});
        Jedis jedis = new Jedis("119.23.253.135",6379,10000,10000);
        ValidateCodeUtil.Validate vcode = JSON.parseObject(jedis.get(session.getId()),ValidateCodeUtil.Validate.class);
        if(vcode == null){
            return LYQResponse.createByErrorMessage("验证码已过期");
        }
        String realCode = vcode.getValue();
        if(!realCode.equalsIgnoreCase(request.getBody().getCode())){
            return LYQResponse.createByErrorMessage("验证码错误");
        }
        return iBaseService.login(session, request);
    }
    // endregion

    // region 获取用户信息
    @RequestMapping(value = "base/GetUserInfo",method = RequestMethod.POST)
    @ResponseBody
    public LYQResponse<UserInfoDto> getUserInfo(HttpSession session , @RequestBody LYQRequest<String> request) {
        String userInfoJSON = (String) session.getAttribute("current_user");
        LYQResponse response =  LYQResponse.createBySuccess(JSON.parseObject(userInfoJSON,UserInfoDto.class));
        return response;
    }
    // endregion

    // region 获取菜单
    @RequestMapping(value = "base/GetMenu",method = RequestMethod.POST)
    @ResponseBody
    public LYQResponse<List<MenudTO>> GetMenu(HttpSession session , @RequestBody JSONObject jsonParam) {
        String userInfoJSON = (String) session.getAttribute("current_user");
        UserInfoDto userInfoDto = JSON.parseObject(userInfoJSON,UserInfoDto.class);
        return iBaseService.getMenu(Integer.parseInt(userInfoDto.getRoleCode()));
    }
    // endregion

    // region 是否可以访问资源
    @RequestMapping(value = "base/HasResource",method = RequestMethod.POST)
    @ResponseBody
    public LYQResponse<List<ResourceDto>> HasResource(HttpSession session , @RequestBody JSONObject jsonParam) {
        String userInfoJSON = (String) session.getAttribute("current_user");
        UserInfoDto userInfoDto = JSON.parseObject(userInfoJSON,UserInfoDto.class);
        return iBaseService.HasResource(Integer.parseInt(userInfoDto.getRoleCode()));
    }

    // region 造数据
    @RequestMapping(value = "base/MakeData",method = RequestMethod.POST)
    @ResponseBody
    public LYQResponse<List<ResourceDto>> MakeData(HttpSession session) {
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        MakeData makeData = new MakeData();
        String name = makeData.randomName();
        String idCard = idCardGenerator.generate();
        CreateShengJiJianGuanBuMenDto dto = new CreateShengJiJianGuanBuMenDto(null,"广东省道路运输总局","广东","广州市越秀区白云路27号",name,idCard,null,null,null,null,null);
        return iqService.createShengJiJianGuanBuMen(session,dto);
    }
    // endregion
}
