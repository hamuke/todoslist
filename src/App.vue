<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>TODOS</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addNewTodo"
        />
      </header>
      <section class="main" v-show="todosRef.length > 0">
        <input v-model="allDoneRef" id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: todo.completed,
              editing: todo == editingTodoRef,
            }"
            v-for="todo in filteredTodosRef"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button @click="deleteTodo(todo)" class="destroy"></button>
            </div>
            <input
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)"
              v-model="todo.title"
              class="edit"
              type="text"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todosRef.length > 0">
        <span class="todo-count">
          <strong>{{ activeRef }}</strong>
          <span>remaining items</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef === 'all' }">
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              :class="{ selected: visibilityRef === 'active' }"
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef === 'completed' }"
            >
              Completed
            </a>
          </li>
        </ul>
        <button @click="deleteCompleted" class="clear-completed" v-show="completedRef">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilterTodo from "./composition/useFilterTodo";
import useEditTodo from "./composition/useEditTodo";
import useDeleteTodo from "./composition/useDeleteTodo";
export default {
  setup() {
    const { todosRef } = useTodoList();
    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilterTodo(todosRef),
      ...useEditTodo(todosRef),
      ...useDeleteTodo(todosRef),
    };
  },
};
</script>