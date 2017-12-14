import request from '../utils/request';
import testRequest from '../utils/testrequest';

export function login(argu) {

    let { username, password, isCompany } = argu;

    return new Promise(function (resolve) {

        let res = {
            BaseResponse: {
                "Code": 1,
                "Message": "查询成功"
            },
            content: {
                "user_id": "sagaadmin",      		//员工id
                "user_name": "sagaadmin",	      	//姓名
                "user_level": "saas",               //系统编码，用于图片服务，
                "user_sex": "saas",                 //秘钥，用于图片服务，
                "phone": "13366659254",              // 手机号
                "rule": [1, 2, 3, 4],                          //权限
            }
        }

        setTimeout(() => {

            resolve(res);
        }, 1000);
    })
}
