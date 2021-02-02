import React, { useState } from 'react';
import AuthForm from '@shared/components/AuthForm';
import { VaultBackupType } from '@spacehq/sdk';
import { sdk } from '@clients';
import { useHistory } from 'react-router-dom';
import logo from '@assets/logo.svg';
import useStyles from './styles';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const classes = useStyles();

  const onSubmit = async (values) => {
    const {
      email,
      password,
    } = values;

    setLoading(true);
    try {
      const users = await sdk.getUsers();

      // createIdentity generate a random keypair identity
      const identity = await users.createIdentity();

      // the new keypair can be used to authenticate a new user
      // `users.authenticate()` generates hub API session tokens for the keypair identity.
      const user = await users.authenticate(identity);

      const backupType = VaultBackupType.Email;

      await users.backupKeysByPassphrase(email, password, backupType, user.identity);
    
      window.localStorage.setItem('user', email);

      history.push('/');
    } catch(e) {
      console.error('Failed to sign up', e);
    }
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <img src={logo} alt="logo" className={classes.logo} />
      <AuthForm
        onSubmit={onSubmit}
        loading={loading}
        backToText="Go to Sign in"
        backDestination="/signin"
        title="Create new account"
      />
    </div>
  );
};

export default Signup;