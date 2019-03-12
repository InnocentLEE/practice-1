package com.lyq.project.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.lyq.project.common.LYQRequest;
import com.lyq.project.common.LYQResponse;
import com.lyq.project.dto.*;
import com.lyq.project.service.INService;
import com.lyq.project.service.IQService;
import com.lyq.project.util.CommonUtils;
import com.lyq.project.util.IdCardGenerator;
import com.lyq.project.util.MakeData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class MakeDataController {
    @Autowired
    private IQService iqService;
    @Autowired
    private INService inService;




    // region 造数据 - 新增省级监管部门
    @RequestMapping(value = "008808800100",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createShengJi(HttpSession session , @RequestBody JSONObject jsonParam) {
        // 省份
        List<String> provinces = new ArrayList<>();
        provinces.add("北京");
        provinces.add("上海");
        provinces.add("天津");
        provinces.add("重庆");
        provinces.add("河北");
        provinces.add("山西");
        provinces.add("内蒙古");
        provinces.add("辽宁");
        provinces.add("吉林");
        provinces.add("黑龙江");
        provinces.add("江苏");
        provinces.add("浙江");
        provinces.add("安徽");
        provinces.add("福建");
        provinces.add("江西");
        provinces.add("山东");
        provinces.add("河南");
        provinces.add("湖北");
        provinces.add("湖南");
        provinces.add("广东");
        provinces.add("广西");
        provinces.add("海南");
        provinces.add("四川");
        provinces.add("贵州");
        provinces.add("云南");
        provinces.add("西藏");
        provinces.add("陕西");
        provinces.add("甘肃");
        provinces.add("宁夏");
        provinces.add("青海");
        provinces.add("新疆");
        provinces.add("香港");
        provinces.add("澳门");
        provinces.add("台湾");
        MakeData md = new MakeData();
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        for (String province:provinces) {
            CreateShengJiJianGuanBuMenDto dto = new CreateShengJiJianGuanBuMenDto();
            dto.setId(CommonUtils.getUUID());
            dto.setUnitName(province+md.randomShengJiBuMen());
            dto.setProvince(province);
            dto.setAddress(province+md.randomAddress());
            dto.setName(md.randomName());
            dto.setIdCard(idCardGenerator.generate());
            dto.setTel(md.randomTel());
            dto.setPhone("");
            dto.setEmail(md.randomEmail());
            dto.setQQ(md.randomQQ());
            dto.setMemo("");
            iqService.createShengJiJianGuanBuMen(session,dto);
        }
        return LYQResponse.createBySuccess(null);
    }
    // endregion

    // region 造数据 - 新增市级监管部门
    @RequestMapping(value = "008808800101",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createShiJi(HttpSession session , @RequestBody JSONObject jsonParam) {
        // 城市
        List<String> citys = new ArrayList<>();
        citys.add("广州");
        citys.add("深圳");
        citys.add("珠海");
        citys.add("汕头");
        citys.add("东莞");
        citys.add("中山");
        citys.add("佛山");
        citys.add("韶关");
        citys.add("江门");
        citys.add("湛江");
        citys.add("茂名");
        citys.add("肇庆");
        citys.add("惠州");
        citys.add("梅州");
        citys.add("汕尾");
        citys.add("河源");
        citys.add("阳江");
        citys.add("清远");
        citys.add("潮州");
        citys.add("揭阳");
        citys.add("云浮");
        MakeData md = new MakeData();
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        for (String city:citys) {
            CreateShiJiJianGuanBuMenDto dto = new CreateShiJiJianGuanBuMenDto();
            dto.setId(CommonUtils.getUUID());
            dto.setUnitName("广东省"+city+"市"+md.randomShiJiBuMen());
            dto.setProvince("广东");
            dto.setCity(city);
            dto.setAddress("广东省"+city+"市"+md.randomAddress());
            dto.setName(md.randomName());
            dto.setIdCard(idCardGenerator.generate());
            dto.setTel(md.randomTel());
            dto.setPhone("");
            dto.setEmail(md.randomEmail());
            dto.setQQ(md.randomQQ());
            dto.setMemo("");
            inService.createShiJiJianGuanBuMen(session,dto);
        }
        return LYQResponse.createBySuccess(null);
    }
    // endregion

    // region 造数据 - 新增客运站
    @RequestMapping(value = "008808800102",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createKeYunZhan(HttpSession session , @RequestBody JSONObject jsonParam) {
        // 城市
        List<String> citys = new ArrayList<>();
        citys.add("广州");
        citys.add("深圳");
        citys.add("珠海");
        citys.add("汕头");
        citys.add("东莞");
        citys.add("中山");
        citys.add("佛山");
        citys.add("韶关");
        citys.add("江门");
        citys.add("湛江");
        citys.add("茂名");
        citys.add("肇庆");
        citys.add("惠州");
        citys.add("梅州");
        citys.add("汕尾");
        citys.add("河源");
        citys.add("阳江");
        citys.add("清远");
        citys.add("潮州");
        citys.add("揭阳");
        citys.add("云浮");

        String[][] xiaqu = {
                {"荔湾","越秀","海珠","天河","白云","黄埔","番禺","花都","南沙","萝岗"},
                {"罗湖","福田","南山","宝安","龙岗","盐田"},
                {"香洲","斗门","金湾"},
                {"龙湖","金平","濠江","潮阳","潮南","澄海"},
                {},
                {},
                {"禅城","南海","顺德","三水","高明"},
                {"武江","浈江","曲江"},
                {"蓬江","江海","新会"},
                {"赤坎","霞山","坡头","麻章"},
                {"茂南","茂港"},
                {"端州","鼎湖"},
                {"惠城","惠阳"},
                {"梅江"},
                {},
                {"源城"},
                {"江城"},
                {"清城"},
                {"湘桥"},
                {"榕城"},
                {"云城"}
        };
        MakeData md = new MakeData();
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        for (int i = 0; i < citys.size(); i++) {
            for(int j = 0;j < xiaqu[i].length;j++){
                CreateKeYunZhanDto dto = new CreateKeYunZhanDto();
                dto.setId(CommonUtils.getUUID());
                dto.setUnitName(xiaqu[i][j]+"汽车客运站");
                dto.setProvince("广东");
                dto.setCity(citys.get(i));
                dto.setBusinessType("1");
                dto.setAddress(xiaqu[i][j]+"区"+md.randomAddress());
                String permitNum = CommonUtils.getUUID().substring(0,10);
                dto.setPermitNum(permitNum);
                dto.setPermitWord("粤"+permitNum);
                dto.setPermitDate(md.randomYear(2020,5)+"-"+md.randomMonth()+"-"+md.randomDay());
                dto.setName(md.randomName());
                dto.setIdCard(idCardGenerator.generate());
                dto.setTel(md.randomTel());
                dto.setPhone("");
                dto.setEmail(md.randomEmail());
                dto.setQQ(md.randomQQ());
                dto.setMemo("");
                System.out.println("结果：====================》"+inService.createKeYunZhan(session,dto).getPublicresponse().getStatuscode());
            }
        }
        return LYQResponse.createBySuccess(null);
    }
    // endregion

    // region 造数据 - 新增客运企业
    @RequestMapping(value = "008808800103",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createKeYunQiYe(HttpSession session , @RequestBody JSONObject jsonParam) {
        String userInfoJSON = (String) session.getAttribute("current_user");
        UserInfoDto userInfoDto = JSON.parseObject(userInfoJSON, UserInfoDto.class);
        MakeData md = new MakeData();
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        for (int i = 0; i < 8; i++) {
            CreateKeYunQiYeDto dto = new CreateKeYunQiYeDto();
            dto.setId(CommonUtils.getUUID());
            String[] unitName = {"客运有限公司","运输有限公司","客车运输有限公司"};
            dto.setUnitName(userInfoDto.getOrganizationName().substring(0,2)+md.getWord()+md.getWord()+unitName[md.getRondomNumber(3)]);
            dto.setProvince(userInfoDto.getOrganProvince());
            dto.setCity(userInfoDto.getOrganCity());
            dto.setBusinessType(2+"");
            dto.setAddress(userInfoDto.getOrganizationName().substring(0,2)+"区"+md.randomAddress());
            String permitNum = CommonUtils.getUUID().substring(0,10);
            dto.setPermitNum(permitNum);
            dto.setPermitWord("粤"+permitNum);
            dto.setPermitDate(md.randomYear(2020,5)+"-"+md.randomMonth()+"-"+md.randomDay());
            dto.setName(md.randomName());
            dto.setIdCard(idCardGenerator.generate());
            dto.setTel(md.randomTel());
            dto.setPhone("");
            dto.setEmail(md.randomEmail());
            dto.setQQ(md.randomQQ());
            dto.setMemo("");
            iqService.createKeYunQiYe(session,dto);
        }
        return LYQResponse.createBySuccess(null);
    }
    // endregion

    // region 造数据 - 新增客运车队
    @RequestMapping(value = "008808800104",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createKeYunCheDui(HttpSession session , @RequestBody JSONObject jsonParam) {
        String userInfoJSON = (String) session.getAttribute("current_user");
        UserInfoDto userInfoDto = JSON.parseObject(userInfoJSON, UserInfoDto.class);
        MakeData md = new MakeData();
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        for (int i = 0; i < 13; i++) {
            CreateKeYunCheDuiDto dto = new CreateKeYunCheDuiDto();
            dto.setId(CommonUtils.getUUID());
            dto.setName(md.randomName());
            dto.setUnitName(userInfoDto.getOrganizationName().substring(0,2)+dto.getName()+"车队");
            dto.setProvince(userInfoDto.getOrganProvince());
            dto.setCity(userInfoDto.getOrganCity());
            dto.setAddress(userInfoDto.getOrganizationName().substring(0,2)+"区"+md.randomAddress());
            String permitNum = CommonUtils.getUUID().substring(0,10);
            dto.setPermitNum(permitNum);
            dto.setPermitWord("粤"+permitNum);
            dto.setPermitDate(md.randomYear(2020,5)+"-"+md.randomMonth()+"-"+md.randomDay());
            dto.setIdCard(idCardGenerator.generate());
            dto.setTel(md.randomTel());
            dto.setPhone("");
            dto.setEmail(md.randomEmail());
            dto.setQQ(md.randomQQ());
            dto.setMemo("");
            iqService.createKeYunCheDui(session,dto);
        }
        return LYQResponse.createBySuccess(null);
    }
    // endregion

    // region 造数据 - 新增客车(客运站)
    @RequestMapping(value = "008808800105",method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public LYQResponse createKeChe(HttpSession session , @RequestBody JSONObject jsonParam) {
        return iqService.makeDateCreateKeChe(session);
    }
    // endregion
}
