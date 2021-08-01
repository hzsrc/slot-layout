<template>
    <div>
        <layout-designer v-if="isDesign" class="full" :layout="layout" show-result></layout-designer>
        <slot-layout v-else class="full pd-10" :layout="layout" gulp="5px">
            <aside slot="tree" class="flex-center">aside</aside>
            <header slot="top" class="flex-center">header</header>
            <h3 slot="title" class="flex-center">title</h3>
            <div slot="bottom" class="flex-center">bottom</div>
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
                            laySize: '200px',
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
                        }
                    ]
                }
            }
        },
        components: {
            LayoutDesigner,
            slotLayout
        }
    }
</script>

<style scoped lang="scss">
    ::v-deep {

        .compo-wrap {
            background: #ddd;
        }

    }

    .absolute {
        right: 0;
        top: 0
    }
</style>
