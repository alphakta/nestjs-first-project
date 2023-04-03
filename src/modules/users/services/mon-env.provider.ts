import { MON_ENV } from 'src/constants';
import * as dotenv from 'dotenv'

dotenv.config()

export const monJetonProdider = {
    provide: MON_ENV,
    useValue: { useFactory: () => process.env.APP_ENV === 'dev' ? true : false }
};