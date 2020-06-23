import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ForexCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ForexList = () => {
  const classes = useStyles();

  const [forexRez, setForexData] = useState("");

  const getForexData = async () => {
    /*AUDUSD,CADCHF,EURCAD,EURUSD,GBPCAD,GBPUSD,JPYCAD,USDCAD,USDCHF,USDJPY,USDRON,USDRUB*/
    const response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=currencyRates&currency="AUDUSD","CADCHF"');
    const json = await response.json();
    setForexData({data: json});
  }
  getForexData();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              {forexRez.data.map(el => (
                <ForexCard symbol={el.symbol} rate={el.rate} />
              ))}
              }
            </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ForexList;
