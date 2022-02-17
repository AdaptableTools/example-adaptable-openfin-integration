import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';

import '@adaptabletools/adaptable/index.css';
import '@adaptabletools/adaptable/themes/dark.css';
import './index.css';

import { OpenFinApi } from '@adaptabletools/adaptable/types';

import {
  AllEnterpriseModules,
  GridOptions,
} from '@ag-grid-enterprise/all-modules';
import Adaptable from '@adaptabletools/adaptable/agGrid';

import openfin from '@adaptabletools/adaptable-plugin-openfin';

import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
} from '@adaptabletools/adaptable/types';

const columnDefs = [
  { field: 'OrderId', type: 'abColDefNumber' },
  {
    field: 'CompanyName',
    editable: true,
    type: 'abColDefString',
  },
  {
    field: 'ContactName',
    editable: true,
    type: 'abColDefString',
  },
  {
    field: 'Employee',
    editable: true,
    type: 'abColDefString',
  },

  {
    field: 'ItemCount',
    editable: true,
    type: 'abColDefNumber',
  },
  {
    field: 'InvoicedCost',
    editable: true,
    type: 'abColDefNumber',
  },
];

const rowData: any[] = [
  {
    OrderId: 1,
    CompanyName: 'IBM',
    ContactName: 'Joe Bloggs',
    Employee: 'Mary Shields',
    InvoicedCost: 32.53,
  },
];

let demoConfig: PredefinedConfig = {
  Dashboard: {
    Tabs: [
      {
        Name: 'Dashboard Toolbars',
        Toolbars: ['Layout', 'OpenFin', 'Export'],
      },
    ],
  },
};

const adaptableOptions: AdaptableOptions = {
  licenseKey: "StartDate=2021-10-05|EndDate=2022-10-05|Owner=MAN_FAKE_NO_3|Type=development|DeveloperCount=1|Ref=AdaptableLicense|TS=1633448147985|C=1685504007,1777892887,1260976079,2212294583,3235258666,4222172194,932266694,108615771",
  primaryKey: 'OrderId',
  userName: 'Demo User',
  adaptableId: 'OpenFin Integration Demo',

  plugins: [
    openfin({
      throttleTime: 1000,
    }),
  ],

  gridOptions: {
    columnDefs,
    rowData,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {},
    },
  },
  modules: AllEnterpriseModules,
  predefinedConfig: demoConfig,
};

const startTicking = (adaptableApi: AdaptableApi) => {
  setInterval(() => {
    const firstRowNode = adaptableApi.gridApi.getRowNodeForPrimaryKey('11142');
    const itemCount = firstRowNode.data.ItemCount + 1;
    firstRowNode.setDataValue('ItemCount', itemCount);
  }, 500);
};

const InitAdaptable = () => {
  Adaptable.init(adaptableOptions).then((adaptableApi: AdaptableApi) => {
    const openfinApi: OpenFinApi = adaptableApi.pluginsApi.getOpenFinPluginApi();

    console.log(openfinApi);

    // we simulate server loading when ready
    adaptableApi.eventApi.on('AdaptableReady', () => {
      // we load the json orders
      import('./orders.json')
        .then((data) => data.default)
        .then((data) => {
          // add an extra timeout
          setTimeout(() => {
            // and then set the correct row data
            adaptableApi.gridApi.setGridData(data);

            // startTicking(adaptableApi);
          }, 500);
        });
    });
  });
};
function App() {
  useEffect(() => {
    InitAdaptable();
  }, []);

  return (
    <>
      <div id="adaptable"></div>
      <div id="grid" className="ag-theme-alpine" />
    </>
  );
}

export default App;
