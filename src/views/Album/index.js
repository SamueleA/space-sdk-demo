import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { sdk } from '@clients';
import Photo from './components/Photo';

const Album = () => {
  const history = useHistory();
  const [photos, setPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const getPhotos = async () => {
    const storage = await sdk.getStorage();
    const { items } = await storage.listDirectory({
      path: '/',
      bucket: 'personal',
      recursive: false,
    });
    setPhotos(items);
  };


  useEffect(() => {
    // todo change to !user.info
    const user = localStorage.getItem('user');

    if (!user) {
      history.push('/signin');
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

  return (
    <div>
      <Button
        onClick={addPhoto}
        variant="contained"
        color="primary"
        disabled={isUploading}
      >
        Add Photo
      </Button>
      {photos.map((photo) => (
        <Photo
          name={photo.name}
        />
      ))}
    </div>
  );
};

export default Album;
