import { Controller, Post, Get, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import User, { IUser } from '@/modules/wallapop/models/User.model';
import handleHttpError from '@/utils/errorHandler';
import { encrypt, compare } from '@/utils/handlePassword';
import { tokenSign } from '@/utils/handleJwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuarios' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error de validación.' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const userExists = await User.findOne({ email: registerDto.email });
      if (userExists) {
        throw new HttpException('ERROR_REGISTER_USER_ALREADY_EXISTS', HttpStatus.CONFLICT);
      }

      const password = await encrypt(registerDto.password);
      const body = { ...registerDto, password };
      const dataUser = await User.create(body);
      dataUser.set('password', undefined, { strict: false });

      const result = {
        token: await tokenSign(dataUser),
        user: dataUser,
      };
      
      return { data: result };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException('ERROR_REGISTER_USER', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión de usuarios' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await User.findOne({ email: loginDto.email });

      if (!user) {
        throw new HttpException('USER_NOT_EXISTS', HttpStatus.NOT_FOUND);
      }

      const hashPassword = user.get('password');
      const check = await compare(loginDto.password, hashPassword);

      if (!check) {
        throw new HttpException('PASSWORD_INVALID', HttpStatus.UNAUTHORIZED);
      }

      const token = await tokenSign(user);
      return { token };
    } catch (e) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException('ERROR_LOGIN_USER', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('users')
  @ApiOperation({ summary: 'Obtiene la lista de todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Retorna una lista de usuarios.' })
  async getAllUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (e) {
      console.error(e);
      throw new HttpException('ERROR_GET_ALL_USERS', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}