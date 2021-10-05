import React from 'react';
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

test('Check if shows input name placeholder correctly', () => {

  const { getByPlaceholderText } = render(<Profile />)

  const inputName = getByPlaceholderText('Nome')

  expect(inputName).toBeTruthy()

})

test('Checks if user data has been loaded', () => {
  const { getByTestId } = render(<Profile />)

  const inputName = getByTestId('input-name');
  const inputSurname = getByTestId('input-surname');

  expect(inputName.props.value).toEqual('Fillipe');
  expect(inputSurname.props.value).toEqual('Augusto');
})

test('Check if title renders correctly', () => {
  const { getByTestId } = render(<Profile />)

  const textTitle = getByTestId('text-title');
  expect(textTitle.props.children).toContain('Perfil')
})