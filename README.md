# 考勤查询系统

基于 Vue3 + Vite + TypeScript + TSX + Element Plus 的考勤查询系统。

## 技术栈

- **Vue 3.4.0** - 渐进式 JavaScript 框架
- **Vite 5.0.0** - 下一代前端构建工具
- **TypeScript 5.3.0** - JavaScript 的超集
- **TSX** - 在 Vue3 中使用 JSX/TSX 语法
- **Element Plus 2.4.0** - Vue 3 组件库
- **Axios** - HTTP 客户端
- **Day.js** - 轻量级日期处理库

## 功能特性

- 🔐 Token 认证
- 👤 按姓名查询考勤记录
- 📅 时间范围选择器
- 📊 考勤记录展示
- 🔄 数据处理和转换
- 📤 数据发送功能
- 🎨 现代化 UI 设计

## 项目结构

```
src/
├── api/           # API 接口
├── components/    # TSX 组件
│   ├── AttendanceQuery.tsx           # 主组件 (TSX)
│   └── AttendanceQuery.module.css    # 组件样式
├── types/         # TypeScript 类型定义
├── utils/         # 工具函数
├── App.vue        # 根组件
└── main.ts        # 入口文件
```

## 安装依赖

```bash
pnpm install
```

## 开发

```bash
pnpm dev
```

## 构建

```bash
pnpm build
```

## 预览

```bash
pnpm preview
```

## API 接口

### 查询考勤记录
- **地址**: `https://api.maxvisioncloud.com/bp-acs/record/queryIdentifyRecordByPersonPerm`
- **方法**: POST
- **认证**: satoken 头部

### 发送处理数据
- **地址**: `https://api.maxvisioncloud.com/bp-acs/demo/kafka`
- **方法**: POST
- **认证**: satoken 头部

## 数据处理规则

系统会自动处理考勤记录数据：

1. **ID 修改**: 随机修改 `id` 和 `identifyRecordId` 的后三位数字
2. **图片路径处理**: 提取 `keepImage` 中 `biometric` 开头、`.jpg` 结尾的部分
3. **数据转换**: 将原始数据转换为符合发送接口的格式

## 使用说明

1. 输入有效的 Token
2. 输入要查询的人员姓名
3. 选择查询时间范围（默认为当天）
4. 点击"查询考勤记录"按钮
5. 查看查询结果
6. 点击"发送"按钮发送处理后的数据

## 开发说明

项目使用 TSX 组件写法：
- **TSX**: 使用 `.tsx` 文件编写组件，支持完整的 TypeScript 类型检查
- **CSS Modules**: 使用 `.module.css` 文件管理组件样式
- **组件化**: 每个组件都有独立的样式文件

主组件位于 `src/components/AttendanceQuery.tsx`。
