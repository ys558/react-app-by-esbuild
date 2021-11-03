import browserSync from "browser-sync";
import chalk from "chalk";
import commandLineArgs from "command-line-args";
import del from "del";
import esbuild from "esbuild";
import getPort from "get-port";
import svgrPlugin from "esbuild-plugin-svgr";
// 创建服务器。
const bs = browserSync.create();
// 解构环境变量
const { dev } = commandLineArgs({ name: "dev", type: Boolean });
// 删除文件夹 public-dev 中的打包文件夹
del.sync("./public-dev/dist");

// 开始 esbuild 打包
(async () => {
  const buildResult = await esbuild
    .build({
      format: "esm", // 设置生成的 JavaScript 文件的输出格式。
      target: "es2017", // 编译转化版本
      entryPoints: ["./src/index.jsx"], // 打包入口
      outdir: "./public-dev/dist", // 输出目录
      chunkNames: "chunks/[name].[hash]", // 打包出来的文件名
      incremental: dev, // 因为我们监听文件的改变重新打包，而且我们要开发环境使用esbuild 所以 dev 为 true
      loader: {
        // 此选项更改给定输入文件的解释方式。
        ".svg": "text",
        ".png": "dataurl",
      },
      bundle: true, // 捆绑文件意味着将任何导入的依赖项内联到文件本身中。
      splitting: true, // 代码拆分目前仅适用于esm输出格式。
      plugins: [svgrPlugin()],
      inject: ["./public-dev/react-shim.js"], // 将 React 作为全局变量导入esbuild
    })
    .catch((err) => {
      console.error(chalk.red(err));
      process.exit(1);
    });
  console.log(chalk.green("The build has finished! 📦\n"));
  // 获取可以使用的端口号
  const port = await getPort({
    port: getPort.makeRange(4000, 4999),
  });

  console.log(
    chalk.cyan(
      `Launching the Shoelace dev server at http://localhost:${port}! 🥾\n`
    )
  );
  // 服务器初始化
  bs.init({
    startPath: "/", // 初始路径
    port, // 端口号
    logLevel: "silent", // 日志级别
    logFileChanges: true, // 日志文件更改
    notify: true, // 浏览器中的小弹出通知
    single: true, // 提供单独的 index.html
    server: {
      baseDir: "public-dev", // 基础文件夹
      index: "index.html", // 设置服务器的入口文件
    },
    files: "src/", // 监听 src 下的文件
  });

  // 监听 src 文件夹下的更改
  bs.watch(["src/"]).on("change", async (filename) => {
    console.log(`Source file changed - ${filename}`);
    // 重新打包
    buildResult.rebuild();
  });
})();

