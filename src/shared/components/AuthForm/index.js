import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const AuthForm = ({
  onSubmit,
  loading,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const returnValues = {
    username,
    password,
  };

  const disabled = username === '' || password === '';

  return (
    <>
      <TextField
        disabled={loading}
        variant="outlined"
        placeholder="username"
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        disabled={loading}
        variant="outlined"
        placeholder="password"
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Button
        disabled={disabled || loading}
        onClick={() => onSubmit(returnValues)}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </>
  );
};

export default AuthForm;
