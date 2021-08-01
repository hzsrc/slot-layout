<template>
    <section>
        <div class="full-ctn">
            <hz-design-tree
                    ref="dzTree"
                    :layout="layout"
                    class="dz-ctn"
                    @selectArea="selectArea"
            >
            </hz-design-tree>
            <aside v-if="curLayout">
                <h3>调整布局 - {{curArea}}</h3>
                <layout-props :layout="curLayout" :parentLayout="parentLayout" class="lay-props"/>
                <!--<debug-info :info="curLayout" style="left:0;color:red"></debug-info>-->
            </aside>
        </div>
        <el-button @click="selectParent" v-if="parentLayout" class="float-bar" :style="floatPos">选中上级</el-button>
    </section>
</template>

<script>
    import Vue from 'vue'
    import hzDesignTree from './hzDesignTree';
    import LayoutProps from './layoutProps';
    import { InputNumber, Slider } from 'element-ui'

    Vue.use(InputNumber).use(Slider)
    export default {
        props: {
            layout: Object,
        },
        data() {
            return {
                curLayout: null,
                floatPos: {},
            }
        },
        methods: {
            selectArea(layout) {
                if (this.curLayout) {
                    this.curLayout.ctnCls = ''
                    if (this.parentLayout) this.parentLayout.ctnCls = ''
                }
                layout.ctnCls = 'area_selected'
                if (layout.getParent()) layout.getParent().ctnCls = 'child-selected'
                this.curLayout = layout

                this.$nextTick(t => {
                    this.$x('.area_selected > .compo-wrap').elDo(el => {
                        const rect = el.getBoundingClientRect()
                        this.floatPos = {
                            top: rect.top + 'px',
                            left: rect.left + el.clientWidth - 80 + 'px'
                        }
                    })
                })
            },
            selectParent() {
                this.selectArea(this.parentLayout)
            },
            resetLayout() {
                this.$refs.dzTree.resetLayout()
            },
            getResult() {
                return this.$refs.dzTree.getResult()
            },
        },
        computed: {
            parentLayout() {
                return this.curLayout && this.curLayout.getParent()
            },
            curArea() {
                return this.curLayout && this.curLayout.slot
            }
        },
        components: {
            LayoutProps,
            hzDesignTree
        }
    }
</script>

<style lang="scss" scoped>
    .dz-ctn {
        width: calc(100% - 30%);

        & + aside {
            right: 0;
            width: 30%;
        }

        ::v-deep {
            .child-selected {
                background: #f9f9f8;
            }

            .area_selected {
                background: #ddebff;
            }
        }
    }

    .lay-props {
        padding: 10px 0 10px 20px;
    }

    h3 {
        padding-left: 20px;
    }

    /*.lay-props {*/
    /*    padding: 10px;*/

    /*    td {*/
    /*        padding: 5px;*/
    /*    }*/
    /*}*/

    .float-bar {
        position: fixed;
    }
</style>
