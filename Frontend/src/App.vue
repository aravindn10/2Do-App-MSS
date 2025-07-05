<script setup>
import {ref } from 'vue';
import Header from "@/components/Header.vue"
import InputField from "@/components/InputField.vue"
import DisplayTodos from "@/components/DisplayTodos.vue"
import  axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const incompletedTodos = ref([])
const completedTodos = ref([])


async function fetchData() {
    try {
        const res = await axios.get("http://localhost:5000/todos")
        const data = res.data;
        incompletedTodos.value = data["incompleted_todos"]
        completedTodos.value = data["completed_todos"]
    } 
    catch (err) {
        toast.error("Error fetching data:", err.message);
    }
}

fetchData()

async function addTodo(inputValue){
    try{
        const res = await axios.post("http://localhost:5000/todos",{
            "todo" : inputValue
        })
        await toast.success(res.data["message"])
    } 
    catch (err) {
        toast.error("Error adding todo:", err.message);
    }
        await fetchData()
}

async function todoCompleted(id){
    try {
       const res = await axios.post("http://localhost:5000/todos/complete", {
            'id': id
        })
        await toast.success(res.data["message"])
    } 
    catch (err) {
        toast.error("Error completing todo:", err.message);
    }
    await fetchData()
}

async function todoDeleted(id){
    try {
        const res = await axios.post("http://localhost:5000/todos/delete", {
            'id': id
        })
        await toast.success(res.data["message"])
    } 
    catch (err) {
        toast.error("Error deleting todo:", err.message);
    }
    await fetchData()
}

</script>

<template>
 <Header />
 <InputField @add-todo="addTodo" />
 <DisplayTodos 
    :incompletedTodos="incompletedTodos" 
    :completedTodos="completedTodos" 
    @todo-completed="todoCompleted" 
    @delete-todo="todoDeleted" />

</template>
