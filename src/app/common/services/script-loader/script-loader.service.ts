import { Injectable } from '@angular/core';
import { LoaderScript, ScriptStore } from './script-loader.store';



@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private scripts: { [key: string]: LoaderScript } = {};

  constructor() {
    ScriptStore.forEach((script: LoaderScript) => {
      script.loaded = false;
      this.scripts[script.name] = script;
    });
  }


  load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      const tScript = this.scripts[name];
      if (!tScript || tScript == undefined) {
        reject(`Script [${name}] cannot be found!`);
        return;
      }

      if (tScript.loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
      else {
        //load script
        let script: any = document.createElement('script');
        script.type = 'text/javascript';
        if (tScript.defer) {
          script.defer = tScript.defer;
        }
        script.src = tScript.src;
        if (script.readyState) {  //IE
          script.onreadystatechange = () => {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              tScript.loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {  //Others
          script.onload = () => {
            tScript.loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0]?.appendChild(script);
      }
    });
  }

}
