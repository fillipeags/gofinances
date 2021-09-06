import React from 'react';
import { RectButton } from 'react-native-gesture-handler'
import {
  Container,
  Title
} from './styles'

interface Props extends RectButton {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}