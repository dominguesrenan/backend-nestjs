import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../shared/guards/permissions.guard';
import { RequirePermissions } from '../../shared/decorators/require-permissions.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Apenas usuários com permissão 'users.read' podem listar usuários
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions({ resource: 'users', action: 'read' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Apenas usuários com permissão 'users.read' podem visualizar usuário específico
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions({ resource: 'users', action: 'read' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // Usuários podem visualizar seu próprio perfil
  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  getMyProfile(@CurrentUser() user) {
    return this.usersService.findOne(user.id);
  }

  // Apenas usuários com permissão 'users.create' podem criar usuários
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions({ resource: 'users', action: 'create' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Usuários podem atualizar seu próprio perfil OU admins podem atualizar qualquer perfil
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user
  ) {
    // Verificar se usuário está atualizando seu próprio perfil ou é admin
    if (user.id !== +id && user.role !== 'admin') {
      throw new Error('Não autorizado');
    }
    return this.usersService.update(+id, updateUserDto);
  }

  // Usuários podem atualizar seu próprio perfil parcialmente
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  updatePatch(
    @Param('id') id: string,
    @Body() updatePatchUserDto: UpdateUserDto,
    @CurrentUser() user: User
  ) {
    // Verificar se usuário está atualizando seu próprio perfil ou é admin
    if (user.id !== +id && user.role !== 'admin') {
      throw new Error('Não autorizado');
    }
    return this.usersService.updatePatch(+id, updatePatchUserDto);
  }

  // Apenas usuários com permissão 'users.delete' podem deletar usuários
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions({ resource: 'users', action: 'delete' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user) {
    // Verificar se usuário está deletando seu próprio perfil ou é admin
    if (user.id !== +id && user.role !== 'admin') {
      throw new Error('Não autorizado');
    }
    return this.usersService.remove(+id);
  }
}
