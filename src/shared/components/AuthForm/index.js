import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

const AuthForm = ({
  title,
  onSubmit,
  loading,
  backToText,
  backDestination,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const returnValues = {
    email,
    password,
  };

  const disabled = email === '' || password === '';

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>
          {title}
        </Typography>
        <TextField
          className={classes.field}
          disabled={loading}
          variant="outlined"
          placeholder="email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          disabled={loading}
          variant="outlined"
          placeholder="password"
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          fullWidth
        />
      </CardContent>
      <CardActions>
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
      </CardActions>
    </Card>
  );
};

export default AuthForm;
