import { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  FormControl,
  CircularProgress
} from '@material-ui/core';

import useCreateCollectible from '@hooks/chain/useCreateCollectible';

export default function Mint() {
  const [image, setImage] = useState<File>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const { mutate, isLoading } = useCreateCollectible();

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
  }, [image]);

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files[0]);
  };

  const callMint = () => {
    mutate({
      name,
      description,
      image
    });
  };

  return (
    <FormControl>
      <Typography variant="h4"> Mint a new article as a NFT</Typography>
      <Typography>
        First, the content of the article will be uploaded as an URI and after
        that it will call a function of the ERC1155 to mint this collectible
      </Typography>

      <TextField
        id="standard-multiline-flexible"
        label="name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        variant="outlined"
        rows={20}
        multiline
        id="standard-multiline-flexible"
        label="abstract"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button variant="contained" component="label">
        Upload File
        <input onChange={selectFile} type="file" hidden />
      </Button>
      <div>
        {preview && (
          <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography align="center"> Preview</Typography>
            <img
              src={preview}
              alt="article"
              style={{
                display: 'block',
                margin: 'auto',
                maxHeight: 'auto',
                maxWidth: '200px'
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="outlined" onClick={callMint}>
            Mint NFT!
          </Button>
        )}
      </div>
    </FormControl>
  );
}
