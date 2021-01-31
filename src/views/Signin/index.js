import React, { useState } from 'react';
import { BrowserStorage, Users, VaultBackupType } from '@spacehq/sdk';
import AuthFom from '@shared/components/AuthForm';
import config from '@config';

const Signin = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    const {
      username,
      password,
    } = values;

    setLoading(true);

    try { 
      const users = await Users.withStorage(new BrowserStorage(), {
        endpoint: config.authEndpoint,
        vaultServiceConfig: {
          serviceUrl: config.vault.serviceUrl,
          saltSecret: config.vault.saltSecret,
        },
      });
  
      const backupType = VaultBackupType.Google;
  
      const recoveredUser = await users.recoverKeysByPassphrase(username, password, backupType);
    } catch(e) {
      console.error('Failed to sign in', e);
    }
    setLoading(false);
  };

  return (
      <div>
        SIGNIN
        <AuthFom
          onSubmit={onSubmit}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    );
};

export default Signin;