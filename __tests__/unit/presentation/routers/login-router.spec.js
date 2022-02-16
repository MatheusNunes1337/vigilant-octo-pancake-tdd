class LoginRouter {
  route(httpRequest) {
    const { email, password } = httpRequest;

    if (!email || !password) {
      return {
        statusCode: 400,
      };
    }
    return 200;
  }
}

describe('Given the Login Router', () => {
  describe('When email is not provided', () => {
    test('Then it expects to return status code 400', () => {
      const sut = new LoginRouter();
      const httpRequest = {
        password: 'any_password',
      };
      const httpResponse = sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(400);
    });
  });
});

describe('When email is not provided', () => {
  test('Then it expects to return status code 400', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      email: 'any_email@mail.com',
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
