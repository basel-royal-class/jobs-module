import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreatePortfolioDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty({ message: 'Portfolio name is required' })
  @IsString({ message: 'Portfolio name must be a string' })
  name: string;


  @IsUrl()
  @IsNotEmpty()
  link: string;
}

export class PortfolioResponseDto {
    id: number;
    user_id: number;
    name: string;
    link: string;
    created_at: Date;
    updated_at: Date;
  }