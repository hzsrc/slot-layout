<template>
    <section>
        <div class="hz-ctn">
            <hz-design-tree
                ref="dzTree"
                :layout="layout"
                class="dz-ctn"
                @selectArea="selectArea"
            >
            </hz-design-tree>
            <aside v-if="curLayout" class="auto-bar">
                <h3 class="pd-10">
                    调整布局 - {{curSlot}}
                    <hr/>
                </h3>
                <div v-if="parentLayout" class="sibln pd-10">
                    <label>同级节点：</label>
                    <a v-for="(c,ci) in parentLayout.children" @click="selectArea(c)">{{c.slot || '[ ' + ci + ' ]'}}</a>
                </div>
                <layout-props :layout="curLayout" :parentLayout="parentLayout" class="pd-10 lay-props"/>
                <slot></slot>
                <textarea v-if="showResult" v-html="getLayStr()" class="w100"
                          style="height:calc(100% - 277px);color:red;font-family:Simsun,'Courier New';box-sizing: border-box"></textarea>
            </aside>
        </div>
        <el-button @click="selectParent" v-if="parentLayout" class="float-bar" :style="floatPos">选中上级</el-button>
    </section>
</template>

<script>
    import Vue from 'vue'
    import hzDesignTree from './hzDesignTree';
    import LayoutProps from './layoutProps';
    import { InputNumber, Slider, Input } from 'element-ui'

    Vue.use(InputNumber).use(Slider).use(Input)
    export default {
        props: {
            layout: Object,
            showResult: Boolean,
        },
        data() {
            return {
                curLayout: null,
                floatPos: {},
            }
        },
        watch: {
            layout: {
                immediate: true,
                handler(n) {
                    this.setParent(n, null)
                }
            }
        },
        methods: {
            setParent(node, parent) {
                if (node) node.getParent = () => parent
                if (node.children) {
                    this.resolveFill(node.children)
                    node.children.forEach(c => {
                        this.setParent(c, node)
                    })
                }
            },
            resolveFill(layouts) {
                const sizes = layouts.filter(layout => {
                    layout.isFill = () => layout.laySize === 'fill' || layout.laySize.indexOf('calc(') > -1
                    return !layout.isFill()
                }).map(layout => layout.laySize)
                layouts.filter(layout => layout.isFill()).map(layout => {
                    layout.laySize = sizes.length ? ('calc(100% - ' + sizes.join(' - ') + ')') : '100%'
                })
                if (sizes < layouts.length - 1) console.warn('Only 1 `fill` laySize is allowed in children')
                //if (!layout.laySize) layout.laySize = 'auto'
            },
            selectArea(layout) {
                if (this.curLayout) {
                    this.curLayout.ctnCls = ''
                    if (this.parentLayout) this.parentLayout.ctnCls = ''
                }
                this.$set(layout, 'ctnCls', 'area_selected')
                if (layout.getParent()) this.$set(layout.getParent(), 'ctnCls', 'child_selected')
                this.curLayout = layout

                this.$nextTick(t => {
                    const el = this.$el.querySelector('.area_selected > .compo-wrap');
                    if (el) {
                        const rect = el.getBoundingClientRect()
                        this.floatPos = {
                            top: rect.top + 'px',
                            left: rect.left + el.clientWidth - 80 + 'px'
                        }
                    }
                })
            },
            selectParent() {
                this.selectArea(this.parentLayout)
            },
            resetLayout() {
                this.setParent(this.layout, null)
            },
            getResult() {
                return this.$refs.dzTree.publicGetResult()
            },
            getLayStr() {
                var json = JSON.stringify(this.getResult(), 0, 3)
                var tag = 'script'
                return `<template>
    <slot-layout :layout="layout" gulp="5px">
        <aside slot="tree" class="f-center">aside</aside>
        <header slot="top" class="f-center">header</header>
        <h3 slot="title" class="f-center">title</h3>
        <div slot="right" class="f-center">right</div>
        <div slot="bottom" class="f-center">bottom</div>
    </slot-layout>
</template>
<${tag}>
export default {
    data(){
        return {
            layout: '${json.replace(/\n/g, '\n            ')}'
        }
    }
}
</${tag}>`
            }
        },
        computed: {
            parentLayout() {
                return this.curLayout && this.curLayout.getParent()
            },
            curSlot() {
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
    @import "../slot-layout.scss";

    .hz-ctn {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        > * {
            position: absolute;
            height: 100%;
            width: 100%;
        }
    }

    .dz-ctn {
        width: calc(100% - 30%);

        & + aside {
            right: 0;
            width: 30%;
        }

        ::v-deep {
            .area_selected {
                background: #ddebff;
            }
        }
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

    .sibln a {
        margin-right: 10px;
        padding: 3px 5px;
        background: #ddebff;
        border-radius: 5px;
        white-space: nowrap;
    }
</style>
