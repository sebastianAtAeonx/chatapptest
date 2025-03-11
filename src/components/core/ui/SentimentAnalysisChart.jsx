import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';

function SentimentAnalysisChart({ chartData, dataLength }) {
  const [seriesNb] = useState(3);

  const highlightScope = {
    highlighted: 'series',
    faded: 'global',
  };

  const series = [
    {
      label: 'Positive',
      data: chartData.map((data) => data[0]),
    },
    {
      label: 'Negative',
      data: chartData.map((data) => data[1]),
    },
    {
      label: 'Neutral',
      data: chartData.map((data) => data[2]),
    },
  ].map((s) => ({ ...s, highlightScope }));

  const chartSetting = {
    yAxis: [
      {
        label: 'Sentiment (%)',
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-6px, 0)',
      },
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        height={300}
        series={series.slice(0, seriesNb).map((s) => ({ ...s, data: s.data.slice(0, dataLength) }))}
        skipAnimation={false}
        {...chartSetting}
      />
    </Box>
  );
}

export default SentimentAnalysisChart;
