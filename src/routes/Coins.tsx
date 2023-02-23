import { Grid } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import SearchBox from '../components/SearchBox';
import { HomeIcon } from '../icons/HomeIcon';

const Container = styled.div`
  padding: 0px 20px;
  /* max-width: 480px; */
  margin: 0 auto;
`;

const CoinsList = styled.ul`
  width: 85vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;
const Coin = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  padding: 25px;
  cursor: pointer;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    color: ${(props) => props.theme.textColor};
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    transform: scale(1.05);
    a {
      color: ${(props) => props.theme.accentColor};
      font-weight: bolder;
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
  width: 35px;
  height: 3q5px;
  margin-right: 10px;
`;
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>('allCoins', fetchCoins);
  const [searchField, setSearchField] = useState('');
  console.log('data', data);
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.currentTarget.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
    console.log(searchField);
  };
  const newFilteredData = data?.filter((data) => {
    return data.name.toLocaleLowerCase().includes(searchField);
  });
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <SearchBox
        className={'coins-search-box'}
        onChangeHandler={onSearchChange}
        placeholder={'Search Coins...'}
      />
      {isLoading ? (
        <Loader> "Loading..."</Loader>
      ) : (
        <CoinsList>
          {newFilteredData?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
