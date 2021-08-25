/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import { APP_BASE_HREF } from '@angular/common';
import '@angular/localize/init';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as cors from 'cors';
import * as domino from 'domino';
import * as express from 'express';
import { chmodSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { environment } from 'src/environments/environment';
import 'zone.js/dist/zone-node';
import { AppServerModule } from './src/main.server';
import { ApiRoutes } from './src/server/routes';
import { SSRConfig } from './src/server/ssr.config';

const distFolder = environment.production ? join(__dirname, '../public_html') : join(__dirname, '../browser');
const indexHtml = existsSync(join(distFolder, 'index.html')) ? 'index.html' : 'index';
const template = readFileSync(join(distFolder, 'index.html')).toString();
const win = domino.createWindow(template);
global['window'] = <any>win;
global['document'] = <any>win.document;
global['navigator'] = <any>win.navigator;


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  server.use(cors({
    origin: [environment.appUrl, environment.appUrl.replace('://', '://www.')],
    credentials: false
  }));
  
  const bodyParser = require('body-parser');

  // parse application/json
  server.use(express.json())

  // server.enable('trust proxy');
  // server.use((req, res, next) => {
  //   req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
  // })

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);


  // TODO: implement data requests securely
  //const api = new ApiRequestHandler();
  const checkAuth = (authKey: string) => {
    const filePath = join(__dirname, 'data', '.access_token');
    const fileExists = existsSync(filePath)
    const password = fileExists ? readFileSync(filePath).toString() : authKey;
    if (!fileExists) {
      console.log(`access_token file was created at, ${filePath}`);
      writeFileSync(filePath, authKey);
      return true;
    }
    return authKey === password;
  }
  server.use('/api/settings', (req, res, next) => {
    if (['post', 'put', 'delete', 'patch'].includes(req.method.toLowerCase())) {
      if (!req.body['access_token'] || !checkAuth(req.body['access_token'])) {
        res.status(404).send({ message: 'access deined' });
        return;
      }
    }
    delete(req.body['access_token']);
    next()
  });
  server.use('/api', ApiRoutes);
  // server.get('/api/**', (req, res) => {
  //   //api.handle(req, res);
  //   console.log(typeof(req), typeof(res));
  //   res.status(404).send('data requests are not yet supported');
  // });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // const nonRenderRouteHandler = (req, res) => {
  //   res.sendFile(join(distFolder, 'index.html'));
  // };

  // All regular routes use the Universal engine
  for (const route of SSRConfig.noSrrRoutes) {
    server.get(`/${route}`, (req, res) => {
      res.sendFile(join(distFolder, 'index.html'));
    });
    server.get(`/${route}/*`, (req, res) => {
      res.sendFile(join(distFolder, 'index.html'));
    });
  }

  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });


  return server;
}

function run(): void {

  const port = process.env['PORT'] ?? 4000;
  const sock = join(__dirname, 'app.sock');

  // Start up the Node server
  const server = app();
  // const listener = server.listen(port, () => {
  //   console.log(`Node Express server listening on http://localhost:${port}`);
  // });

  const listener = server.listen(environment.production ? sock : port, () => {
    if (environment.production) {
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
