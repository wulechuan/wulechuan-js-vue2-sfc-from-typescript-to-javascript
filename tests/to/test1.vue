<template>
<div class="my-test-component1"></div>
</template>





<script source-language-was="ts">
import Vue from 'vue';
const a = 9;
export default class MyTestComponent1 extends Vue {
    constructor() {
        super(...arguments);
        this.components = {};
        this.someData = 79;
    }
    mounted() {
        console.log("I'm here.");
    }
}
</script>





<style source-language-was="stylus">
.my-test-component1 {
  background-color: #123;
}
</style>





<style source-language-was="scss">
.my-test-component1 {
  color: cyan;
}
</style>





<style source-language-was="less">
.my-test-component1 {
  filter: blur(2px);
}
</style>
