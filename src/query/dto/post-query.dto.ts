import {
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';


export class PostQueryDto {
    @IsNotEmpty()
    @Type(() => String)
    query: string;
    
}
