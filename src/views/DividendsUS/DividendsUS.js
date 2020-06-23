import React, { useState } from 'react'
import theme from 'theme';

import { DividendsToolbar, DividendsDetails } from './components';

const DividendUS = () => {
  const state = {
      '5y': {}
      , '2y': {}
      , '1y': {}
      , 'ytd': {}
      , '6m': {}
      , '3m': {}
      , '2m': {}
      , 'next': {}
      , symbol: ""
      , allDone: false
    };

  const [divRez, setDivData] = useState("");

  const fetchDividendsData = async (symbol) => {
	let json = '';

    if (symbol.length > 0)
    {
      let response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=5y&symbol='+symbol);

		if (response === '')
		{
			setDivData(state);
			return;
		}

		try
		{
			json = await response.json();

	      if (json.length !== 0)
	      {
	        const p5y = json[0];
	        
	        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=2y&symbol='+symbol);
	        json = await response.json();
	        const p2y = json[0];
	        
	        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=1y&symbol='+symbol);
	        json = await response.json();
	        const p1y = json[0];
	        
	        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=ytd&symbol='+symbol);
	        json = await response.json();
	        const pytd = json[0];
	        
	        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=6m&symbol='+symbol);
	        json = await response.json();
	        const p6m = json[0];
	        
	        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=3m&symbol='+symbol);
	        json = await response.json();
	        const p3m = json[0];
	        
	        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=1m&symbol='+symbol);
	        json = await response.json();
	        const p1m = json[0];
	        
	        response = await fetch(process.env.REACT_APP_NODE_API+'/testAPI?type=stocks.dividends&period=next&symbol='+symbol);
	        json = await response.json();
	        const pnext = json;

	        setDivData({symbol: symbol, '5y':p5y, '2y': p2y, '1y': p1y, 'ytd': pytd, '6m': p6m, '3m': p3m, '1m': p1m, 'next': pnext, allDone: true});
	      }
	      else
	      {
	        setDivData(state);
	      }
		}
		catch(e)
		{
			setDivData(state);
		}
    }
  }



    return (
      <div className={{padding: theme.spacing(3)}}>
        <DividendsToolbar symbol={""} sbmt={fetchDividendsData} />
        <div className={{marginTop: theme.spacing(2)}}>
          <DividendsDetails dividendsData={divRez} />
        </div>
      </div>
    )

}

export default DividendUS;
