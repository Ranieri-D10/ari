<template>
    <div class="remedio-crud">
        <h2>Gerenciamento de Remédios</h2>
        <div class="container">
            <div class="card form-card">
                <form @submit.prevent="createRemedio" class="form">
                    <div class="form-group">
                        <label for="nome">Nome:</label>
                        <input v-model="novoRemedio.nome" id="nome" required />
                    </div>
                    <div class="form-group">
                        <label for="funcao">Função:</label>
                        <input v-model="novoRemedio.funcao" id="funcao" required />
                    </div>
                    <div class="form-group">
                        <label for="dosagem">Dosagem:</label>
                        <input v-model="novoRemedio.dosagem" id="dosagem" type="number" step="0.01" required />
                    </div>
                    <button type="submit" class="action-button">Adicionar Remédio</button>
                </form>
            </div>

            <div class="card list-card">
                <h3>Lista de Remédios</h3>
                <ul>
                    <li v-for="remedio in remedios" :key="remedio.id">
                        {{ remedio.nome }} - {{ remedio.funcao }} ({{ remedio.dosagem }}mg)
                        <button @click="confirmDelete(remedio.id)" class="delete-button">Deletar</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            remedios: [],
            novoRemedio: {
                nome: '',
                funcao: '',
                dosagem: '',
            },
        };
    },
    methods: {
        async fetchRemedios() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token de autenticação não encontrado');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/remedios', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.remedios = response.data;
            } catch (error) {
                console.error('Erro ao buscar remédios:', error);
            }
        },
        async createRemedio() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token de autenticação não encontrado');
                    return;
                }

                await axios.post(
                    'http://localhost:3000/api/remedios',
                    this.novoRemedio,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                this.fetchRemedios();
                this.novoRemedio = {
                    nome: '',
                    funcao: '',
                    dosagem: '',
                };
            } catch (error) {
                console.error('Erro ao criar remédio:', error);
            }
        },
        confirmDelete(id) {
            if (confirm('Você tem certeza que deseja deletar este remédio?')) {
                this.deleteRemedio(id);
            }
        },
        async deleteRemedio(id) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token de autenticação não encontrado');
                    return;
                }

                await axios.delete(`http://localhost:3000/api/remedios/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.fetchRemedios();
            } catch (error) {
                console.error('Erro ao deletar remédio:', error);
            }
        },
    },
    mounted() {
        this.fetchRemedios();
    },
};
</script>

<style scoped>
.remedio-crud {
    width: 80%;
    margin: auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container {
    display: flex;
    justify-content: space-between;
}

.card {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-card {
    width: 45%;
}

.list-card {
    width: 50%;
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

.action-button {
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

.action-button:hover {
    background-color: #005934;
}

.delete-button {
    padding: 5px 10px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #cc5140;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>