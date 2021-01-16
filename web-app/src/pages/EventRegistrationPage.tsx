import { Typography } from '@material-ui/core';
import React from 'react';
import { EventSender } from '../components/EventSender';

const EventRegistrationPage: React.FC = () => {
  return (
    <div>
      <Typography component="h1" variant="h5">
        Apollo graphQL component
      </Typography>
      <EventSender />
    </div>
  );
};

export default EventRegistrationPage;
