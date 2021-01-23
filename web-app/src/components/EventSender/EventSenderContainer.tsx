import { gql, useMutation } from '@apollo/client';
import { GET_EVENTS } from 'components/EventList';
import { RegisterEventInput } from 'generated/globalTypes';
import React from 'react';
import { insertEvent, insertEventVariables } from '../../generated/insertEvent';
import EventSender from './EventSender';

export const INSERT_EVENT = gql`
  mutation insertEvent($event: RegisterEventInput!) {
    registerEvent(event: $event) {
      event {
        name
        lastName
        id
        email
        eventDate
      }
      message
      success
    }
  }
`;

const EventSenderContainer: React.FC = () => {
  const [insertEvent, { loading, data }] = useMutation<insertEvent, insertEventVariables>(INSERT_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });

  const handleSave = (event: RegisterEventInput) => insertEvent({ variables: { event } });
  return <EventSender loading={loading} handleSave={handleSave} data={data?.registerEvent} />;
};

export default EventSenderContainer;
