import { Container, Button, Grid, TextField, Typography, Box, Paper } from '@material-ui/core';

import React, { FormEvent, useState } from 'react';
import { insertEventVariables, insertEvent_registerEvent } from '../../generated/insertEvent';

export interface EventSenderProps {
  loading: boolean;
  handleSave: (event: insertEventVariables) => void;
  data?: insertEvent_registerEvent;
}

const EventSender: React.FC<EventSenderProps> = ({ loading, handleSave, data }) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSave({ name, lastName, email, eventDate: new Date(eventDate).toISOString() });
  };

  return (
    <Paper>
      <Container sx={{ padding: 1 }}>
        <Box sx={{ margin: 1 }}>
          <Typography component="h1" variant="h5">
            Attend event
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%', // Fix IE11 issue.
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={loading}
                autoComplete="fname"
                name="name"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={loading}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                type="name"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={loading}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                disabled={loading}
                id="eventDate"
                label="Event date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Button
              disabled={loading}
              type="submit"
              value={'submit'}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mx: 1 }}
            >
              Register
            </Button>
          </Grid>
        </Box>
        {data?.success !== undefined && (
          <Box style={{ wordBreak: 'break-all', margin: '1rem' }}>
            <p>Response cause its nice to have:</p>
            <p>Data.success: {data.success ? 'Data saved' : 'Error ocurred'}</p>
            <p>Data.event.first: {JSON.stringify(data?.event?.[0])}</p>
            <p>Data.message: {data?.message}</p>
          </Box>
        )}
      </Container>
    </Paper>
  );
};

export default EventSender;
