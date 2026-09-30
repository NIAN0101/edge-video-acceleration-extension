# Video Speed Enhancer - Edge 浏览器扩展

一个轻量级的 Edge 浏览器视频速度控制扩展，支持多倍速、自定义倍速、快速开关等功能。

## 🚀 功能特性

- ✅ 支持预设倍速：1x / 1.5x / 2x / 2.5x / 3x / 4x
- ✅ 支持自定义倍速滑块（1x - 4x）
- ✅ 一键开启/关闭加速
- ✅ 自动应用到所有网页视频元素
- ✅ 自然播放节奏模拟（降低异常迹象）
- ✅ 设置自动保存

## 📦 项目结构

```
edge-video-acceleration-extension/
├── manifest.json          # 扩展配置文件
├── background.js          # 后台服务脚本
├── popup.html             # 弹窗界面
├── popup.js               # 弹窗逻辑
├── content.js             # 页面内容脚本
├── README.md              # 说明文档
├── package.json           # 打包脚本配置
└── build/                 # 构建输出目录
    ├── Video-Speed-Enhancer.zip
    └── Video-Speed-Enhancer.crx
```

## 🔧 安装方式

### 方式 1：加载已解压的扩展（开发/测试）

1. 克隆或下载本仓库
2. 打开 Edge 浏览器，输入地址：`edge://extensions`
3. 开启右上角"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目根目录

### 方式 2：安装打包后的扩展（生产）

1. 下载 `build/Video-Speed-Enhancer.zip` 或 `.crx` 文件
2. 解压 `.zip` 或直接拖入 Edge 浏览器
3. 或者在 `edge://extensions` 中点击"从文件加载扩展"

## 📝 使用说明

1. **快速倍速选择**：点击预设按钮（1x / 1.5x / 2x 等）直接切换
2. **自定义倍速**：使用滑块调节具体倍速值
3. **开启/关闭**：点击"关闭"按钮切换加速状态
4. **自动保存**：所有设置会自动保存到浏览器存储

## 🛠️ 打包脚本

项目已集成自动打包脚本，支持生成 `.zip` 和 `.crx` 格式。

### 环境要求

- Node.js 12+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 打包命令

```bash
# 生成 ZIP 包
npm run build:zip

# 生成 CRX 包（需要 .pem 密钥）
npm run build:crx

# 一键打包（ZIP + CRX）
npm run build:all

# 清理构建输出
npm run clean
```

## 🔐 生成 CRX 密钥

如果需要生成标准的 `.crx` 格式（带签名），需要私钥文件：

```bash
# 生成新的 .pem 密钥（仅需一次）
npm run generate:key

# 使用密钥打包 CRX
npm run build:crx
```

## 📂 文件说明

| 文件 | 说明 |
|------|------|
| `manifest.json` | 扩展配置、权限声明 |
| `background.js` | 后台消息处理、存储管理 |
| `popup.html` | 扩展弹窗界面 |
| `popup.js` | 弹窗交互逻辑 |
| `content.js` | 注入网页的视频控制脚本 |
| `package.json` | 项目配置和打包脚本 |

## ⚙️ 技术细节

### 工作原理

1. **content.js** 注入每个网页，自动扫描 `<video>` 元素
2. **popup.js** 提供用户交互界面
3. **background.js** 管理扩展数据和消息路由
4. 通过 `playbackRate` 属性控制视频播放速度
5. 采用自然播放节奏模拟，每次改变速率时采用渐进式调整

### 兼容性

- Edge 88+ （Chromium 内核）
- Chrome 88+
- 所有基于 Chromium 的浏览器

### 限制

- 仅对原生 `<video>` 标签有效
- 对嵌入式第三方播放器（iframe、Flash 等）可能无法控制
- 某些网站可能有自己的播放检测逻辑

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ⚠️ 免责声明

本扩展仅供学习和个人使用。使用前请了解并遵守所访问网站的服务条款。任何因不当使用而产生的后果由用户自行承担。
