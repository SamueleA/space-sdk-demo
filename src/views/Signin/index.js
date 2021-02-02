import React, { useState } from 'react';
import { fromString } from 'uuidv4';
import { VaultBackupType } from '@spacehq/sdk';
import { sdk } from '@clients';
import AuthFom from '@shared/components/AuthForm';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import logo from '@assets/logo.svg';

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const onSubmit = async (values) => {
    const {
      email,
      password,
    } = values;

    setLoading(true);

    try { 
      const users = await sdk.getUsers();

      const backupType = VaultBackupType.Email;
  
      const uuid = fromString(email);

      await users.recoverKeysByPassphrase(uuid, password, backupType);

      window.localStorage.setItem('user', uuid);

      history.push('/');
    } catch(e) {
      console.error('Failed to sign in', e);
    }
    setLoading(false);
  };

  return (
      <div className={classes.container}>
        <img src={logo} alt="logo" className={classes.logo} />
        <AuthFom
          onSubmit={onSubmit}
          loading={loading}
          backToText="Go to Sign up"
          backDestination="/signup"
          title="Sign in"
        />
      </div>
    );
};

export default Signin;