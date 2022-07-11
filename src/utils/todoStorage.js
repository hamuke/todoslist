const LOCAL_KEY = "todos";

/**
 * 获取当前所有列表
 */
export function fetch() {
    const result = localStorage.getItem(LOCAL_KEY);
    if (result) {
        return JSON.parse(result);
    }
    return [];
}

/**
 * 保存所有任务
 * @param {*} 任务列表 
 */
export function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}

/**
 * 生成一个时间戳＋6位随机数的唯一id
 */
export function generateId() {
    return Date.now() + Math.random().toString(16).substring(2, 6);
}

/**
 * 根据筛选方式获取筛选列表
 * @param {*} visibilityRef 筛选方式
 * @param {*} todos 任务列表
 */
export function filter(visibilityRef = "all", todos) {
    if (visibilityRef === "all") {
        return todos;
    } else if (visibilityRef === "active") {
        return todos.filter((it) => !it.completed);
    } else if (visibilityRef === "completed") {
        return todos.filter((it) => it.completed);
    } else {
        throw new Error('invalid visibility value');
    }
}