import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { monJetonProdider } from './services/mon-jeton.provider';

@Module({
  providers: [ UserService, monJetonProdider],
  controllers: [UserController],
})
export class UserModule {}
