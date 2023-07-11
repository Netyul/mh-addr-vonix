module.exports = (app) => {
  
    
  return {
    findUsers: async (params) => {
      return await app.db('users').where(params).first();
    },
  };
};
