import { HealthService } from './health.service';

describe('HealthService', () => {
  it('returns ok health response with required fields', () => {
    const svc = new HealthService();
    const result = svc.getHealth();

    expect(result.httpStatus).toBe(200);
    expect(result.body.status).toBe('ok');
    expect(result.body.service).toBe('backend');
    expect(result.body.version).toBeTruthy();
    expect(result.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(result.body.checks.app).toBe('ok');
  });
});