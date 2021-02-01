import React, { useState } from 'react';
import AuthForm from '@shared/components/AuthForm';
import { BrowserStorage, Users, VaultBackupType } from '@spacehq/sdk';
import config from '@config';

const Signup = () => {
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

      // createIdentity generate a random keypair identity
      const identity = await users.createIdentity();

      // the new keypair can be used to authenticate a new user
      // `users.authenticate()` generates hub API session tokens for the keypair identity.
      const user = await users.authenticate(identity);

      const backupType = VaultBackupType.Email;

      await users.backupKeysByPassphrase(username, password, backupType, user.identity);
    } catch(e) {
      console.error('Failed to sign up', e);
    }
    setLoading(false);
  };

  return (
    <div>
      <AuthForm
        onSubmit={onSubmit}
        loading={loading} />
    </div>
  );
};

export default Signup;