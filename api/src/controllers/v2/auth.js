module.exports = (app) => {
  const usersModel = app.src.models.v2.users;
  return {
    login: async (req, res) => {
      if (!req.body.username || !req.body.password) {
        return res.status(400).send('Informe Usuário e Senha');
      }

      let user = await usersModel.findUsers(req.body);
      // let userEmail = await usersModel.VerifyUserForEmailAuth(req.body);

      if (!user) {
        
          return res.status(400).send('Usuário não encontrado');
        
        
      }

      if (user.enable == 0) {
        return res.status(400).send('Usuário Desativado');
      }

      return res.status(200).json(user);
    }
  }
};
