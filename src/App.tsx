import React, { useEffect } from 'react';
import './App.css';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham-dark.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';

import '@adaptabletools/adaptable/index.css';
import '@adaptabletools/adaptable/themes/dark.css';
import './index.css';

import { OpenFinApi } from '@adaptabletools/adaptable/types';

import Adaptable from '@adaptabletools/adaptable/agGrid';

import openfin from '@adaptabletools/adaptable-plugin-openfin';

import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '@adaptabletools/adaptable/types';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { StatusBarModule } from '@ag-grid-enterprise/status-bar';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { Module } from '@ag-grid-community/core';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';

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
  predefinedConfig: demoConfig,
};

const startTicking = (adaptableApi: AdaptableApi) => {
  setInterval(() => {
    const firstRowNode = adaptableApi.gridApi.getRowNodeForPrimaryKey('11142');
    const itemCount = firstRowNode.data.ItemCount + 1;
    firstRowNode.setDataValue('ItemCount', itemCount);
  }, 500);
};

const agGridModules: Module[] = [
  ClientSideRowModelModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  StatusBarModule,
  MenuModule,
  RangeSelectionModule,
  RichSelectModule,
  ExcelExportModule,
  GridChartsModule,
  SparklinesModule,
  RowGroupingModule,
  ClipboardModule,
];

const InitAdaptable = () => {
  Adaptable.init(adaptableOptions, { agGridModules }).then((adaptableApi: AdaptableApi) => {
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
