// import {
//   getByLabelText,
//   getByText,
//   getByTestId,
//   queryByTestId,
//   // Tip: all queries are also exposed on an object
//   // called "queries" which you could import here as well
//   waitFor,
// } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

import {Button} from '../Button'

// function onClick() {
//   return true
// }

function getExampleDOM(inner) {
  // This is just a raw example of setting up some DOM
  // that we can interact with. Swap this with your UI
  // framework of choice 😉
  const div = document.createElement('div')
  div.innerHTML = inner
  return div
}

test('Button renders', () => {
  const [buttonText, buttonClassName] = ['test', 'test-class']
  const button = new Button({text: buttonText, className: buttonClassName})

  const dom = getExampleDOM(button.render())
  const domButton = dom.querySelector('button')

  const onClick = jest.fn()
  domButton.addEventListener('click', onClick)

  domButton.click()
  expect(onClick).toBeCalledTimes(1)
  domButton.click()
  expect(onClick).toBeCalledTimes(2)

  // @testing-library/jest-dom/extend-expect
  expect(domButton).toHaveTextContent(buttonText)
  expect(domButton).toHaveClass(buttonClassName)
})
