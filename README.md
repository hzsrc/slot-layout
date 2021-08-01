# slot-layout
A useful and easy layout component

#Components

### SlotLayout
Display a layout by a config object and slots. Used for runtime.

### LayoutDesigner
Design a layout config object. Used for development.


#Usage:
This sample use `SlotLayout` and `LayoutDesigner` in one page.
You can use only one of them.

`````vue
<template>
    <div class="full">
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

#Webpack:   

Need to add slot-layout's path to `include` list:

````js
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
