<template>
    <div class="full">
        <layout-designer v-if="isDesign" class="full" :layout="layout" show-result></layout-designer>
        <slot-layout v-else class="full pd-10" :layout="layout" gulp="5px">
            <aside slot="tree" class="full f-center tree">aside</aside>
            <header slot="top" class="full f-center">header</header>
            <nav slot="title" class="full f-center">
                <button @click="resetLayout">动态调整布局</button>
            </nav>
            <div slot="right" class="full f-center">right</div>
            <div slot="bottom" class="full f-center">bottom</div>
        </slot-layout>
        <a class="absolute" @click="isDesign=!isDesign">{{isDesign ? '运行布局' : '设计布局'}}</a>
    </div>
</template>

<script>
    import slotLayout from './slotLayout.vue'
    import LayoutDesigner from './design/layoutDesigner';

    export default {
        name: 'slotLay',
        data() {
            return {
                isDesign: true,
                layout: {
                    isVertical: false,
                    laySize: '100%',
                    children: [
                        {
                            laySize: '10vw',
                            slot: 'tree',
                        },
                        {
                            laySize: 'fill',
                            isVertical: true,
                            children: [
                                {
                                    slot: 'title',
                                    laySize: '60px'
                                },
                                {
                                    slot: 'top',
                                    laySize: '30%',
                                },
                                {
                                    slot: 'bottom',
                                    laySize: 'fill',
                                }
                            ]
                        },
                        {
                            laySize: '100px',
                            slot: 'right',
                        },
                    ]
                }
            }
        },
        methods: {
            resetLayout() {
                this.layout.children.reverse()
                this.layout.children[1].children.reverse()
            }
        },
        components: {
            LayoutDesigner,
            slotLayout
        }
    }
</script>

<style scoped lang="scss">
    @import "slot-layout.scss";

    ::v-deep {

        .compo-wrap {
            background: #ddd;
        }

    }

    .absolute {
        position: absolute;
        right: 0;
        top: 0;
        color: #f66;
    }

    .tree {
        background: #abc;
    }
</style>
<style>

</style>
