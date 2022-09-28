const { Segments } = require('celebrate');

class CelebrateErrorAPIModel {
  constructor(celebrateError) {
    this.error = celebrateError;
  }

  getErrorsDetails() {
    const errors = [];
    this.error.details.forEach((value, key) => {
      let location = '';
      if (key === Segments.BODY) location = 'Тело запроса';
      else if (key === Segments.COOKIES) location = 'Куки запроса';
      else if (key === Segments.HEADERS) location = 'Заголовки запроса';
      else if (key === Segments.PARAMS) location = 'Параметры адреса запроса';
      else location = key;

      value.details.forEach((item) => {
        const error = {
          location,
          parameter: item.context.key,
          message: item.message,
        };
        errors.push(error);
      });
    });

    return errors;
  }
}

module.exports = CelebrateErrorAPIModel;
