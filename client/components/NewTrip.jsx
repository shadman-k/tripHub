import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { FullscreenExitTwoTone } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
    maxHeight: 300 ,
    display: 'flex',
    flexDirection: 'column'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30%',
  },
  pos: {
    marginBottom: 12,
  },
  fab: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20%'
  }
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title} color='textSecondary'>
          New Trip
        </Typography>
      </CardContent>
      <CardActions className={classes.fab}>
        <Fab color='primary' aria-label='add' size='large'><AddIcon/></Fab>
      </CardActions>
    </Card>
  );
}