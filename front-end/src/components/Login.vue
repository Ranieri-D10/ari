<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="emailOrName">Email ou Nome:</label>
        <input v-model="credentials.emailOrName" id="emailOrName" required />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input v-model="credentials.password" type="password" id="password" required />
      </div>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      credentials: {
        emailOrName: '', // Pode ser email ou nome
        password: '',
      },
      message: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/usuarios/login', {
          email: this.credentials.emailOrName,
          nome: this.credentials.emailOrName, // Enviar como ambos para back-end tratar
          senha: this.credentials.password,
        });

        // Armazenar o token JWT no localStorage
        localStorage.setItem('token', response.data.token);
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
  max-width: 400px;
  margin: auto;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
