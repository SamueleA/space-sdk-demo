import React, { useState } from 'react';
import { VaultBackupType } from '@spacehq/sdk';
import { sdk } from '@clients';
import AuthFom from '@shared/components/AuthForm';
import { useHistory } from 'react-router-dom';

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = async (values) => {
    const {
      email,
      password,
    } = values;

    setLoading(true);

    try { 
      const users = await sdk.getUsers();

      const backupType = VaultBackupType.Email;
  
      await users.recoverKeysByPassphrase(email, password, backupType);

      window.localStorage.setItem('user', email);

      history.push('/');
    } catch(e) {
      console.error('Failed to sign in', e);
    }
    setLoading(false);
  };

  return (
      <div>
        <AuthFom
          onSubmit={onSubmit}
          loading={loading}
          backToText="Go to Signup"
          backDestination="/signup"
        />
      </div>
    );
};

export default Signin;