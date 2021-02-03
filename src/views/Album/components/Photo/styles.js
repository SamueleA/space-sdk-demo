/* eslint-disable */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    margin: 20,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  photo: {
    width: 300,
    userDrag: 'none',
    borderRadius: 5,
  },
  title: {
    color: 'white',
    fontFamily: 'introrust',
    fontWeight: 600,
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
  },
  background: {
    backgroundColor: '#002068',
    borderRadius: 5,
  },
}));
