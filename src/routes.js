import { randomUUID } from 'node:crypto'
import { Database } from './middlewares/database.js'

const database = new Database()

export const routes = [
    {
    method: 'GET',
    path: '/users',
    handler:(req, res) => {
         const users = database.select('users')

        return res.end(JSON.stringify(users))
        }
    },

      {
    method: 'POST',
    path: '/users',
    handler:async (req, res) => {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email
    }

    await database.insert('users', user)


    return res
    .writeHead(201)
    .end(JSON.stringify({ message: 'Usuário criado com sucesso' }))
        }
    }
]
// aqui vamos criar um array de rotas para a aplicação, 
// cada rota vai ser um objeto com as seguintes propriedades:
//  method = método HTTP (GET, POST, PUT, DELETE), path = caminho
//  e handler =  o que vai acontecer quando a rota for chamada 