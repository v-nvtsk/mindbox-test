import { act, render, renderHook, waitFor } from '@testing-library/react'
import { TasksProvider, TaskState, useTasksContext } from '.'

describe('test store', () => {
  it('should create store', async () => {
    const component = render(
      <TasksProvider>
        <div>Test</div>
      </TasksProvider>,
    )

    await waitFor(() => expect(component.container).toBeInTheDocument())

    const { result } = renderHook(() => useTasksContext(), {
      wrapper: TasksProvider,
    })

    const [state, dispatch] = result.current
    expect(Array.isArray(state)).toBeTruthy()
    expect(dispatch).toBeInstanceOf(Function)
  })

  it('should add task', async () => {
    const component = render(
      <TasksProvider>
        <div>Test</div>
      </TasksProvider>,
    )

    await waitFor(() => expect(component.container).toBeInTheDocument())

    const hook = renderHook(() => useTasksContext(), {
      wrapper: TasksProvider,
    })

    const [state, dispatch] = hook.result.current
    expect(state.length).toBe(3)

    act(() => dispatch({ type: 'ADD_TASK', payload: { title: 'Test task' } }))
    hook.rerender()

    const [addState] = hook.result.current

    expect(addState.length).toBe(4)

    act(() => dispatch({ type: 'TOGGLE_TASK_STATE', payload: { id: addState[0].id } }))
    hook.rerender()
    const [toggleState] = hook.result.current
    expect(toggleState[0].state).not.toEqual(addState[0].state)

    const completeTasks = toggleState.filter(task => task.state === TaskState.complete)
    expect(completeTasks.length).not.toBe(0)

    act(() => dispatch({ type: 'CLEAR_COMPLETE_TASKS' }))
    const [clearedState] = hook.result.current
    expect(clearedState.length).not.toEqual(toggleState.length)
  })
})
