import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'green',
    color: 'white',
    marginTop: '1em',
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

export default function AddNewStop(props) {
  const { modalState, submitNewStop, modalToggle } = props;

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
          New Stop
        </Typography>
        <TextField
          id='name-of-stop'
          label='Name of Stop'
          variant='outlined'
          className={classes.textField}
        />
        <TextField
          id='stop-destination'
          label='Destination'
          variant='outlined'
          className={classes.textField}
        />
        <Button variant='contained' color='primary' onClick={submitNewStop}>Save Stop</Button>
      </form>
    </div>
  );

  return(
    <div>
      <Button
        onClick={ () => modalToggle(!modalState) }
        className={ classes.button }
        variant="contained"
      >
        Add New Stop
      </Button>
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
    </div>
  )
}



