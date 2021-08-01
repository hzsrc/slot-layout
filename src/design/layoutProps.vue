<template>
    <div>
        <table>
            <tr>
                <td>
                    <el-input-number title="输入要拆分成的份数" v-model="divideCount" style="width:90px" :min="2">
                    </el-input-number>
                </td>
                <td>
                    <el-button @click="divideCur(false)" :disabled="layout.children && layout.isVertical">水平拆分
                    </el-button>
                </td>
                <td>
                    <el-button @click="divideCur(true)" :disabled="layout.children && !layout.isVertical">垂直拆分
                    </el-button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <el-button @click="removeDivide" :disabled="!parentLayout || parentLayout.children.length<=2">移除选中
                    </el-button>
                </td>
                <td>
                    <el-button @click="cancelDivide" :disabled="!parentLayout">同级合并</el-button>
                </td>
            </tr>
        </table>

        <hr/>
        <table>
            <tr v-if="parentLayout ">
                <td nowrap>{{laySizeText}}</td>
                <td>
                    <el-input v-model="layout.laySize" @change="resetLayout">
                        <el-checkbox slot="append" :value="layout.isFill()"
                                     @input="changeFill" :disabled="!parentLayout"
                                     style="width:40px">填满
                        </el-checkbox>
                    </el-input>
                    <el-slider :disabled="layout.isFill()" :value="parseInt(layout.laySize)" @input="setLaySize"
                               :max="layout.laySize.indexOf('px')>-1 ? 2560: 100" :show-tooltip="false"></el-slider>
                </td>
            </tr>
            <tr>
                <td nowrap>插槽名</td>
                <td>
                    <el-input v-model="layout.slot" @change="resetLayout"></el-input>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import msg from './msgDialog'

    export default {
        props: {
            layout: Object,
            parentLayout: Object
        },
        data() {
            return {
                divideCount: 2,
            }
        },
        watch: {
            layout: {
                immediate: true,
                handler(layout) {
                    this.divideCount = layout && layout.children ? layout.children.length : 2
                }
            }
        },
        methods: {
            divideCur(isVertical) {
                const layout0 = this.layout //闭包缓存
                const children = Array.apply(null, Array(this.divideCount)).map((n, i) => {
                    const child = {
                        slot: 'Area' + (i + 1),
                        ctnCls: '',
                    }
                    return Object.assign(child, layout0.children && layout0.children[i])
                })
                for (let i = layout0.children ? layout0.children.length - 1 : 0; i < children.length; i++) {
                    children[i].laySize = 'auto'
                }
                this.$set(layout0, 'children', children)
                this.$set(layout0, 'isVertical', isVertical)
                this.resetLayout()
                this.parentCompo.selectArea(children[0])
            },
            removeDivide() {
                const siblings = this.parentLayout.children
                if (siblings.length <= 2) return this.cancelDivide()

                const index = siblings.indexOf(this.layout)
                if (index > -1) {
                    msg.confirm(`确实要移除 "${this.layout.slot}" 区块吗？`)
                        .then(t => {
                            siblings.splice(index, 1)
                            //选中下一个
                            const next = siblings[index] || siblings[index - 1]
                            this.parentCompo.selectArea(next)
                        }).catch(() => 0)
                }
            },
            cancelDivide() {
                msg.confirm(`确实要移除与 "${this.layout.slot}" 同级的【${this.parentLayout.children.length}个区块】吗？`)
                    .then(t => {
                        const parent = this.parentLayout
                        const sibling = parent.children.find(sibl => sibl !== this.layout)
                        if (sibling && sibling.children) {
                            parent.children = sibling.children
                            parent.isVertical = sibling.isVertical
                        } else {
                            parent.children = undefined
                            parent.compoName = 'DesignArea'
                            //parent.slot = 'Area'
                        }
                        this.parentCompo.selectParent()
                    })
            },
            resetLayout() {
                this.parentCompo.resetLayout()
            },
            changeFill(isFill) {
                if (isFill) {
                    let silbling = this.parentLayout.children.find(child => (!child.laySize || child.laySize === 'auto') && child != this.layout)
                    if (silbling) {
                        this.parentCompo.selectArea(silbling)
                        return msg.toast.warning(`请先设置兄弟节点"${silbling.slot}"的大小`)
                    }

                    silbling = this.parentLayout.children.find(child => child.isFill() && child != this.layout)
                    if (silbling) {
                        this.parentCompo.selectArea(silbling)
                        return msg.toast.warning(`请先取消兄弟节点"${silbling.slot}"的填满属性，并为它设置${this.laySizeText}`)
                    }

                    this.layout.laySize = 'fill'
                    this.resetLayout()
                } else {
                    this.layout.laySize = 'auto'
                }
            },
            setLaySize(val) {
                const old = this.layout.laySize
                if (!val || parseInt(old) === val) return
                if (old.match(/px$/)) this.layout.laySize = val + 'px'
                else if (old === 'auto' || val > 0) {
                    this.layout.laySize = val + '%'
                    //自动设置相邻的auto为自动填满
                    const siblings = this.parentLayout.children
                    if (siblings && !siblings.find(sibling => sibling.isFill())) {
                        const autos = siblings.filter(sibling => sibling.laySize === 'auto')
                        if (autos.length === 1) autos[0].laySize = 'fill'
                    }
                }

                this.resetLayout()
            }
        },
        computed: {
            parentCompo() {
                return this.$parent
            },
            laySizeText() {
                return this.parentLayout.isVertical ? '高度' : '宽度'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
