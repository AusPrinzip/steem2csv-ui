import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import axios from 'axios'

const HOUR = 60 * 60 * 1000
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [operation, setOperation] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date(new Date().getTime() - 7 * 24 * HOUR));
  const [selectedUntilDate, setSelectedUntilDate] = React.useState(new Date());
  const [accountError, setAccountError] = React.useState(false);
  const [selectError, setSelectError] = React.useState(false);
  const rootAPI = process.env.NODE_ENV == 'production' ? "https://thawing-chamber-12594.herokuapp.com" : "http://localhost:5000"
  console.log(process.env.NODE_ENV)
  const handleAccountInput = (event) => {
    setAccount(event.target.value)
  };
  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
    console.log(selectedFromDate)
  };
  const handleUntilDateChange = (date) => {
    setSelectedUntilDate(date);
    console.log(selectedUntilDate)
  };
  const handleChange = (event) => {
    setOperation(event.target.value);
  };



  const handleButtonClick = (event) => {
    if (!account.length) {
      return setAccountError(true)
    } else {
      setAccountError(false)
    }
    if (!operation) {
      return setSelectError(true)
    } else {
      setSelectError(false)
    }
    let params = { operation: operation, from: selectedFromDate, until: selectedUntilDate, account: account}
    axios.get('http://localhost:5000/api/v1', { params: params })
    .then((res) => console.log(res))
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog#1"
              label="From"
              format="MM/dd/yyyy"
              value={selectedFromDate}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog#2"
              label="Until"
              format="MM/dd/yyyy"
              value={selectedUntilDate}
              onChange={handleUntilDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Operation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={operation}
              onChange={handleChange}
              error={selectError}
            >
              <MenuItem value={'transfer'}>Transfer</MenuItem>
              <MenuItem value={'create_claimed_account'}>Account Create</MenuItem>
              <MenuItem value={'comment'}>Comment</MenuItem>
              <MenuItem value={'curation_reward'}>Curation Reward</MenuItem>
              <MenuItem value={'comment_benefactor_reward'}>Benefactor Reward</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField required error={accountError} onChange={handleAccountInput} id="account" label="Account"/>
            </form>
          </Grid>
          <Grid item xs>
            <Button href={encodeURI(rootAPI + "/api/v1/csv?operation=" + operation + "&account=" + account + '&from=' + selectedFromDate.toString() + '&until=' + selectedUntilDate.toString()) } variant="contained">Download</Button>
          </Grid>
      </Grid>
    </div>
  );
}
