import { useState } from 'react';
import { Button, Typography, FormControl, TextField } from '@material-ui/core';

import useCreateReviewHandler from '@hooks/chain/useCreateReviewHandler';

export default function Ask() {
  const [reward, setReward] = useState('');
  const [tokenId, setTokenId] = useState('');

  const {
    fundWithLink: { mutate: fund },
    createContract: { data, refetch, isLoading },
    genRandom: { mutate: randomize },
    addReward: { mutate: add },
    setPaperReview: { mutate: setPaper }
  } = useCreateReviewHandler();

  return (
    <FormControl>
      <Typography variant="h4"> Ask for a decentralized peer review</Typography>
      <Typography>
        A decentralized peer review consists in a smart contract that handles
        the decision on who will review an paper and the rewards for reviewing.
      </Typography>

      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => refetch()}
      >
        create
      </Button>

      <Typography>
        After deployed, your review handler contract will show below:
      </Typography>
      <Typography>
        {isLoading ? 'deploying contract...' : `${data?.deployedAt}`}
      </Typography>

      <Typography>
        Once your contract is deployed and the address is shown above, you
        <strong> must </strong>
        fund it with link
      </Typography>

      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => fund(data?.deployedAt)}
      >
        Fund With Link
      </Button>

      <Typography>
        After the contract is funded with link, you should be able to generate
        the random number, necessary to decide who will be able to review.
      </Typography>

      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => randomize(data?.deployedAt)}
      >
        Generate randomness
      </Button>

      <Typography>
        Set the Paper NFT tokenID that is going to be reviewed by other
        researchers. It needs to be a tokenID that you were the creator.
      </Typography>

      <TextField
        id="standard-multiline-flexible"
        label="tokenId"
        type="number"
        margin="normal"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />

      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() =>
          setPaper({
            reviewContractAddress: data?.deployedAt,
            paperNftAddress: process.env.NEXT_PUBLIC_ERC1155_ADDRESS_MUMBAI,
            tokenId
          })}
      >
        Set token ID
      </Button>
      <Typography>
        To incentivize reviewers to create reviews, add a generous reward (in
        units of matic):
      </Typography>

      <TextField
        id="standard-multiline-flexible"
        label="reward value"
        type="number"
        margin="normal"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
      />
      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => add({ reviewContractAddress: data?.deployedAt, reward })}
      >
        Set reward
      </Button>
    </FormControl>
  );
}
