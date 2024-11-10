import styles from './style.module.css'

export function FilterSelector({ activeFilter = 'all', changeFilter }: { activeFilter?: string, changeFilter: (filter: string) => void }) {
  return (
    <div className={styles.tabSelector}>
      <div
        className={[styles.tab, activeFilter === 'all' ? styles.tabActive : ''].join(' ')}
        onClick={() => changeFilter('all')}
      >
        All
      </div>
      <div
        className={[styles.tab, activeFilter === 'active' ? styles.tabActive : ''].join(' ')}
        onClick={() => changeFilter('active')}
      >
        Active
      </div>
      <div
        className={[styles.tab, activeFilter === 'complete' ? styles.tabActive : ''].join(' ')}
        onClick={() => changeFilter('complete')}
      >
        Completed
      </div>
    </div>
  )
};
