import React, {ChangeEvent} from "react";
import {TaskType} from "../App/App";


type PropsType = {
  task: TaskType
  changeStatusTask: (id: string, isDone: boolean) => void
  deleteTask: (id: string) => void
}

function Task(props: PropsType): JSX.Element {

  const onStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatusTask(props.task.id, e.currentTarget.checked)
  }

  const deleteHandlerTask = () => {
    props.deleteTask(props.task.id)
  }

  return (
    <div key={props.task.id} className={"task"}>
      <div>
        <label key={props.task.id} className={"label"}>
          <input onChange={onStatusHandler} checked={props.task.isDone} type={"checkbox"} className={"checkbox"}/>
          <span className={"fake"}></span>
          <span className={props.task.isDone === true ? "text done" : "text"}>{props.task.title}</span>
        </label>
      </div>
      <div className={"delete_task"} onClick={deleteHandlerTask}>x</div>
    </div>)

}

export default Task