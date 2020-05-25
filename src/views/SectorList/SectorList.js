import React, { useState, useEffect } from 'react'

import { SectorsTable } from './components';
import theme from 'theme';


const SectorList = () => {
  const [sectors, setSectors] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_CF_API+'/sectors.cfm')
        .then(response => response.json())
        .then(result => {
            setSectors(result);
        })
        .catch(e => {
            console.log(e);
        });
  }, []);

    return (
      <div className={{padding: theme.spacing(3)}}>
        <div className={{marginTop: theme.spacing(2)}}>
          {sectors !== undefined && sectors !== '' &&
          <SectorsTable key="sectors" sectors={sectors} />
          }
        </div>
      </div>
    )
}

export default SectorList
