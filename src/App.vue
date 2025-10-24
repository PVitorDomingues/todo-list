<script setup lang="ts">

// Estrutura (TypeScript)

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

// Importa o MÓDULO DE REATIVIDADE
import { ref } from 'vue';

// Define o ESTADO (Lista de Tarefas)

const todos = ref<Todo[]>([
  { id: 1, text: 'Aprender Reactivity', isCompleted: false},
]);

// Variável para o novo input
const newTodoText = ref('');

let nextId = 2; // Começa em 2, pois a tarefa de exemplo tem id 1.

function addTodo() {
  // 1. Verifica se o campo de texto está vazio
  if (newTodoText.value.trim() === '') {
    alert('A tarefa não pode estar vazia!');
    return; // Para a execução da função se estiver vazio
  }

  // 2. Cria o novo objeto Todo (com a tipagem garantida)
  const newTodo: Todo = {
    id: nextId++, // Atribui o ID atual e incrementa para o próximo
    text: newTodoText.value,
    isCompleted: false,
  };

  // 3. Adiciona a nova tarefa ao array reativo
  // Atenção: Para alterar o array, precisamos acessar a propriedade .value do ref
  todos.value.push(newTodo);

  // 4. Limpa o campo de input
  newTodoText.value = '';
}
</script>

<template>
  <h1>Minha Lista de Tarefas</h1>
  
  <input v-model="newTodoText" placeholder="O que precisa ser feito hoje?" />
  
  <button @click="addTodo">Adicionar</button>
  
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>