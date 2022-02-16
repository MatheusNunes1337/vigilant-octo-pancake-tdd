/* eslint-disable no-use-before-define */
// eslint-disable-next-line max-classes-per-file
class LoginRouter {
  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) { return HttpResponse.serverError(); }

    const { email, password } = httpRequest.body;

    if (!email) {
      return HttpResponse.badRequest('email');
    }

    if (!password) {
      return HttpResponse.badRequest('password');
    }

    return { statusCode: 200 };
  }
}

class MissingParamError extends Error {
  constructor(paramName) {
    super(`Missing Param: ${paramName}`);
    this.name = 'MissingParamError';
  }
}

class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static serverError() {
    return {
      statusCode: 500,
    };
  }
}

describe('Given the Login Router', () => {
  describe('When email is not provided', () => {
    let httpRequest;
    let httpResponse;
    let sut;

    beforeAll(() => {
      sut = new LoginRouter();
      httpRequest = {
        body: {
          password: 'any_password',
        },
      };
      httpResponse = sut.route(httpRequest);
    });

    test('Then it expects to return status code 400', () => {
      expect(httpResponse.statusCode).toBe(400);
    });

    test('Then it expects to return a body with MissingParamError', () => {
      expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });
  });

  describe('When password is not provided', () => {
    let httpRequest;
    let httpResponse;
    let sut;

    beforeAll(() => {
      sut = new LoginRouter();
      httpRequest = {
        body: {
          email: 'any_email@mail.com',
        },
      };
      httpResponse = sut.route(httpRequest);
    });

    test('Then it expects to return status code 400', () => {
      expect(httpResponse.statusCode).toBe(400);
    });

    test('Then it expects to return a body with MissingParamError', () => {
      expect(httpResponse.body).toEqual(new MissingParamError('password'));
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
