import React from 'react';
import logo from '@assets/logo.svg';
import initalizing from '@assets/init.svg';

import useStyles from './styles';

const InitScreen = () => {
  const classes = useStyles();

  return (
    <>
      <img src={logo} alt="logo" className={classes.logo} />
      <img src={initalizing} alt="initalizing" className={classes.init} />
    </>
  );
};

export default InitScreen;