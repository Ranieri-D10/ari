<template>
    <div class="remedio-crud">
        <h2>Gerenciamento de Remédios</h2>
        <form @submit.prevent="createRemedio">
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input v-model="novoRemedio.nome" id="nome" required />
            </div>
            <div class="form-group">
                <label for="funcao">Função:</label>
                <input v-model="novoRemedio.funcao" id="funcao" required />
            </div>
            <div class="form-group">
                <label for="dosagem">Dosagem (mg):</label>
                <input v-model.number="novoRemedio.dosagem" id="dosagem" type="number" />
            </div>
            <div class="form-group inline-group">
                <input v-model="novoRemedio.status" type="checkbox" id="status" />
                <label for="status">Ativo</label>
            </div>
            <button type="submit" class="action-button">Adicionar Remédio</button>
        </form>

        <h3>Lista de Remédios</h3>
        <ul>
            <li v-for="remedio in remedios" :key="remedio.id">
                {{ remedio.nome }} ({{ remedio.funcao }} - {{ remedio.dosagem }} mg)
                <button @click="deleteRemedio(remedio.id)" class="delete-button">Deletar</button>
            </li>
        </ul>
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
                dosagem: null,
                status: false,
            },
        };
    },
    methods: {
        async fetchRemedios() {
            try {
                const response = await axios.get('http://localhost:3000/api/remedios');
                this.remedios = response.data;
            } catch (error) {
                console.error('Erro ao buscar remédios:', error);
            }
        },
        async createRemedio() {
            try {
                await axios.post('http://localhost:3000/api/remedios', this.novoRemedio);
                this.fetchRemedios();
                this.novoRemedio = {
                    nome: '',
                    funcao: '',
                    dosagem: null,
                    status: false,
                };
            } catch (error) {
                console.error('Erro ao criar remédio:', error);
            }
        },
        async deleteRemedio(id) {
            try {
                await axios.delete(`http://localhost:3000/api/remedios/${id}`);
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
    max-width: 600px;
    margin: auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #333;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.inline-group {
    display: flex;
    align-items: center;
}

.inline-group input[type="checkbox"] {
    margin-right: 5px;
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