import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';

export default function useCreateCollectible() {
  const { enqueueSnackbar } = useSnackbar();
  const { Moralis } = useMoralis();
  const { abi } = Articles;
  const options = {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MUMBAI,
    abi
  };

  return useMutation(
    async (data: any) => {
      const { name, description, image } = data;

      // upload image first:
      const imageFile = new Moralis.File(image.name, image);
      await imageFile.saveIPFS();
      const imageURL = `ipfs://${(imageFile as any).hash()}`;

      // then upĺoad uri metadata
      const jsonFile = new Moralis.File('file.json', {
        base64: btoa(JSON.stringify({ name, description, image: imageURL }))
      });

      await jsonFile.saveIPFS();
      const jsonIpfsLink = `ipfs://${(jsonFile as any).hash()}`;

      await Moralis.Web3.executeFunction({
        ...options,
        functionName: 'create',
        params: {
          _initialSupply: '10',
          _uri: jsonIpfsLink
        }
      });
    },

    {
      onSuccess: () => {
        enqueueSnackbar('article created', {
          variant: 'success'
        });
      },
      onError: (response) => {
        console.log(response);
      }
    }
  );
}
