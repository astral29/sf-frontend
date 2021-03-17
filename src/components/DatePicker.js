import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {
  const { name, label, value, onChange, error } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        id="date-picker-dialog"
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MM/dd/yyyy"
        name={name}
        value={value}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        {...(error && { error: true, helperText: error })}
      />
    </MuiPickersUtilsProvider>
  );
}
