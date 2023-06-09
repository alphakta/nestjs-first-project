import { Body, Controller, Get, Header, HttpCode, Param, Post, Query, Redirect, Req, Inject } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MON_ENV, MON_JETON } from 'src/constants';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    @Inject(MON_JETON) private readonly monJeton: Record<string, object>,
    @Inject(MON_ENV) private readonly monEnv: Record<string, object>,
  ) { }

  @Get('/')
  returnAllUsers(): string {
    console.log(this.userService.findAll())
    console.log(this.monEnv)
    return JSON.stringify(this.userService.findAll());
  }

  @Get('user/:id')
  returnOneUser(@Param('id') id: string) {
    console.log("Id:", id)
    console.log("User returned", this.userService.findOne(parseInt(id)))
    return JSON.stringify(this.userService.findOne(parseInt(id)));
  }

  @Get('log-request')
  returnRequestObject(@Req() request: Request): void { console.log(request); }

  @Get('with-params') // http://localhost:3000/users/with-params?limit=2
  getUrlQueryParams(@Query() queryString) {
    console.log(typeof queryString);
    console.log(queryString);
    return queryString;
  }

  @Get('redirect') // http://localhost:3000/users/redirect
  @Redirect('/users/redirected', 301)
  redirectUser(): void {
    console.log('Redirecting ...');
  }

  @Get('redirected')
  redirectedUser(): string {
    console.log('We have been redirected !!');
    return 'We have been redirected !!';
  }

  @Post('add')
  @HttpCode(201)
  @Header('Cache-Control', 'no-cache')
  postNewUser(@Body() bodyContent) {
    console.log('bodyContent:', bodyContent)
    console.log(typeof bodyContent)
    this.userService.create(this.userService.formatRowApiData(bodyContent));
    console.log(this.userService.findAll());
    return bodyContent;
  }

}
