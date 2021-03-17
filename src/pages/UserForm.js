import React from "react";
import intervalToDuration from "date-fns/intervalToDuration";
import { isValid } from "date-fns";

import axios from "axios";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import Components from "../components/Components";
import { useForm, Form } from "./useForm";
import PageHeader from "./PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "65%",
    marginRight: "10%",
  },
}));

const initialFValues = {
  name: "",
  email: "",
  number: "",
  birthday: new Date(),
};

const UserForm = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    console.log(temp);
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "This field is required.";
    if ("number" in fieldValues)
      temp.number = fieldValues.number ? "" : "This field is required.";

    if ("birthday" in fieldValues) {
      if (isValid(values.birthday) === true) {
        const duration = intervalToDuration({
          start: values.birthday,
          end: new Date(),
        });
        console.log(duration.years);
        temp.birthday =
          Number(duration.years) >= 18
            ? ""
            : "Age should be greater than 18 years";
      }
    }

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const saveToDatabase = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(values);
      const res = await axios.post(
        `https://mighty-anchorage-31173.herokuapp.com/users/register/`,
        body,
        config
      );
      console.log(res.data);
      if (res.status == 200) {
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveToDatabase();
      console.log(values);
      resetForm();
    }
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="Register for StackFusion! "
        subTitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />

      <Paper className={classes.pageContent}>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Components.Input
                variant="outlined"
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
              <Components.Input
                variant="outlined"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <Components.Input
                variant="outlined"
                label="Contact number"
                name="number"
                value={values.number}
                onChange={handleInputChange}
                error={errors.number}
              />

              <Components.DatePicker
                name="birthday"
                label="Date of birth"
                value={values.birthday}
                onChange={handleInputChange}
                error={errors.birthday}
              />

              <div>
                <Components.Button type="submit" text="Submit" />
                <Components.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                />
              </div>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </>
  );
};

export default UserForm;
