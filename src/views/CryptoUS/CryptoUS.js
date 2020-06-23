import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { CurrencyCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CurrencyList = () => {
  const classes = useStyles();

  const mockData = [{id:"BTCUSDT"},{id:"EOSUSDT"},{id:"ETHUSDT"},{id:"BNBUSDT"},{id:"ONTUSDT"},{id:"BCCUSDT"},{id:"ADAUSDT"},{id:"XRPUSDT"},{id:"TUSDUSDT"},{id:"TRXUSDT"},{id:"LTCUSDT"},{id:"ETCUSDT"},{id:"IOTAUSDT"},{id:"ICXUSDT"},{id:"NEOUSDT"},{id:"VENUSDT"},{id:"XLMUSDT"},{id:"QTUMUSDT"}];
  const [currencies] = useState(mockData);
  const createGrid = () => (
    currencies.map(currency => (
      <Grid
        item
        key={currency.id}
        lg={4}
        md={6}
        xs={12}
      >
        <CurrencyCard currency={currency} />
      </Grid>
    ))
  )

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {
            createGrid()
          }
        </Grid>
      </div>
    </div>
  );
};

export default CurrencyList;
