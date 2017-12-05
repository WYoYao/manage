
本文会一步步引导大家如何创建一个 CURD 应用，包含查询、编辑、删除、创建，以及分页处理，数据 mock，自动处理 loading 状态等，基于 react, [dva](https://github.com/dvajs/dva) 和 [antd](https://github.com/ant-design/ant-design) 。

最终效果：

[![](https://camo.githubusercontent.com/c2b2094ff4180d1afd132aefa0e0c1188c904697/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f6141534a624464426b686d7478786462744c43652e676966)](https://camo.githubusercontent.com/c2b2094ff4180d1afd132aefa0e0c1188c904697/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f6141534a624464426b686d7478786462744c43652e676966)

## 开始之前：

*   确保 node 版本是 6.5 +
*   用 [cnpm](https://github.com/cnpm/cnpm) 或 [yarn](https://github.com/yarnpkg/yarn) 能节约你安装依赖的时间

## Step 1. 安装 [dva-cli](https://github.com/dvajs/dva-cli) 并创建应用

先安装 dva-cli，并确保版本是 0.7.x。

<div class="highlight highlight-source-shell"><pre>$ npm i dva-cli@0.7 -g
$ dva -v
0.7.0</pre></div>

然后创建应用：

<div class="highlight highlight-source-shell"><pre>$ dva new user-dashboard
$ <span class="pl-c1">cd</span> user-dashboard </pre></div>

## Step 2. 配置 [antd](https://github.com/ant-design/ant-design) 和 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

babel-plugin-import 用于按需引入 antd 的 JavaScript 和 CSS，这样打包出来的文件不至于太大。

<div class="highlight highlight-source-shell"><pre>$ npm i antd --save
$ npm i babel-plugin-import --save-dev</pre></div>

修改 `.roadhogrc`，在 `"extraBabelPlugins"` 里加上：

<div class="highlight highlight-source-json"><pre>[<span class="pl-s"><span class="pl-pds">"</span>import<span class="pl-pds">"</span></span>, { <span class="pl-s"><span class="pl-pds">"</span>libraryName<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>antd<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>style<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>css<span class="pl-pds">"</span></span> }]</pre></div>

## Step 3. 配置代理，能通过 RESTFul 的方式访问 [http://localhost:8000/api/users](http://localhost:8000/api/users)

修改 `.roadhogrc`，加上 `"proxy"` 配置：

<div class="highlight highlight-source-json"><pre><span class="pl-s"><span class="pl-pds">"</span>proxy<span class="pl-pds">"</span></span>: {
  <span class="pl-s"><span class="pl-pds">"</span>/api<span class="pl-pds">"</span></span>: {
    <span class="pl-s"><span class="pl-pds">"</span>target<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>http://jsonplaceholder.typicode.com/<span class="pl-pds">"</span></span>,
    <span class="pl-s"><span class="pl-pds">"</span>changeOrigin<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
    <span class="pl-s"><span class="pl-pds">"</span>pathRewrite<span class="pl-pds">"</span></span>: { <span class="pl-s"><span class="pl-pds">"</span>^/api<span class="pl-pds">"</span></span> : <span class="pl-s"><span class="pl-pds">"</span><span class="pl-pds">"</span></span> }
  }
},</pre></div>

然后启动应用：(这个命令一直开着，后面不需要重启)

<div class="highlight highlight-source-shell"><pre>$ npm start</pre></div>

浏览器会自动开启，并打开 [http://localhost:8000](http://localhost:8000) 。

访问 [http://localhost:8000/api/users](http://localhost:8000/api/users) ，就能访问到 [http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users) 的数据。(由于 typicode.com 服务的稳定性，偶尔可能会失败。不过没关系，正好便于我们之后对于出错的处理)

[![](https://camo.githubusercontent.com/14d5adf56ada88fbeb510a29d114f0616fb08527/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f6f4641504a6b78634959655a466a59415475554c2e706e67)](https://camo.githubusercontent.com/14d5adf56ada88fbeb510a29d114f0616fb08527/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f6f4641504a6b78634959655a466a59415475554c2e706e67)

## Step 4. 生成 users 路由

用 dva-cli 生成路由：

<div class="highlight highlight-source-shell"><pre>$ dva g route users</pre></div>

然后访问 [http://localhost:8000/#/users](http://localhost:8000/#/users) 。

## Step 5. 构造 users model 和 service

用 dva-cli 生成 Model ：

<div class="highlight highlight-source-shell"><pre>$ dva g model users</pre></div>

修改 `src/models/users.js` ：

<div class="highlight highlight-source-js"><pre><span class="pl-k">import</span> <span class="pl-c1">*</span> <span class="pl-k">as</span> <span class="pl-smi">usersService</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>../services/users<span class="pl-pds">'</span></span>;

<span class="pl-k">export</span> <span class="pl-c1">default</span> {
  namespace<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>users<span class="pl-pds">'</span></span>,
  state<span class="pl-k">:</span> {
    list<span class="pl-k">:</span> [],
    total<span class="pl-k">:</span> <span class="pl-c1">null</span>,
  },
  reducers<span class="pl-k">:</span> {
    <span class="pl-en">save</span>(<span class="pl-smi">state</span>, { payload<span class="pl-k">:</span> { data<span class="pl-k">:</span> list, total } }) {
      <span class="pl-k">return</span> { <span class="pl-k">...</span>state, list, total };
    },
  },
  effects<span class="pl-k">:</span> {
    <span class="pl-k">*</span><span class="pl-en">fetch</span>({ payload<span class="pl-k">:</span> { page } }, { call, put }) {
      <span class="pl-k">const</span> { <span class="pl-c1">data</span>, <span class="pl-c1">headers</span> } <span class="pl-k">=</span> <span class="pl-k">yield</span> <span class="pl-en">call</span>(<span class="pl-smi">usersService</span>.<span class="pl-smi">fetch</span>, { page });
      <span class="pl-k">yield</span> <span class="pl-en">put</span>({ type<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>save<span class="pl-pds">'</span></span>, payload<span class="pl-k">:</span> { data, total<span class="pl-k">:</span> headers[<span class="pl-s"><span class="pl-pds">'</span>x-total-count<span class="pl-pds">'</span></span>] } });
    },
  },
  subscriptions<span class="pl-k">:</span> {
    <span class="pl-en">setup</span>({ dispatch, history }) {
      <span class="pl-k">return</span> <span class="pl-smi">history</span>.<span class="pl-en">listen</span>(({ pathname, query }) <span class="pl-k">=&gt;</span> {
        <span class="pl-k">if</span> (pathname <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">'</span>/users<span class="pl-pds">'</span></span>) {
          <span class="pl-en">dispatch</span>({ type<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>fetch<span class="pl-pds">'</span></span>, payload<span class="pl-k">:</span> query });
        }
      });
    },
  },
};</pre></div>

新增 `src/services/users.js`：

<div class="highlight highlight-source-js"><pre><span class="pl-k">import</span> <span class="pl-smi">request</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>../utils/request<span class="pl-pds">'</span></span>;

<span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">fetch</span>({ page <span class="pl-k">=</span> <span class="pl-c1">1</span> }) {
  <span class="pl-k">return</span> <span class="pl-en">request</span>(<span class="pl-s"><span class="pl-pds">`</span>/api/users?_page=<span class="pl-s1"><span class="pl-pse">${</span>page<span class="pl-pse">}</span></span>&amp;_limit=5<span class="pl-pds">`</span></span>);
}</pre></div>

由于我们需要从 response headers 中获取 total users 数量，所以需要改造下 `src/utils/request.js`：

<div class="highlight highlight-source-js"><pre><span class="pl-k">import</span> <span class="pl-smi">fetch</span> <span class="pl-k">from</span> <span class="pl-s"><span class="pl-pds">'</span>dva/fetch<span class="pl-pds">'</span></span>;

<span class="pl-k">function</span> <span class="pl-en">checkStatus</span>(<span class="pl-smi">response</span>) {
  <span class="pl-k">if</span> (<span class="pl-smi">response</span>.<span class="pl-c1">status</span> <span class="pl-k">&gt;=</span> <span class="pl-c1">200</span> <span class="pl-k">&amp;&amp;</span> <span class="pl-smi">response</span>.<span class="pl-c1">status</span> <span class="pl-k">&lt;</span> <span class="pl-c1">300</span>) {
    <span class="pl-k">return</span> response;
  }

  <span class="pl-k">const</span> <span class="pl-c1">error</span> <span class="pl-k">=</span> <span class="pl-k">new</span> <span class="pl-en">Error</span>(<span class="pl-smi">response</span>.<span class="pl-c1">statusText</span>);
  <span class="pl-smi">error</span>.<span class="pl-smi">response</span> <span class="pl-k">=</span> response;
  <span class="pl-k">throw</span> error;
}

<span class="pl-c"><span class="pl-c">/**</span></span>
<span class="pl-c"> * Requests a URL, returning a promise.</span>
<span class="pl-c"> *</span>
<span class="pl-c"> * <span class="pl-k">@param</span>  <span class="pl-en">{string}</span> <span class="pl-smi">url</span>       The URL we want to request</span>
<span class="pl-c"> * <span class="pl-k">@param</span>  <span class="pl-en">{object}</span> <span class="pl-smi">[options]</span> The options we want to pass to "fetch"</span>
<span class="pl-c"> * <span class="pl-k">@return</span> <span class="pl-en">{object}</span>           An object containing either "data" or "err"</span>
<span class="pl-c"> <span class="pl-c">*/</span></span>
<span class="pl-k">export</span> <span class="pl-c1">default</span> <span class="pl-smi">async</span> <span class="pl-k">function</span> <span class="pl-en">request</span>(<span class="pl-smi">url</span>, <span class="pl-smi">options</span>) {
  <span class="pl-k">const</span> <span class="pl-c1">response</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-en">fetch</span>(url, options);

  <span class="pl-en">checkStatus</span>(response);

  <span class="pl-k">const</span> <span class="pl-c1">data</span> <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-smi">response</span>.<span class="pl-en">json</span>();

  <span class="pl-k">const</span> <span class="pl-c1">ret</span> <span class="pl-k">=</span> {
    data,
    headers<span class="pl-k">:</span> {},
  };

  <span class="pl-k">if</span> (<span class="pl-smi">response</span>.<span class="pl-c1">headers</span>.<span class="pl-c1">get</span>(<span class="pl-s"><span class="pl-pds">'</span>x-total-count<span class="pl-pds">'</span></span>)) {
    <span class="pl-smi">ret</span>.<span class="pl-c1">headers</span>[<span class="pl-s"><span class="pl-pds">'</span>x-total-count<span class="pl-pds">'</span></span>] <span class="pl-k">=</span> <span class="pl-smi">response</span>.<span class="pl-c1">headers</span>.<span class="pl-c1">get</span>(<span class="pl-s"><span class="pl-pds">'</span>x-total-count<span class="pl-pds">'</span></span>);
  }

  <span class="pl-k">return</span> ret;
}</pre></div>

切换到浏览器（会自动刷新），应该没任何变化，因为数据虽然好了，但并没有视图与之关联。但是打开 Redux 开发者工具，应该可以看到 `users/fetch` 和 `users/save` 的 action 以及相关的 state 。

[![](https://camo.githubusercontent.com/addc2482d3667d3ff6d79c0c26e5b278639a8263/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f44744e6f586a5141644d534a717a4f53455a416f2e706e67)](https://camo.githubusercontent.com/addc2482d3667d3ff6d79c0c26e5b278639a8263/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f44744e6f586a5141644d534a717a4f53455a416f2e706e67)

## Step 6. 添加界面，让用户列表展现出来

用 dva-cli 生成 component：

<div class="highlight highlight-source-shell"><pre>$ dva g component Users/Users</pre></div>

然后修改生成出来的 `src/components/Users/Users.js` 和 `src/components/Users/Users.css`，并在 `src/routes/Users.js` 中引用他。具体参考这个 [Commit](https://github.com/dvajs/dva-example-user-dashboard/commit/85a7b5ac61197227e9c9e92a851f227ce2902a22)。

需留意两件事：

1.  对 model 进行了微调，加入了 page 表示当前页
2.  由于 components 和 services 中都用到了 pageSize，所以提取到 `src/constants.js`

改完后，切换到浏览器，应该能看到带分页的用户列表。

[![](https://camo.githubusercontent.com/2f75960f18fed0f5b5b705e323df8e380138b3b1/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f6763456c70527054446b7055456d72585247486e2e706e67)](https://camo.githubusercontent.com/2f75960f18fed0f5b5b705e323df8e380138b3b1/68747470733a2f2f7a6f732e616c697061796f626a656374732e636f6d2f726d73706f7274616c2f6763456c70527054446b7055456d72585247486e2e706e67)

## Step 7. 添加 layout

添加 layout 布局，使得我们可以在首页和用户列表页之间来回切换。

1.  添加布局，`src/components/MainLayout/MainLayout.js` 和 CSS 文件
2.  在 `src/routes` 文件夹下的文件中引用这个布局

参考这个 [Commit](https://github.com/dvajs/dva-example-user-dashboard/commit/94788e5167f9b2dd7b1ecdc70bb8e7bc91a9fb62)。

注意：

1.  页头的菜单会随着页面切换变化，高亮显示当前页所在的菜单项

## Step 8. 通过 [dva-loading](https://github.com/dvajs/dva-loading) 处理 loading 状态

dva 有一个管理 effects 执行的 hook，并基于此封装了 dva-loading 插件。通过这个插件，我们可以不必一遍遍地写 showLoading 和 hideLoading，当发起请求时，插件会自动设置数据里的 loading 状态为 true 或 false 。然后我们在渲染 components 时绑定并根据这个数据进行渲染。

先安装 dva-loading ：

<div class="highlight highlight-source-shell"><pre>$ npm i dva-loading --save</pre></div>

修改 `src/index.js` 加载插件，在合适的地方加入下面两句：

<div class="highlight highlight-source-diff"><pre><span class="pl-mi1"><span class="pl-mi1">+</span> import createLoading from 'dva-loading';</span>
<span class="pl-mi1"><span class="pl-mi1">+</span> app.use(createLoading());</span></pre></div>

然后在 `src/components/Users/Users.js` 里绑定 loading 数据：

<div class="highlight highlight-source-diff"><pre><span class="pl-mi1"><span class="pl-mi1">+</span> loading: state.loading.models.users,</span></pre></div>

具体参考这个 [Commit](https://github.com/dvajs/dva-example-user-dashboard/commit/e256165312e5fe0e63c29cc1cba96909b66b5092) 。

切换到浏览器，你的用户列表有 loading 了没?

## Step 9. 处理分页

只改一个文件 `src/components/Users/Users.js` 就好。

处理分页有两个思路：

1.  发 action，请求新的分页数据，保存到 model，然后自动更新页面
2.  切换路由 (由于之前监听了路由变化，所以后续的事情会自动处理)

我们用的是思路 2 的方式，好处是用户可以直接访问到 page 2 或其他页面。

参考这个 [Commit](https://github.com/dvajs/dva-example-user-dashboard/commit/b6203eae7000225ae1d0954841c93aeec66df1d5) 。

## Step 10. 处理用户删除

经过前面的 9 步，应用的整体脉络已经清晰，相信大家已经对整体流程也有了一定了解。

后面的功能调整基本都可以按照以下三步进行：

1.  service
2.  model
3.  component

我们现在开始增加用户删除功能。

1.  service, 修改 `src/services/users.js`：
<div class="highlight highlight-source-js"><pre><span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">remove</span>(<span class="pl-smi">id</span>) {
  <span class="pl-k">return</span> <span class="pl-en">request</span>(<span class="pl-s"><span class="pl-pds">`</span>/api/users/<span class="pl-s1"><span class="pl-pse">${</span>id<span class="pl-pse">}</span></span><span class="pl-pds">`</span></span>, {
    method<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>DELETE<span class="pl-pds">'</span></span>,
  });
}</pre></div>

1.  model, 修改 `src/models/users.js`：
<div class="highlight highlight-source-js"><pre><span class="pl-k">*</span><span class="pl-en">remove</span>({ payload<span class="pl-k">:</span> id }, { call, put, select }) {
  <span class="pl-k">yield</span> <span class="pl-en">call</span>(<span class="pl-smi">usersService</span>.<span class="pl-smi">remove</span>, id);
  <span class="pl-k">const</span> <span class="pl-c1">page</span> <span class="pl-k">=</span> <span class="pl-k">yield</span> <span class="pl-en">select</span>(<span class="pl-smi">state</span> <span class="pl-k">=&gt;</span> <span class="pl-smi">state</span>.<span class="pl-smi">users</span>.<span class="pl-smi">page</span>);
  <span class="pl-k">yield</span> <span class="pl-en">put</span>({ type<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>fetch<span class="pl-pds">'</span></span>, payload<span class="pl-k">:</span> { page } });
},</pre></div>

1.  component, 修改 `src/components/Users/Users.js`，替换 `deleteHandler` 内容：
<div class="highlight highlight-source-js"><pre><span class="pl-en">dispatch</span>({
  type<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>users/remove<span class="pl-pds">'</span></span>,
  payload<span class="pl-k">:</span> id,
});</pre></div>

切换到浏览器，删除功能应该已经生效。

## Step 11. 处理用户编辑

处理用户编辑和前面的一样，遵循三步走：

1.  service
2.  model
3.  component

先是 service，修改 `src/services/users.js`：

<div class="highlight highlight-source-js"><pre><span class="pl-k">export</span> <span class="pl-k">function</span> <span class="pl-en">patch</span>(<span class="pl-smi">id</span>, <span class="pl-smi">values</span>) {
  <span class="pl-k">return</span> <span class="pl-en">request</span>(<span class="pl-s"><span class="pl-pds">`</span>/api/users/<span class="pl-s1"><span class="pl-pse">${</span>id<span class="pl-pse">}</span></span><span class="pl-pds">`</span></span>, {
    method<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>PATCH<span class="pl-pds">'</span></span>,
    body<span class="pl-k">:</span> <span class="pl-c1">JSON</span>.<span class="pl-c1">stringify</span>(values),
  });
}</pre></div>

再是 model，修改 `src/models/users.js`：

<div class="highlight highlight-source-js"><pre><span class="pl-k">*</span><span class="pl-en">patch</span>({ payload<span class="pl-k">:</span> { id, values } }, { call, put, select }) {
  <span class="pl-k">yield</span> <span class="pl-en">call</span>(<span class="pl-smi">usersService</span>.<span class="pl-smi">patch</span>, id, values);
  <span class="pl-k">const</span> <span class="pl-c1">page</span> <span class="pl-k">=</span> <span class="pl-k">yield</span> <span class="pl-en">select</span>(<span class="pl-smi">state</span> <span class="pl-k">=&gt;</span> <span class="pl-smi">state</span>.<span class="pl-smi">users</span>.<span class="pl-smi">page</span>);
  <span class="pl-k">yield</span> <span class="pl-en">put</span>({ type<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>fetch<span class="pl-pds">'</span></span>, payload<span class="pl-k">:</span> { page } });
},</pre></div>

最后是 component，详见 [Commit](https://github.com/dvajs/dva-example-user-dashboard/commit/ed7a4ee584eca368c1250cd0ff6d0daee22de124)。

需要注意的一点是，我们在这里如何处理 Modal 的 visible 状态，有几种选择：

1.  存 dva 的 model state 里
2.  存 component state 里

另外，怎么存也是个问题，可以：

1.  只有一个 visible，然后根据用户点选的 user 填不同的表单数据
2.  几个 user 几个 visible

此教程选的方案是 2-2，即存 component state，并且 visible 按 user 存。另外为了使用的简便，封装了一个 `UserModal` 的组件。

完成后，切换到浏览器，应该就能对用户进行编辑了。

## Step 12. 处理用户创建

相比用户编辑，用户创建更简单些，因为可以共用 `UserModal` 组件。和 Step 11 比较类似，就不累述了，详见 [Commit](https://github.com/dvajs/dva-example-user-dashboard/commit/72cd7366076c025473ff4acd99815fd9b585619e) 。

* * *

到这里，我们已经完成了一个完整的 CURD 应用。但仅仅是完成，并不完善，比如：

*   如何处理错误，比如请求等
*   如何处理请求超时
*   如何根据路由动态加载 JS 和 CSS
*   ...

请期待下一篇。

(完)

