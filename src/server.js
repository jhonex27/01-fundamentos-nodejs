import http from 'node:http'
import { json } from './middlewares/json.js'


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

console.log(route)



  return res.writeHead(404).end()
})

server.listen(3333)


// aula agora separando rotas da aplicação 
// uma hora vamos precisar criar mais rotas para a aplicação 
// e isso pode deixar o código do server.js muito grande e difícil 
// de manter, então vamos separar as rotas da aplicação em arquivos
//  diferentes para deixar o código mais organizado e fácil de manter.
// isso evita de termos que ficar criando varios if diferentes para cada rota
