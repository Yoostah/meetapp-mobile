import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  MeetupData,
  Title,
  TextArea,
  ButtonSubmit,
  TextInfo,
} from './styles';

export default function Meetups({ meetupData }) {
  const { meetup_banner } = meetupData;

  return (
    <Container>
      <Banner
        source={{
          uri: `http://192.168.1.110:3333/files/${meetup_banner &&
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
      <ButtonSubmit
        style={meetupData.past ? { display: 'none' } : ''}
        onPress={() => {}}
      >
        Realizar Inscrição
      </ButtonSubmit>
    </Container>
  );
}
