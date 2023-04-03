import { MON_JETON } from 'src/constants';

export const monJetonProdider = {
    provide: MON_JETON,
    useValue: {
      prop: 'abc',
      methode() {
        return
      }
    }
  }