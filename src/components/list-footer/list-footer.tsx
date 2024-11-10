import { FilterSelector } from '../filter-selector'
import styles from './style.module.css'

interface FooterProps {
  itemsLeft: number
  clearCompleted: () => void
  activeFilter: string
  changeFilter: (filter: string) => void

}

export function ListFooter({ itemsLeft, clearCompleted, activeFilter, changeFilter }: FooterProps) {
  return (
    <div className={styles.listFooter}>
      <div className={styles.itemsLeft}>{`${itemsLeft} items left`}</div>
      <FilterSelector activeFilter={activeFilter} changeFilter={changeFilter} />
      <div><button className={styles.btnClearCompleted} onClick={clearCompleted}>Clear completed</button></div>

    </div>
  )
}
