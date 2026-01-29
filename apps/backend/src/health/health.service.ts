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

  private baseResponse(): Omit<HealthResponse, 'status' | 'checks'> {
    return {
      service: this.serviceName,
      version: this.version,
      timestamp: new Date().toISOString(),
    };
  }

  getLiveness(): { httpStatus: number; body: HealthResponse } {
    // Liveness should NOT depend on external systems.
    const body: HealthResponse = {
      ...this.baseResponse(),
      status: 'ok',
      checks: {
        app: 'ok',
      },
    };
    return { httpStatus: 200, body };
  }

  getReadiness(): { httpStatus: number; body: HealthResponse } {
    // v1 readiness is same as liveness; later we'll add DB checks here.
    const body: HealthResponse = {
      ...this.baseResponse(),
      status: 'ok',
      checks: {
        app: 'ok',
      },
    };
    return { httpStatus: 200, body };
  }
}