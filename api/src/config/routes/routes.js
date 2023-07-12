const router = require('express').Router();
const routerAttendance = require('express').Router();

module.exports = (app) => {
  const controllers = app.src.controllers.v2;

  // 👉 Rotas de autenticação:
  
  app.post('/v2/login', controllers.auth.login);
  // 👉 Middleware de autenticação:
  
  
  // 👉 Rotas de atendimento humano

  app.route('/v2/agents_reports').get(controllers.agent.agentsReports);

  


  
  
};
