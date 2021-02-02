import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { sdk } from '@clients';
import typedArrayToUrl from '@utils/typed-array-to-url';
import photoLoading from '@assets/photo-loading.svg';
import useStyles from './styles';

const Photo = ({
  name,
}) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);
  const classes = useStyles();

  const getPhotoUrl = async () => {
    setLoading(true);
    try {
      const storage = await sdk.getStorage();

      const response = await storage.openFile({
        bucket: 'personal',
        path: `/${name}`
      });
      const fileBytes = await response.consumeStream();
      const fileUrl = typedArrayToUrl([fileBytes.buffer], response.mimeType);
      
      setUrl(fileUrl);
    } catch(e) {
      console.error('Failed to fetch url', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPhotoUrl();
  }, []);

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>{name}</Typography>
      <div className={classes.imageContainer}>
        {loading ? (
          <img src={photoLoading} className={classes.photo} />
        ) : (
          <img src={url} alt={name} className={classes.photo} />
        )}
      </div>
    </div>
  );
};

export default Photo;
