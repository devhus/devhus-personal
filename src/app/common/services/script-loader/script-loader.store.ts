import { environment } from 'src/environments/environment';
import { LoadableScripts } from './loader-scripts.enum';
export interface LoaderScript {
  name: string;
  src: string;
  defer?: boolean,
  async?: boolean,
  loaded?: boolean;
  gloablLoad: boolean;
}
export const ScriptStore: LoaderScript[] = [
  {
    name: LoadableScripts.Paypal,
    src: `https://www.paypal.com/sdk/js?client-id=${environment.paypal.env == 'sandbox' ? environment.paypal.client.sandbox : environment.paypal.client.production}&currency=${environment.defaultCurrency}`,
    gloablLoad: false,
    defer: true,
  },
  {
    name: LoadableScripts.Stripe,
    src: `https://js.stripe.com/v3/`,
    gloablLoad: false,
    defer: true,
  },
  {
    name: LoadableScripts.GoogleRecaptcha,
    src: `https://www.google.com/recaptcha/api.js`,
    gloablLoad: false,
    defer: true,
    async: true,
  },
];