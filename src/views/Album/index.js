import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';
import { sdk } from '@clients';
import logo from '@assets/logo.svg';
import button from '@assets/button.svg';
import classnames from 'classnames';

import InitScreen from './components/InitScreen';
import Photo from './components/Photo';
import useStyles from './styles';
import { Typography } from '@material-ui/core';

const Album = () => {
  const [init, setInit] = useState(true);
  const history = useHistory();
  const [photos, setPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const classes = useStyles();

  const getPhotos = async () => {
    setInit(true);
    const storage = await sdk.getStorage();
    const { items = [] } = await storage.listDirectory({
      path: '/',
      bucket: 'personal',
      recursive: false,
    });
    setPhotos(items);
    setInit(false);
  };


  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      history.push('/signup');
      return;
    }
    getPhotos();
  }, []);

  const addItemsToStorage = async ({
    sourcePaths,
    targetPath,
  }) => {
    setIsUploading(true);
    const storage = await sdk.getStorage();
    window.onbeforeunload = () => false;

    const uploadResponse = await storage.addItems({
      bucket: 'personal',
      files: sourcePaths.map(({ data, path, mimeType }) => ({
        data,
        path,
        mimeType,
      })),
    });

    uploadResponse.once('done', async () => {
      window.onbeforeunload = null;
      const { items } = await storage.listDirectory({
        path: '/',
        bucket: 'personal',
        recursive: false,
      });
      
      setPhotos(items);

      setIsUploading(false);
    });
  };

  const addPhoto = async () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('multiple', '');

    fileInput.addEventListener('change', (event) => {
      const sourcePaths = Array.from(event.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        data: file,
        mimeType: file.type,
        path: file.webkitRelativePath || file.name,
      }));

      addItemsToStorage({
        sourcePaths,
        targetPath: '/',
      });
    });

    fileInput.type = 'file';
    fileInput.click();
  };

  if (init) {
    return (
      <div className={classes.initContainer}>
        <InitScreen />
      </div>
    );
  }


  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <img src={logo} className={classes.logo} />
        <ButtonBase
          className={classes.addButton}
          onClick={addPhoto}
          disabled={isUploading}
        >
          <img
            className={classnames(classes.addButtonImg, {
              [classes.addButtonImgDisabled]: isUploading,
            })}
            src={button}
          />
        </ButtonBase>
        <div className={classes.uploadInProgressContainer}>
          {isUploading && (
            <Typography className={classes.uploadInProgress}>
              Upload in progress...
            </Typography>
          )}
        </div>
      </div>
      <div className={classes.photosContainer}>
        {photos.map((photo) => (
          <Photo
            name={photo.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Album;
