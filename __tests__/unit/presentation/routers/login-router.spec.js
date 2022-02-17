const InternalServerError = require('../../../../src/presentation/helpers/errors/internal-server-error');
const MissingParamError = require('../../../../src/presentation/helpers/errors/missing-param-error');
const UnauthorizedError = require('../../../../src/presentation/helpers/errors/unauthorized-error');
const LoginRouter = require('../../../../src/presentation/routers/login-router');

const makeSut = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password;
      return this.accessToken;
    }
  }

  const authUseCaseSpy = new AuthUseCaseSpy();
  const sut = new LoginRouter(authUseCaseSpy);

  return { sut, authUseCaseSpy };
};

describe('Given the Login Router', () => {
  describe('When email is not provided', () => {
    let httpRequest;
    let httpResponse;
    const { sut } = makeSut();

    beforeAll(() => {
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
    const { sut } = makeSut();

    beforeAll(() => {
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
    let httpResponse;
    const { sut } = makeSut();
    beforeAll(() => {
      httpResponse = sut.route();
    });

    test('Then it expects to return status code 500', () => {
      expect(httpResponse.statusCode).toBe(500);
    });

    test('Then it expects to return status code 500', () => {
      expect(httpResponse.body).toEqual(new InternalServerError());
    });
  });

  describe('When httpRequest has no body', () => {
    test('Then it expects to return status code 500', () => {
      const { sut } = makeSut();
      const httpResponse = sut.route({});
      expect(httpResponse.statusCode).toBe(500);
    });
  });

  describe('When it calls AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut();
    let httpRequest;

    beforeAll(() => {
      httpRequest = {
        body: {
          email: 'any_email@mail.com',
          password: 'any_password',
        },
      };
      sut.route(httpRequest);
    });

    test('Then it expects the AuthUseCase email to be http request email', () => {
      expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    });

    test('Then it expects the AuthUseCase password to be http request password', () => {
      expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
    });
  });

  describe('When it calls AuthUseCase with invalid credentials', () => {
    const { sut, authUseCaseSpy } = makeSut();
    let httpRequest;
    let httpResponse;
    authUseCaseSpy.accessToken = null;

    beforeAll(() => {
      httpRequest = {
        body: {
          email: 'invalid_email@mail.com',
          password: 'invalid_password',
        },
      };
      httpResponse = sut.route(httpRequest);
    });

    test('Then it expects to return status code 401', () => {
      expect(httpResponse.statusCode).toBe(401);
    });

    test('Then it expects to return a body with UnauthorizedError', () => {
      expect(httpResponse.body).toEqual(new UnauthorizedError());
    });
  });

  describe('When AuthUseCase is not provided', () => {
    test('Then it expects to return status code 500', () => {
      const sut = new LoginRouter();

      const httpRequest = {
        body: {
          email: 'any_email@mail.com',
          password: 'any_password',
        },
      };
      const httpResponse = sut.route(httpRequest);

      expect(httpResponse.statusCode).toBe(500);
    });
  });

  describe('When AuthUseCase has no auth method', () => {
    test('Then it expects to return status code 500', () => {
      const sut = new LoginRouter({});

      const httpRequest = {
        body: {
          email: 'any_email@mail.com',
          password: 'any_password',
        },
      };
      const httpResponse = sut.route(httpRequest);
      expect(httpResponse.statusCode).toBe(500);
    });
  });

  describe('When valid credentials are provided', () => {
    let httpRequest;
    let httpResponse;
    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = 'valid_token';

    beforeAll(() => {
      httpRequest = {
        body: {
          email: 'valid_email@mail.com',
          password: 'valid_password',
        },
      };

      httpResponse = sut.route(httpRequest);
    });
    test('Then it expects to return the access token', () => {
      expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);
    });
  });
});
