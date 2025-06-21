import {InjectionToken} from '@angular/core';

interface ENV {
  production: boolean;
  apiUrl: string
}

const environment: ENV = {
  production: false,
  apiUrl: 'http://127.0.0.1:3000'
};

export const ENV_TOKEN: InjectionToken<ENV> = new InjectionToken<ENV>('env', {
  providedIn: 'root',
  factory: () => environment
})
