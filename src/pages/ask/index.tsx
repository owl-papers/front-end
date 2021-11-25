import { Button, Typography, FormControl } from '@material-ui/core';

import useCreateReviewHandler from '@hooks/chain/useCreateReviewHandler';

export default function Mint() {
  const {
    fundWithLink: { mutate },
    createContract: { data, refetch, isLoading }
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
        onClick={() => mutate(data?.deployedAt)}
      >
        Fund With Link
      </Button>
    </FormControl>
  );
}
