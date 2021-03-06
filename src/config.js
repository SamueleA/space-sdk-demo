const {
  REACT_APP_WS_AUTH_CHALLENGE_URL,
  REACT_APP_VAULT_SERVICE_URL,
  REACT_APP_VAULT_SERVICE_SALT_SECRET,
  REACT_APP_TEXTILE_HUB_ADDRESS,
} = process.env;


const config = {
  textileHubAddres: REACT_APP_TEXTILE_HUB_ADDRESS,
  authEndpoint: REACT_APP_WS_AUTH_CHALLENGE_URL,
  vault: {
    serviceUrl: REACT_APP_VAULT_SERVICE_URL,
    saltSecret: REACT_APP_VAULT_SERVICE_SALT_SECRET,
  },
};

export default config;