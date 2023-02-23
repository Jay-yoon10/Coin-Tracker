import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useOutletContext } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import styled from 'styled-components';

export interface IHistoricalData {
  time_open: number;
  time_close?: number;
  open?: string;
  high?: string;
  low?: string;
  close?: string;
  volume?: string;
  market_cap?: string;
}

export default function BasicTable() {
  const coinId = useOutletContext<string>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 50000,
    }
  );
  return (
    <TableContainer
      component={Paper}
      sx={{
        minWidth: 540,
        maxHeight: 450,
        backgroundColor: 'transparent',
        color: 'inherit',
      }}
    >
      <Table sx={{ backgroundColor: 'inherit' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'inherit' }}>Date (last 21 days)</TableCell>
            <TableCell sx={{ color: 'inherit' }} align='right'>
              High(USD)
            </TableCell>
            <TableCell sx={{ color: 'inherit' }} align='right'>
              Low(USD)
            </TableCell>
            <TableCell sx={{ color: 'inherit' }} align='right'>
              Open(USD)
            </TableCell>
            <TableCell sx={{ color: 'inherit' }} align='right'>
              Close(USD)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.time_open}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell sx={{ color: 'inherit' }} component='th' scope='row'>
                {new Date(row.time_open * 1000).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ color: 'inherit' }} align='right'>
                $ {row.high}
              </TableCell>
              <TableCell sx={{ color: 'inherit' }} align='right'>
                $ {row.low}
              </TableCell>
              <TableCell sx={{ color: 'inherit' }} align='right'>
                $ {row.open}
              </TableCell>
              <TableCell sx={{ color: 'inherit' }} align='right'>
                $ {row.close}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
