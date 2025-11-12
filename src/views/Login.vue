<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h1>CMS 管理系统</h1>
        <p>欢迎登录</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div class="login-footer">
        <p class="demo-info">演示账号：</p>
        <p>用户名: admin / 密码: admin123</p>
        <p>用户名: user / 密码: user123</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { login } from '../api/auth'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    
    const formData = ref({
      username: '',
      password: ''
    })
    
    const loading = ref(false)
    const errorMessage = ref('')

    const handleLogin = async () => {
      errorMessage.value = ''
      loading.value = true

      try {
        // 模拟登录 - 在实际项目中，这里应该调用真实的API
        // const response = await login(formData.value.username, formData.value.password)
        
        // 模拟登录逻辑
        const mockLogin = () => {
          const users = {
            'admin': { password: 'admin123', role: 'admin', name: '管理员' },
            'user': { password: 'user123', role: 'user', name: '普通用户' }
          }

          const user = users[formData.value.username]
          if (user && user.password === formData.value.password) {
            return {
              success: true,
              token: 'mock-jwt-token-' + Date.now(),
              userInfo: {
                username: formData.value.username,
                name: user.name,
                role: user.role
              }
            }
          }
          throw new Error('用户名或密码错误')
        }

        const response = mockLogin()

        if (response.success) {
          userStore.setToken(response.token)
          userStore.setUserInfo(response.userInfo)
          
          // 登录成功后跳转到首页
          router.push('/')
        }
      } catch (error) {
        errorMessage.value = error.message || '登录失败，请检查用户名和密码'
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      loading,
      errorMessage,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 8px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 13px;
}

.demo-info {
  font-weight: 600;
  margin-bottom: 8px;
  color: #667eea;
}

.login-footer p {
  margin: 4px 0;
}
</style>
