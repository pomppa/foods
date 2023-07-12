import { createMocks } from 'node-mocks-http';
import handle from '../pages/api/getMeal/[id]';

it('should return 401 response from meals', async () => {
  const { req, res } = createMocks('GET');
  await handle(req, res);
  expect(res.statusCode).toBe(401);
});
