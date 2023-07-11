module.exports = (app) => {
  function existsOrError(value, msg) {
    if (!value) throw msg; //Lança a mensagem de erro quando o valor passado for nulo
    if (Array.isArray(value) && value.length === 0) throw msg; //Lança a mensagem de erro quando o valor passado não for uma matriz e não possuir elementos
    if (typeof value === "string" && !value.trim()) throw msg; //Lança a mensagem de erro quando o valor passado for um dado do tipo String sem caracteres
  }

  function equalsOrError(paramsA, paramsB, msg) {
    if (paramsA !== paramsB) throw msg; //Lança a mensagem de erro quando o primeiro parâmetro de validação for diferente do segundo
  }

  function notExistsOrError(value, msg) {
    try {
      existsOrError(value, msg);
    } catch (msg) {
      return;
    }
    throw msg;
  }


  function notInRangeOrError(rangeOut, rangeIn, msg) { //Passado por parâmetro: dois objetos com os atributos de data inicial e data final e uma mensagem de erro a ser lançada para o cliente. 
    const Moment = require("moment");
    const MomentRange = require("moment-range");

    const moment = MomentRange.extendMoment(Moment); //extendendo a função criadora de faixa horária
    
    //criação das faixas de horário para cada objeto criado. A função da biblioteca responsável chama-se "range".
    let periodIn = moment().range(rangeIn.init_hr, rangeIn.fnl_hr)
    let periodOut = moment().range(rangeOut.init_hr, rangeOut.fnl_hr)
    
    if (periodIn.contains(rangeOut.init_hr)) throw msg
    if (periodIn.contains(rangeOut.fnl_hr)) throw msg
    if (periodOut.contains(rangeIn.init_hr)) throw msg
    if (periodOut.contains(rangeIn.fnl_hr)) throw msg
  }

  return { notInRangeOrError, existsOrError, notExistsOrError, equalsOrError };
};
