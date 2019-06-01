<template>
    <div>
        <ul class="name-list">
            <li>Bruna Sayuri</li>
            <li>Luana Monteiro</li>
            <li>Jonas Ribeiro</li>
            <li>Rodrigo Normando</li>
        </ul>
        <button v-on:click="getProducts">Ver produtos</button>
        <Loader v-if="this.showloader"/>
    </div>
</template>

<script>
export default {
    name: 'Notification',
    props: {
        showNotification: Boolean
    }
}
</script>

<style scoped>
    #notification {
        background-color: green;
        width: 10rem;
        height: auto;
        position: absolute;
        right: -10px;
        opacity: 0;
        color: whitesmoke;
        display: none;
        border-radius: 10px 0 0px 10px
    }
    @keyframes notification {
        100% {
            opacity: 1
        }
    }
    .showNotification {
        animation: notification 500ms;
    }
</style>
