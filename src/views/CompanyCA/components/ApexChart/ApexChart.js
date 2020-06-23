import React from 'react'
import ReactApexChart from 'react-apexcharts'
import PropTypes from 'prop-types';

import ColoredLinearProgress from '../../../../LineProgress';

import {
  Paper,
  Button,
  ButtonGroup
} from '@material-ui/core';


const ApexChart = props => {
    const { symbol, timeSeries, timeSeriesInterval, timeSeriesPeriod, getTimeSeries, loadingStateTS } = props;

    const timeSeriesReduced = timeSeries[Object.keys(timeSeries)[1]];


    const loadTimeSeries2 = (e) => {
      switch (e.target.parentElement.id)
      {
        case "1min":
          getTimeSeries(symbol, "1min", "intraday");
          break;
        case "5min":
          getTimeSeries(symbol, "5min", "intraday");
          break;
        case "15min":
          getTimeSeries(symbol, "15min", "intraday");
          break;
        case "30min":
          getTimeSeries(symbol, "30min", "intraday");
          break;
        case "60min":
          getTimeSeries(symbol, "60min", "intraday");
          break;
        case "daily":
          getTimeSeries(symbol, "", "daily");
          break;
        case "weekly":
          getTimeSeries(symbol, "", "weekly");
          break;
        case "monthly":
          getTimeSeries(symbol, "", "monthly");
          break;
        default:
          getTimeSeries(symbol, "", "daily");
          break;
      }
    };


    let maxVolume = 0;
    const maxDate = Object.keys(timeSeriesReduced)[0];
    const minDate = Object.keys(timeSeriesReduced)[Object.keys(timeSeriesReduced).length-1];

    const seriesData = 
                        Object.keys(timeSeriesReduced).reduce(function(result, timeSerie)
                        {
                          result.push(
                                        {
                                          'x': timeSerie.toString()
                                          , 'y': [
                                                    +(timeSeriesReduced[timeSerie]["1. open"].toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
                                                    , +(timeSeriesReduced[timeSerie]["2. high"].toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
                                                    , +(timeSeriesReduced[timeSerie]["3. low"].toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
                                                    , +(timeSeriesReduced[timeSerie]["4. close"].toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
                                                  ]
                                        }
                                      );

                          return result;
                        }, []);


    let currentVolume = 0;
    const seriesDataLinear = 
                        Object.keys(timeSeriesReduced).reduce(function(result, timeSerie)
                        {
                            if (+(timeSeriesReduced[timeSerie]["5. volume"].toLocaleString(navigator.language, {minimumFractionDigits: 0})) > maxVolume)
                            {
                              maxVolume = +(timeSeriesReduced[timeSerie]["5. volume"].toLocaleString(navigator.language, {minimumFractionDigits: 0}));
                            }

                            if (+(timeSeriesReduced[timeSerie]["1. open"].toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})) > +(timeSeriesReduced[timeSerie]["4. close"].toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 2})))
                            {
                              currentVolume = -(+(timeSeriesReduced[timeSerie]["5. volume"].toLocaleString(navigator.language, {minimumFractionDigits: 0})))
                            }
                            else
                            {
                              currentVolume = +(timeSeriesReduced[timeSerie]["5. volume"].toLocaleString(navigator.language, {minimumFractionDigits: 0}))
                            }

                            result.push(
                                          {
                                            'x': timeSerie.toString()
                                            , 'y': [currentVolume]
                                          }
                                        );

                          return result;
                        }, []);


    const state = {
      series: [{
        data: seriesData
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 290,
          id: 'candles',
          toolbar: {
            autoSelected: 'pan',
            show: false
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#008000',
              downward: '#FF0000'
            }
          }
        },
        xaxis: {
          type: 'datetime'
        }
      },
    
      seriesBar: [{
        name: 'volume',
        data: seriesDataLinear
      }],
      optionsBar: {
        chart: {
          height: 160,
          type: 'bar',
          brush: {
            enabled: true,
            target: 'candles'
          },
          selection: {
            enabled: true,
            xaxis: {
              min: minDate,
              max: maxDate
            },
            fill: {
              color: '#ccc',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
            colors: {
              ranges: [{
                from: -maxVolume,
                to: 0,
                color: '#FF0000'
              }, {
                from: 1,
                to: maxVolume,
                color: '#008000'
              }],
        
            },
          }
        },
        stroke: {
          width: 0
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            offsetX: 13
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        }
      },
    
    
    };



  if (loadingStateTS)
  {
    return (
      <ColoredLinearProgress />
    )
  }
  else
  {
    return (
      <Paper className="padding: 24px,margin: 10">
        <div className="paddingBottom: 24px">
          <ButtonGroup size="small" variant="contained" color="primary" aria-label="contained primary button group">
            {
              ((timeSeriesInterval === "1min") && (timeSeriesPeriod === "intraday"))?<Button id="1min" onClick={loadTimeSeries2} disabled>1m</Button>:<Button id="1min" onClick={loadTimeSeries2}>1min</Button>
            }
            {
              ((timeSeriesInterval === "5min") && (timeSeriesPeriod === "intraday"))?<Button id="5min" onClick={loadTimeSeries2} disabled>5m</Button>:<Button id="5min" onClick={loadTimeSeries2}>5min</Button>
            }
            {
              ((timeSeriesInterval === "15min") && (timeSeriesPeriod === "intraday"))?<Button id="15min" onClick={loadTimeSeries2} disabled>15m</Button>:<Button id="15min" onClick={loadTimeSeries2}>15min</Button>
            }
            {
              ((timeSeriesInterval === "30min") && (timeSeriesPeriod === "intraday"))?<Button id="30min" onClick={loadTimeSeries2} disabled>30m</Button>:<Button id="30min" onClick={loadTimeSeries2}>30min</Button>
            }
            {
              ((timeSeriesInterval === "60min") && (timeSeriesPeriod === "intraday"))?<Button id="60min" onClick={loadTimeSeries2} disabled>1h</Button>:<Button id="60min" onClick={loadTimeSeries2}>1h</Button>
            }
            {
              ((timeSeriesInterval === "") && (timeSeriesPeriod === "daily"))?<Button id="daily" onClick={loadTimeSeries2} disabled>D</Button>:<Button id="daily" onClick={loadTimeSeries2}>D</Button>
            }
            {
              ((timeSeriesInterval === "") && (timeSeriesPeriod === "weekly"))?<Button id="weekly" onClick={loadTimeSeries2} disabled>W</Button>:<Button id="weekly" onClick={loadTimeSeries2}>W</Button>
            }
            {
              ((timeSeriesInterval === "") && (timeSeriesPeriod === "monthly"))?<Button id="monthly" onClick={loadTimeSeries2} disabled>M</Button>:<Button id="monthly" onClick={loadTimeSeries2}>M</Button>
            }
          </ButtonGroup>
        </div>
       <div className="chart-box">
        <div id="chart-candlestick">
          <ReactApexChart options={state.options} series={state.series} type="candlestick" height={290} />
        </div>
        <div id="chart-bar">
          <ReactApexChart options={state.optionsBar} series={state.seriesBar} type="bar" height={160} />
        </div>
       </div>
      </Paper>
    );
  }


}

ApexChart.propTypes = {
  symbol: PropTypes.string,
  timeSeries: PropTypes.object,
  timeSeriesInterval: PropTypes.string,
  timeSeriesPeriod: PropTypes.string,
  getTimeSeries: PropTypes.func,
  loadingStateTS: PropTypes.boolean
};

export default ApexChart;

