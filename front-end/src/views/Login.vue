<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="credentials.email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input v-model="credentials.password" type="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Entrar</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
    <p>Não tem uma conta? <router-link to="/register" class="register-link">Registre-se aqui</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      credentials: {
        email: '', // Agora apenas o email é usado
        password: '',
      },
      message: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/usuarios/login', {
          email: this.credentials.email, // Enviar apenas o email
          senha: this.credentials.password,
        });

        // Armazenar o token JWT no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        this.message = 'Login realizado com sucesso!';

        // Redireciona para a página Home após login
        this.$router.push('/home');
      } catch (error) {
        this.message = 'Erro ao fazer login: ' + (error.response?.data?.message || error.message);
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 30%;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #007f4d;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007f4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #005934;
}

.message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.register-link {
  color: #007f4d;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
