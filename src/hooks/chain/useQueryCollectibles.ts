import { useQuery } from 'react-query';
import { useMoralis } from 'react-moralis';

type Nft = {
  image: string;
  description: string;
  name: string;
};

export default function useQueryCollectibles(queryPage) {
  const { Moralis } = useMoralis();
  (Moralis as any).enableWeb3();

  const query = async (page) => {
    const art = Moralis.Object.extend('ArticlesMinted');
    const aQuery = new Moralis.Query(art);
    const results = await aQuery.limit(9).skip(page).find();
    const parsedResults = results.map((result) => {
      return {
        ...result.attributes,
        image: `https://gateway.ipfs.io/ipfs/${result.attributes.image.replace(
          'ipfs://',
          ''
        )}`
      } as Nft;
    });

    return { nfts: parsedResults };
  };

  return useQuery(['get/collectibles', queryPage], () => query(queryPage));
}
