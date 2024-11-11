<template>
    <div>
        <NavBar />
        <h1>Bem-vindo à Agenda de Remédios</h1>
        <PrescricaoCrud />
        <RemedioCrud />
        <HistoricoCrud />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import PrescricaoCrud from '@/components/PrescricaoCrud.vue';
import RemedioCrud from '@/components/RemedioCrud.vue';
import HistoricoCrud from '@/components/HistoricoCrud.vue';

export default {
    components: {
        NavBar,
        PrescricaoCrud,
        RemedioCrud,
        HistoricoCrud,
    },
};
</script>