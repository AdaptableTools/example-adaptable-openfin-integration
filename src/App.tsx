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
  primaryKey: 'OrderId',
  userName: 'Demo User',
  adaptableId: 'OpenFin Integration Demo',

  plugins: [
    openfin({
      throttleTime: 1000,
    }),
  ],

  vendorGrid: {
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
    // rowData: null,
    modules: AllEnterpriseModules,
  },
  predefinedConfig: demoConfig,
};

const startTicking = (adaptableApi: AdaptableApi) => {
  setInterval(() => {
    const gridOptions = adaptableApi.gridApi.getVendorGrid() as GridOptions;
    const firstRowNode = gridOptions.api!.getRowNode('11142');

    const itemCount = firstRowNode.data.ItemCount + 1;

    firstRowNode.setDataValue('ItemCount', itemCount);
  }, 500);
};

const InitAdaptable = () => {
  Adaptable.init(adaptableOptions).then((adaptableApi: AdaptableApi) => {
    const openfinApi: OpenFinApi = adaptableApi.pluginsApi.getPluginApi(
      'openfin'
    );

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
            adaptableApi.gridApi.getVendorGrid().api.setRowData(data);

            startTicking(adaptableApi);
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
