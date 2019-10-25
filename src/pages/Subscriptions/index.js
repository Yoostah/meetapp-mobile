import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import SubscribedEvents from '~/components/SubscribedEvents';

import { Container, List, NoMeetups, NoMeetupsText } from './styles';

import api from '~/services/api';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscribedEvents() {
    try {
      const response = await api.get(
        `subscription`
        );

        setSubscriptions(response.data);

      } catch (error) {
        // Alert.alert('Não foi possivel carregar as meetups');
      }
    }

  useEffect(() => {
    loadSubscribedEvents();
  }, []);

  //console.tron.log(subscriptions);
  return (
    <Background>
      <Container>
        {subscriptions.length ? (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <SubscribedEvents eventData={item} reloadSubscribed={loadSubscribedEvents}/>}
          />
        ) : (
        <NoMeetups>
          <Icon name="event-busy" size={64} color="#F00" />
          <NoMeetupsText>Você não está inscrito em nenhum Meetup.</NoMeetupsText>
        </NoMeetups>
        )}

      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
