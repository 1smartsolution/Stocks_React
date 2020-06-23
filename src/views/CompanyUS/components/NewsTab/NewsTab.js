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



const NewsTab = props => {
  const { newsData, value } = props;

  const classes = useStyles();

  const news = [];
  for (let i=0;i<newsData.length;i++)
  {
    news.push(
    <Paper className={classes.paper} key={newsData[i].source+"-"+newsData[i].datetime}>
      <Typography gutterBottom variant="h4">
        <a href={newsData[i].url} target="_blank" rel="noopener noreferrer">{newsData[i].headline}</a>
      </Typography>
      <hr className={classes.hr} />

      <Grid item xs={12} sm container>
        <Grid item xs container direction="row" spacing={2}>
          {newsData[i].image !== null && newsData[i].image !== '' &&
            <Grid item xs={12} md={2}>
              <img style={{width:'100px'}} src={newsData[i].image} alt={newsData[i].headline} />
            </Grid>
          }
          <Grid item xs>
            <Typography variant="body1" gutterBottom>
              {newsData[i].summary}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {newsData[i].source}, {moment(newsData[i].datetime).format('MM/DD/YYYY hh:mm LT')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    )
  }

  return (
    <Paper className={classes.paper} value={value} index={2}>
        <Typography gutterBottom variant="h3">
          News
        </Typography>

        {news}
    </Paper>
  );
};

export default NewsTab;
