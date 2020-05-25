import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  inputroot: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    marginLeft: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    marginRight: theme.spacing(1)
  },
  btn: {
    padding: theme.spacing(1),
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
    marginLeft: theme.spacing(1)
  }
}));

const CompanyToolbar = props => {
  const { className } = props;

  const classes = useStyles();

  const input = React.createRef();


  const handleSubmitClick = () => {
    props.sbmt(input.current.value);
    props.getTimeSeries(input.current.value);
  };

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      props.sbmt(input.current.value);
      props.getTimeSeries(input.current.value);
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <Paper
          className={clsx(classes.inputroot, className)}
        >
          <SearchIcon className={classes.icon} />
          <input
            type="text"
            placeholder="Search for a symbol"
            ref={input}
            onKeyPress={keyPressed}
            style={{flexGrow: 1,fontSize: '14px',lineHeight: '20px',letterSpacing: '-0.05px',marginRight: '24px',border:'0px'}}
          />
        </Paper>
        <Button onClick={handleSubmitClick} className={classes.btn} variant="contained" color="primary">Search</Button>
      </div>
    </div>
  );
};

CompanyToolbar.propTypes = {
  symbol: PropTypes.string,
  sbmt: PropTypes.func,
  getTimeSeries: PropTypes.func
};

export default CompanyToolbar;
