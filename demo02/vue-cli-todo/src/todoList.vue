<template>

<div>
    <div>
        <input  class="red-border green-word"  v-model="inputValue">
        <button @click="handleSumbit">提交</button>
    </div>
    <ul>
        <todo-item 
        v-for="(item, index) of list" :key="index"
        :content="item"
        :index="index"
        @delete="handleDelele"
        ></todo-item>
    </ul>    
</div>


</template>
<script>
    import todoItem from './components/todoItem'
    export default {
        components: {
            'todo-item' : todoItem
        },
        // data : function(){
        //     return {}
        // }
        data(){
            return {
                inputValue: '',
                list: []
            }
        },
        methods: {
            handleSumbit(){
                // this.list 是 this.$data.list 缩写
                this.list.push(this.inputValue);
                this.inputValue = '';

            },
            handleDelele(i){
                this.list.splice(i, 1);

            }
        }

    }
</script>
<style>
    
</style>