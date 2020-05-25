import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  }
}));


const CurrencyCard = props => {
  const { className, currency, ...rest } = props;

  const classes = useStyles();

  const [currencyRez, setCurrencyData] = useState("");

  const id = currency.id;


  useEffect(() => {
    fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=crypto&currency='+id)
      .then(response => response.json())
      .then(result => {
          setCurrencyData(
            {
              bidPrice: +(result.bidPrice).toLocaleString(navigator.language, {minimumFractionDigits: 3, maximumFractionDigits: 3})
              , bidSize: +(result.bidSize).toLocaleString(navigator.language, {minimumFractionDigits: 0, maximumFractionDigits: 5})
              , askPrice: +(result.askPrice).toLocaleString(navigator.language, {minimumFractionDigits: 3, maximumFractionDigits: 3})
              , askSize: +(result.askSize).toLocaleString(navigator.language, {minimumFractionDigits: 0, maximumFractionDigits: 5})
            })
      })
      .catch(e => {
          console.log(e);
      });
  }, [id]);


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {currency.id.replace(/USDT/, '')}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              <strong>Bid price:</strong> ${currencyRez.bidPrice}<br/>
              <strong>Bid size:</strong> {currencyRez.bidSize}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              <strong>Ask price:</strong> ${currencyRez.askPrice}<br/>
              <strong>Ask size:</strong> {currencyRez.askSize}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

CurrencyCard.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.object.isRequired
};

export default CurrencyCard;
