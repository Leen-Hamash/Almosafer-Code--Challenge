import { getAccessToken } from "../services/api";

global.fetch = jest.fn();

describe('api', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('fetches access token', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => ({ access_token: 'mock-token' }),
    });

    const token = await getAccessToken();
    expect(token).toBe('mock-token');
  });
});