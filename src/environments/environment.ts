// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    // baseURL: "http://192.168.1.100/dPOSAPI/"
      //  baseURL: "http://192.168.1.111/dPOSAPI/"
          // baseURL: "http://localhost/dPOSAPI/"
      
        // baseURL:"http://192.168.1.113/xcbm/webservices/" //Development
      // baseURL : "http://localhost:51306/" //todo: /pick from environment variable
      baseURL : 'http://localhost:49381/' //Test Server"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
