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
      <Typography variant="h4"> Ask for a decentralized peer review</Typography>
      <Typography>
        A decentralized peer review consists in a smart contract that handles
        the decision on who will review an paper and the rewards for reviewing.
      </Typography>
    </FormControl>
  );
}
