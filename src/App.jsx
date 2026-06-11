import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tasks')) ?? []
    } catch {
      return []
    }
  })
  const [inputText, setInputText] = useState('')
  const composing = useRef(false)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

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
    if (e.key === 'Enter' && !composing.current) addTask()
  }

  return (
    <div className="container">
      <h1>タスクボード</h1>

      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onCompositionStart={() => { composing.current = true }}
          onCompositionEnd={() => { composing.current = false }}
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
