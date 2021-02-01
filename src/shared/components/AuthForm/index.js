import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const AuthForm = ({
  onSubmit,
  loading,
  backToText,
  backDestination,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const returnValues = {
    email,
    password,
  };

  const disabled = email === '' || password === '';

  return (
    <>
      <TextField
        disabled={loading}
        variant="outlined"
        placeholder="email"
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        onClick={() => history.push(backDestination)}
      >
        {backToText}
      </Button>
    </>
  );
};

export default AuthForm;
