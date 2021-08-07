<template>
    <div class="full" v-if="layout" @click.stop="selectArea">
        <div class="full flex-center flex-column">
            <div>{{layout.slot}}</div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            layout: Object,
            config: Object,
        },
        methods: {
            selectArea() {
                this.$emit('selectArea', this.layout)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../slot-layout.scss";
</style>
