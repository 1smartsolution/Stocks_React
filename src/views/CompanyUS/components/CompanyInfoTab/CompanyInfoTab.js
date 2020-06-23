import React from 'react';
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



const CompanyInfoTab = props => {
  const { companyData, value } = props;

  const classes = useStyles();

  return (
    <Paper className={classes.paper} value={value} index={1}>
        <Typography gutterBottom variant="h3">
          Company Profile for {companyData.companyName}
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
            {companyData.description}
          </Typography>
          <hr className={classes.hr} />
          <Typography gutterBottom variant="body1">
            <strong>Address</strong><br />
            {companyData.address}
            {companyData.address2 !== null && companyData.address2.length > 0 && <>, {companyData.address2}</>}
            {companyData.city.length > 0 && <>, {companyData.city}</>}
            {companyData.state.length > 0 && <>, {companyData.state}</>}
            {companyData.country.length > 0 && <>, {companyData.country}</>}
            {companyData.zip.length > 0 && <>, {companyData.zip}</>}
          </Typography>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Telephone</strong><br />
                  {companyData.phone}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Website</strong><br />
                  {companyData.website}
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
                  {companyData.sector}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Primary Sic Code</strong><br />
                  {companyData.primarySicCode}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Industry</strong><br />
                  {companyData.industry}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
    </Paper>
  );
};

export default CompanyInfoTab;
