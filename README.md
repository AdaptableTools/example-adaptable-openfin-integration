# OpenFin <> AdapTable Integration Example

This demo shows how you can use OpenFin inside AdapTable.

The code is using TypeScript for convenience - but it could easily be just JavaScript.

## Installation

NOTE: In order to be able to run `npm install`, you need to follow the [AdapTable installation instructions](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/README.md) - so you need to be logged into our private NPM registry.

> If you do not have an Adpatable Login please contact support@adaptabletools.com

Run `npm install` (or `yarn`), depending on what tool you're using.

## Running for development

```sh
$ npm run start
```

This command will start `create-react-app` and open the browser at `localhost:3000`. NOTE however that it will not work in the browser, because you have to run it in openfin with the next command:

```sh
$ npm run start-openfin
```

This will start the actual OpenFin app, where you can see the AdapTable integration running.

## Using the OpenFin Plugin

You will see that this example includes the OpenFin plugin.  This gives the user access to the OpenFin only functionality in AdapTable.

This includes 'Live Excel' - note how 'ItemCount' in the first row is continually incrementing.

If you export 'All Data' to Excel from the OpenFin toolbar it will automatically open Excel (assuming you have a version on your machine) and the spreadsheet will update every 2 seconds as the Grid ticks.

## Licences

A licence for AdapTable provides access to all product features as well as quarterly updates and enhancements through the lifetime of the licence, comprehensive support, and access to all 3rd party libraries.

Licences can be purchased individually, for a team (minimum 30 end-users), for an organisation or for integration into software for onward sale.

We can make a trial licence available for a short period of time to allow you to try out AdapTable for yourself.

Please contact [`sales@adaptabletools.com`](mailto:sales@adaptabletools.com) for more information.

## Demo

To see AdapTable in action visit our [Demo Site](https://demo.adaptabletools.com). Here you can see a large number of AdapTable demos each showing a different feature, function or option in AdapTable (using dummy data sets).

## Help

Developers can learn how to access AdapTable programmatically at [AdapTable Documentation](https://docs.adaptabletools.com).

## More Information

General information about Adaptable Tools is available at our [Website](http://www.adaptabletools.com)

## Support

For all support enquiries please email [`support@adaptabletools.com`](mailto:support@adaptabletools.com) or [raise a Support Ticket](https://adaptabletools.zendesk.com/hc/en-us/requests/new).
