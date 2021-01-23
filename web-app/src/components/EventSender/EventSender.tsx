import { Button, Grid, TextField, Typography, Box, Paper } from '@material-ui/core';
import { RegisterEventInput } from 'generated/globalTypes';
import Alert from '@material-ui/lab/Alert';

import React, { FormEvent, useState } from 'react';
import { insertEvent_registerEvent } from '../../generated/insertEvent';

export interface EventSenderProps {
  loading: boolean;
  handleSave: (event: RegisterEventInput) => void;
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
    <Paper style={{ padding: '1rem' }}>
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

      {data && <Alert severity={data?.success ? 'success' : 'error'}>{data.message}</Alert>}
    </Paper>
  );
};

export default EventSender;
