import React, { Fragment, memo } from 'react';
// import PharmacyWise from '../BIS_CommoCode/PharmacyWise';
// import LineChartRep from '../BIS_CommoCode/LineChartRep';
import ComparisonChart from '../BIS_CommoCode/ComparisonChart';
// import GraphicalBarChart from '../BIS_CommoCode/GraphicalBarChart';
// import PolarGraph from '../BIS_CommoCode/PolarGraph';
import { Box, Typography } from '@mui/material';
import OverallSalesProgress from '../BIS_CommoCode/SalesProgress/OverallSalesProgress';
import LastThreeYearsComparison from '../BIS_CommoCode/LastThreeYearsComparison';

const TmchGraphicalView = () => {

  return (
    <Fragment>
      <Box>
        <Typography textAlign="center" sx={{ fontWeight: 'bold', fontSize: 25, color: 'rgba(var(--input-font-color))', mt: 3 }}>
          Pharmacy Sales
        </Typography>
      </Box>
      <Box>
        <OverallSalesProgress />
        <Box sx={{ mt: 10 }}>
          <ComparisonChart />
        </Box>
        {/* <Box sx={{ mt: 10 }}>
          <LastThreeYearsComparison />
        </Box> */}
        {/* <Box sx={{ mt: 10 }}>
          <PharmacyWise />
        </Box>
        <Box sx={{ mt: 10 }}>
          <LineChartRep />
        </Box>
        <Box sx={{ mt: 10 }}>
          <ComparisonChart />
        </Box>
        <Box sx={{ mt: 10, width: '100%' }}>
          <GraphicalBarChart />
        </Box>
        <Box sx={{ mt: 10, width: '100%' }}>
          <PolarGraph />
        </Box> */}
      </Box>
    </Fragment>
  );
};

export default memo(TmchGraphicalView);
