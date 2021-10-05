import React from 'react';

import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profil Screen', () => {
  it('Should have correct placeholder in input user name', () => {

    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();

  });

  it('Should user data be loaded', () => {
    const { getByTestId } = render(<Profile />)

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Fillipe');
    expect(inputSurname.props.value).toEqual('Augusto');
  });

  it('Should titles be rendered correctly', () => {
    const { getByTestId } = render(<Profile />)

    const textTitle = getByTestId('text-title');
    expect(textTitle.props.children).toContain('Perfil')
  });
});

