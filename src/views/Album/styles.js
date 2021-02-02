/* eslint-disable */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  initContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  container: {
  },
  logo: {
    width: 200,
    userDrag: 'none',
  },
  lineContainer: {
    width: '100vw',
    overflow: 'hidden',
    height: 50,
  },
  line: {
    height: 20,
    width: '115vw',
    left: -30,
    position: 'relative',
    height: 87,
    top: -20,
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',
    flexDirection: 'column',
  },
  addButton:{ 
    marginTop: 20,
  },
  addButtonImg: {
    userDrag: 'none',
  },
  addButtonImgDisabled: {
    filter: 'grayscale(80%)',
  },
  photosContainer: {
    margin: 20,
    marginTop: 50,
    display: 'flex',
  },
  uploadInProgressContainer: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadInProgress: {
    color: 'white',
    fontFamily: 'introrust',
    fontWeight: 600,
    fontSize: 25,
  },
}));
