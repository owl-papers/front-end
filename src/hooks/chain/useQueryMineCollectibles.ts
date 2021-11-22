import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';
import Articles from 'src/contracts/Articles.json';
import axiosInstance from '@api/axios';

interface NftType {
  name: string;
  description: string;
  image: string;
  balance: string;
}

interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

export default function useQueryMineCollectibles() {
  const { Moralis } = useMoralis();
  const { abi } = Articles;

  const query = async () => {
    const web3 = await (Moralis as any).enableWeb3();
    const [current] = await web3.eth.getAccounts();
    const options = {
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MUMBAI,
      abi
    };

    const lastId = await Moralis.Web3.executeFunction({
      ...options,
      functionName: 'getLatestId'
    });

    const balances = [];
    for (let i = 0; i < lastId; i += 1) {
      const balance = Moralis.Web3.executeFunction({
        ...options,
        functionName: 'balanceOf',
        params: {
          account: current,
          id: String(i)
        }
      });
      balances.push(balance);
    }

    const resolvedBalances = (await Promise.allSettled<Promise<any>[]>(
      balances
    )) as PromiseFulfilledResult<any>[];

    const uris = [];
    for (let i = 0; i < lastId; i += 1) {
      const uri = Moralis.Web3.executeFunction({
        ...options,
        functionName: 'uri',
        params: {
          tokenId: String(i)
        }
      });
      uris.push(uri);
    }

    let urls = await Promise.all(uris);
    urls = urls.map((r: string) => {
      const ipfsHash = r.replace('ipfs://', '');
      return `https://gateway.ipfs.io/ipfs/${ipfsHash}`;
    });
    const resolvedPromises = await Promise.allSettled<Promise<any>[]>(
      urls.map(async (url) => {
        const resp = await axiosInstance.get(url);
        return resp.data;
      })
    );

    const nfts = resolvedPromises
      .filter(({ status }) => status === 'fulfilled')
      .map((p, i) => {
        const rp = p as PromiseFulfilledResult<NftType>;
        if (rp.value !== undefined) {
          const {
            value: { image }
          } = rp;
          const imgIpfsHash = image.replace('ipfs://', '');
          rp.value.image = `https://gateway.ipfs.io/ipfs/${imgIpfsHash}`;
          rp.value.balance = resolvedBalances[i].value;
          return rp.value as NftType;
        }
        return null;
      })
      .filter((item) => item !== null && item.balance !== '0');

    return { nfts };
  };

  return useQuery(['get/mine-collectibles'], () => query());
}
