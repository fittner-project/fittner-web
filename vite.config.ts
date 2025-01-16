import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import type { ConfigEnv } from "vite";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const currentEnv = loadEnv(mode, process.cwd());

  console.log("Build Mode:", mode); // 빌드 시 mode 확인
  console.log("Command:", command); // command 확인

  const nodeEnv = mode === "production" ? "production" : "development";
  console.log("Node ENV will be:", nodeEnv); // 설정될 NODE_ENV 확인

  return defineConfig({
    define: {
      "process.env.NODE_ENV": JSON.stringify(nodeEnv),
    },
    plugins: [
      react(),
      AutoImport({
        imports: ["react", "react-router-dom"],
        dts: "./src/auto-imports.d.ts",
        dirs: ["src/store"],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        },
      }),
    ],
    //项目部署的基础路径,
    base: currentEnv.VITE_PUBLIC_PATH,
    mode: mode,
    resolve: {
      //别名
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    //服务
    server: {
      port: 3000, // 포트 3000으로 고정
      //자동으로 브라우저 열기
      open: true,
      //자동으로 사용 가능한 다음 포트 사용 여부
      strictPort: true,
      //자동 proxy 설정
      // proxy: {
      //   '/api': {
      //     target: 'http://xxxxxx.com',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/variables" as *;
            @use "@/styles/mixin" as *;
            @use "@/styles/color" as *;
          `,
        },
      },
    },
    //构建
    build: {
      outDir: mode === "docker" ? "dist" : "docs", //输出路径
      //构建后是否生成 source map 文件
      sourcemap: mode != "production",
      rollupOptions: {
        output: {
          manualChunks: {
            vc: ["vconsole"],
          },
        },
      },
      //打包去掉打印信息 保留debugger vite3需要单独安装terser才行
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: false,
      //   },
      // },
    },
  });
};
