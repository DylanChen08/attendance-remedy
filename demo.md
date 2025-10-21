# 考勤查询系统演示

## 🎉 项目已成功创建！

### 技术栈
- ✅ Vue 3.5.22 (最新版本)
- ✅ Vite 5.4.20 (最新版本)
- ✅ TypeScript 5.9.3 (最新版本)
- ✅ TSX 支持 (Vue3中的JSX语法)
- ✅ Element Plus 2.11.5 (最新版本)
- ✅ pnpm 包管理器

### 项目结构
```
attendance-remedy/
├── src/
│   ├── api/              # API接口层
│   │   └── index.ts      # 考勤查询和发送API
│   ├── components/        # 组件
│   │   ├── AttendanceQuery.vue    # Vue SFC组件
│   │   └── AttendanceQuery.tsx    # TSX组件示例
│   ├── types/            # TypeScript类型定义
│   │   └── index.ts      # 接口和数据类型
│   ├── utils/            # 工具函数
│   │   └── index.ts      # 数据处理和转换
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── package.json          # 项目配置
├── vite.config.ts        # Vite配置
├── tsconfig.json         # TypeScript配置
└── README.md             # 项目文档
```

### 功能特性

#### 🔐 用户界面
- Token输入框（密码类型）
- 姓名输入框
- 时间范围选择器（默认当天）
- 查询按钮

#### 📊 数据查询
- 调用 `queryIdentifyRecordByPersonPerm` API
- 自动添加 `satoken` 请求头
- 支持时间范围查询
- 实时显示查询结果

#### 🔄 数据处理
- 自动修改ID后三位数字
- 处理 `keepImage` 字段（提取biometric路径）
- 数据格式转换
- 控制台输出所有请求和响应

#### 📤 数据发送
- 调用 `demo/kafka` API
- 发送处理后的数据
- 确认对话框
- 发送状态反馈

### 使用方法

1. **启动开发服务器**
   ```bash
   pnpm dev
   ```

2. **访问应用**
   打开浏览器访问: http://localhost:3000

3. **使用系统**
   - 输入有效的Token
   - 输入要查询的人员姓名
   - 选择查询时间范围（可选，默认为当天）
   - 点击"查询考勤记录"
   - 查看查询结果
   - 点击"发送"按钮发送处理后的数据

### 开发说明

#### Vue SFC vs TSX
项目同时支持两种组件写法：

**Vue SFC (推荐)**
```vue
<template>
  <div>{{ message }}</div>
</template>
<script setup lang="ts">
const message = 'Hello Vue!'
</script>
```

**TSX (高级用法)**
```tsx
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => <div>Hello TSX!</div>
  }
})
```

#### API集成
- 使用 Axios 进行HTTP请求
- 自动添加认证头
- 完整的错误处理
- 请求/响应日志

#### 数据处理
- 类型安全的TypeScript接口
- 自动数据转换
- 字段映射和修改
- 图片路径处理

### 构建和部署

```bash
# 开发模式
pnpm dev

# 类型检查
pnpm type-check

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 项目亮点

1. **现代化技术栈**: 使用最新的Vue3、Vite、TypeScript
2. **TSX支持**: 在Vue3中完美支持JSX/TSX语法
3. **类型安全**: 完整的TypeScript类型定义
4. **组件化**: 模块化的组件设计
5. **用户体验**: 现代化的UI和交互
6. **开发体验**: 热重载、类型检查、自动导入

项目已完全按照需求文档实现，支持所有指定的功能！
