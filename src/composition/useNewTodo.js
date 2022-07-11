import {
    ref
} from "vue";
import {
    generateId
} from "../utils/todoStorage";
/**
 * 新增任务
 * @param {*} todosRef 
 */
export default function useNewTodo(todosRef) {
    const newTodoRef = ref(""); //新任务标题
    // 新增任务
    const addNewTodo = () => {
        const value = newTodoRef.value && newTodoRef.value.trim();
        if (!value) {
            return;
        }
        //生成一个任务对象
        const newTodo = {
            id: generateId(), //唯一id
            title: value, //标题
            completed: false, //是否完成
        };
        //将对象加入任务列表中
        todosRef.value.push(newTodo);
        //清空input输入框
        newTodoRef.value = "";
    };
    return {
        newTodoRef,
        addNewTodo,
    }
}