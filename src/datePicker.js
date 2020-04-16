import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const HOUR = 60 * 60 * 1000
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date() - 24 * HOUR);
  const [selectedUntilDate, setSelectedUntilDate] = React.useState(new Date());

  const handleFromDateChange = (date) => {
    setSelectedFromDate(date);
    console.log(selectedFromDate)
  };
  const handleUntilDateChange = (date) => {
    setSelectedUntilDate(date);
    console.log(selectedUntilDate)
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="From"
          format="MM/dd/yyyy"
          value={selectedFromDate}
          onChange={handleFromDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Until"
          format="MM/dd/yyyy"
          value={selectedUntilDate}
          onChange={handleUntilDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
