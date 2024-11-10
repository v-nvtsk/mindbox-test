import { Task, TaskState } from '$/store'
import styles from './style.module.css'

export function ListItem({ task, clickHandler }: { task: Task, clickHandler: () => void }) {
  const markupId = `task-${task.id}`
  return (
    <li className={styles.taskListItem}>
      <input
        className={styles.customCheckbox}
        type="checkbox"
        id={markupId}
        name={task.title}
        checked={task.state === TaskState.complete}
        onChange={clickHandler}
      />
      <label className="" htmlFor={markupId}>
        {task.title}
      </label>
    </li>
  )
}
