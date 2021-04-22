import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '15px 0px',
  },
}));

export default function Item(props) {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.root}>
      <div className="item">
        Itinerary Item {props.item}
      </div>
    </Paper>
  )
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
//   },
// }));

// export default function SimplePaper() {
//   // const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Paper elevation={0} />
//       <Paper />
//       <Paper elevation={3} />
//     </div>
//   );
// }