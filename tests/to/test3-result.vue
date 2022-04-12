<template source-language-was="pug">
    <div class="pug-template-test"><h1>Pug - node template engine</h1><div class="col" id="container-1">{{ usage }}
    </div><div class="col" v-if="favoriteFoodName"><p>{{ favoriteFoodName }}</p></div></div>
</template>





<script lang="ts">
import Vue from 'vue'

export default class PugTemplateTest extends Vue {
    private usage: string = 'A test for both pug and typescript blocks'

    private get favoriteFoodName (): string {
        return '江西炒粉'
    }
}
</script>
