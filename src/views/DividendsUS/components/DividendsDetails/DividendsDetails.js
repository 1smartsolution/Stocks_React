import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
	Grid,
	Paper,
	Typography
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2)
		, margin: 10
	},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 1050
		, margin: 20
	},
	nameContainer: {
		display: 'flex'
		, alignItems: 'center'
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



const DividendsDetails = props => {
	const { dividendsData } = props;

	const classes = useStyles();

	const createGrid = () => (
		Object.keys(dividendsData).reduce(function(result, period) {
			if ((period !== 'symbol') && (period !== 'allDone'))
			{
				if ((period === 'next'))
				{
					if (dividendsData[period].amount !== undefined)
					{
						result.push(
							<Grid item xs key={period}>
								<Typography variant="h4" gutterBottom>
									{period.toUpperCase()}<br /> 
								</Typography>
								<Typography variant="h6" gutterBottom>
									<strong>
										${+(dividendsData[period].amount).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 3})}<br/>({dividendsData[period].frequency} {dividendsData[period].flag})
										<br/>Declared:<br/>{moment(dividendsData[period].declaredDate).format('MMM DD, YYYY')}
										<br/>Payment:<br/>{moment(dividendsData[period].paymentDate).format('MMM DD, YYYY')}
									</strong>
								</Typography>
							</Grid>
						);
					}
					else
					{
						result.push(
							<Grid item xs key={period}>
								<Typography variant="h4" gutterBottom>
									{period.toUpperCase()}<br /> 
								</Typography>
							</Grid>
						);
					}
				}
				else
				{
					if (dividendsData[period].amount !== undefined)
					{
						result.push(
							<Grid item xs key={period}>
								<Typography variant="h4" gutterBottom>
									{period.toUpperCase()}<br /> 
								</Typography>
								<Typography variant="h6" gutterBottom>
									<strong>
										${+(dividendsData[period].amount).toLocaleString(navigator.language, {minimumFractionDigits: 2, maximumFractionDigits: 3})}<br/>({dividendsData[period].frequency} {dividendsData[period].flag})
									</strong>
								</Typography>
							</Grid>
						);
					}
					else
					{
						result.push(
							<Grid item xs key={period}>
								<Typography variant="h4" gutterBottom>
									{period.toUpperCase()}<br /> 
								</Typography>
							</Grid>
						);
					}
				}
			}
			return result;
		}, [])
	)


	if ((dividendsData !== '') && dividendsData['allDone'])
	{
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
						<Grid item xs={12} sm container>
							<Grid item xs container direction="column" spacing={2}>
								<Grid item xs>
									<Typography gutterBottom variant="h1">
										{dividendsData['symbol'].toUpperCase()} 
										{(dividendsData['next'].description !== undefined) && 
											<>
											({dividendsData['next'].description})
											</>
										}
									</Typography>

									<Grid item xs={12} sm container>
										<Grid item xs container direction="row" spacing={2}>
											{(dividendsData['allDone']) && createGrid()}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
				</Paper>
			</div>
		);
	}
	else
	{
		return (
			<div className={classes.root}>
				<Typography gutterBottom variant="h3">
					{(dividendsData['symbol'] !== undefined) && <>No dividends found for this symbol</>}
				</Typography>
			</div>
		);
	}
};

export default DividendsDetails;
