import { render } from '@testing-library/react'
import { FilterSelector } from './filter-selector'
import userEvent from '@testing-library/user-event'

describe('test FilterSelector', () => {
  it('should render component', () => {
    const component = render(<FilterSelector activeFilter="all" changeFilter={jest.fn()} />)
    expect(component.container).toBeInTheDocument()
  })

  it ('should call changeFilter', async () => {
    const mockChangeFilter = jest.fn()
    const component = render(<FilterSelector activeFilter="all" changeFilter={mockChangeFilter} />)

    const activeTab = component.getByText('Active')
    await userEvent.click(activeTab)
    expect(mockChangeFilter).toHaveBeenCalledTimes(1)

    const completeTab = component.getByText('Completed')
    await userEvent.click(completeTab)
    expect(mockChangeFilter).toHaveBeenCalledTimes(2)
    expect(mockChangeFilter).toHaveBeenCalledWith('complete')

    const allTab = component.getByText('All')
    await userEvent.click(allTab)
    expect(mockChangeFilter).toHaveBeenCalledTimes(3)
  })

  it('should render active tab', () => {
    const component = render(<FilterSelector activeFilter="active" changeFilter={jest.fn()} />)
    expect(component.getByText('Active')).toHaveClass('tabActive')
  })

  it('should render completed tab', () => {
    const component = render(<FilterSelector activeFilter="complete" changeFilter={jest.fn()} />)
    expect(component.getByText('Completed')).toHaveClass('tabActive')
  })

  it('should render all tab', () => {
    const component = render(<FilterSelector changeFilter={jest.fn()} />)
    expect(component.getByText('All')).toHaveClass('tabActive')
  })
})
