import React, { Component } from 'react'
import theme from 'theme';

import { CompanyToolbar, CompanyDetails } from './components';

class CompanyCA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: {}
      , symbol: ""
      , timeSeries: {}
      , timeSeriesInterval: ''
      , timeSeriesPeriod: 'daily'
    };
  }


  render() {
    return (
      <div className={{padding: theme.spacing(3)}}>
        <CompanyToolbar symbol={""} sbmt={this.fetchcompanyDataWithFetchAPI.bind(this)} getTimeSeries={this.fetchTimeSeriesWithFetchAPI.bind(this)} />
        <div className={{marginTop: theme.spacing(2)}}>
          <CompanyDetails symbol={this.state.symbol} companyData={this.state.companyData} timeSeries={this.state.timeSeries} timeSeriesInterval={this.state.timeSeriesInterval} timeSeriesPeriod={this.state.timeSeriesPeriod} getTimeSeries={this.fetchTimeSeriesWithFetchAPI.bind(this)} />
        </div>
      </div>
    )
  };


  fetchcompanyDataWithFetchAPI(symbol) {
    if (symbol.length > 0)
    {
      this.setState({...this.state});
      fetch(process.env.REACT_APP_CF_API+'/companyCA.cfm?symbol='+symbol)
          .then(response => response.json())
          .then(result => {
              if (result["Note"] === undefined)
              {
                this.setState({companyData: result});
                this.setState({symbol: symbol});
              }
              else
              {
                alert('A connection error happend when loading company data. Please try again');
              }
          })
          .catch(e => {
              console.log(e);
              this.setState({...this.state});
          });
    }
  };
  fetchcompanyData = this.fetchcompanyDataWithFetchAPI;


  fetchTimeSeriesWithFetchAPI = (symbol, interval='', period='daily') => {
    if (symbol.length > 0)
    {
      fetch(process.env.REACT_APP_CF_API+'/timeSeries.cfm?symbol='+symbol+'&interval='+interval+'&period='+period)
          .then(response => response.json())
          .then(result => {
              if (result["Note"] === undefined)
              {
                this.setState({timeSeries: result});
                this.setState({timeSeriesInterval: interval});
                this.setState({timeSeriesPeriod: period});
              }
              else
              {
                alert('A connection error happend when loading time series. Please try again');
              }
          })
          .catch(e => {
              console.log(e);
              this.setState({...this.state});
          });
    }
  };
  fetchTimeSeries = this.fetchTimeSeriesWithFetchAPI;

}

export default CompanyCA;
