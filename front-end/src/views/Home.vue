<template>
    <div class="home">
        <header class="header">
            <h1>Agenda de Remédios - Ari</h1>
        </header>

        <div class="container">
            <!-- Contêiner para o calendário -->
            <div class="calendario-container">
                <CalendarioSimples :agendamentos="agendamentos" />
            </div>

            <!-- Contêiner para as funcionalidades -->
            <div class="funcionalidades-container">
                <section class="funcionalidades">
                    <h3>Funcionalidades</h3>
                    <button @click="navigateTo('remedios')" class="crud-button">Gerenciar Remédios</button>
                    <button @click="navigateTo('prescricoes')" class="crud-button">Gerenciar Prescrições</button>
                    <button @click="navigateTo('historico')" class="crud-button">Histórico de Prescrições</button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import CalendarioSimples from '../components/CalendarioSimples.vue';

export default {
    components: {
        CalendarioSimples
    },
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
    }
};
</script>

<style scoped>
.home {
    width: 80%;
    margin: auto;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
}

.header {
    text-align: center;
    color: #007f4d;
    margin-bottom: 2rem;
}

.container {
    display: flex;
    gap: 1.5rem;
}

/* Contêineres para o calendário e funcionalidades com tamanhos específicos */
.calendario-container {
    flex: 8;
    /* 80% */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.funcionalidades-container {
    flex: 4;
    /* 40% */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.calendario-simples {
    width: 100%;
    padding: 1.5rem;
    background-color: #f0f8ff;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 250px;
}

.funcionalidades {
    width: 100%;
    padding: 1rem;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
    min-height: 100px;
}

.crud-button {
    width: 90%;
    padding: 0.75rem;
    background-color: #007f4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    text-align: center;
}

.crud-button:hover {
    background-color: #005934;
}
</style>
