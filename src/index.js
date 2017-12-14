import { message } from 'antd'
import dva from 'dva';
// 页面跳转加载   （外部NPM 需要下载）
import createLoading from 'dva-loading'
import { hashHistory } from 'dva/router';
import './index.css';

// 1. Initialize
const app = dva({
    //dva 有一个管理 effects 执行的 hook，并基于此封装了 dva-loading 插件。
    ...createLoading({
        effects: true,
    }),
    history: hashHistory,
    // 监听报错事件
    onError(error) {
        message.error(error.message)
    },
})

app.model(require("./models/user"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
