import request from '../utils/request';
import _ from 'lodash';

export function getEquipmentClass() {

    return new Promise(resolve => {

        console.log(_);

        let res = {
            BaseResponse: {
                "Code": 1,
                "Message": "查询成功"
            },
            content: [
                {
                    count: _.random(1,100),
                    name: '全部设备',
                    _id: 1,
                },
                {
                    count:  _.random(1,100),
                    name: '当前维修中',
                    _id: 2,
                }, {
                    count:  _.random(1,100),
                    name: '当前维保中',
                    _id: 3,
                }, {
                    count: _.random(1,100),
                    name: '即将报废',
                    _id: 4,
                }
            ]
        }

        setTimeout(() => {
            resolve(res);
        }, 1000);

    })
}