import React, { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'
import {
  Container,
  UserWrapper,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
}
interface HighLightData {
  entries: HighLightProps;
  expensives: HighLightProps;
  total: HighLightProps
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  async function loadTransactions() {
    const dataKey = '@gofinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = Number(item.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      });

    setTransactions(transactionsFormatted)

    const total = entriesTotal - expensiveTotal;

    setHighLightData({

      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
    })
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/38387593?v=4' }} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Fillipe</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => { }}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction="Última entrada dia 13 de Abril" />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensives.amount}
          lastTransaction="Última saida dia 03 de Abril" />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction="01 à 16 de Abril" />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container >
  )
}

