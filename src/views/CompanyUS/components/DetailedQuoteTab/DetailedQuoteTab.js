import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Paper
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



const DetailedQuoteTab = props => {
  const { companyRez, value } = props;

  const classes = useStyles();

    return (
        <Paper className={classes.paper} value={value} index={0}>
            <Typography gutterBottom variant="subtitle1">
              Detailed Quote
            </Typography>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Market Cap:<br /> <strong>{companyRez.statsData.marketcap}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Employees:<br /> <strong>{companyRez.statsData.employees}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Shares Outstanding:<br /> <strong>{companyRez.statsData.sharesOutstanding}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    TTM EPS:<br /> <strong>{companyRez.statsData.ttmEPS}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    TTM Dividend Rate:<br /> <strong>{companyRez.statsData.ttmDividentRate}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Next Dividend Date:<br /> <strong>{companyRez.statsData.nextDividendDate}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Dividend Yield:<br /> <strong>{(companyRez.statsData.dividendYield*100).toLocaleString(navigator.language, {maximumFractionDigits: 2})}%</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Next Earnings Date:<br /> <strong>{companyRez.statsData.nextEarningsDate}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Ex Earnings Date:<br /> <strong>{companyRez.statsData.exEarningsDate}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    PE Ratio:<br /> <strong>{companyRez.statsData.peRatio}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Beta:<br /> <strong>{companyRez.statsData.beta}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    50 Day Moving Avg:<br /> <strong>{companyRez.statsData.day50MovingAvg}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    200 Day Moving Avg:<br /> <strong>{companyRez.statsData.day200MovingAvg}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    10 Day Avg Volume:<br /> <strong>{companyRez.statsData.avg10Volume}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    30 Day Avg Volume:<br /> <strong>{companyRez.statsData.avg30Volume}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    5 Day Change %:<br /> <strong>{companyRez.statsData.day5ChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    30 Day Change %:<br /> <strong>{companyRez.statsData.day30ChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                </Grid>
                <Grid item xs>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    1 Month Change %:<br /> <strong>{companyRez.statsData.month1ChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    3 Month Change %:<br /> <strong>{companyRez.statsData.month3ChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    6 Month Change %:<br /> <strong>{companyRez.statsData.month6ChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                </Grid>
              </Grid>
            </Grid>
              
            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    YTD Change %:<br /> <strong>{companyRez.statsData.ytdChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    1 Year Change %:<br /> <strong>{companyRez.statsData.year1ChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    2 Year Change %:<br /> <strong>{companyRez.statsData.year2ChangePercent}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    5 Year Change %:<br /> <strong>{companyRez.statsData.year5ChangePercent}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
        </Paper>
    );
};

export default DetailedQuoteTab;
