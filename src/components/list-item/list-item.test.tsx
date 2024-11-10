import { render } from '@testing-library/react'
import { ListItem } from './list-item'
import { TaskState } from '$/store'

describe('test ListItem', () => {
  it('should render component', () => {
    const component = render(<ListItem clickHandler={jest.fn()} task={{ id: '1', title: 'Task 1', state: TaskState.active }} />)
    expect(component.getByRole('checkbox')).toBeInTheDocument()
    expect(component.getByText('Task 1')).toBeInTheDocument()
  })
})
