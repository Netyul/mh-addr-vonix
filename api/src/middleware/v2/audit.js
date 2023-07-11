const  requestIp  =  require ( 'request-ip' ) ;

module.exports = (app) => {
  const auditModel = app.src.models.v2.audit;

  const audit = function (req, res, next) {
    let send = res.send;

    res.send = (body) => {
      // 👉 Filtro tradutor de paginas de acordo com a rota ex: /attendance => atendimento
      const translate = [
        {
          name: 'attendance',
          value: 'atendimento',
        },
        {
          name: 'users',
          value: 'usuários',
        },
        {
          name: 'profiles',
          value: 'perfis',
        },
        {
          name: 'breaks',
          value: 'pausas',
        },
      ];

      const newURL = req.url.split('/')[1];

      const clientIp = requestIp.getClientIp(req)

      // 👉 Listagem de todas as rotas do sistema

      let route,
        routes = [];

      app._router.stack.forEach(function (middleware) {
        if (middleware.route) {
          // routes registered directly on the app
          routes.push(middleware.route);
        } else if (middleware.name === 'router') {
          // router middleware
          middleware.handle.stack.forEach(function (handler) {
            route = handler.route;

            route && routes.push(route);
          });
        }
      });

      // 👉 Filtrando rota atual da requisicao

      const getRoutePath = routes.filter((w) => w.path === req.route.path);

      const getMethod = getRoutePath[0].stack;

      let func = '';

      getMethod.forEach(function (element) {
        if (element.method === req.method.toLowerCase()) {
          func = element.name;
        }
      });

      // 👉 Definindo mensagens padroes && configurando object

      let message = '';

      // colocar consulta via pages

      const page = translate.filter((word) => word.name === newURL)[0]
        ? translate.filter((word) => word.name === newURL)[0].value
        : 'undefined';

      let object = '';

      if (req.method === 'GET' && Object.keys(req.params).length === 0) {
        message = `Listou ${page}, acessou a funcao ${func}`;
        object = body;
      }

      if (req.method === 'GET' && Object.keys(req.params).length > 0) {
        console.log(req.params.id)
        message = `Listou ${page}, acessou a funcao ${func}, passando o parametro ${req.params.id}`;
        object = body;
      }

      if (req.method === 'POST') {
        message = `Inseriu dados em ${page}, acessou a funcao ${func}`;
        object = JSON.stringify(req.body);
      }

      if (req.method === 'PUT') {
        message = `Atualizou dados em ${page}, acessou a funcao ${func}`;
        object = JSON.stringify(req.body);
      }

      if (req.method === 'DELETE') {
        message = `Deletou dados em ${page}, acessou a funcao ${func}, passando o parametro ${req.params.id}`;
        object = body;
      }

      res.send = send;

      const insertAudit = {
        user_id: req.user.id,
        profile_id: req.user.perfil_id,
        company_id: req.user.company_id,
        username: req.user.username,
        message: message,
        page: page,
        origin: req.url,
        method: req.method,
        function: func,
        remote_address:clientIp || '',
        user_agent: req.headers['user-agent'],
        status_code: res.statusCode,
        object: object,
      };
      
      // console.log(req.client)

      auditModel.insert(insertAudit);

      return res.send(body);
    };
    return next();
  };

  return { audit };
};
