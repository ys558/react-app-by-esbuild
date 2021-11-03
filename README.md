webpack 用于大型项目中，特别是开发时候的热更新，速度太慢，原因是`webpack` 采用了整个项目所有文件一起打包的方案。

自从 `vite` 推出以来，打包这块做到了性能上的超越。`vite` 的原理是在SPA项目中，基于入口文件打包的，由于只打包一个文件，所以速度就上来了。

而无论是 `vite` 和 `webpack` 均是基于 `esbuild` 开发的。所以研究一下 `esbuild` 的配置是比较有价值的。

本项目是基于 `create-react-app` 创建项目，再用 `es-build` 作为开发热更新打包。

用 `create-react-app` 生成项目后，对原来的项目作了如下改动：

- 核心配置在 `devBuild.js` 文件

- 依赖安装：
  
  核心: `esbuild`,`esbuild-plugin-svgr`  
  用于创建服务渲染打包文件： `browser-sync`  
  解析命令行参数: `command-line-args`  
  打包文件删除：`del`
  获取当前可用端口：`get-port`
  美化：`chalk`

- `package.json` 的 `script` 增加了 `dev` 命令，为了跑 `devBuild.js` 文件

- `package.json` 增加了 `{"type": "module"}` 让 node 可以编译 esm 语法

- 将 `public/index.html` 文件增加如下：

  ```html
  ...
  <link rel="stylesheet" type="text/css" href="./dist/index.css" />
  ...
  <script type="module">
    import './dist/index.js'
  </script>
  ```

- 增加 `public/react-shim.js` 文件，并在 `devBuild.js`写入相应配置，在src中就不用到处引入React了：

  ```js
  import * as React from 'react'
  export { React }
  ```