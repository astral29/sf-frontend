import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "./PageHeader";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import { Paper, makeStyles } from "@material-ui/core";

import Table from "./Table";
//import { useEffect } from "react";

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

const Landing = () => {
  const classes = useStyles();
  const headCells = [
    { prop: "name", name: "Name" },
    { prop: "email", name: "Email" },
    { prop: "birthday", name: "D.O.B" },
    { prop: "number", name: "Contact No" },
  ];
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get(
      "https://mighty-anchorage-31173.herokuapp.com/users/"
    );
    const fetchedUsers = res.data;
    const sanit = fetchedUsers.map((user) => {
      var bday = user.birthday.substring(0, 10);
      console.log(bday);
      return {
        ...user,
        birthday: bday,
      };
    });
    setUsers(sanit);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <PageHeader
        title="All users here! "
        subTitle="Form design with validation"
        icon={<HomeWorkIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Table header={headCells} data={users} />
      </Paper>
    </>
  );
};

export default Landing;
