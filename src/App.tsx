import { TaskList } from '$components/list'
import { TasksProvider } from './store'

function App() {
  return (
    <TasksProvider>
      <h1>todos</h1>
      <TaskList />
    </TasksProvider>
  )
}

export default App
