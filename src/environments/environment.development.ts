import { InjectionToken } from '@angular/core';

export interface ENV {
  production: boolean;
  apiUrl: string;
}

const environment: ENV = {
  production: false,
  apiUrl: 'http://localhost:3000',
};

export const ENV_TOKEN: InjectionToken<ENV> = new InjectionToken<ENV>('env', {
  providedIn: 'root',
  factory: () => environment,
});
