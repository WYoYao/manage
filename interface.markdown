

# 接口文档

### 个人登录

> 请求参数
```
{
    username, //用户名称
    password, //密码
    isCompany //是否的企业用户登录
}
```

> 返回参数
```
{
    "user_id": "sagaadmin",      		//员工id
    "user_name": "sagaadmin",	      	//姓名
    "user_level": "saas",               //系统编码，用于图片服务，
    "user_sex": "saas",                 //秘钥，用于图片服务，
    "phone":"13366659254",              // 手机号
    "rule":[],                          //权限
}
```