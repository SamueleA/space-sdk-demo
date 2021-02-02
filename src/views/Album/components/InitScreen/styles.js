/* eslint-disable */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  logo: {
    animation: '$pulse 2s linear infinite',
  },
  init: {
    marginTop: 20,
    animation: '$pulse 2s linear infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(0.95)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(0.95)',
    },
  },
}));
