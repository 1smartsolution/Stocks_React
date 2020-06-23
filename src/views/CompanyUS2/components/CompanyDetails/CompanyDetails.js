import React, { useState } from 'react';
/*import PropTypes from 'prop-types';*/
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Slider,
  Grid,
  Paper,
  Typography,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core';

import { ApexChart } from '../';


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



const CompanyDetails = props => {
  const { companyData, timeSeries, timeSeriesInterval, timeSeriesPeriod, getTimeSeries } = props;

  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  if ((companyData !== undefined) && (companyData.av !== undefined) && (companyData.av["Global Quote"] !== undefined) && (companyData.tmx !== undefined) && (typeof(companyData.tmx.results) == 'object') && (companyData.tmx.results.size !== 0))
  {
    const marks = [
      {
        value: companyData.tmx.results.company[0].shareinfo.priceinfo.weeks52low,
        label: '$'+companyData.tmx.results.company[0].shareinfo.priceinfo.weeks52low,
      },
      {
        value: companyData.tmx.results.company[0].shareinfo.priceinfo.weeks52high,
        label: '$'+companyData.tmx.results.company[0].shareinfo.priceinfo.weeks52high,
      },
    ];
    const minVl = companyData.tmx.results.company[0].shareinfo.priceinfo.weeks52low;
    const maxVl = companyData.tmx.results.company[0].shareinfo.priceinfo.weeks52high;

    const marksToday = [
      {
        value: +(companyData.av["Global Quote"]["04. low"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
        label: '$'+(+(companyData.av["Global Quote"]["04. low"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})),
      },
      {
        value: +(companyData.av["Global Quote"]["03. high"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
        label: '$'+(+(companyData.av["Global Quote"]["03. high"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})),
      },
    ];
    const minVlToday = +(companyData.av["Global Quote"]["04. low"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    const maxVlToday = +(companyData.av["Global Quote"]["03. high"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    const todayDate = new Date();
    const lastPrice = +(companyData.av["Global Quote"]["05. price"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2});

    let rez = "";

    const totalShares = companyData.tmx.results.company[0].shareinfo.shareinformation.totalsharesoutstanding;

    return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h1">
                  {companyData.tmx.results.company[0].symbolinfo[0].equityinfo.longname}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {companyData.tmx.results.company[0].symbolinfo[0].key.exchange} Exchange | {moment(todayDate).format('MMM DD, YYYY')}
                </Typography>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs>
                      <Typography variant="h3" gutterBottom>
                        <strong>${lastPrice}</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" gutterBottom>
                        CHANGE:<br /> <strong>${+(companyData.av["Global Quote"]["09. change"]).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({companyData.av["Global Quote"]["10. change percent"]})</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" gutterBottom>
                        VOLUME:<br /> <strong>{parseInt(companyData.av["Global Quote"]["06. volume"]).toLocaleString(navigator.language, {maximumFractionDigits: 0})}</strong>
                      </Typography>
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
              <Typography variant="h3">{companyData.tmx.results.company[0].symbolinfo[0].symbolstring}</Typography>
            </Grid>
          </Grid>
      </Paper>

      <Paper className={classes.paper}>
        {props.symbol.length > 0 &&
        <ApexChart symbol={props.symbol} timeSeries={timeSeries} timeSeriesInterval={timeSeriesInterval} timeSeriesPeriod={timeSeriesPeriod} getTimeSeries={getTimeSeries} />
        }
      </Paper>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Detailed Quote" />
          <Tab label="Company Info" />
          <Tab label="Key Ratios" />
        </Tabs>
      </AppBar>


      {value === 0 && 
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
      }


      {value === 1 && 
        <Paper className={classes.paper} value={value} index={1}>
            <Typography gutterBottom variant="h3">
              Company Profile for {companyData.tmx.results.company[0].symbolinfo[0].equityinfo.longname}
            </Typography>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Description & Contact Information
              </Typography>
              <hr className={classes.hr} />
              <Typography gutterBottom variant="h5">
                Business Description
              </Typography>
              <Typography gutterBottom variant="body1">
                {companyData.tmx.results.company[0].profile.longdescription}
              </Typography>
              <hr className={classes.hr} />
              <Typography gutterBottom variant="body1">
                <strong>Address</strong><br />
                {companyData.tmx.results.company[0].profile.info.address.address1}
                {companyData.tmx.results.company[0].profile.info.address.address2.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.address2}</>}
                {companyData.tmx.results.company[0].profile.info.address.city.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.city}</>}
                {companyData.tmx.results.company[0].profile.info.address.state.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.state}</>}
                {companyData.tmx.results.company[0].profile.info.address.country.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.country}</>}
                {companyData.tmx.results.company[0].profile.info.address.postcode.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.postcode}</>}
              </Typography>

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Telephone</strong><br />
                      {companyData.tmx.results.company[0].profile.info.telephone}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Website</strong><br />
                      {companyData.tmx.results.company[0].profile.info.website}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Facsimile</strong><br />
                      {companyData.tmx.results.company[0].profile.info.facisimile}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Email</strong><br />
                      {companyData.tmx.results.company[0].profile.info.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Fiscal Year End</strong><br />
                      {moment(companyData.tmx.results.company[0].shareinfo.annualinfo.latestfiscaldate).format('MM/YYYY')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Industry Classifications
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Sector</strong><br />
                      {companyData.tmx.results.company[0].profile.classification.sector}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>CIK</strong><br />
                      {companyData.tmx.results.company[0].profile.classification.cik}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Industry</strong><br />
                      {companyData.tmx.results.company[0].profile.classification.industry}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>SIC</strong><br />
                      {
                        companyData.tmx.results.company[0].profile.classification.sics.sic.map(function(name, index)
                        {
                          if (index > 0)
                          {
                            rez = ", " + companyData.tmx.results.company[0].profile.classification.sics.sic[index].content;
                          }
                          else
                          {
                            rez = companyData.tmx.results.company[0].profile.classification.sics.sic[index].content
                          }
                          return rez;
                        })
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>NAICS</strong><br />
                      {companyData.tmx.results.company[0].profile.classification.naics}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
        </Paper>
      }


      {value === 2 && 
        <Paper className={classes.paper} value={value} index={2}>
            <Typography gutterBottom variant="h3">
              Key Ratios
            </Typography>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Profitability
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>EBIT Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.ebitmargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>EBITDA Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.ebitdamargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Pre-tax Profit Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.pretaxprofitmargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Profit Margin Cont</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.profitmargincont}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Profit Var(10 year)</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.profitvar10year}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Gross Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.grossmargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Profit Margin Tot</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.profitmargintot}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Income Statements
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenue.toLocaleString(navigator.language, {maximumFractionDigits: 0})}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue Per Share</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenuepershare}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue 3 years</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenue3years}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue 5 years</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenue5years}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Financial Strength
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Total Debt to Equity</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.totaldebttoequity}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Int Coverage</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.intcoverage}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Current Ratio</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.currentratio}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Leverage Ratio</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.leverageratio}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Quick Ratio</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.quickratio}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Longterm Debt to Capital</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.longtermdebttocapital}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Management Effectiveness
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Return on Assets</strong><br />
                      {companyData.tmx.results.company[0].keyratios.managementeffectiveness.returnonassets}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Return on Equity</strong><br />
                      {companyData.tmx.results.company[0].keyratios.managementeffectiveness.returnonequity}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Return on Capital</strong><br />
                      {companyData.tmx.results.company[0].keyratios.managementeffectiveness.returnoncapital}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
        </Paper>
      }
    </div>
    );
  }
  else
  {
    return (
      <> </>
    );
  }
};

/*
CompanyDetails.propTypes = {
  symbol: PropTypes.string,
  companyData: PropTypes.object,
  timeSeries: PropTypes.object,
  timeSeriesInterval: PropTypes.string,
  timeSeriesPeriod: PropTypes.string,
  getTimeSeries: PropTypes.func
};
*/
export default CompanyDetails;
