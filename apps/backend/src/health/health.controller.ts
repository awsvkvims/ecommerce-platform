import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { HealthService } from './health.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  live(@Res() res: Response) {
    const result = this.healthService.getLiveness();
    return res.status(result.httpStatus).json(result.body);
  }

  @Get('ready')
  ready(@Res() res: Response) {
    const result = this.healthService.getReadiness();
    return res.status(result.httpStatus).json(result.body);
  }
}
