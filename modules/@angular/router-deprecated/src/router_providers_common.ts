/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ApplicationRef} from '@angular/core';

import {BaseException} from '../src/facade/exceptions';
import {Type} from '../src/facade/lang';

import {ROUTER_PRIMARY_COMPONENT, RouteRegistry} from './route_registry';
import {RootRouter, Router} from './router';


/**
 * The Platform agnostic ROUTER PROVIDERS
 */
export const ROUTER_PROVIDERS_COMMON: any[] = [
  RouteRegistry, {provide: LocationStrategy, useClass: PathLocationStrategy}, Location, {
    provide: Router,
    useFactory: routerFactory,
    deps: [RouteRegistry, Location, ROUTER_PRIMARY_COMPONENT]
  },
  {
    provide: ROUTER_PRIMARY_COMPONENT,
    useFactory: routerPrimaryComponentFactory,
    deps: [ApplicationRef]
  }
];

function routerFactory(
    registry: RouteRegistry, location: Location, primaryComponent: Type): RootRouter {
  return new RootRouter(registry, location, primaryComponent);
}

function routerPrimaryComponentFactory(app: ApplicationRef): Type {
  if (app.componentTypes.length == 0) {
    throw new BaseException('Bootstrap at least one component before injecting Router.');
  }
  return app.componentTypes[0];
}
