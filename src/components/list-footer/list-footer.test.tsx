import { render } from '@testing-library/react'
import { ListFooter } from './list-footer'

describe('test ListFooter', () => {
  it('should render component', () => {
    const component = render(<ListFooter itemsLeft={55} clearCompleted={() => jest.fn()} activeFilter="all" changeFilter={() => jest.fn()} />)
    expect(component.container).toBeInTheDocument()
    expect(component.getByText('55 items left')).toBeInTheDocument()
  })
})
