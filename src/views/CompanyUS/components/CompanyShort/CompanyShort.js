import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Slider,
  Grid,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 10,
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
    , margin: 20
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  progress: {
    marginLeft: theme.spacing(3)
  },
  hr: {
    marginBottom: theme.spacing(2)
  },
  chartButtons: {
    paddingBottom: theme.spacing(2)
  }
}));



const CompanyShort = props => {
  const { companyRez } = props;

  const companyData = companyRez.companyData;

  const classes = useStyles();

  if ((companyData !== undefined) && (typeof(companyData) == 'object'))
  {
    const marks = [
      {
        value: companyRez.statsData.week52low,
        label: '$'+companyRez.statsData.week52low,
      },
      {
        value: companyRez.statsData.week52high,
        label: '$'+companyRez.statsData.week52high,
      },
    ];
    const minVl = companyRez.statsData.week52low;
    const maxVl = companyRez.statsData.week52high;

    const marksToday = [
      {
        value: companyRez.previousData.low,
        label: '$'+companyRez.previousData.low,
      },
      {
        value: companyRez.previousData.high,
        label: '$'+companyRez.previousData.high,
      },
    ];
    const minVlToday = companyRez.previousData.low;
    const maxVlToday = companyRez.previousData.high;

    const todayDate = new Date();
    let lastPrice = companyRez.quoteData.close;
    if (companyRez.quoteData.iexRealtimePrice !== null)
    {
      lastPrice = companyRez.quoteData.iexRealtimePrice;
    }

    let latestVolume = 0;
    if (companyRez.quoteData.latestVolume !== null)
    {
      latestVolume = companyRez.quoteData.latestVolume;
    }

    return (
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="row" spacing={2}>
                    {companyRez.logoData.url !== null && companyRez.logoData.url !== '' &&
                      <Grid item xs={12} md={1}>
                        <img style={{width:'80px', paddingRight:'10px'}} src={companyRez.logoData.url} alt={companyRez.companyData.companyName} />
                      </Grid>
                    }
                    <Grid item xs>
                      <Typography gutterBottom variant="h1">
                        {companyRez.companyData.companyName}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {companyRez.companyData.exchange} Exchange | {moment(todayDate).format('MMM DD, YYYY')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs>
                      <Typography variant="h3" gutterBottom>
                        <strong>${lastPrice}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      {companyRez.quoteData.change !== null &&
                        <Typography variant="h6" gutterBottom>
                          CHANGE:<br /> <strong>${+(companyRez.quoteData.change).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({(companyRez.quoteData.changePercent*100).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%)</strong>
                        </Typography>
                      }
                    </Grid>
                    <Grid item xs>
                      {latestVolume !== 0 &&
                      <Typography variant="h6" gutterBottom>
                        VOLUME:<br /> <strong>{latestVolume.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                      </Typography>
                      }
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm container>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs style={{'paddingRight':'25px','marginRight':'25px'}}>
                      <Typography variant="body2" color="textSecondary">
                        Day Low/High
                      </Typography>
                      <Slider
                        className={classes.progress}
                        value={lastPrice}
                        aria-labelledby="discrete-slider-custom"
                        min={minVlToday}
                        max={maxVlToday}
                        valueLabelDisplay="auto"
                        step={null}
                        track={false}
                        marks={marksToday}
                        disabled
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2" color="textSecondary">
                        52 Week Low/High
                      </Typography>
                      <Slider
                        className={classes.progress}
                        value={lastPrice}
                        aria-labelledby="discrete-slider-custom"
                        min={minVl}
                        max={maxVl}
                        valueLabelDisplay="auto"
                        step={null}
                        track={false}
                        marks={marks}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h3">{companyRez.quoteData.symbol}</Typography>
            </Grid>
          </Grid>
    );
  }
  else
  {
    return (
      <> </>
    );
  }
};

export default CompanyShort;
