import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core';

import { CompanyShort } from '../';
import { DetailedQuoteTab } from '../';
import { CompanyInfoTab } from '../';
import { KeyRatiosTab } from '../';
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
  const { companyData, timeSeries, timeSeriesInterval, timeSeriesPeriod, getTimeSeries, loadingStateTS } = props;

  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  if ((companyData !== undefined) && (companyData.av !== undefined) && (companyData.av["Global Quote"] !== undefined) && (companyData.tmx !== undefined) && (typeof(companyData.tmx.results) == 'object') && (companyData.tmx.results.size !== 0))
  {
    return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CompanyShort companyData={companyData} />
      </Paper>

      <Paper className={classes.paper}>
        {props.symbol.length > 0 &&
        <ApexChart symbol={props.symbol} timeSeries={timeSeries} timeSeriesInterval={timeSeriesInterval} timeSeriesPeriod={timeSeriesPeriod} getTimeSeries={getTimeSeries} loadingStateTS={loadingStateTS} />
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
        <DetailedQuoteTab companyData={companyData} value={value} />
      }

      {value === 1 && 
        <CompanyInfoTab companyData={companyData} value={value} />
      }

      {value === 2 && 
        <KeyRatiosTab companyData={companyData} value={value} />
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

export default CompanyDetails;
