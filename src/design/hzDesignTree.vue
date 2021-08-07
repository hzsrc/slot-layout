<template>
    <slot-layout class="dz-layout pd-10" :layout="layout" gulp="5px">
        <div slot-scope="{layout}" class="full" @click.stop="selectArea(layout)">
            <div class="full flex-center flex-column">
                <div>{{layout.slot}}</div>
            </div>
        </div>
    </slot-layout>
</template>
<script>
    import slotLayout from '../slotLayout.vue';

    export default {
        props: {
            layout: Object,
            canSelectContainer: Boolean,
        },
        methods: {
            publicGetResult() {
                const root = JSON.parse(JSON.stringify(this.layout))
                const enumTree = (layout) => {
                    if (layout.children) {
                        layout.children.map(enumTree)
                    }
                    if (layout.laySize.indexOf('calc') > -1) layout.laySize = 'fill'
                    if (layout.ctnCls) layout.ctnCls = layout.ctnCls.replace(/(area_selected|child_selected)/g, '')
                    if (!layout.ctnCls || !layout.replace(/ /g, '')) delete layout.ctnCls
                }
                enumTree(root)
                return root
            },
            selectArea(layout) {
                this.$emit('selectArea', layout)
            },
        },
        components: {
            slotLayout
        }
    }
</script>

<style scoped lang="scss">
    @import "../slot-layout.scss";

    .dz-layout ::v-deep {
        .compo-wrap {
            border: 1px solid #ddd;
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            > .pl-design {
                /*min-height: 100px;*/
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>
