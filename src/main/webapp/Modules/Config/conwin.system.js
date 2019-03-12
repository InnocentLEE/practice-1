(function (root, config) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return config;
        });
    }
    else {
        root.SystemConfig = config;
    }
})(this,
    {
        SysId: '60190FC4-5103-4C76-94E4-12A54B62C92A',
        AppId: '938B7DFE-5DEA-4BC4-AFE3-1095385AB598',
        SysName: '你猜猜这是什么平台',
        AppName: '',
        IsTest: true,
        AdaptLogin: false,
        DefaultUrl: '/Modules/JiChuDangAn/KeCheXinXi/List.html',
        LoginUrl: '/Modules/Home/Index.html',
        LogoutUrl: '/Modules/Home/Logout.html',
        Exponent: '010001',         //加密需要，Exponent参数
        Modulus: 'A85A7F6667773D8FB7013C482CDB5EFCC06A84E218454204B86CAF42313431116FBBDE0020B62EE91E970E6991340B34ED2A8C51B00B768B934BEF6E584528A7097DAD560C41F164A2A7AD8706E41C7346B5DFDD1D0E204A373A352F255BDFDD8DA4917551F3835FCEC56C72FDC8B38A783FEA8937E2C0A5B2D80750F3B7D3A9',        //加密需要，Modulus参数
        ServerAgent: "http://10.0.64.249:7007/api/ServiceGateway/DataService",
        ServiceCodeTable: [
            // 获取验证码
            { code: "00000030011", ver: '1.0', url: "http://localhost:8080/base/ValidCode" },
            // 登录
            { code: "00000030001", ver: '1.0', url: "http://localhost:8080/base/Login" },
            // 获取用户信息
            { code: "00000030002", ver: '1.0', url: "http://localhost:8080/base/GetUserInfo" },
            // 获取用户菜单
            { code: "00000030006", ver: '1.0', url: "http://localhost:8080/base/GetMenu" },
            // 判断用户是否有权限访问注册资源
            { code: "00000030015", ver: '1.0', url: "http://localhost:8080/base/HasResource" },
            // 新增省级监管部门
            { code: "008808800010", ver: '1.0', url: "http://localhost:8080/008808800010" },
            // 获取省级监管部门列表
            { code: "008808800011", ver: '1.0', url: "http://localhost:8080/008808800011" },
            // 获取省级监管部门详情
            { code: "008808800012", ver: '1.0', url: "http://localhost:8080/008808800012" },
            // 修改省级监管部门
            { code: "008808800013", ver: '1.0', url: "http://localhost:8080/008808800013" },
            // 批量删除省级监管部门
            { code: "008808800014", ver: '1.0', url: "http://localhost:8080/008808800014" },


            // 新增市级监管部门
            { code: "008808800020", ver: '1.0', url: "http://localhost:8080/008808800020" },
            // 获取市级监管部门列表
            { code: "008808800021", ver: '1.0', url: "http://localhost:8080/008808800021" },
            // 获取市级监管部门详情
            { code: "008808800022", ver: '1.0', url: "http://localhost:8080/008808800022" },
            // 修改市级监管部门
            { code: "008808800023", ver: '1.0', url: "http://localhost:8080/008808800023" },
            // 批量删除市级监管部门
            { code: "008808800024", ver: '1.0', url: "http://localhost:8080/008808800024" },

            // 新增客运站
            { code: "008808800030", ver: '1.0', url: "http://localhost:8080/008808800030" },
            // 获取客运站列表
            { code: "008808800031", ver: '1.0', url: "http://localhost:8080/008808800031" },
            // 获取客运站详情
            { code: "008808800032", ver: '1.0', url: "http://localhost:8080/008808800032" },
            // 修改客运站
            { code: "008808800033", ver: '1.0', url: "http://localhost:8080/008808800033" },
            // 批量删除客运站
            { code: "008808800034", ver: '1.0', url: "http://localhost:8080/008808800034" },


            // 新增客运企业
            { code: "008808800040", ver: '1.0', url: "http://localhost:8080/008808800040" },
            // 获取客运企业列表
            { code: "008808800041", ver: '1.0', url: "http://localhost:8080/008808800041" },
            // 获取客运企业详情
            { code: "008808800042", ver: '1.0', url: "http://localhost:8080/008808800042" },
            // 修改客运企业
            { code: "008808800043", ver: '1.0', url: "http://localhost:8080/008808800043" },
            // 批量删除客运企业
            { code: "008808800044", ver: '1.0', url: "http://localhost:8080/008808800044" },


            // 新增客运车队
            { code: "008808800050", ver: '1.0', url: "http://localhost:8080/008808800050" },
            // 获取客运车队列表
            { code: "008808800051", ver: '1.0', url: "http://localhost:8080/008808800051" },
            // 获取客运车队详情
            { code: "008808800052", ver: '1.0', url: "http://localhost:8080/008808800052" },
            // 修改客运车队
            { code: "008808800053", ver: '1.0', url: "http://localhost:8080/008808800053" },
            // 批量删除客运车队
            { code: "008808800054", ver: '1.0', url: "http://localhost:8080/008808800054" },


            // 新增客车
            { code: "008808800060", ver: '1.0', url: "http://localhost:8080/008808800060" },
            // 获取客车列表
            { code: "008808800061", ver: '1.0', url: "http://localhost:8080/008808800061" },
            // 获取客车详情
            { code: "008808800062", ver: '1.0', url: "http://localhost:8080/008808800062" },
            // 修改客车
            { code: "008808800063", ver: '1.0', url: "http://localhost:8080/008808800063" },
            // 批量删除客车
            { code: "008808800064", ver: '1.0', url: "http://localhost:8080/008808800064" },
            // 审核客车
            { code: "008808800065", ver: '1.0', url: "http://localhost:8080/008808800065" },
            // 提交客车
            { code: "008808800066", ver: '1.0', url: "http://localhost:8080/008808800066" },


            // 新增路线站点
            { code: "008808800070", ver: '1.0', url: "http://localhost:8080/008808800070" },
            // 获取组织全部站点
            { code: "008808800071", ver: '1.0', url: "http://localhost:8080/008808800071" },
            // 新增路线
            { code: "008808800072", ver: '1.0', url: "http://localhost:8080/008808800072" },
            // 获取路线列表
            { code: "008808800073", ver: '1.0', url: "http://localhost:8080/008808800073" },
            // 启用路线
            { code: "008808800074", ver: '1.0', url: "http://localhost:8080/008808800074" },
            // 禁用路线
            { code: "008808800075", ver: '1.0', url: "http://localhost:8080/008808800075" },
            // 获取排班可选路线
            { code: "008808800076", ver: '1.0', url: "http://localhost:8080/008808800076" },
            // 获取排班可选客车
            { code: "008808800077", ver: '1.0', url: "http://localhost:8080/008808800077" },
            // 新增客运排班
            { code: "008808800078", ver: '1.0', url: "http://localhost:8080/008808800078" },
            // 获取客运排班列表
            { code: "008808800079", ver: '1.0', url: "http://localhost:8080/008808800079" },
            // 恢复班次
            { code: "008808800080", ver: '1.0', url: "http://localhost:8080/008808800080" },
            // 取消班次
            { code: "008808800081", ver: '1.0', url: "http://localhost:8080/008808800081" },
            // 班车查询
            { code: "008808800082", ver: '1.0', url: "http://localhost:8080/008808800082" },
            // 包车查询
            { code: "008808800083", ver: '1.0', url: "http://localhost:8080/008808800083" },
            // 年度售票率统计
            { code: "008808800090", ver: '1.0', url: "http://localhost:8080/008808800090" },
            // 获取年度列表
            { code: "008808800091", ver: '1.0', url: "http://localhost:8080/008808800091" },
            // 月度售票率统计
            { code: "008808800092", ver: '1.0', url: "http://localhost:8080/008808800092" },
            // 购票方式占比统计
            { code: "008808800093", ver: '1.0', url: "http://localhost:8080/008808800093" },





            { code: "008808800100", ver: '1.0', url: "http://localhost:8080/008808800100" },
            { code: "008808800101", ver: '1.0', url: "http://localhost:8080/008808800101" },
            { code: "008808800102", ver: '1.0', url: "http://localhost:8080/008808800102" },
            { code: "008808800103", ver: '1.0', url: "http://localhost:8080/008808800103" },
            { code: "008808800104", ver: '1.0', url: "http://localhost:8080/008808800104" },
            { code: "008808800105", ver: '1.0', url: "http://localhost:8080/008808800105" },
            { code: "008808800106", ver: '1.0', url: "http://localhost:8080/008808800106" },
            { code: "008808800107", ver: '1.0', url: "http://localhost:8080/008808800107" },
            { code: "008808800108", ver: '1.0', url: "http://localhost:8080/008808800108" },
            { code: "008808800109", ver: '1.0', url: "http://localhost:8080/008808800109" },





        ]
    });