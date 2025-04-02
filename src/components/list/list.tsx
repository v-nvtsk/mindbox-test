import { useCallback, useState } from 'react'
import { TaskState, useTasksContext } from '$/store'
import { ListItem } from '$components/list-item'
import { ListFooter } from '$components/list-footer'
import { TextInputWithButton } from '../input'

import styles from './style.module.css'

export function TaskList() {
  const [tasks, dispatch] = useTasksContext()
  const [activeFilter, changeFilter] = useState('all')

  const filteredTasks = activeFilter === 'all' ? tasks : tasks.filter(task => task.state === activeFilter)

  const toggleItemState = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TASK_STATE', payload: { id } })
  }, [dispatch])

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETE_TASKS' })
  }

  const addTask = useCallback((title: string) => {
    dispatch({ type: 'ADD_TASK', payload: { title } })
  }, [])

  const itemsLeft = tasks.filter(task => task.state === TaskState.active).length
  const hasCompleteTasks = tasks.some(task => task.state === TaskState.complete)

  return (
    <div className={styles.list}>
      <TextInputWithButton buttonText="Add task" onButtonClick={addTask} />
      <ul>
        {filteredTasks.map(task => (
          <ListItem
            key={task.id}
            task={task}
            clickHandler={() => toggleItemState(task.id)}
          />
        ))}
      </ul>
      <ListFooter
        itemsLeft={itemsLeft}
        hasCompleteTasks={hasCompleteTasks}
        clearCompleted={clearCompleted}
        activeFilter={activeFilter}
        changeFilter={changeFilter}
      />
    </div>
  )
}
