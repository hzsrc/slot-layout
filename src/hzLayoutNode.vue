<template>
    <article v-if="isCompo" class="full pl-padding" :class="layout.ctnCls">
        <!--        c{{level}}in:{{inSlots}}-{{layout.slot}}-->
        <div class="full compo-wrap">
            <slot v-if="$scopedSlots[layout.slot]" :name="layout.slot"
                  :layout="layout" :level="level" :index="index"
            ></slot>
            <slot v-else :layout="layout" :level="level" :index="index">
                <div class="flex-center">No Component: {{layout.slot}}</div>
            </slot>
        </div>
    </article>

    <!--子节点-->
    <section v-else
             class="full pl-flex" :class="layout.ctnCls + (isVertical ? ' divide-v':' divide-h')"
    >
        <template v-for="(child,cIndex) in layout.children">
            <nav :key="cIndex"
                 class="sub-wrap"
                 :style="layStyles[cIndex]"
                 :class="clsClass(child, cIndex)"
            >
                <!--                <div>{{level+1}}{{needSlots[cIndex]}}</div>-->
                <hz-layout-node
                        :layout="child"
                        :level="level+1"
                        :classPath="clsClass(child, cIndex)+'-'"
                        :index="cIndex"
                >
                    <template v-for="subSlot in needSlots[cIndex]" :slot="subSlot" slot-scope="scope">
                        <slot :name="subSlot" v-bind="scope"/>
                    </template>
                    <template slot-scope="scope">
                        <slot v-bind="scope"></slot>
                    </template>
                </hz-layout-node>
            </nav>
        </template>
    </section>
</template>
<script>
    export default {
        name: 'hz-layout-node',
        props: {
            layout: Object, //{slot: string, laySize: string, isVertical: bool }
            level: {
                type: Number,
                default: 0
            },
            classPath: String,
            index: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {};
        },
        methods: {
            clsClass(layout, index) {
                const cls = this.classPath || 'pl-'
                return cls + (this.isVertical ? 'row' : 'col') + index
            }
        },
        computed: {
            layStyles() {
                if (!this.isCompo) {
                    return this.layout.children.map(layout => {
                        if (this.isVertical) {
                            // 设计时无内容，需要高度
                            // if (this.isDesign) {
                            return { [this.level === 0 ? 'height' : 'flexBasis']: layout.laySize }
                            // }
                            //return layout.children ? { minHeight: '100%' } : {} // 撑开
                            // 运行时，以内容撑开。故无需设置高度。
                        } else {
                            const ret = { width: layout.laySize }
                            // width为百分比单位，会比例失调。需要flexBasis
                            if (/%/.test(layout.laySize)) {
                                ret.flexBasis = layout.laySize
                            }
                            return ret
                        }
                    })
                }
            },
            needSlots() {
                const has = this.$scopedSlots
                if (this.layout.children) {
                    return this.layout.children.map(sub)
                }

                function sub(layout) {
                    if (layout.children) {
                        const r = []
                        layout.children.map(c => r.push(...sub(c)))
                        return r
                    } else {
                        return has[layout.slot] ? [layout.slot] : []
                    }
                }
            },
            inSlots() {
                return Object.keys(this.$scopedSlots)
            },
            isVertical() {
                return this.layout.isVertical
            },
            isCompo() {
                return !this.layout.children
            },
        },
    }
</script>

<style scoped lang="scss">
    .pl-flex {
        display: flex;
        overflow: auto;
        align-items: stretch;

        > * {
            flex: 1 0 auto;
        }
    }

    .divide-v {
        flex-direction: column;
    }

    .sub-wrap ::v-deep .pl-flex {
        width: 100%;
    }

    /*.compo-wrap {*/
    /*    min-height: 100%;*/
    /*}*/
</style>
