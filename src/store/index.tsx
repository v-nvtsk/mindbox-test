import React, { createContext, useReducer, ReactNode, useContext } from 'react'

export interface Task {
  id: string
  title: string
  state: TaskState
}
export enum TaskState {
  active = 'active',
  complete = 'complete',
}

export type Tasks = Task[]

export type Action =
  | { type: 'TOGGLE_TASK_STATE', payload: { id: string } }
  | { type: 'CLEAR_COMPLETE_TASKS' }
  | { type: 'ADD_TASK', payload: { title: string } }

const appReducer = (state: Tasks, action: Action): Tasks => {
  switch (action.type) {
    case 'TOGGLE_TASK_STATE':
      return state.map(task =>
        task.id === action.payload.id
          ? {
              ...task,
              state: task.state === TaskState.active ? TaskState.complete : TaskState.active,
            }
          : task,
      )
    case 'CLEAR_COMPLETE_TASKS':
      return state.filter(task => task.state !== TaskState.complete)
    case 'ADD_TASK':
      return [...state, { id: new Date().getTime().toString(), title: action.payload.title, state: TaskState.active }]
    default:
      return state
  }
}

const initialState: Tasks = [
  { id: '1', title: 'Task 1', state: TaskState.active },
  { id: '2', title: 'Task 2', state: TaskState.active },
  { id: '3', title: 'Sample of complete task', state: TaskState.complete },
]

export const TasksContext = createContext<{ state: Tasks, dispatch: React.Dispatch<Action> } | undefined>(
  undefined,
)

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasksContext() {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('TaskList must be used within a TaskProvider')
  }

  const { state, dispatch } = context

  return [state, dispatch] as const
}
