import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { TextInputWithButton } from './input'

describe('test input', () => {
  it('should render component', () => {
    const component = render(<TextInputWithButton buttonText="test" onButtonClick={() => jest.fn()} />)
    expect(component.container).toBeInTheDocument()
  })

  it ('should show button on input and handle click', async () => {
    const btnHandler = jest.fn()
    const component = render(<TextInputWithButton buttonText="test" onButtonClick={btnHandler} />)

    const input = component.getByPlaceholderText('What needs to be done?')
    await userEvent.type(input, 'test')

    const button = component.getByRole('button')
    expect(button).toBeInTheDocument()

    await userEvent.click(button)
    expect(btnHandler).toHaveBeenCalledTimes(1)
  })

  it ('should show handle enter key', async () => {
    const btnHandler = jest.fn()
    const component = render(<TextInputWithButton buttonText="test" onButtonClick={btnHandler} />)

    const input = component.getByPlaceholderText('What needs to be done?')
    await userEvent.type(input, 'test')
    await userEvent.keyboard('{Enter}')
    expect(btnHandler).toHaveBeenCalledTimes(1)
  })
})
