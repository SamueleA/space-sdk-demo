import React, { useState } from 'react';
import { VaultBackupType } from '@spacehq/sdk';
import { sdk, apiClient } from '@clients';
import AuthFom from '@shared/components/AuthForm';
import { SALT } from '@shared/constants';
import { useHistory } from 'react-router-dom';
import logo from '@assets/logo.svg';
import Web3 from 'web3';

import useStyles from './styles';

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
      const web3 = new Web3();
      
      const hash = web3.utils.sha3(`${email}${password}${SALT}`);

      const keypair = web3.eth.accounts.privateKeyToAccount(hash);

      const users = await sdk.getUsers();

      const backupType = VaultBackupType.Email;
  
      const { data } = await apiClient.identities.getByAddress({
        token: '',
        addresses: [keypair.address],
      });

      await users.recoverKeysByPassphrase(data.data.uuid, keypair.privateKey, backupType);

      window.localStorage.setItem('user', email);

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