import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
    height: 300,
    display: 'flex',
    flexDirection: 'column'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const { name, dest, start, end, tripId } = props;
  const classes = useStyles();

  return (
    <Link to={`/trip/${tripId}`}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {dest}
          </Typography>
          <Typography variant="body2" component="p">
            Start: {start}
            <br />
            End: {end}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}