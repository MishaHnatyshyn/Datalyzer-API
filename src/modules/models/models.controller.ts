import { Controller } from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('models')
@Controller('models')
export class ModelsController {}
