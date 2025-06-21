import {InjectionToken} from '@angular/core';

interface ENV {
  production: boolean;
  apiUrl: string
}

const environment: ENV = {
  production: true,
  apiUrl: 'http://pienext/api'
};

export const ENV_TOKEN: InjectionToken<ENV> = new InjectionToken<ENV>('env', {
  providedIn: 'root',
  factory: () => environment
})
