//modelo para criação de controllers de endpoint para w-api-suite
module.exports = (app) => {
  const agents = app.src.models.v2.agent;
  const validation = app.src.lib.validation;
  const users = app.src.models.v2.users;
  return{
    agentsReports: async (req, res) => {
      const params = req.query;
      let apiKey = req.headers.apikey;
      console.log(req.headers.apikey)
      if (apiKey == undefined) {
        return res.status(400).json({ error: 'apiKey is required' });
      }else if(apiKey == ''){
        return res.status(401).json({ error: 'apiKey is invalid' });
      }else{
        try {
          const user = await users.findUsers({ uuid: apiKey });
          if (user) {
            const agent = await agents.findBy(params);
            if (agent) {
              
              return res.status(200).json(agent);
              
            } else {
              return res.status(404).json({ error: 'agent not found' });
            }
          } else {
            return res.status(401).json({ error: 'apiKey is invalid' });
          }
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error: 'internal server error' });
        }
      }
    }
  }
}
