<template>
    <div class="my-test-component1"></div>
</template>





<script source-language-was="ts">
import Vue from 'vue'
const a = 9
export default class MyTestComponent1 extends Vue {
    constructor() {
        super(...arguments)
        this.components = {}
        this.someData = 79
    }
    mounted() {
        console.log('I\'m here.')
    }
}
</script>
