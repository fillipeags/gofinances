import React from 'react';
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

test('Check if shows input name placeholder correctly', () => {

  const { getByPlaceholderText } = render(<Profile />)

  const inputName = getByPlaceholderText('Nome')

  expect(inputName).toBeTruthy()

})