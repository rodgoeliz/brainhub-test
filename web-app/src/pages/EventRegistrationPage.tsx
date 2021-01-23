import EventList from 'components/EventList';
import React from 'react';
import { EventSender } from '../components/EventSender';
import RootPage from '../components/RootPage';

const EventRegistrationPage: React.FC = () => {
  return (
    <RootPage title={'EventSender.tsx'}>
      <EventSender />
      <EventList />
    </RootPage>
  );
};

export default EventRegistrationPage;
