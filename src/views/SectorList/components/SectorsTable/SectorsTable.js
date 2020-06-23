import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  }
}));


function HeaderTableCells(props) {
  const sectors = props.sectors;
  return (
    <>
      {
        Object.keys(sectors).reduce(function(result, sector) {
          if (sector !== "Meta Data") {
            result.push(<TableCell key={sector.split(":")[1].trim()}>{sector.split(":")[1].trim()}</TableCell>);
          }
          return result;
        }, [])
      }
    </>
  );
}

function BodyTableCells(props) {
  const classes = useStyles();
  const sectorsData = props.sectors;
  const periods = 
        Object.keys(sectorsData).reduce(function(result, sectorData) {
          if (sectorData !== "Meta Data") {
            result.push(sectorData);
          }
          return result;
        }, []);
  const sectors = 
        Object.keys(sectorsData[periods[0]]).sort().reduce(function(result, sectorData) {
          result.push(sectorData);
          return result;
        }, []);

  const rows = [];
  for (let i=0;i<sectors.length;i++)
  {
    rows.push(
    <TableRow
      className={classes.tableRow}
      hover
      key={sectors[i]}
    >
      <TableCell key={sectors[i] + "-0"}>{sectors[i]}</TableCell>

      {
        periods.map((period) => 
          <TableCell key={period + "-" + sectors[i]}>{sectorsData[period][sectors[i]]}</TableCell>
        )
      }
    </TableRow>
    )
  }

  return (
    <>
      {rows}
    </>
  );
}


const SectorsTable = props => {
  const { sectors, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <br/><br/>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sector</TableCell>
                  <HeaderTableCells sectors={sectors} />
                </TableRow>
              </TableHead>
              <TableBody>
                <BodyTableCells sectors={sectors} />
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};


export default SectorsTable;
