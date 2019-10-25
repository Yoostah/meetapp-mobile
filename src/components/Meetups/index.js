import React, {useMemo, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatRelative } from 'date-fns/esm';
import { parseISO } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';

import { API_IP } from 'react-native-dotenv';

import {
  Container,
  Banner,
  MeetupData,
  Title,
  TextArea,
  ButtonSubmit,
  TextInfo,
  PastEvent,
  PastEventText,
  SubscribedEvent,
  SubscribedEventText
} from './styles';
import api from '~/services/api';


export default function Meetups({ meetupData, reloadMeetups }) {
  const loggedUser = useSelector(state => state.user.profile.id);
  const { meetup_banner } = meetupData;

  const [pastEventTime, setPastEventTime] = useState();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function checkSubscribed() {
      const subscriptions = await api.get('subscription');

      subscriptions.data.find(meetup =>
        meetup.Meetup.id === meetupData.id ? setSubscribed(true) : null,
      );
    }

    checkSubscribed();

  }, [meetupData]);

  useMemo(() =>{
    if(meetupData.past){
      const eventPastSince = formatRelative(parseISO(meetupData.schedule), new Date(), {
        locale: ptBR,
        addSuffix: true,
      });

      setPastEventTime(eventPastSince);
    }

  },[]);

  async function handleSubscription(id){
    await api.post('subscription',{
      meetup_id: id
    })
    reloadMeetups();
  }

  return (
    <Container>
      <Banner
        source={{
          uri: API_IP + `/files/${meetup_banner &&
            meetup_banner.path}`,
        }}
      />
      <MeetupData>
        <Title>{meetupData.title}</Title>
        <TextArea>
          <Icon name="event" size={14} color="#999" />
          <TextInfo>{meetupData.formattedData}</TextInfo>
        </TextArea>
        <TextArea>
          <Icon name="place" size={14} color="#999" />
          <TextInfo>{meetupData.location}</TextInfo>
        </TextArea>
        <TextArea>
          <Icon name="person" size={14} color="#999" />
          <TextInfo>Organizador: {meetupData.owner.name}</TextInfo>
        </TextArea>
      </MeetupData>
      { meetupData.past ? (<PastEventText>Meetup foi realizado {pastEventTime}</PastEventText>) : (
        meetupData.user_id === loggedUser ? (
        <PastEvent>
          <PastEventText owner>
            Seu Evento
          </PastEventText>
          <Icon name="new-releases" size={20} color="#e5556e"/>
        </PastEvent>
        ) : (
          subscribed ? (

            <SubscribedEvent>
              <SubscribedEventText>
              Você já está incrito
              </SubscribedEventText>
            <Icon name="check-circle" size={20} color="#07d600"/>
            </SubscribedEvent>

          ) : (
          <ButtonSubmit onPress={() => {handleSubscription(meetupData.id)}}>
            Realizar Inscrição
          </ButtonSubmit>)

        )
        )
      }

    </Container>
  );
}
