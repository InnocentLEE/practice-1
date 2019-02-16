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
        DefaultUrl: '/Modules/JiChuDangAn/ShengJiJianGuanBuMen/List.html',
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








            { code: "003300300001", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiDaiLiShangXinXi/Query" },
            { code: "003300300002", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiDaiLiShangXinXi/Get" },
            { code: "003300300004", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiDaiLiShangXinXi/Create" },
            { code: "003300300005", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiDaiLiShangXinXi/Update" },
            { code: "003300300006", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiDaiLiShangXinXi/Delete" },
            { code: "003300300007", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiDaiLiShangXinXi/CancelStatus" },
            { code: "003300300008", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiDaiLiShangXinXi/NormalStatus" },

            { code: "003300300009", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/LianXiRenXinXi/Query" },
            { code: "003300300010", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/LianXiRenXinXi/Create" },
            { code: "003300300011", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/LianXiRenXinXi/Update" },
            { code: "003300300012", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/LianXiRenXinXi/Delete" },
            { code: "003300300013", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/LianXiRenXinXi/Get" },

            { code: "003300300014", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/FenZhiJiGouHeGPSYunYingShangXinXi/Query" },
            { code: "003300300015", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/FenZhiJiGouHeGPSYunYingShangXinXi/Get" },
            { code: "003300300017", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/FenZhiJiGouHeGPSYunYingShangXinXi/Create" },
            { code: "003300300018", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/FenZhiJiGouHeGPSYunYingShangXinXi/Update" },
            { code: "003300300019", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/FenZhiJiGouHeGPSYunYingShangXinXi/Delete" },
            { code: "003300300020", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/FenZhiJiGouHeGPSYunYingShangXinXi/CancelStatus" },
            { code: "003300300021", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/FenZhiJiGouHeGPSYunYingShangXinXi/NormalStatus" },

            { code: "003300300022", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/Query" },
            { code: "003300300023", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/Get" },
            { code: "003300300025", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/Create" },
            { code: "003300300026", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/Update" },
            { code: "003300300027", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/Delete" },
            { code: "003300300028", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/CancelStatus" },
            { code: "003300300029", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/NormalStatus" },
            { code: "003300300030", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/Submit" },
            { code: "003300300031", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/Check" },

            { code: "003300300032", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/Query" },
            { code: "003300300033", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/Get" },
            { code: "003300300035", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/Create" },
            { code: "003300300036", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/Update" },
            { code: "003300300037", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/Delete" },
            { code: "003300300038", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/CancelStatus" },
            { code: "003300300039", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/NormalStatus" },
            { code: "003300300040", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/Submit" },
            { code: "003300300041", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheDuiXinXi/Check" },




            { code: "003300300075", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/Query" },
            { code: "003300300076", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/Get" },
            { code: "003300300077", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/IsExists" },
            { code: "003300300078", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/Create" },
            { code: "003300300079", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/Update" },
            { code: "003300300080", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/Delete" },
            { code: "003300300081", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/Off" },
            { code: "003300300082", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SheBeiZhongDuanXinXi/On" },

            //车辆收费
            { code: "003300300085", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/Create" },
            { code: "003300300086", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/Update" },
            { code: "003300300087", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/Delete" },
            { code: "003300300083", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/Query" },
            { code: "003300300084", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/Get" },
            { code: "003300300089", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/Import" },
            { code: "003300300090", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/Export" },
            { code: "003300300088", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/XuFeiTiXin" },
            { code: "003300300091", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/SearchCarList" },
            { code: "003300300092", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/GetCarInfoFromNum" },
            { code: "003300300093", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/ShouFeiSum " },
            { code: "003300300141", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/GetCarInfoFromNums" },
            { code: "003300300139", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangShouFeiJiLu/PiLiangShouFeiCreate" },

            { code: "003300300100", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/ZuZhiGongZhangXinXi/Query" },
            { code: "003300300102", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/ZuZhiGongZhangXinXi/Create" },
            { code: "003300300103", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/ZuZhiGongZhangXinXi/Update" },
            { code: "003300300101", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/ZuZhiGongZhangXinXi/Get" },
            { code: "003300300104", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/ZuZhiGongZhangXinXi/Delete" },

            { code: "003300300094", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangAnZhuangZhengMingJiLuXinXi/Query" },

            { code: "003300300098", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangAnZhuangZhengMingDaYinJiLu/Query" },
            { code: "003300300097", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangAnZhuangZhengMingDaYinJiLu/Create" },
            { code: "003300300099", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangAnZhuangZhengMingDaYinJiLu/Print" },
            // 新增车辆安装证明记录
            { code: "003300300096", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangAnZhuangZhengMingJiLuXinXi/Create" },
            { code: "003300300095", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangAnZhuangZhengMingJiLuXinXi/Export" },

            // 车辆业务办理
            // 校验车辆是否符合办理业务条件
            { code: "003300300073", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangYeWuBanLi/CheckCarInfoRight" },
            // 获取车辆上报所需信息
            { code: "003300300074", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangYeWuBanLi/GetCarInfoFromID" },
            //同步车辆信息到地市
            { code: "003300300140", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangYeWuBanLi/TongBuCheLiangXinXiToDiShi" },

            ///车辆列表查询
            { code: "003300300042", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/QueryList" },
            //车辆停用与启用
            { code: "003300300044", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpDataState" },
            //安装终端时写入终端关系
            { code: "003300300045", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpDataTerminalInfo" },

            //删除车辆信息
            { code: "003300300043", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/DelVehicleInfo" },
            //判断车辆是否已安装终端
            { code: "003300300107", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/CheckVechicleInstallTerminal" },

            //获取企业列表
            { code: "003300300071", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetYeHu" },
            //获取GPS商和分公司列表
            { code: "003300300130", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetYunYingShang" },
            //获取车队列表
            { code: "003300300072", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetCheDui" },
            //删除白名单
            { code: "003300300070", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/DelVehicleWhiteList" },
            //车辆查看
            { code: "003300300046", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleBasicInfo " },
            { code: "003300300047", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleDetailedInfo " },
            { code: "003300300048", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleDataReport " },
            { code: "003300300049", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleEnterpriseInfo " },
            { code: "003300300050", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleCJInfo " },
            { code: "003300300051", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleServiceInfo " },
            { code: "003300300052", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleTerminalInstallInfo " },

            //车辆新增
            { code: "003300300053", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleBasicInfo " },
            { code: "003300300054", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleDetailedInfo " },
            { code: "003300300106", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleDataReport " },
            { code: "003300300055", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleEnterpriseInfo " },
            { code: "003300300056", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleCJInfo " },
            { code: "003300300057", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleServiceInfo " },
            { code: "003300300058", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleTerminalInstallInfo " },
            { code: "003300300070", ver: "1.0", url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/DelVehicleWhiteList" },
            { code: "003300300128", ver: "1.0", url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddCheLiangKuSuLuRuInfo" },
            { code: "003300300129", ver: "1.0", url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/ExportCheliangXinXi" },

            //车辆修改
            { code: "003300200087", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpdateVehicleBasicInfo " },
            { code: "003300300060", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpDateVehicleDetailedInfo " },
            { code: "003300300061", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpDateVehicleDataReport " },
            { code: "003300300105", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpdateVehicleEnterpriseInfo " },
            { code: "003300300062", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpDateVehicleCJInfo " },
            { code: "003300200092", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpDateVehicleServiceInfo " },
            { code: "003300200093", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/UpDateVehicleTerminalInstallInfo " },

            //车辆监控
            { code: "003300200094", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleInfoYeHu " },
            { code: "003300300066", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleInfoByYeHu " },
            { code: "003300300067", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/AddVehicleMonitoring " },
            { code: "003300300068", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/DelVehicleMonitoring " },
            { code: "003300200098", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleInfoCheDui " },
          //   { code: "0033002000130", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/CheLiangXinXi/GetVehicleYiFenPeiJianKong " },

            //平台接入
            { code: "003300300115", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiJieRuXinXi/GetPingTaiJieRuXinXiList" },
            { code: "003300300116", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiJieRuXinXi/AddPingTaiJieRuXinXi" },
            { code: "003300300117", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiJieRuXinXi/UpdatePingTaiJieRuXinXi" },
            { code: "003300300118", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiJieRuXinXi/DeletePingTaiJieRuXinXi" },
            { code: "003300300119", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiJieRuXinXi/GetPingTaiJieRuXinXi" },
            { code: "003300300120", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiJieRuXinXi/CheckPingTaiJieRuXinXi" },
            { code: "003300300124", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/PingTaiJieRuXinXi/QuerySubOrg" },

            //SIM卡
            { code: "003300300131", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/GetSIMKaHaoXinXiList" },
            { code: "003300300132", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/AddSIMKaHaoXinXi" },
            { code: "003300300133", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/UpdateSIMKaHaoXinXi" },
            { code: "003300300134", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/DeleteSIMKaHaoXinXi" },
            { code: "003300300135", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/GetSIMKaHaoXinXi" },
            { code: "003300300136", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/UnboundSIM" },
            { code: "003300300137", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/ImportSIM" },
            { code: "003300300138", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/ExportSIM" },
            { code: "003300300142", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/CheckSIM" },
            { code: "003300300143", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/CheckZhongDuan" },
            { code: "003300300145", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/SIMKaHaoXinXi/GetZhongDuanChePaiHao" },

            { code: "003300300111", ver: '1.0', url: "http://localhost:1420/api/GPSDAGL/QiYeXinXi/CheckPower" },



            { code: "00000080000", ver: '1.0', url: "http://10.0.64.249:7007/api/ServiceGateway/UploadFile" },//上传文件
            { code: "00000080003", ver: '1.0', url: "http://10.0.64.249:7009/api/FileModuleApi/DeleteFile" },//删除文件
            { code: "00000080004", ver: '1.0', url: "http://10.0.64.249:7007/api/ServiceGateway/GetFile" },//查看文件
            { code: "00000080005", ver: '1.0', url: "http://10.0.64.249:7007/api/ServiceGateway/DownloadFile" }

        ]
    });