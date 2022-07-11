import {
    ref,
    computed,
    onMounted,
    onUnmounted,
} from "vue";
import {
    filter
} from "../utils/todoStorage";

const validHash = ['all', 'active', 'completed'];

/**
 * hash ==》筛选方式 ==》筛选列表
 * @param {*} todosRef 
 */
export default function useFilterTodo(todosRef) {
    const visibilityRef = ref('all');//当前筛选方式

    const onhashchange = () => {
        const hashVal = location.hash.replace(/#\/?/, ''); //用正则处理hash值
        if (validHash.includes(hashVal)) {
            visibilityRef.value = hashVal;
        } else {
            location.hash = '';
            visibilityRef.value = 'all';
        }
    };

    // mounted
    onMounted(() => {
        window.addEventListener('hashchange', onhashchange);
    });
    // destroyed
    onUnmounted(() => {
        window.removeEventListener('hashchange', onhashchange);
    });

    // 筛选后的列表
    const filteredTodosRef = computed(() => {
        return filter(visibilityRef.value, todosRef.value);
    });

    // 未完成任务数量
    const activeRef = computed(() => {
        return filter('active', todosRef.value).length;
    });
    // 以完成任务数量
    const completedRef = computed(() => {
        return filter('completed', todosRef.value).length;
    });

    return {
        visibilityRef,
        filteredTodosRef,
        activeRef,
        completedRef,
    };
}