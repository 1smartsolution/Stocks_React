import React from 'react';
import moment from 'moment';
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
  const { companyData, value } = props;

  const classes = useStyles();

    const totalShares = companyData.tmx.results.company[0].shareinfo.shareinformation.totalsharesoutstanding;

    return (
        <Paper className={classes.paper} value={value} index={0}>
            <Typography gutterBottom variant="subtitle1">
              Detailed Quote
            </Typography>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Beta:<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.beta}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Beta (1 year):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.beta1year}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Beta (3 year):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.beta3year}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Alpha:<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.alpha}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Listed Shares Out:<br /> <strong>{companyData.tmx.results.company[0].shareinfo.shareinformation.outstanding.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Total Shares (All Classes):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.shareinformation.totalsharesoutstanding.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Market Cap (All Classes):<br /> <strong>{companyData.tmx.results.company[0].profile.details.marketcap.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
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
                    Avg Vol (10 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol10days.toLocaleString(navigator.language, {maximumFractionDigits: 0})} ({(100*companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol10days /totalShares).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%)</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Avg Vol (20 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol20days.toLocaleString(navigator.language, {maximumFractionDigits: 0})} ({(100*companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol20days /totalShares).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%)</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Avg Vol (30 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol30days.toLocaleString(navigator.language, {maximumFractionDigits: 0})} ({(100*companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol30days /totalShares).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%)</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Avg Vol (50 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol50days.toLocaleString(navigator.language, {maximumFractionDigits: 0})} ({(100*companyData.tmx.results.company[0].shareinfo.shareinformation.avgvol50days /totalShares).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%)</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Dividend:<br /> <strong>${companyData.tmx.results.company[0].keyratios.dividendssplits.dividendrate}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Yield:<br /> <strong>{companyData.tmx.results.company[0].keyratios.dividendssplits.dividendyield.toLocaleString(navigator.language, {maximumFractionDigits: 2})}%</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Dividend (3 year):<br /> <strong>${companyData.tmx.results.company[0].keyratios.dividendssplits.dividend3years}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Dividend (5 year):<br /> <strong>${companyData.tmx.results.company[0].keyratios.dividendssplits.dividend5years}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Ex-div date:<br /> <strong>{moment(companyData.tmx.results.company[0].keyratios.dividendssplits.exdividenddate).format('MM/DD/YYYY')}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    P/E Ratio:<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.peratio.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    P/E Ratio (Low 5 years):<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pelowlast5years.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    P/E Ratio (High 5 years):<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pehighlast5years.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Moving Avg (21 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.day21movingavg === ''}-{companyData.tmx.results.company[0].shareinfo.shareinformation.day21movingavg}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Moving Avg (50 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.day50movingavg}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Moving Avg (200 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.day200movingavg}</strong>
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
                    EMA (21 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.day21ema}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    EMA (50 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.day50ema}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    EMA (200 days):<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.day200ema}</strong>
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
                    P/B Ratio:<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pricetobook.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Price to Sales:<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pricetosales.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                  Price to Free Cash:<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pricetofreecash.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Price to Cash Flow:<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pricetocashflow.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Price to Tangible Book:<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pricetotangiblebook.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Price to Sales:<br /> <strong>{companyData.tmx.results.company[0].keyratios.valuationmeasures.pricetosales.toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    R2:<br /> <strong>{companyData.tmx.results.company[0].shareinfo.priceinfo.r2}</strong>
                  </Typography>
                </Grid>
                <Grid item xs>
                </Grid>
              </Grid>
            </Grid>
        </Paper>
    );
};

export default DetailedQuoteTab;
