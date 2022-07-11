import {
    ref,
    computed
} from "vue";
/**
 * 修改任务
 * @param {*} todosRef 
 */
export default function useEditTodo(todosRef) {
    const editingTodoRef = ref(null); //修改的任务
    let originTitle = null; //原来的标题
    const editTodo = (todo) => {
        originTitle = todo.title;
        editingTodoRef.value = todo;
    };

    // 完成修改
    const doneEdit = (todo) => {
        editingTodoRef.value = null;
        const title = todo.title.trim();
        if (title) {
            todo.title = title;
        } else { //如果修改后的内容为空则删除这条任务
            const index = todosRef.value.indexOf(todo);
            if (index >= 0) {
                todosRef.value.splice(index, 1);
            }
        }
    };
    // 取消修改
    const cancelEdit = (todo) => {
        editingTodoRef.value = null;
        todo.title = originTitle;
    };

    // 全选/取消全选
    const allDoneRef = computed({
        get() {
            return todosRef.value.filter((it) => !it.completed).length === 0;
        },
        set(checked) {
            todosRef.value.forEach((todo) => {
                todo.completed = checked;
            });
        }
    })

    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        cancelEdit,
        allDoneRef,
    };
}