// SetupDemo.tsx
import { defineComponent, ref, computed } from 'vue'

// 类型定义
interface User {
    id: number
    name: string
    age: number
}

// 组合式函数
const useCounter = (initial: number) => {
    const count = ref(initial)
    const double = computed(() => count.value * 2)

    const increment = () => count.value++
    const reset = () => (count.value = 0)

    return { count, double, increment, reset }
}

export default defineComponent(() => {
    // 状态管理
    const { count, double, increment, reset } = useCounter(0)
    const users = ref<User[]>([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 32 }
    ])
    const newUserName = ref('')

    // 计算属性
    const totalAge = computed(() =>
        users.value.reduce((sum, user) => sum + user.age, 0)
    )

    // 方法
    const addUser = () => {
        if (!newUserName.value.trim()) return
        users.value.push({
            id: Date.now(),
            name: newUserName.value.trim(),
            age: Math.floor(Math.random() * 20 + 18) // 随机年龄
        })
        newUserName.value = ''
    }

    // TSX 模板
    return () => (
        <div class="container">
            {/* 计数器模块 */}
            <section class="counter-box">
                <h2>计数器</h2>
                <p>Count: {count.value}</p>
                <p>Double: {double.value}</p>
                <div class="button-group">
                    <button onClick={increment}>+1</button>
                    <button onClick={reset}>重置</button>
                </div>
            </section>

            {/* 用户管理模块 */}
            <section class="user-box">
                <h2>用户管理 (总年龄: {totalAge.value})</h2>

                <div class="input-group">
                    <input
                        type="text"
                        value={newUserName.value}
                        onInput={e => newUserName.value = (e.target as HTMLInputElement).value}
                        placeholder="输入用户名"
                    />
                    <button onClick={addUser}>添加用户</button>
                </div>

                <ul class="user-list">
                    {users.value.map(user => (
                        <li key={user.id} class="user-item">
                            <span>{user.name}</span>
                            <span>年龄: {user.age}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 条件渲染 */}
            {!users.value.length && (
                <p class="empty-tip">暂无用户，请添加</p>
            )}

            {/* 插槽组件使用 */}
            <Layout>
                {{
                    header: () => <h1>Vue3 TSX 极简示例</h1>,
                    footer: () => <div class="footer">当前时间: {new Date().toLocaleString()}</div>
                }}
            </Layout>
        </div>
    )
})

// 布局组件
const Layout = defineComponent({
    setup(_, { slots }) {
        return () => (
            <div class="layout">
                <header>{slots.header?.()}</header>
                <main>{slots.default?.()}</main>
                <footer>{slots.footer?.()}</footer>
            </div>
        )
    }
})