import React, { Fragment, memo } from 'react';
import BarGraphicalRep from '../BIS_CommoCode/BarGraphicalRep';

const TmchGraphicalView = () => {
  return (
    <Fragment>
      <BarGraphicalRep />
    </Fragment>
  );
};

export default memo(TmchGraphicalView);
