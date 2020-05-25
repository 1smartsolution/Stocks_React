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



const KeyRatiosTab = props => {
  const { companyData, value } = props;

  const classes = useStyles();

  return (
        <Paper className={classes.paper} value={value} index={2}>
            <Typography gutterBottom variant="h3">
              Key Ratios
            </Typography>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Profitability
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>EBIT Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.ebitmargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>EBITDA Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.ebitdamargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Pre-tax Profit Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.pretaxprofitmargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Profit Margin Cont</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.profitmargincont}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Profit Var(10 year)</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.profitvar10year}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Gross Margin</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.grossmargin}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Profit Margin Tot</strong><br />
                      {companyData.tmx.results.company[0].keyratios.profitability.profitmargintot}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Income Statements
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenue.toLocaleString(navigator.language, {maximumFractionDigits: 0})}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue Per Share</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenuepershare}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue 3 years</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenue3years}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Revenue 5 years</strong><br />
                      {companyData.tmx.results.company[0].keyratios.incomestatements.revenue5years}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Financial Strength
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Total Debt to Equity</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.totaldebttoequity}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Int Coverage</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.intcoverage}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Current Ratio</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.currentratio}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Leverage Ratio</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.leverageratio}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Quick Ratio</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.quickratio}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Longterm Debt to Capital</strong><br />
                      {companyData.tmx.results.company[0].keyratios.financialstrength.longtermdebttocapital}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h4">
                Management Effectiveness
              </Typography>
              <hr className={classes.hr} />

              <Grid item xs={12} sm container>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Return on Assets</strong><br />
                      {companyData.tmx.results.company[0].keyratios.managementeffectiveness.returnonassets}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Return on Equity</strong><br />
                      {companyData.tmx.results.company[0].keyratios.managementeffectiveness.returnonequity}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body1" gutterBottom>
                      <strong>Return on Capital</strong><br />
                      {companyData.tmx.results.company[0].keyratios.managementeffectiveness.returnoncapital}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
        </Paper>
  );
};

export default KeyRatiosTab;
