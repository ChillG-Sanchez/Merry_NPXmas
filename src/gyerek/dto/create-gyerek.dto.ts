import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateGyerekDto {
  @IsString()
  nev: string;

  @IsString()
  lakcim: string;

  @IsBoolean()
  joVoltE: boolean;

  @IsOptional()
  @IsString()
  kertJatek?: string;
}
