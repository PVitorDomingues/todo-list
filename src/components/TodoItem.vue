<script setup lang="ts">
// 1. Defina a interface em um arquivo separado ou re-defina aqui
interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

// 2. Define as propriedades (Props) que o PAI passará
const props = defineProps<{
    todo: Todo;
}>();

// 3. Define os eventos (Emits) que o componente filho enviará de volta
const emit = defineEmits<{
    (e: 'delete', id: number): void;
    (e: 'toggle', id: number): void;
}>();
</script>

<template>
    <div class="todo-item-container">
        <input 
            type="checkbox" 
            :checked="props.todo.isCompleted" 
            @change="emit('toggle', props.todo.id)"
        />
        
        <span :class="{ completed: props.todo.isCompleted }">
            {{ props.todo.text }}
        </span>
        
        <button class="delete-button" @click="emit('delete', props.todo.id)">
            X
        </button>
    </div>
</template>

<style scoped>
/* Adicione aqui os estilos do item da lista (ex: .completed, .delete-button, etc.) */
.completed {
    text-decoration: line-through;
    color: #888;
}
</style>