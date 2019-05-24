import React from 'react'

import { Typography, Button } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';

import styles from './Event.module.css';

const Event = (props) => {
  return (
    <Card className={styles.eventCard}>
      <CardContent>
        <Typography variant='h4'>{props.event.title}</Typography>
        <Typography variant='body1'>{props.event.description}</Typography>
      </CardContent>
      <CardActions>
        <Button>Learn more</Button>
      </CardActions>
    </Card>
  )
}

export default Event
