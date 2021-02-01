import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { sdk } from '@clients';
import typedArrayToUrl from '@utils/typed-array-to-url';

const Photo = ({
  name,
}) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);

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
    <div>
      <Typography>{name}</Typography>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <img src={url} alt={name} />
      )}
    </div>
  );
};

export default Photo;
