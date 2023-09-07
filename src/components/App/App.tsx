import React, {useState} from 'react';
import './App.css';
import ItemForm from "../ItemForm/ItemForm";
import Task from "../Task/Task";
import {v4 as uuidv4} from 'uuid';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

function App() {

  const [tasks, setTasks] = useState<TaskType[]>([])
  const [filter, setFilter] = useState<string>('all')

  const changeFilter = (filter: string) => {
    setFilter(filter)
  }
  const addTask = (title: string) => {
    if (title) {
      const newTask: TaskType = {
        id: uuidv4(), title, isDone: false
      }
      setTasks([...tasks, newTask])
    }
  }
  const deleteTaskHandler = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const changeStatusTask = (id: string, isDone: boolean) => {
    setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
  }
  const deleteAllCompleted = () => {
    setTasks(tasks.filter(t => t.isDone !== true))
  }

  let newTask = [...tasks]
  if (filter === "active") {
    newTask = tasks.filter(t => t.isDone === false)
  } else if (filter === "completed") {
    newTask = tasks.filter(t => t.isDone === true)
  }

  return (
    <div className="App">
      <div className="logo">
        <h1>todos</h1>
      </div>
      <ItemForm addTask={addTask}/>
      <div className="list">
        {
          newTask.map(task => {
            return <Task key={task.id} deleteTask={deleteTaskHandler} changeStatusTask={changeStatusTask} task={task}/>
          })
        }
      </div>

      <div className={"menu"}>
        <div>
          <span>{tasks.filter(t => t.isDone === false).length} items active</span>
        </div>
        <div>
          <span className={filter === "all" ? "active" : ''} onClick={() => changeFilter('all')}>All</span>
          <span className={filter === "active" ? "active" : ''} onClick={() => changeFilter('active')}>Active</span>
          <span className={filter === "completed" ? "active" : ''}
                onClick={() => changeFilter('completed')}>Completed</span>
        </div>
        <div>
          <span onClick={() => deleteAllCompleted()}>Clear completed</span>
        </div>
      </div>
    </div>
  );
}

export default App;
