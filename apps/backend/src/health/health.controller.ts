import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { HealthService } from './health.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(@Res() res: Response) {
    const result = this.healthService.getHealth();
    return res.status(result.httpStatus).json(result.body);
  }
}
