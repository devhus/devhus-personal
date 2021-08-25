// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  appVersion: 'devhus_v1', //<-- Your app version
  appUrl: "http://localhost:4200", //<-- where the app will be running, including path folders with the domain
  apiUrl: 'http://localhost:4000/api', //<-- where the API will be running, including path folders with the domain. if you're using Angular Universal feature built within the app the apiUrl likely is gonna be appUrl+'/api'

  ssr:{
    node_server_hanlder: 'port' //<-- sock or port, in case your nodeJS server is running using sock make this 'sock'
  },

  nodemailer: {
    service: 'gmail',
    user: 'youremail@gmail.com',
    pass: 'your_pass',
    receiver_email: 'receiver@gmail.com'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
