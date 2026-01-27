import { Injectable } from '@nestjs/common';

export type HealthStatus = 'ok' | 'degraded';

export interface HealthResponse {
  status: HealthStatus;
  service: string;
  version: string;
  timestamp: string;
  checks: Record<string, 'ok' | 'fail'>;
}

@Injectable()
export class HealthService {
  private readonly serviceName = 'backend';
  private readonly version = process.env.APP_VERSION ?? 'dev';

  getHealth(): { httpStatus: number; body: HealthResponse } {
    const body: HealthResponse = {
      status: 'ok',
      service: this.serviceName,
      version: this.version,
      timestamp: new Date().toISOString(),
      checks: {
        app: 'ok',
      },
    };

    // v1 is always ready if app is running
    return { httpStatus: 200, body };
  }
}
