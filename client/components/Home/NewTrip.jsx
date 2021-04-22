import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: 10,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '35%',
  },
  fab: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10%',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  textField: {
    display: 'flex',
    width: '100%',
  },
  dateDiv: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
}));

const getModalStyle = () => {
  const top = 25;

  return {
    top: `${top}%`,
    margin: 'auto',
  };
};

const getFormStyle = () => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
};

const getDateDivStyle = () => {
  return {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  };
};

export default function SimpleCard(props) {
  const {
    modalState,
    modalToggle,
    submitNewTrip
  } = props;
  const classes = useStyles();

  const body = (
    <div style={getModalStyle()} className={classes.paper}>
      <form
        className={classes.form}
        style={getFormStyle()}
        noValidate
        autoComplete='off'
      >
        <Typography
          variant='h5'
          component='h2'
          className={classes.title}
          color='textPrimary'
        >
          New Trip
        </Typography>
        <TextField
          id='name-of-trip'
          label='Name of Trip'
          variant='outlined'
          className={classes.textField}
        />
        <TextField
          id='destination'
          label='Destination'
          variant='outlined'
          className={classes.textField}
        />
        <div style={getDateDivStyle()}>
          <TextField
            id='start-date'
            label='Start Date'
            type='date'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id='end-date'
            label='End Date'
            type='date'
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <Button variant='contained' color='primary' onClick={submitNewTrip}>Save Trip</Button>
      </form>
    </div>
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          variant='h5'
          component='h2'
          className={classes.title}
          color='textSecondary'
        >
          New Trip
        </Typography>
      </CardContent>
      <CardActions className={classes.fab}>
        <Fab
          color='primary'
          aria-label='add'
          size='large'
          onClick={() => {
            modalToggle(!modalState);
          }}
        >
          <AddIcon />
        </Fab>
      </CardActions>
      <Modal
        open={modalState}
        onClose={() => {
          modalToggle(!modalState);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {body}
      </Modal>
    </Card>
  );
}
