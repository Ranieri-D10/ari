<template>
  <div class="register-user">
    <h2>Registrar Usuário</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="name">Nome:</label>
        <input v-model="formData.nome" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="formData.email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input v-model="formData.senha" type="password" id="password" required />
      </div>
      <div>
        <label for="dt_nascimento">Data de Nascimento:</label>
        <input v-model="formData.dt_nascimento" type="date" id="dt_nascimento" required />
      </div>
      <div>
        <label for="status">Ativo:</label>
        <input v-model="formData.status" type="checkbox" id="status" />
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="message">{{ message }}</p>
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