// src/__tests__/App.spec.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';

// Simulação da interface
interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

// VARIÁVEIS DO TESTE (Simulam o ref no App.vue)
const todos = ref<Todo[]>([]);
const newTodoText = ref('');
let nextId = 1;

// Reseta o estado antes de cada teste
beforeEach(() => {
  todos.value = [];
  newTodoText.value = '';
  nextId = 1; 
});

// Lógica do App.vue SIMULADA (para teste unitário puro)
function addTodoSimulado() {
  if (newTodoText.value.trim() === '') {
    return;
  }

  todos.value.push({
    id: nextId++,
    text: newTodoText.value.trim(),
    isCompleted: false,
  });
  newTodoText.value = '';
}

function deleteTodoSimulado(id: number) {
    todos.value = todos.value.filter(todo => todo.id !== id);
}

function toggleCompletedSimulado(id: number) {
    todos.value = todos.value.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                isCompleted: !todo.isCompleted
            };
        }
        return todo;
    });
}

// GRUPO DE TESTES
describe('Gerenciador de Tarefas CRUD - Lógica', () => {

  it('deve adicionar uma nova tarefa e limpar o input', () => {
    newTodoText.value = 'Fazer Testes no P2';
    addTodoSimulado();

    expect(todos.value).toHaveLength(1);
    expect(todos.value[0].text).toBe('Fazer Testes no P2');
    expect(newTodoText.value).toBe('');
  });

  it('não deve adicionar uma tarefa se o campo for vazio/espaços', () => {
    newTodoText.value = '  '; 
    addTodoSimulado();

    expect(todos.value).toHaveLength(0);
  });

  it('deve deletar uma tarefa por ID', () => {
    newTodoText.value = 'Tarefa para deletar'; addTodoSimulado(); // id 1
    newTodoText.value = 'Tarefa para manter'; addTodoSimulado(); // id 2

    deleteTodoSimulado(1); 

    expect(todos.value).toHaveLength(1);
    expect(todos.value[0].text).toBe('Tarefa para manter');
  });

  it('deve alternar o status de conclusão da tarefa (toggle)', () => {
    newTodoText.value = 'Comprar Café'; addTodoSimulado(); // id 1, isCompleted: false

    toggleCompletedSimulado(1);
    expect(todos.value[0].isCompleted).toBe(true); // Vira TRUE

    toggleCompletedSimulado(1);
    expect(todos.value[0].isCompleted).toBe(false); // Vira FALSE novamente
  });
});