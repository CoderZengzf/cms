# CMS 管理系统

基于 Vue3 + JavaScript 开发的内容管理系统，具有完整的用户登录和认证功能。

## 功能特性

- ✅ 用户登录认证
- ✅ 用户状态管理（Pinia）
- ✅ 路由守卫保护
- ✅ Token 持久化存储
- ✅ 现代化的 UI 设计
- ✅ 响应式布局

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router** - 官方路由管理器
- **Pinia** - Vue 状态管理库
- **Axios** - HTTP 客户端
- **Vite** - 下一代前端构建工具

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动

### 构建生产版本

```bash
npm run build
```

## 如何登录

### 方法一：使用演示账号

系统提供了两个演示账号供您测试：

**管理员账号：**
- 用户名：`admin`
- 密码：`admin123`

**普通用户账号：**
- 用户名：`user`
- 密码：`user123`

### 方法二：登录步骤

1. 启动开发服务器后，浏览器访问 `http://localhost:3000`
2. 系统会自动跳转到登录页面（如果未登录）
3. 在登录表单中输入用户名和密码
4. 点击"登录"按钮
5. 登录成功后会自动跳转到系统首页

### 登录说明

- **自动跳转**：未登录用户访问受保护页面会自动跳转到登录页
- **状态保持**：登录状态会保存在本地存储中，刷新页面不会丢失
- **安全退出**：点击右上角"退出登录"按钮可以安全退出系统

## 项目结构

```
/workspace/
├── src/
│   ├── api/              # API 接口
│   │   └── auth.js       # 认证相关接口
│   ├── stores/           # 状态管理
│   │   └── user.js       # 用户状态
│   ├── router/           # 路由配置
│   │   └── index.js      # 路由定义和守卫
│   ├── views/            # 页面组件
│   │   ├── Login.vue     # 登录页面
│   │   └── Home.vue      # 首页
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   └── style.css         # 全局样式
├── index.html            # HTML 模板
├── vite.config.js        # Vite 配置
├── package.json          # 项目配置
└── README.md             # 项目说明

```

## 配置说明

### 环境变量

复制 `.env.example` 为 `.env` 并配置：

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### 连接真实后端 API

当前系统使用模拟登录数据。要连接真实的后端 API：

1. 修改 `src/views/Login.vue` 中的 `handleLogin` 方法
2. 取消注释真实 API 调用：

```javascript
const response = await login(formData.value.username, formData.value.password)
```

3. 注释或删除模拟登录逻辑
4. 确保后端 API 返回以下格式的数据：

```json
{
  "success": true,
  "token": "your-jwt-token",
  "userInfo": {
    "username": "admin",
    "name": "管理员",
    "role": "admin"
  }
}
```

## 功能说明

### 认证流程

1. **登录**：用户输入凭据 → 验证 → 保存 Token 和用户信息
2. **路由守卫**：检查登录状态 → 允许/拒绝访问
3. **自动登录**：页面加载 → 检查本地 Token → 恢复登录状态
4. **退出登录**：清除本地数据 → 跳转到登录页

### 路由保护

- `/login` - 登录页面（已登录用户自动跳转首页）
- `/` - 首页（需要登录）

所有需要认证的页面都添加了 `meta: { requiresAuth: true }` 标记。

## 常见问题

### Q: 忘记密码怎么办？
A: 当前为演示系统，请使用提供的演示账号。实际项目中需要实现密码重置功能。

### Q: 为什么刷新后还保持登录状态？
A: 系统使用 localStorage 保存登录信息，确保刷新页面后状态不丢失。

### Q: 如何添加新用户？
A: 当前为前端演示，用户信息硬编码在 `Login.vue` 中。实际项目需要连接后端用户管理系统。

### Q: Token 过期怎么处理？
A: API 拦截器会捕获 401 错误，自动清除登录信息并跳转到登录页。

## 开发指南

### 添加新页面

1. 在 `src/views/` 创建新组件
2. 在 `src/router/index.js` 添加路由配置
3. 如需保护，添加 `meta: { requiresAuth: true }`

### 调用 API

```javascript
import api from '@/api/auth'

const fetchData = async () => {
  const data = await api.get('/your-endpoint')
  return data
}
```

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提交 Issue。
