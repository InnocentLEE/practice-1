package com.lyq.project.util;

import com.lyq.project.dao.UnitMapper;
import com.lyq.project.dto.CreateShengJiJianGuanBuMenDto;
import com.lyq.project.pojo.Contacts;
import com.lyq.project.pojo.Unit;
import com.lyq.project.service.Impl.QServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

public class App {
    public static void main(String[] args) {

        // 创建平台运营商
        /*
        String unitId = CommonUtils.getUUID();
        String contactId = CommonUtils.getUUID();
        String sql1 = "INSERT INTO unit (id,OrgType,unit_name,contacts_id)VALUES ('"+unitId+"',0,'广东恒慧信息科技有限公司','"+contactId+"');";
        String sql2 = "INSERT INTO contacts (id,contact_name,cardNo,password)VALUES ('"+contactId+"','李映泉','440582199512130410','"+MD5Util.getMD5("111111")+"');";
        System.out.println(sql1);
        System.out.println(sql2);
        */
        // 购票
        // 要购买的班次
        String arrangeId = "D729C2F139AD4333858F3BF9D33A3487";
        // 要购买的人数，注意不要大于班次总票数
        // 购票途经,1是客运站购票，2是网站购票，3是app购票，4是小程序购票，5是公众号购票
        int peopleNum = 36;
        MakeData md = new MakeData();
        IdCardGenerator idCardGenerator = new IdCardGenerator();
        for (int i = 0; i < peopleNum; i++) {
            // booking表插入数据
            int way = md.getRondomNumber(5)+1;
            String sql = "INSERT INTO booking VALUES('"+CommonUtils.getUUID()+"','"+arrangeId+"',"+way+",'"+idCardGenerator.generate()+"','"+md.randomName()+"','"+md.randomTel()+"',0);";
            System.out.println(sql);
        }
        String updateSql = "UPDATE arrange SET leave_number = leave_number - "+peopleNum+" WHERE id = '"+arrangeId+"';";
        System.out.println(updateSql);


    }
}
