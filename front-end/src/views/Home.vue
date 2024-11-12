<template>
    <div class="home">
        <!-- Header centralizado com estilo moderno -->
        <header class="header">
            <h1>Agenda de Remédios</h1>
        </header>

        <!-- Seção de Agendamentos -->
        <section class="agendamentos">
            <h2>Agendamentos Feitos</h2>
            <ul>
                <li v-for="agendamento in agendamentos" :key="agendamento.id">
                    {{ agendamento.nome }} - {{ agendamento.horario }}
                </li>
            </ul>
        </section>

        <!-- Botões para acessar CRUDs -->
        <section class="crud-links">
            <h3>Funcionalidades</h3>
            <button @click="navigateTo('remedios')" class="crud-button">Gerenciar Remédios</button>
            <button @click="navigateTo('prescricoes')" class="crud-button">Gerenciar Prescrições</button>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            agendamentos: [
                { id: 1, nome: 'Paracetamol', horario: '08:00 - 1 vez ao dia' },
                { id: 2, nome: 'Ibuprofeno', horario: '12:00 - 2 vezes ao dia' },
                { id: 3, nome: 'Aspirina', horario: '18:00 - 1 vez ao dia' },
                // Adicione mais agendamentos conforme necessário
            ],
        };
    },
    methods: {
        navigateTo(view) {
            this.$router.push(`/${view}`);
        },
    },
};
</script>

<style scoped>
.home {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
    text-align: center;
    color: #007f4d;
    margin-bottom: 2rem;
}

.agendamentos,
.crud-links {
    margin-bottom: 2rem;
}

h2,
h3 {
    text-align: center;
    color: #333;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.crud-button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #007f4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.crud-button:hover {
    background-color: #005934;
}
</style>