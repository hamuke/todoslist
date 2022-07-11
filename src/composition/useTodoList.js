import {
    ref,
    watchEffect
} from "vue";
import * as todoStorage from "../utils/todoStorage"
export default function useTodoList() {
    // 将数据变成响应式
    const todosRef = ref(todoStorage.fetch());
    // 监听响应式数据
    watchEffect(() => {
        todoStorage.save(todosRef.value);
    });
    return {
        todosRef,
    };
}