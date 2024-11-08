<template>
  <div>
    <h1>Registro</h1>
    <form @submit.prevent="register">
      <div>
        <label>Nome:</label>
        <input type="text" v-model="formData.nome" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="formData.email" required />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" v-model="formData.senha" required />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="date" v-model="formData.dt_nascimento" required />
      </div>
      <button type="submit">Registrar</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
  nome: '',
  email: '',
  senha: '',
  dt_nascimento: ''
});

const errorMessage = ref('');

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3000/usuarios', formData.value);
    console.log('Usuário registrado:', response.data);
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Erro no registro';
    console.error('Erro:', error);
  }
};
</script>
