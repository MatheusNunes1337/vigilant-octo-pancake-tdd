const MissingParamError = require('../helpers/errors/missing-param-error');
const HttpResponse = require('../helpers/http-response');

class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  async route(httpRequest) {
    try {
      const { email, password } = httpRequest.body;

      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }

      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'));
      }

      const accessToken = await this.authUseCase.auth(email, password);

      if (!accessToken) {
        return HttpResponse.unauthorizedError();
      }

      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return HttpResponse.serverError();
    }
  }
}

module.exports = LoginRouter;
