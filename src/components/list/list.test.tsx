import { act, render } from '@testing-library/react'
import { TaskList } from './list'
import { ListFooter } from '../list-footer'
import { useTasksContext } from '$/store'
import { ListItem } from '../list-item'

jest.mock('$/store', () => ({
  ...jest.requireActual('$/store'),
  useTasksContext: jest.fn().mockReturnValue([
    [
      { id: '1', title: 'Task 1', state: 'active' },
      { id: '2', title: 'Task 2', state: 'active' },
      { id: '3', title: 'Sample of complete task', state: 'complete' },
    ], jest.fn()]),
}))

jest.mock('$components/list-footer', () => ({
  ...jest.requireActual('$components/list-footer'),
  ListFooter: jest.fn(),
}))

jest.mock('$components/input', () => ({
  TextInputWithButton: () => <div>InputWithButton</div>,
}))

jest.mock('$components/list-item', () => ({
  ListItem: jest.fn(),
}))

describe('test TaskList', () => {
  it('should render component', () => {
    const component = render(<TaskList />)
    expect(component.container).toBeInTheDocument()
  })

  it('should render footer', () => {
    (ListFooter as jest.Mock).mockImplementation(() => {
      return <div>Footer</div>
    })
    const component = render(<TaskList />)
    expect(component.getByText('Footer')).toBeInTheDocument()
  })

  it('should render input', () => {
    const component = render(<TaskList />)
    expect(component.getByText('InputWithButton')).toBeInTheDocument()
  })

  it('should filter tasks', async () => {
    (useTasksContext as jest.Mock)
      .mockImplementation(() => ([
        [
          { id: '1', title: 'Task 1', state: 'active' },
          { id: '2', title: 'Task 2', state: 'active' },
          { id: '3', title: 'Sample of complete task', state: 'complete' },
        ],
        mockDispatch,
      ]))

    const mockListItem = jest.fn().mockReturnValue(<div>ListItem</div>);

    (ListItem as jest.Mock).mockImplementation(() => mockListItem())

    let mockChangeFilter: (arg: string) => void
    let mockItemsLeft
    let mockClearCompleted: () => void
    let mockActiveFilter;
    (ListFooter as jest.Mock)
      .mockImplementation(({ activeFilter, changeFilter, itemsLeft, clearCompleted }) => {
        mockActiveFilter = activeFilter
        mockItemsLeft = itemsLeft
        mockChangeFilter = changeFilter
        mockClearCompleted = clearCompleted
        return <div>Footer</div>
      })

    const mockDispatch = jest.fn()

    const component = render(<TaskList />)
    expect(component.getByText('Footer')).toBeInTheDocument()
    expect(mockActiveFilter).toBe('all')
    expect(mockItemsLeft).toBe(2)
    expect(mockListItem).toHaveBeenCalledTimes(3)

    await act(() => mockChangeFilter('active'))
    expect(mockActiveFilter).toBe('active')
    expect(mockListItem).toHaveBeenCalledTimes(5)

    await act(() => mockChangeFilter('complete'))
    expect(mockActiveFilter).toBe('complete')
    expect(mockListItem).toHaveBeenCalledTimes(6)

    await act(() => mockClearCompleted())
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_COMPLETE_TASKS' })
  })
})
