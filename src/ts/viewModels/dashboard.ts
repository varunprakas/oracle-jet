import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import { whenDocumentReady } from "ojs/ojbootstrap";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import FlattenedTreeDataProviderView = require("ojs/ojflattenedtreedataproviderview");
import ArrayTreeDataProvider = require("ojs/ojarraytreedataprovider");

import "ojs/ojtable";
import "ojs/ojchart";
import "ojs/ojknockout";
import "ojs/ojrowexpander";
import "ojs/ojmodel";

import { tableObject, pieChartObject, lineChartObject } from "../dataProvider";
import { serviceApi } from '../service';

class DashboardViewModel {

  public getData: ko.ObservableArray = ko.observableArray([]);

  private dataProvider: ko.Observable = ko.observable();

  private dataProviderPieChart: ko.Observable = ko.observable();

  private dataProviderLineChart: ko.Observable = ko.observable();

  constructor() {
    var self = this;
    serviceApi().then((res: any) => {
      this.getData(res);
      console.log(this.getData());
      this.dataProvider(
        new FlattenedTreeDataProviderView(new ArrayTreeDataProvider(tableObject(res),
          {
            keyAttributes: "id"
          }
        ))
      );
      this.dataProviderPieChart(
        new ArrayDataProvider(pieChartObject(res), {
          keyAttributes: "id"
        }
        ))
      this.dataProviderLineChart(
        new ArrayDataProvider(lineChartObject(res), {
          keyAttributes: "id"
        }
        ))
    })
  }

  /**
   * Optional ViewModel method invoked after the View is inserted into the
   * document DOM.  The application can put logic that requires the DOM being
   * attached here.
   * This method might be called multiple times - after the View is created
   * and inserted into the DOM and after the View is reconnected
   * after being disconnected.
   */
  connected(): void {
    AccUtils.announce("Dashboard page loaded.");
    document.title = "Dashboard";
    // implement further logic if needed
  }

  /**
   * Optional ViewModel method invoked after the View is disconnected from the DOM.
   */
  disconnected(): void {
    // implement if needed
  }

  /**
   * Optional ViewModel method invoked after transition to the new View is complete.
   * That includes any possible animation between the old and the new View.
   */
  transitionCompleted(): void {
    // implement if needed
  }
  getClass = (value: string) => {
    if (value === 'complete') return 'oj-badge oj-badge-success';
    else if (value === 'failure') return 'oj-badge oj-badge-danger';
    else return 'oj-badge';
  };

}

whenDocumentReady().then(function () {
  ko.applyBindings(new DashboardViewModel(),
    document.getElementById("tableContainer"));

  ko.applyBindings(
    new DashboardViewModel(),
    document.getElementById("chart-container")
  );

  ko.applyBindings(
    new DashboardViewModel(),
    document.getElementById("pie-chart-container")
  );

});
export = DashboardViewModel;
