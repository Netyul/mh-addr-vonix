//modelo para criação de controllers de endpoint para w-api-suite
module.exports = (app) => {
  return {
    findBy: async (params) => {
      const qs = params
      const dataInit = qs.dataInit
      const dataEnd = qs.dataEnd
      delete qs.dataInit
      delete qs.dataEnd
      return await app.db.select('*').from('agents_reports').whereBetween('date_login',[dataInit, dataEnd]).where(qs).orderBy('date_login', 'desc')
    }
  }
};

