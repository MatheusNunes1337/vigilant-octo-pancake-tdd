const MissingParamError = require('../../../../src/presentation/helpers/errors/missing-param-error');
const LoginRouter = require('../../../../src/presentation/routers/login-router');

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
