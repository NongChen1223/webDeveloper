// TodoApp.tsx
import { defineComponent, ref } from 'vue'

// 定义待办事项类型
interface Todo {
id: number
text: string
completed: boolean
}

export default defineComponent({
setup() {
const inputText = ref('')
const todos = ref<Todo[]>([
{ id: 1, text: '学习 Vue3', completed: false },
{ id: 2, text: '练习 TSX', completed: true },
])

// 添加待办事项
const addTodo = () => {
if (inputText.value.trim()) {
todos.value.push({
id: Date.now(),
text: inputText.value.trim(),
completed: false
})
inputText.value = ''
}
}

// 切换完成状态
const toggleTodo = (id: number) => {
const todo = todos.value.find(t => t.id === id)
if (todo) todo.completed = !todo.completed
}

// 删除待办事项
const deleteTodo = (id: number) => {
todos.value = todos.value.filter(t => t.id !== id)
}

// 计算未完成数量
const incompleteCount = () => todos.value.filter(t => !t.completed).length

return () => (
<div class="todo-container">
<h1>待办事项列表 (未完成: {incompleteCount()})</h1>

<div class="input-section">
  <input
      type="text"
      value={inputText.value}
      onInput={(e) => inputText.value = (e.target as HTMLInputElement).value}
  placeholder="输入待办事项"
  />
  <button onClick={addTodo} disabled={!inputText.value.trim()}>
    添加
  </button>
</div>

<ul class="todo-list">
  {todos.value.map(todo => (
  <TodoItem
      key={todo.id}
      todo={todo}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
  />
  ))}
</ul>

{/* 条件渲染提示 */}
{todos.value.length === 0 && (
<p class="empty-tip">暂无待办事项，请添加</p>
)}
</div>
)
}
})

// 子组件 TodoItem
const TodoItem = defineComponent({
props: {
todo: {
type: Object as () => Todo,
required: true
}
},
emits: ['toggle', 'delete'],
setup(props, { emit }) {
return () => (
<li class={['todo-item', { completed: props.todo.completed }]}>
<input
    type="checkbox"
    checked={props.todo.completed}
    onChange={() => emit('toggle', props.todo.id)}
/>
<span class="todo-text">{props.todo.text}</span>
<button
    class="delete-btn"
    onClick={() => emit('delete', props.todo.id)}
>
×
</button>
</li>
)
}
})