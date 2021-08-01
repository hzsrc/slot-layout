<template>
    <div class="hz-layout">
        <div>
            <hz-layout-node
                    class="dz-layout"
                    :layout="layout"
                    v-on="$listeners"
            >
            </hz-layout-node>
        </div>
        <!--        <picture-preview ref="preview1"></picture-preview>-->
    </div>
</template>
<script>
    import Vue from 'vue'
    import DesignArea from './designArea';

    Vue.component('DesignArea', DesignArea)

    export default {
        props: {
            layout: Object,
            canSelectContainer: Boolean,
        },
        methods: {
            publicGetResult() {
                const root = this.$x.clone(this.layout, true)
                const enumTree = (layout) => {
                    if (layout.children) {
                        layout.children.map(enumTree)
                    }
                    if (layout.laySize.indexOf('calc') > -1) layout.laySize = 'fill'
                }
                enumTree(root)
                return root
            }
        },
    }
</script>

<style scoped lang="scss">

    $gulp-width: 7px;
    .hz-layout {
        overflow: visible;

        //消除四周占用的padding
        > div {
            margin: -$gulp-width;
            height: calc(100% + #{$gulp-width} * 2);
        }

        ::v-deep {
            .pl-padding {
                padding: $gulp-width;
            }
        }
    }

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
