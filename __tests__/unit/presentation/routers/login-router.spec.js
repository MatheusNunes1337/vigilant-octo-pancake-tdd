class LoginRouter {
  route(httpRequest) {
    if (!httpRequest.email) {
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
