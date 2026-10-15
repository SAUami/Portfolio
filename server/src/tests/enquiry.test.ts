import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';

describe('Backend API & Auth Route Tests', () => {
  it('GET /api/health should return status ok with configuration flags', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('integrations');
  });

  it('GET /api/unknown-endpoint should return 404 with structured error', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('error', 'NOT_FOUND');
  });

  it('POST /api/enquiries should reject empty payload with 422', async () => {
    const res = await request(app).post('/api/enquiries').send({});
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('VALIDATION_FAILED');
  });

  it('POST /api/enquiries should reject when honeypot is filled (spam trap)', async () => {
    const spamPayload = {
      fullName: 'Bot Spammer',
      businessOrSchoolName: 'Spam Co',
      email: 'bot@spam.com',
      serviceRequired: 'Business Website Development',
      projectDescription: 'This is an automated promotional blast message.',
      consent: true,
      hp_field: 'http://spam-link.ru',
    };

    const res = await request(app).post('/api/enquiries').send(spamPayload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('SPAM_DETECTED');
  });

  it('POST /api/auth/login should reject invalid credentials with 401', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'vedyxa.in@gmail.com',
      password: 'WrongPassword123',
    });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('INVALID_CREDENTIALS');
  });

  it('POST /api/auth/login should succeed with valid admin credentials and return token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'vedyxa.in@gmail.com',
      password: 'Saurabh@2026',
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('vedyxa.in@gmail.com');

    // Test protected route with this token
    const token = res.body.token;
    const adminRes = await request(app)
      .get('/api/admin/enquiries')
      .set('Authorization', `Bearer ${token}`);
    expect(adminRes.status).toBe(200);
    expect(adminRes.body.success).toBe(true);
    expect(Array.isArray(adminRes.body.enquiries)).toBe(true);
  });

  it('GET /api/admin/enquiries should reject requests without token with 401', async () => {
    const res = await request(app).get('/api/admin/enquiries');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('UNAUTHORIZED');
  });

  it('GET /api/admin/enquiries should reject requests with forged token with 401', async () => {
    const res = await request(app)
      .get('/api/admin/enquiries')
      .set('Authorization', 'Bearer adm_fake_forged_token_1234567890');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('INVALID_SESSION');
  });
});
