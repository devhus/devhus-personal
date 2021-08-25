# Devhus-Personal

A simple personal resume website for a web developer. built with Angular && SSR feature to have a nice SPA with the ability to be crawled by search engine bots. It also provides you a simple settings forms to customize some data on the website dynamically without the need to rebuild the whole project.

## Demo
You can always see the website demo on my personal domain: [devhus.com](https://devhus.com/)

## How to run it
### 1. install node modules
```
$ npm install
```

### 2. Set up the environments
You need to make a copy from ``src/environments/environment.ts`` to ``src/environments/environment.prod.ts`` and modify both files to fit your environments.
Now you need to setup your environment variables to fit the local or production environments.

### 3. Run the app
```
$ ng serve
-- OR with SSR --
$ npm run dev:ssr
```

### 4. Set up the settings
Go to settings route on the domain you're serving your app on, for default: ``127.0.0.1:4200/settings``
First, it will ask you for an Access token, which is just a token you will be able to set for the first time to be stored in the server's data folder.
After setting up your Access Token you will need to use it every other time you trying to access the settings route.
Now try to set up the app settings and see how it will turn out on the front pages.
