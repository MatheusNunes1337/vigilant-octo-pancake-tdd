class LoginRouter {
  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) return { statusCode: 500 };
    const { email, password } = httpRequest;

    if (!email || !password) return { statusCode: 400 };

    return { statusCode: 200 };
  }
}

describe('Given the Login Router', () => {
  describe('When email is not provided', () => {
    test('Then it expects to return status code 400', () => {
      const sut = new LoginRouter();
      const httpRequest = {
        body: {
          password: 'any_password',
        },
      };
      const httpResponse = sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
    });
  });

  describe('When password is not provided', () => {
    test('Then it expects to return status code 400', () => {
      const sut = new LoginRouter();
      const httpRequest = {
        body: {
          email: 'any_email@mail.com',
        },
      };
      const httpResponse = sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
    });
  });

  describe('When httpRequest is not provided', () => {
    test('Then it expects to return status code 500', () => {
      const sut = new LoginRouter();
      const httpResponse = sut.route();
      expect(httpResponse.statusCode).toBe(500);
    });
  });

  describe('When httpRequest has no body', () => {
    test('Then it expects to return status code 500', () => {
      const sut = new LoginRouter();
      const httpResponse = sut.route({});
      expect(httpResponse.statusCode).toBe(500);
    });
  });
});
