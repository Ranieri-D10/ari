<template>
    <div>
        <h2>Remédios</h2>
        <button @click="novoRemedio">Novo Remédio</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Função</th>
                    <th>Dosagem</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="remedio in remedios" :key="remedio.id">
                    <td>{{ remedio.id }}</td>
                    <td>{{ remedio.nome }}</td>
                    <td>{{ remedio.funcao }}</td>
                    <td>{{ remedio.dosagem }}</td>
                    <td>{{ remedio.status ? 'Ativo' : 'Inativo' }}</td>
                    <td>
                        <button @click="editarRemedio(remedio.id)">Editar</button>
                        <button @click="deletarRemedio(remedio.id)">Deletar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            remedios: [], // Armazena os dados dos remédios
        };
    },
    methods: {
        novoRemedio() {
            // Abrir modal ou formulário para criar um novo remédio
        },
        editarRemedio(id) {
            // Função para editar um remédio
        },
        deletarRemedio(id) {
            // Função para deletar um remédio
        },
        fetchRemedios() {
            // Requisição para carregar os dados dos remédios do backend
        },
    },
    mounted() {
        this.fetchRemedios(); // Carrega os dados ao montar o componente
    },
};
</script>