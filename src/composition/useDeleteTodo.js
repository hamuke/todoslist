/**
 * 删除任务
 * @param {*} todosRef 
 */
export default function useDeleteTodo(todosRef) {
    const deleteTodo = (todo) => { //删除指定任务
        todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    };
    const deleteCompleted = () => { //删除全部已完成任务
        todosRef.value = todosRef.value.filter((it) => !it.completed);
    }
    return {
        deleteTodo,
        deleteCompleted,
    }
}