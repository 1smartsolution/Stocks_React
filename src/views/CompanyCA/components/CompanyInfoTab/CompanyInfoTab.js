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



const CompanyInfoTab = props => {
  const { companyData, value } = props;

  const classes = useStyles();

  let rez = "";

  return (
    <Paper className={classes.paper} value={value} index={1}>
        <Typography gutterBottom variant="h3">
          Company Profile for {companyData.tmx.results.company[0].symbolinfo[0].equityinfo.longname}
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
            {companyData.tmx.results.company[0].profile.longdescription}
          </Typography>
          <hr className={classes.hr} />
          <Typography gutterBottom variant="body1">
            <strong>Address</strong><br />
            {companyData.tmx.results.company[0].profile.info.address.address1}
            {companyData.tmx.results.company[0].profile.info.address.address2.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.address2}</>}
            {companyData.tmx.results.company[0].profile.info.address.city.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.city}</>}
            {companyData.tmx.results.company[0].profile.info.address.state.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.state}</>}
            {companyData.tmx.results.company[0].profile.info.address.country.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.country}</>}
            {companyData.tmx.results.company[0].profile.info.address.postcode.length > 0 && <>, {companyData.tmx.results.company[0].profile.info.address.postcode}</>}
          </Typography>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Telephone</strong><br />
                  {companyData.tmx.results.company[0].profile.info.telephone}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Website</strong><br />
                  {companyData.tmx.results.company[0].profile.info.website}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Facsimile</strong><br />
                  {companyData.tmx.results.company[0].profile.info.facisimile}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Email</strong><br />
                  {companyData.tmx.results.company[0].profile.info.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Fiscal Year End</strong><br />
                  {moment(companyData.tmx.results.company[0].shareinfo.annualinfo.latestfiscaldate).format('MM/YYYY')}
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
                  {companyData.tmx.results.company[0].profile.classification.sector}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>CIK</strong><br />
                  {companyData.tmx.results.company[0].profile.classification.cik}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>Industry</strong><br />
                  {companyData.tmx.results.company[0].profile.classification.industry}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="row" spacing={2}>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>SIC</strong><br />
                  {
                    companyData.tmx.results.company[0].profile.classification.sics.sic.map(function(name, index)
                    {
                      if (index > 0)
                      {
                        rez = ", " + companyData.tmx.results.company[0].profile.classification.sics.sic[index].content;
                      }
                      else
                      {
                        rez = companyData.tmx.results.company[0].profile.classification.sics.sic[index].content
                      }
                      return rez;
                    })
                  }
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  <strong>NAICS</strong><br />
                  {companyData.tmx.results.company[0].profile.classification.naics}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
    </Paper>
  );
};

export default CompanyInfoTab;
