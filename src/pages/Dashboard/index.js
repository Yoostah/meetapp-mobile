import React, { useState, useEffect } from 'react';
import { format, parseISO, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Meetups from '~/components/Meetups';

import { Container, DateSelector, DateButton, TextDate, List, NoMeetups, NoMeetupsText } from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const dateFormated = format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  const [meetups, setMeetups] = useState([]);

  async function loadavailableMeetups() {
    try {
      const response = await api.get(
        `meetup?date=${new Date(date).toISOString()}`
        );

      const formattedMeetup = response.data.map(meetup => ({
        ...meetup,
        formattedData: format(
          parseISO(meetup.schedule),
          "d 'de' MMMM ', às' HH:mm'h'",
          {
            locale: ptBR,
          }
          ),
      }));

        setMeetups(formattedMeetup);
    } catch (error) {
      // Alert.alert('Não foi possivel carregar as meetups');
    }
  }

  useEffect(() => {
    loadavailableMeetups();
  }, [date]);

  //console.tron.log(meetups.length);

  return (
    <Background>
      <Container>
        <DateSelector>
          <DateButton onPress={() => setDate(subDays(date, 1))}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </DateButton>
          <TextDate>{dateFormated}</TextDate>
          <DateButton onPress={() => setDate(addDays(date, 1))}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </DateButton>
        </DateSelector>
        {meetups.length ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Meetups meetupData={item} reloadMeetups={loadavailableMeetups}/>}
          />
        ) : (
        <NoMeetups>
          <Icon name="event-busy" size={64} color="#F00" />
          <NoMeetupsText>Nenhum Meetup nesta data.</NoMeetupsText>
        </NoMeetups>
        )}

      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};
