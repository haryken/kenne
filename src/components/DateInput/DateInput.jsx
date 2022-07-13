import React from 'react';
import DatePicker from 'react-datepicker';
import { useField } from 'formik';

const DateInput = ({ formikSetFieldValue, formikValues, setFieldTouched, ...props }) => {
  const [field] = useField(props);

  return (
    <DatePicker
      {...props}
      {...field}
      dateFormat="dd/MM/yyyy"
      selected={(formikValues[props.name] && new Date(formikValues[props.name])) || null}
      onChange={(date) => {
        setFieldTouched(`${props.name}`);
        formikSetFieldValue(`${props.name}`, new Date(date));
      }}
      placeholderText="dd/MM/yyyy"
    />
  );
};

export default DateInput;
