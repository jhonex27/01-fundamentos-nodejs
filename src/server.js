import http from 'node:http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
    // nesta parte do código estamos procurando a rota que foi chamada pelo cliente,
    // para isso estamos usando o método find do array de rotas, 
    // e passando uma função de callback que vai comparar o método e o caminho da rota com o método e o caminho da requisição
  })

if (route) {
  return route.handler(req, res)
}
// se eu encontrar a rota, eu chamo o handler da rota passando a requisição e a resposta como parâmetros,
// se eu não encontrar a rota, eu retorno um erro 404 para o cliente, indicando que a rota não foi encontrada



  return res.writeHead(404).end()
  
})

server.listen(3333)


// aula agora separando rotas da aplicação 0
// uma hora vamos precisar criar mais rotas para a aplicação 
// e isso pode deixar o código do server.js muito grande e difícil 
// de manter, então vamos separar as rotas da aplicação em arquivos
//  diferentes para deixar o código mais organizado e fácil de manter.
// isso evita de termos que ficar criando varios if diferentes para cada rota



// depois dessas alterações o código do server.js ficou mais limpo e organizado,
// fui no insomnia e testei as rotas, e tudo funcionou perfeitamente, consegui criar um usuário e listar os usuários criados.
