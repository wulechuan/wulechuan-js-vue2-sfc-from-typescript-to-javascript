<script source-language-was="ts">
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc)
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
    return c > 3 && r && Object.defineProperty(target, key, r), r
}
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
let MyVueSFCParserTestingSource2 = class MyVueSFCParserTestingSource2 extends Vue {
    constructor() {
        super()
        this.firstData = null
        this.firstData = 319
    }
    onFirstPropChanged() {
        console.log('let \'s do something.')
    }
    // computed properties
    get firstComputedProp() {
        return `anything ${this.firstProp}`
    }
}
__decorate([
    Prop(),
], MyVueSFCParserTestingSource2.prototype, 'firstProp', void 0)
__decorate([
    Watch('firstProp'),
], MyVueSFCParserTestingSource2.prototype, 'onFirstPropChanged', null)
MyVueSFCParserTestingSource2 = __decorate([
    Component({}),
], MyVueSFCParserTestingSource2)
export default MyVueSFCParserTestingSource2
</script>





<style source-language-was="stylus">
.my-test-component2 {
    color: #96f;
    background-color: #fff;
}
</style>





<template>
    <!-- deliberately random indentations -->
    <div class="my-test-component2">
        <template v-for="i in 9">
            <span :key="i">{{ i }}</span>
        </template>
    </div>
</template>





<style source-language-was="sass">
.my-test-component2 {
    color: #96f;
    background-color: white;
}
</style>





<markdown>
# This is a Test Component of Vue 2.x

Nothing to say.
</markdown>
