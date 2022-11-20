import supertest from 'supertest';
import app from '../index';

const req = supertest(app);

describe('Testing the responses of the image resize endpoint', () => {
  //constants which will be used by multiple items
  const filename = 'santamonica';
  const width = 200;
  const height = 100;

  //test for valid case
  it('Test for valid case: Check status to return 200 (found image)', async () => {
    const res = await req.get(
      `/api/resize?filename=${filename}&width=${width}&height=${height}`
    );
    expect(res.status).toBe(200);
  });

  //tests for invalid cases
  //case 1
  it('Test invalid case 1: no filename specified in query params', async () => {
    const res = await req.get(`/api/resize?width=${width}&height=${height}`);
    expect(res.text).toBe(
      '<h2>Missing parameters, please use at least a valid filename query params in the url</h2>'
    );
    expect(res.status).toBe(400);
  });

  //case 2
  it('Test invalid case 2: filename is not valid (not found)', async () => {
    const res = await req.get(
      `/api/resize?filename=sea&width=${width}&height=${height}`
    );
    expect(res.text).toBe('<h2>NO image Found with that name...</h2>');
    expect(res.status).toBe(404);
  });

  //case 3
  it('Test invalid case 3: width or height are non numeric positives', async () => {
    const negWidth = -10;
    const res = await req.get(
      `/api/resize?filename=${filename}&width=${negWidth}&height=${height}`
    );
    expect(res.text).toBe(
      '<h2>Value for width/height must be a positive nuber...</h2>'
    );
    expect(res.status).toBe(400);
  });

  //case 4
  it('Test invalid case 4: missing parameter of either width or height', async () => {
    const res = await req.get(
      `/api/resize?filename=${filename}&width=${width}`
    );
    expect(res.text).toBe(
      '<h2>Missing parameters, please insert both width and height</h2>'
    );
    expect(res.status).toBe(400);
  });
});
