import React, { useState } from 'react'
import theme from 'theme';

import ColoredLinearProgress from '../../LineProgress';

import { CompanyToolbar, CompanyDetails } from './components';

const CompanyUS = () => {
    let state = {
      companyData: {}
      , logoData: ""
      , intradayPricesData: {}
      , newsData: {}
      , previousData: {}
      , statsData: {}
      , quoteData: {}
      , symbol: ""
    };
    let stateTS = {
      timeSeries: {}
      , timeSeriesInterval: ''
      , timeSeriesPeriod: 'daily'
    };

  const [companyRez, setCompanyData] = useState("");
  const [companyTSRez, setCompanyTSData] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  let result = '';
  let response = '';

  const fetchcompanyDataWithFetchAPI = async (symbol) => {
    setLoadingState(true);
    try
    {
      if (symbol.length > 0)
      {
        let goOn = true;
        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.company&symbol='+symbol);
        result = await response.json();
        if ((result !== undefined) && (result !== ''))
        {
          state = {symbol: symbol, companyData: result};
        }
        else
        {
          goOn = false;
          alert('A connection error happend when loading company data. Please try again');
        }

        if (goOn)
        {
          response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.logo&symbol='+symbol);
          result = await response.json();
          if ((result !== undefined) && (result !== ''))
          {
            state.logoData = result;
          }
        }

        if (goOn)
        {
          response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.intradayPrices&symbol='+symbol);
          result = await response.json();
          if ((result !== undefined) && (result !== ''))
          {
            state.intradayPricesData = result;
          }
          else
          {
            goOn = false;
            alert('A connection error happend when loading company data. Please try again');
          }
        }

        if (goOn)
        {
          response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.news&symbol='+symbol);
          result = await response.json();
          if ((result !== undefined) && (result !== ''))
          {
            state.newsData = result;
          }
        }

        if (goOn)
        {
          response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.previous&symbol='+symbol);
          result = await response.json();
          if ((result !== undefined) && (result !== ''))
          {
            state.previousData = result;
          }
          else
          {
            goOn = false;
            alert('A connection error happend when loading company data. Please try again');
          }
        }

        if (goOn)
        {
          response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.stats&symbol='+symbol);
          result = await response.json();
          if ((result !== undefined) && (result !== ''))
          {
            state.statsData = result;
          }
          else
          {
            goOn = false;
            alert('A connection error happend when loading company data. Please try again');
          }
        }

        if (goOn)
        {
          response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.quote&symbol='+symbol);
          result = await response.json();
          if ((result !== undefined) && (result !== ''))
          {
            state.quoteData = result;
          }
          else
          {
            goOn = false;
            alert('A connection error happend when loading company data. Please try again later');
          }
        }

        if (goOn)
        {
          setCompanyData(state);
        }
      }
    }
    catch
    {
      alert('A connection error happend when loading company data. Please try again later');
    }
    setLoadingState(false);
  };


  const fetchTimeSeriesWithFetchAPI = async (symbol, interval='', period='daily') => {
    try
    {
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
          alert('A connection error happend when loading time series. Please try again later');
        }
      }
    }
    catch
    {
      alert('A connection error happend when loading company data. Please try again later');
    }
  };


  if (loadingState)
  {
    return (
      <ColoredLinearProgress />
    )
  }
  else
  {
    return (
      <div className={{padding: theme.spacing(3)}}>
        <CompanyToolbar symbol={""} sbmt={fetchcompanyDataWithFetchAPI} getTimeSeries={fetchTimeSeriesWithFetchAPI} />
        {(companyRez !== undefined) && (companyRez.symbol !== undefined) && (companyRez.symbol !== '') &&
          <div className={{marginTop: theme.spacing(2)}}>
            <CompanyDetails symbol={companyRez.symbol} companyRez={companyRez} timeSeries={companyTSRez.timeSeries} timeSeriesInterval={companyTSRez.timeSeriesInterval} timeSeriesPeriod={companyTSRez.timeSeriesPeriod} getTimeSeries={fetchTimeSeriesWithFetchAPI} />
          </div>
        }
      </div>
    )
  }
}

export default CompanyUS;
