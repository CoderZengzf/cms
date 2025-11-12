<template>
  <div class="home-container">
    <header class="header">
      <div class="header-content">
        <h1>CMS 管理系统</h1>
        <div class="user-info">
          <span>欢迎，{{ userStore.userInfo.name || userStore.userInfo.username }}</span>
          <button @click="handleLogout" class="logout-button">退出登录</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="welcome-card">
        <h2>欢迎使用 CMS 管理系统</h2>
        <p>您已成功登录系统</p>
        
        <div class="user-details">
          <div class="detail-item">
            <span class="label">用户名：</span>
            <span class="value">{{ userStore.userInfo.username }}</span>
          </div>
          <div class="detail-item">
            <span class="label">角色：</span>
            <span class="value">{{ userStore.userInfo.role === 'admin' ? '管理员' : '普通用户' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">登录状态：</span>
            <span class="value status-active">已登录</span>
          </div>
        </div>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="icon">📝</div>
          <h3>内容管理</h3>
          <p>管理网站内容和文章</p>
        </div>
        <div class="feature-card">
          <div class="icon">👥</div>
          <h3>用户管理</h3>
          <p>管理系统用户和权限</p>
        </div>
        <div class="feature-card">
          <div class="icon">⚙️</div>
          <h3>系统设置</h3>
          <p>配置系统参数和选项</p>
        </div>
        <div class="feature-card">
          <div class="icon">📊</div>
          <h3>数据统计</h3>
          <p>查看系统数据和报表</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const handleLogout = () => {
      userStore.logout()
      router.push('/login')
    }

    return {
      userStore,
      handleLogout
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.header h1 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info span {
  color: #666;
  font-size: 14px;
}

.logout-button {
  padding: 8px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.logout-button:hover {
  background: #5568d3;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.welcome-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.welcome-card h2 {
  color: #333;
  font-size: 28px;
  margin-bottom: 10px;
}

.welcome-card > p {
  color: #666;
  font-size: 16px;
  margin-bottom: 30px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  font-size: 15px;
}

.detail-item .label {
  color: #666;
  min-width: 100px;
  font-weight: 500;
}

.detail-item .value {
  color: #333;
}

.status-active {
  color: #52c41a;
  font-weight: 600;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.feature-card .icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.feature-card h3 {
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
}

.feature-card p {
  color: #666;
  font-size: 14px;
}
</style>
