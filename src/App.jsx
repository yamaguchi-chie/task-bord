import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputText, setInputText] = useState('')

  const addTask = () => {
    const trimmed = inputText.trim()
    if (!trimmed) return
    setTasks([...tasks, { id: Date.now(), text: trimmed, completed: false }])
    setInputText('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="container">
      <h1>タスクボード</h1>

      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力してください"
        />
        <button onClick={addTask}>追加</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 && (
          <li className="empty">タスクがありません</li>
        )}
        {tasks.map(task => (
          <li key={task.id} className={`task-item${task.completed ? ' completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>削除</button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <p className="summary">
          {tasks.filter(t => t.completed).length} / {tasks.length} 件完了
        </p>
      )}
    </div>
  )
}

export default App
