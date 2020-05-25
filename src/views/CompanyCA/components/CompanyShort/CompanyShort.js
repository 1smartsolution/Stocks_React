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
  const { companyData } = props;

  const classes = useStyles();

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


    return (
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
