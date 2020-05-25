import React, { useState } from 'react'
import theme from 'theme';

import { CompanyToolbar, CompanyDetails } from './components';

const CompanyCA = () => {
    let state = {
      companyData: {}
      , symbol: ""
    };
    let stateTS = {
      timeSeries: {}
      , timeSeriesInterval: ''
      , timeSeriesPeriod: 'daily'
    };

  const [companyRez, setCompanyData] = useState("");
  const [companyTSRez, setCompanyTSData] = useState("");
  let result = '';
  let response = '';

  const fetchcompanyDataWithFetchAPI = async (symbol) => {
    if (symbol.length > 0)
    {
      response = await fetch(process.env.REACT_APP_CF_API+'/companyCA.cfm?symbol='+symbol);
      result = await response.json();
      if (result["Note"] === undefined)
      {
        setCompanyData({symbol: symbol, companyData: result});
      }
      else
      {
        setCompanyData(state);
        alert('A connection error happend when loading company data. Please try again');
      }
    }
  };


  const fetchTimeSeriesWithFetchAPI = async (symbol, interval='', period='daily') => {
    if (symbol.length > 0)
    {
      response = await fetch(process.env.REACT_APP_CF_API+'/timeSeries.cfm?symbol='+symbol+'&interval='+interval+'&period='+period);
      result = await response.json();
      if (result["Note"] === undefined)
      {
        setCompanyTSData({timeSeries: result, timeSeriesInterval: interval, timeSeriesPeriod: period});
      }
      else
      {
        setCompanyTSData(stateTS);
        alert('A connection error happend when loading time series. Please try again');
      }
    }
  };


  return (
    <div className={{padding: theme.spacing(3)}}>
      <CompanyToolbar symbol={""} sbmt={fetchcompanyDataWithFetchAPI} getTimeSeries={fetchTimeSeriesWithFetchAPI} />
      {(companyRez !== undefined) && (companyRez.symbol !== undefined) && (companyRez.symbol !== '') &&
        <div className={{marginTop: theme.spacing(2)}}>
          <CompanyDetails symbol={companyRez.symbol} companyData={companyRez.companyData} timeSeries={companyTSRez.timeSeries} timeSeriesInterval={companyTSRez.timeSeriesInterval} timeSeriesPeriod={companyTSRez.timeSeriesPeriod} getTimeSeries={fetchTimeSeriesWithFetchAPI} />
        </div>
      }
    </div>
  )
}

export default CompanyCA;
