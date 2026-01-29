import { HealthService } from './health.service';

describe('HealthService', () => {
  it('liveness returns ok with required fields', () => {
    const svc = new HealthService();
    const result = svc.getLiveness();

    expect(result.httpStatus).toBe(200);
    expect(result.body.status).toBe('ok');
    expect(result.body.service).toBe('backend');
    expect(result.body.version).toBeTruthy();
    expect(result.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(result.body.checks.app).toBe('ok');
  });

  it('readiness returns ok with required fields', () => {
    const svc = new HealthService();
    const result = svc.getReadiness();

    expect(result.httpStatus).toBe(200);
    expect(result.body.status).toBe('ok');
    expect(result.body.service).toBe('backend');
    expect(result.body.version).toBeTruthy();
    expect(result.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(result.body.checks.app).toBe('ok');
  });
});