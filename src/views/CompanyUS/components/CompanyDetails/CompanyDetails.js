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
import { NewsTab } from '../';


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
  const { companyRez } = props;

  const companyData = companyRez.companyData;

  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  if ((companyData !== undefined) && (typeof(companyData) == 'object') && (companyData.companyName !== null))
  {
    return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CompanyShort companyRez={companyRez} />
      </Paper>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Detailed Quote" />
          <Tab label="Company Info" />
          <Tab label="News" />
        </Tabs>
      </AppBar>

      {value === 0 && 
        <DetailedQuoteTab companyRez={companyRez} value={value} />
      }

      {value === 1 && 
        <CompanyInfoTab companyData={companyData} value={value} />
      }

      {value === 2 && 
        <NewsTab newsData={companyRez.newsData} value={value} />
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
