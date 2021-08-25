import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { chmodSync, existsSync } from 'fs';
import { join } from 'path';
import { ApiRequestHandler } from 'server/api-request-handler';
import 'zone.js/dist/zone-node';
import { env } from './server/env';
import { AppServerModule } from './src/main.server';
// The Express app is exported so that it can be used by serverless Functions.

export function app() {
  const server = express();
  server.enable('trust proxy');
  server.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
  })

  const distFolder = env.production ? join(__dirname, 'public') : join(__dirname, '../browser');
  //const distFolder =  join(__dirname, '../browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // TODO: implement data requests securely
  const api = new ApiRequestHandler();
  server.get('/api/**', (req, res) => {
    //api.handle(req, res);
    console.log(typeof(req), typeof(res));
    res.status(404).send('data requests are not yet supported');
  });

  //server.use(express.static(distFolder));

  // Serve static files from /browser
  // server.get('*.*', (req, res) => {
  //   res.status(404).send(req.url);
  // });

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  //

  return server;
}


function run() {
  const port = process.env['PORT'] ?? 4000;
  const sock = join(__dirname, 'app.sock');
  // Start up the Node server
  const server = app();
  
  const listener = server.listen(env.production ? sock : port, () => {
    if (env.production) {
      chmodSync(sock, '0777');
      console.log(`Node Express server listening on ${sock}`);
    } else {
      console.log(`Node Express server listening on http://localhost:${port}`);
    }
  });

  function onClose(code: string) {
    console.log(`Node Express Server is closing with the code ${code}`);
    listener.close();
    process.exit();
  }

  process.on('exit', () => {
    onClose('exit');
  })
  //catches ctrl+c event
  process.on('SIGINT', () => {
    onClose('SIGINT');
  })
  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', () => {
    onClose('SIGUSR1');
  })
  process.on('SIGUSR2', () => {
    onClose('SIGUSR2');
  })
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
