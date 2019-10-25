import React, {useMemo, useState} from 'react';

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
  PastEvent
} from './styles';


export default function Meetups({ meetupData }) {
  const { meetup_banner } = meetupData;
  const [pastEventTime, setPastEventTime] = useState();

  useMemo(() =>{
    if(meetupData.past){
      const eventPastSince = formatRelative(parseISO(meetupData.schedule), new Date(), {
        locale: ptBR,
        addSuffix: true,
      });

      setPastEventTime(eventPastSince);
    }

  },[]);

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
      { meetupData.past ? (<PastEvent>Meetup foi realizado {pastEventTime}</PastEvent>) : (
      <ButtonSubmit
        onPress={() => {}}
      >
        Realizar Inscrição
      </ButtonSubmit>)}

    </Container>
  );
}
