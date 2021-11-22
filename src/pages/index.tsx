import useQueryCollectibles from '@hooks/chain/useQueryCollectibles';
import ImgMediaCard from '@components/Card';
import { Container, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import SearchBar from '@components/SearchBar';

export default function Home() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQueryCollectibles(page);
  const { Moralis } = useMoralis();
  const [filter, setFilter] = useState('');
  const checkChain = async () => {
    const web3 = await (Moralis as any).enableWeb3();
    console.log((web3 as any).currentProvider.chainId);
    // 0x2a chainId of Kovan
    // 0x13881 chainId of Mumbai testnet
  };

  useEffect(() => {
    checkChain();
  });

  return (
    <>
      <SearchBar onClick={setFilter} />
      <Container>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {!isLoading &&
            data.nfts
              .filter((nft) => nft.name.toLowerCase().includes(filter))
              .map((nft, indx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid key={indx} item xs={4}>
                  <ImgMediaCard {...nft} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </>
  );
}
