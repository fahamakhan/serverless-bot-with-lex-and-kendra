import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { QueryService } from './query.service';
import { PostQueryDto } from './dto/post-query.dto';

@Controller('query')
export class QueryController {
  constructor(
    private readonly queryService: QueryService,
  ) { }

  @Post()
  async getQueryAnswer(@Body() postQueryDto: PostQueryDto) {
    return await this.queryService.findCompanyFounder(postQueryDto);
  }

}
