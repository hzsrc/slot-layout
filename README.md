# slot-layout
A useful and easy layout component.   
Click [https://test.hz300.com/webpack4/#/layout](https://test.hz300.com/webpack4/#/layout) to preview.

# Components

### SlotLayout
Display a layout by a config object and slots. Used for runtime.

## 特性 -- features
* 通过js布局对象，完全控制页面布局。
* 特别适合用于低代码平台系统，只需在运行时按照需要动态传入一个布局配置对象，即可随意调整页面布局。无需预先编写布局代码。
* 支持多层布局嵌套，可实现任意数目、任意层次的布局。
* 支持任意长度单位，如px、vw、%、rem。
* 支持填充式布局。即区块填充满父容器。
* 组件自带布局配置功能，可轻松实现布局设计。
<img src="https://segmentfault.com/img/bVcUEMZ"/>

## 运行效果图 -- preview
动态显示及调整布局：
<img src="https://segmentfault.com/img/bVcUENv"/>


##### Props:
* layout: { slot: string, laySize: string, isVertical: bool, children: Array\<Layout> }

  This `layout` prop is a tree structure, which use `children` prop as sub nodes, sub nodes is the same type. 

  Leaf-node means a node that don't have a `children` field. Container-node means a node that have a `children` field.
  
  Layout Fields:
  * `slot`: string   
    The slot name of a leaf-node, which is used for placing a vue slot. Default value is 'default'.
  * `isVertical`: boolean     
    Used for a container-node to indicate how to split this layout box. 
  * `laySize`: string  
    Set the box's width or height. It can be any css size, like `200px`
  * `children`: Array\<Layout>  
    Set the box's width or height for a container-node.
    
##### Slots:
* default   
  When a layout node can't find a same named slot, it will use this default slot.
* [other slots]    
  You can use any named slot, this component will find layout node which has a same `slot` field value, and place the slot elements into the layout node. 
  
### LayoutDesigner
Design a layout config object. Used for development.
##### Props:
* layout: Layout  
The same as `SlotLayout` component.
* showResult: boolean  
Whether it shows a textarea with current layout value.
##### Slots:
* default.

### HzLayoutNode
The Layout node component (only for advanced use).
##### Props:
* layout: Layout  
The same as `SlotLayout` component.

# Usage:
This sample use `SlotLayout` and `LayoutDesigner` in one page.
You can use only one of them.

````vue
<template>
    <div class="full">
        <layout-designer v-if="isDesign" class="full" :layout="layout" show-result></layout-designer>
        <slot-layout v-else class="full pd-10" :layout="layout" gulp="5px">
            <aside slot="tree" class="f-center">aside</aside>
            <header slot="top" class="f-center">header</header>
            <h3 slot="title" class="f-center">title</h3>
            <div slot="bottom" class="f-center">bottom</div>
        </slot-layout>
        <a class="absolute" @click="isDesign=!isDesign">{{isDesign ? '运行布局' : '设计布局'}}</a>
    </div>
</template>

<script>
    import { SlotLayout, LayoutDesigner } from 'slot-layout'

    export default {
        data() {
            return {
                isDesign: true,
                layout: {
                    isVertical: false,
                    laySize: '100%',
                    children: [
                        {
                            laySize: '15vw',
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
        components: {
            LayoutDesigner,
            SlotLayout
        }
    }
</script>
<style>
    .full{
        width: 100%;
        height: 100%;
    }
</style>
````

# Webpack:   

Need to add slot-layout's path to `include` list:

````js
//webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [resolve('src'), resolve('test'), resolve('node_modules/slot-layout')],
                //......
            },
        ],
    },
    //......
}
````
