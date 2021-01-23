import { gql, useQuery } from '@apollo/client';
import { Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { getEvents } from 'generated/getEvents';

import React from 'react';

export const GET_EVENTS = gql`
  query getEvents {
    events {
      name
      lastName
      id
      email
      eventDate
    }
  }
`;

const EventList: React.FC = () => {
  const { loading, data } = useQuery<getEvents>(GET_EVENTS);
  if (loading) return <div>Loading...</div>;
  return (
    <Paper style={{ padding: '1rem', margin: '2rem auto' }}>
      <Table style={{ maxHeight: '20rem', overflow: 'scroll' }}>
        <TableBody>
          {data?.events.map((event) => (
            <TableRow key={`event-${event.id}`}>
              <TableCell>{event.email}</TableCell>
              <TableCell>{new Date(event.eventDate).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default EventList;
