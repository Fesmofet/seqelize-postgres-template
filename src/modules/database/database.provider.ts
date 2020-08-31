import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../shared';
import { User } from '../users/user.entity';

export const databaseProvider = {
    provide: 'SequelizeInstance',
    useFactory: () => {
        let config;
        switch (process.env.NODE_ENV) {
            case 'prod':
            case 'production':
                config = databaseConfig.production;
                break;
            case 'dev':
            case 'development':
                config = databaseConfig.development;
                break;
            default:
                config = databaseConfig.development;
                break;

        }

        const sequelize = new Sequelize(config);
        sequelize.addModels([User]);
        /* await sequelize.sync(); add this if you want to sync model and DB.*/
        return sequelize;
    }
};