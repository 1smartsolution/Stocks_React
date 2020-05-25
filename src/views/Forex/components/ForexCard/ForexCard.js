import React from 'react';
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


const ForexCard = props => {
  const { className, symbol, rate, ...rest } = props;

  const classes = useStyles();

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
          {symbol}
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
              <strong>Rate:</strong> ${rate}<br/>
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ForexCard.propTypes = {
  className: PropTypes.string,
  currency: PropTypes.object.isRequired
};

export default ForexCard;
