<script>
    import hzLayoutNode from './hzLayoutNode';

    export default {
        name: 'slot-layout',
        install(Vue) {
            Vue.component('slot-layout', this)
            Vue.component('layout-node', hzLayoutNode)
        },
        props: {
            layout: Object,
            gulp: String,
        },
        data() {
            return {
                clsVer: 'data-v-' + Math.random().toString().slice(2, 8)
            }
        },
        methods: {
            getStyle(h) {
                if (this.gulp) {
                    return h('style', {}, [`
.${this.clsVer} .pl-padding {
padding: ${this.gulp};
}
`])
                }
            }
        },
        render(h) {
            const _this = this
            return h(
                // 1. 要渲染的标签名称：第一个参数【必需】
                'div',
                // 2. 1中渲染的标签的属性，详情查看文档：第二个参数【可选】
                { class: 'hz-layout ' + _this.clsVer },
                // 3. 1中渲染的标签的子元素数组：第三个参数【可选】
                [
                    _this.getStyle(h),
                    h('div', {
                        style: _this.gulp ? {
                            margin: '-' + _this.gulp,
                            height: `calc(100% + ${this.gulp} + ${this.gulp})`
                        } : ''
                    }, [
                        h('hz-layout-node', {
                            class: 'dz-layout',
                            props: { layout: _this.layout },
                            scopedSlots: _this.$scopedSlots
                        }, []),
                    ]),
                ]
            )
        },
        components: { hzLayoutNode },
    }
</script>

<style scoped lang="scss">
    .hz-layout {
        overflow: hidden;

        > div {
            height: 100%;
        }
    }
</style>

