import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import { useOutletContext } from 'react-router-dom';
import { isDarkAtom } from '../atom';
import { useRecoilValue } from 'recoil';

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: string;
}

// interface CharProps {
//   coinId: string;
// }

export default function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const coinId = useOutletContext<string>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexCharts
          //   type='line'
          //   series={[
          //     {
          //       name: 'Price',
          //       data: data?.map((price) => parseFloat(price.close)) ?? [],
          //     },
          //   ]}
          //   options={{
          //     theme: { mode: 'dark' },
          //     chart: {
          //       height: 300,
          //       width: 500,
          //       toolbar: { show: false },
          //       background: 'transparent',
          //     },
          //     stroke: { curve: 'smooth', width: 4 },
          //     grid: { show: false },
          //     yaxis: { show: false },
          //     xaxis: {
          //       axisTicks: { show: false },
          //       axisBorder: { show: false },
          //       labels: { datetimeFormatter: { month: "MMM 'yy" }, show: false },

          //       categories: data?.map(
          //         (price) => new Date(price.time_close * 1000)
          //       ),
          //     },
          //     fill: {
          //       type: 'gradient',
          //       gradient: {
          //         gradientToColors: ['#0be881'],
          //         stops: [0, 100],
          //       },
          //     },
          //     colors: ['#0fbcf9'],
          //     tooltip: {
          //       y: {
          //         formatter: (value) => `$ ${value.toFixed(4)}`,
          //       },
          //     },
          //   }}
          // />
          type='candlestick'
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      parseFloat(price.open),
                      parseFloat(price.high),
                      parseFloat(price.low),
                      parseFloat(price.close),
                    ],
                  };
                }),
              },
            ] as any
          }
          options={{
            theme: { mode: 'dark' },
            chart: {
              type: 'candlestick',
              height: 450,
              background: 'transparent',
            },
            title: {
              text: 'CandleStick Chart',
              align: 'left',
            },
            xaxis: {
              type: 'datetime',
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { datetimeFormatter: { month: "MMM 'yy" }, show: false },

              categories: data?.map(
                (price) => new Date(price.time_close * 1000)
              ),
            },
            yaxis: {
              show: false,
            },
            grid: { show: false },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#0be881',
                  downward: '#0fbcf9',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
