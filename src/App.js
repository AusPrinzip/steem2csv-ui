import React from 'react';
import logo from './csv.svg';
// import './App.css';
import 'typeface-roboto';
import MaterialUIPickers from './datePicker.js'
import Forms from './Forms.js'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const UserPage = (props) => {
	const classes = useStyles();
  return (
    <div>
      <div className={classes.headSection}>
        <img alt="Some weird spore thing" src={logo} className={classes.spore} />
        <Typography variant="headline" className={classes.mainHeader}>
          steem2csv
        </Typography>
      </div>
      <div className={classes.main}>
        <Forms></Forms>
      </div>
    </div>
  );
}

function App(props) {
  const { classes } = props;
  return (
    <UserPage></UserPage>
  );
}

const useStyles = makeStyles(theme => ({
  headSection: {
    alignItems: 'center',
    display: 'flex',
    height: '10vh',
    margin: '0 auto',
    padding: '12px',
    width: '90vw',
  },
  grid: {
    height: '100%',
  },
  mainHeader: {
    color: '#fff',
  },

  spore: {
    height: '8vh',
    marginRight: '12px',
  },

  main: {
    background: '#f2f2f2',
    borderRadius: '4px',
    padding: '12px',
    margin: '0 auto 50px auto',
    height: '80vh',
    width: '90vw',
  },
}));

export default App;
