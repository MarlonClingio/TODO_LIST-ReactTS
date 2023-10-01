import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import styles from "./Taskform.module.css"
import { ITask } from "../../interfaces/Task"

interface Props {
  btnText: string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null
  handleUpdate?(id: number, title: string, difficulty: number): void
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>("")
  const [difficulty, setDifficulty] = useState<number>(0)

  useEffect(() => {
    if (task) {
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])

  const addTaskHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (handleUpdate) {
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000)
      const newTask: ITask = { id, title, difficulty }

      setTaskList!([...taskList, newTask])

      setTitle('')
      setDifficulty(0)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value)
    } else {
      setDifficulty(parseInt(e.target.value))
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={addTaskHandle}>
      <div className={styles.input_container}>
        <label htmlFor="title">Titulo:</label>
        <input
          value={title}
          onChange={handleChange}
          type="text" name='title'
          placeholder='Insira o titulo da tarefa' />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          value={difficulty}
          onChange={handleChange}
          type="number"
          name='difficulty'
          placeholder='Insira a dificuldade da tarefa' />
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}

export default TaskForm