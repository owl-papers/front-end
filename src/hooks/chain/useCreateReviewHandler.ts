import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useMoralis } from 'react-moralis';
import ReviewHandler from 'src/contracts/ReviewHandler.json';
import LinkToken from 'src/contracts/LinkToken';

export default function useCreateCollectible() {
  const { enqueueSnackbar } = useSnackbar();
  const { Moralis } = useMoralis();
  const { abi, bytecode } = ReviewHandler;
  const linkAbi = LinkToken;

  const createContract = useQuery(
    'deploy-review-contract',
    async () => {
      const web3 = await Moralis.Web3.enableWeb3();
      const reviewHandler = new web3.eth.Contract(abi);
      const payload = {
        data: bytecode,
        arguments: [
          '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
          '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
          '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
          web3.utils.toWei('0.0001', 'ether')
        ]
      };
      const [current] = await web3.eth.getAccounts();
      const parameter = {
        from: current
      };
      // '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
      // '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
      // '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
      // '0.0001'
      const newContractInstance = await reviewHandler
        .deploy(payload)
        .send(parameter, (err, transactionHash) => {
          console.log('Transaction Hash :', transactionHash);
        })
        .on('confirmation', () => {});
      const ReviewHandlerClass = Moralis.Object.extend('ReviewHandler');
      const obj = new ReviewHandlerClass();
      obj.set('address', newContractInstance.options.address);
      obj.set('creator', current);
      obj.save();
      return { deployedAt: newContractInstance.options.address };
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        enqueueSnackbar('review contract deployed', {
          variant: 'success'
        });
      },
      onError: (response) => {
        enqueueSnackbar(String(response), {
          variant: 'error'
        });
      }
    }
  );

  const fundWithLink = useMutation(
    async (reviewContractAddress: string) => {
      const web3 = await Moralis.Web3.enableWeb3();
      const [current] = await web3.eth.getAccounts();
      const LinkTokenContract = await new web3.eth.Contract(
        linkAbi,
        '0x326C977E6efc84E512bB9C30f76E30c160eD06FB'
      );
      // checks balances
      // const res = await LinkTokenContract.methods.balanceOf(current).call();

      await LinkTokenContract.methods
        .transfer(reviewContractAddress, web3.utils.toWei('0.0003', 'ether'))
        .send({ from: current });
    },
    {
      onSuccess: () => {
        enqueueSnackbar('contract funded with Link', {
          variant: 'success'
        });
      },
      onError: (response) => {
        enqueueSnackbar(String(response), {
          variant: 'error'
        });
      }
    }
  );

  const genRandom = useMutation(
    async (reviewContractAddress: string) => {
      const web3 = await Moralis.Web3.enableWeb3();
      const [current] = await web3.eth.getAccounts();
      const reviewHandler = new web3.eth.Contract(abi, reviewContractAddress);
      await reviewHandler.methods.getRandomNumber().send({ from: current });
    },
    {
      onSuccess: () => {
        enqueueSnackbar('randomness generator function called', {
          variant: 'success'
        });
      },
      onError: (response) => {
        enqueueSnackbar(String(response), {
          variant: 'error'
        });
      }
    }
  );

  const setPaperReview = useMutation(
    async ({ reviewContractAddress, paperNftAddress, tokenId }: any) => {
      const web3 = await Moralis.Web3.enableWeb3();
      const [current] = await web3.eth.getAccounts();
      const reviewHandler = new web3.eth.Contract(abi, reviewContractAddress);
      await reviewHandler.methods
        .setPaperToReview(paperNftAddress, tokenId)
        .send({ from: current });
    },
    {
      onSuccess: () => {
        enqueueSnackbar('nft to review setted', {
          variant: 'success'
        });
      },
      onError: (response) => {
        enqueueSnackbar(String(response), {
          variant: 'error'
        });
      }
    }
  );

  const addReward = useMutation(
    async ({ reviewContractAddress, reward }: any) => {
      const web3 = await Moralis.Web3.enableWeb3();
      const [current] = await web3.eth.getAccounts();
      const reviewHandler = new web3.eth.Contract(abi, reviewContractAddress);
      await reviewHandler.methods.accReward().send({
        from: current,
        value: web3.utils.toWei(String(reward), 'ether')
      });
    },
    {
      onSuccess: () => {
        enqueueSnackbar('reward accumulated', {
          variant: 'success'
        });
      },
      onError: (response) => {
        enqueueSnackbar(String(response), {
          variant: 'error'
        });
      }
    }
  );

  return { createContract, fundWithLink, genRandom, addReward, setPaperReview };
}
