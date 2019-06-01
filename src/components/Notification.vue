<template>
    <div v-bind:class="{ showNotification : 'showNotification' }" id="notification">Email enviado com sucesso</div>
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
