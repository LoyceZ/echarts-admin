# echarts-admin

一个基于 Vue 3 + Vite 的数据可视化大屏示例，使用 ECharts（含 BMap 扩展）展示各类图表与地图可视化组件。

## 主要功能

- 大屏式布局与卡片式组件（统计卡、词云、地图等）
- 使用 ECharts 渲染折线/饼图/散点/词云
- 可配置的百度地图（BMap）底图与样式


## 环境要求

- Node.js >= 16（建议使用 LTS 版本）
- 推荐 Chromium 浏览器（Chrome / Edge）用于开发调试

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（热重载）
npm run dev

# 生产构建
npm run build
```

## 必要配置

- 地图 API：项目使用了百度/高德等地图扩展，请在 `src/components/MapComp/BMapScatter.vue` 中确认并替换 `key` 和 `mapStyleV2.styleId` 为你的地图服务 Key / 样式 ID。示例位置：

- 如果需要把 Key 放到环境变量，可在项目根目录添加 `.env` 或 `.env.local`：

```
VITE_BMAP_KEY=your_map_key_here
VITE_BMAP_STYLE_ID=your_style_id_here
```

并在代码中通过 `import.meta.env.VITE_BMAP_KEY` 等读取。

## 目录结构（简要）

- `src/` 源代码
  - `components/` 可复用组件（包含 `MapComp`、`TomComp` 等）
  - `api/` 请求与数据模拟
  - `main.js` 应用入口

## 常用脚本

- `npm run dev`：开发环境
- `npm run build`：生产构建
- `npm run preview`（如果配置）：本地预览构建产物

## 调试与常见问题

- 如果地图不显示或报错，请检查地图 Key、网络请求是否被阻止，及浏览器控制台错误信息。
- 若组件溢出布局，可检查父容器 CSS（如 `box-sizing`、`overflow`、`height`）或组件内的固定高度。

## 部署建议

- 生成的 `dist` 目录可部署到任意静态主机（Netlify、Vercel、GitHub Pages、Nginx 等）。



## 变更记录

- 使用 `CHANGELOG.md` 或在 Release 中记录重大变更（可选）。

---


