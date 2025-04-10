import React, { Fragment, memo } from 'react';
import { Box, Typography } from '@mui/material';
import OverallSalesProgress from '../BIS_CommoCode/SalesProgress/OverallSalesProgress';
import ComparisonChart from '../BIS_CommoCode/ComparisonChart';
import LastThreeYearsComparison from '../BIS_CommoCode/LastThreeYearsComparison';

const TmchGraphicalView = () => {

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "row", mt: 1, flexWrap: "wrap", width: "100%" }}>
        <Box sx={{
          display: "flex", flexDirection: "row", mt: 1, gap: 1, flexWrap: "wrap", width: "100%",
        }}>
          <Box sx={{
            width: { sm: "100%", xl: "50%" }, height: 455, border: 1, overflowX: "auto", overflowY: "auto", borderColor: "#3F84AA",
            backgroundColor: 'rgba(var(--graph-bg-color))'
          }}>
            <Typography sx={{ fontSize: { xl: 25, sm: 25, textAlign: "center", color: 'rgb(var(--graph-font-clr))', backgroundColor: 'rgba(var(--graph-bg-color))' } }}>Overall Sales Graph</Typography>
            <OverallSalesProgress />
          </Box>
          <Box sx={{ flex: 1, height: 455, border: 1, overflowX: "auto", overflowY: "auto", borderColor: "#3F84AA", backgroundColor: 'rgba(var(--graph-bg-color))' }}>
            Second
          </Box>
        </Box>
        <Box sx={{ width: "100%", minHeight: 455, border: 1, borderColor: "#3F84AA", p: 1, width: "100%", flexDirection: "row", mt: 1, backgroundColor: 'rgba(var(--graph-bg-color))' }}>
          <Typography sx={{ textAlign: "center", fontSize: 25, mt: 1, color: 'rgb(var(--graph-font-clr))' }}> Comparison Chart</Typography>
          <ComparisonChart />
        </Box>
        <Box sx={{
          width: "100%",
          height: 455,
          border: 1,
          borderColor: "#3F84AA",
          backgroundColor: 'rgba(var(--graph-bg-color))',
          overflowX: "auto",
          overflowY: "auto",
          mt: 1
        }}>
          <Typography sx={{ textAlign: "center", fontSize: 25, mt: 1, color: 'rgb(var(--graph-font-clr))' }}>Last Three Years Comparison Chart</Typography>
          <LastThreeYearsComparison />
        </Box>
      </Box>
    </Fragment >
  );
};

export default memo(TmchGraphicalView);

