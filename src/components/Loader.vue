<template>
<div>
    <div class="loaderContainer">
        <img alt="Vue logo" src="../assets/imgs/loader.gif">
    </div>
    <div class="loader-wrapper loader-center">
        <div class="loader"></div>
    </div>
</div>
</template>

<script>
require("@/assets/css/loader.scss");
export default {
    name: 'Loader'
}
// <div *ngIf="showLoader" class="loader-wrapper loader-center">
//   <div class="loader"></div>
// </div>
</script>