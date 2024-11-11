<template>
  <div class="register-user">
    <h2>Registrar Usuário</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input v-model="formData.nome" id="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="formData.email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input v-model="formData.senha" type="password" id="password" required />
      </div>
      <div class="form-group">
        <label for="dt_nascimento">Data de Nascimento:</label>
        <input v-model="formData.dt_nascimento" type="date" id="dt_nascimento" required />
      </div>
      <div class="form-group">
        <label for="status">Ativo:</label>
        <input v-model="formData.status" type="checkbox" id="status" />
      </div>
      <button type="submit" class="register-button">Registrar</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        nome: '',
        email: '',
        senha: '',
        dt_nascimento: '',
        status: false,
      },
      message: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        // Ensure date is sent in ISO format
        const payload = {
          ...this.formData,
          dt_nascimento: new Date(this.formData.dt_nascimento).toISOString(),
        };
        const response = await axios.post('http://localhost:3000/api/usuarios', payload);
        this.message = 'Usuário registrado com sucesso!';
      } catch (error) {
        this.message = 'Erro ao registrar usuário: ' + error.response?.data?.message || error.message;
      }
    },
  },
};
</script>

<style scoped>
.register-user {
  max-width: 400px;
  margin: auto;
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

.register-button {
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

.register-button:hover {
  background-color: #005934;
}

.message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
