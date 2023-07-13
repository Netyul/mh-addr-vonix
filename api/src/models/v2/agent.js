//modelo para criação de controllers de endpoint para w-api-suite
module.exports = (app) => {
  return {
    findBy: async (params) => {
      const qs = params
      const dataInit = qs.start
      const dataEnd = qs.end
      delete qs.start
      delete qs.end
      return await app.db.select('*').from('agents_reports').whereBetween('date_login',[dataInit, dataEnd]).where(qs).orderBy('date_login', 'desc')
    }
  }
};

