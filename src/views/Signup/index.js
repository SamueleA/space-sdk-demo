import React, { useState } from 'react';
import AuthForm from '@shared/components/AuthForm';
import { VaultBackupType } from '@spacehq/sdk';
import { sdk, apiClient } from '@clients';
import { useHistory } from 'react-router-dom';
import logo from '@assets/logo.svg';
import Web3 from 'web3';
import { SALT } from '@shared/constants';
import classnames from 'classnames';

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
      const web3 = new Web3();
      
      const hash = web3.utils.sha3(`${email}${password}${SALT}`);

      const keypair = web3.eth.accounts.privateKeyToAccount(hash);
      
      const users = await sdk.getUsers();

      // createIdentity generate a random keypair identity
      const identity = await users.createIdentity();

      // the new keypair can be used to authenticate a new user
      // `users.authenticate()` generates hub API session tokens for the keypair identity.
      const spaceUser = await users.authenticate(identity);

      const backupType = VaultBackupType.Email;

      const { data } = await apiClient.identity.update({
        token: spaceUser.token,
        email,
        displayName: keypair.address,
      });

      await users.backupKeysByPassphrase(data.data.uuid, keypair.privateKey, backupType, identity);

      await apiClient.identity.addEthAddress({
        provider: backupType,
        token: spaceUser.token,
        address: keypair.address,
      });
    
      window.localStorage.setItem('user', email);

      history.push('/');
    } catch(e) {
      console.error('Failed to sign up', e);
    }
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <img 
        src={logo}
        alt="logo"
        className={classnames(classes.logo, {
          [classes.pulse]: loading,
        })}
      />
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