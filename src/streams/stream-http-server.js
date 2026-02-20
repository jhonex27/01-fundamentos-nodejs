import http from 'node:http';

import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform (chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1;

        console.log(transformed)

    callback(null, Buffer.from (String(transformed)))
  }
}

const server = http.createServer(async(req, res) => {
    const buffers = []

    for await(const chunk of req){
        buffers.push(chunk)
        // o for await of é uma forma de ler os dados que estão sendo enviados para o servidor, ele vai ler os dados em partes e armazenar esses dados em um array do tipo buffer, depois de ler todos os dados eu posso processar esses dados e enviar uma resposta para o cliente
        // enquanto ele não ler todos os dados que estão sendo enviados ele não processa o que esta nos codigos abaixo, ou seja, ele só vai processar os dados depois de ler todos os dados que estão sendo enviados para o servidor
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

  //  return req
   // .pipe(new InverseNumberStream())
   // .pipe(res)
})


server.listen(3334, () => console.log('Servidor rodando na porta: 3334'))


// em alguns casos quero conseguir na minha aplicação ler todos os dados que estão sendo enviados para 
// que eu possa processar esses dados e depois enviar uma resposta para o cliente
// para isso eu posso criar um array do tipo buffer e ir armazenando os dados que estão sendo enviados para 
// o servidor, depois de ler todos os dados eu posso processar esses dados e enviar uma resposta para o cliente


// esse metodo é bom quando precisamos trabalhar com dados de forma completa, ou seja, quando precisamos ler todos
//  os dados que estão sendo enviados para o servidor para depois processar esses dados e enviar uma resposta para o
// cliente, mas quando precisamos trabalhar com dados de forma mais eficiente, ou seja, quando precisamos ler os dados 
// em partes e processar esses dados em partes, ai sim é melhor usar as streams de leitura e escrita para ler os dados 
// em partes e processar esses dados em partes.

// um exemplo disso é quando recebemos um arquivo de um objeto via json do nosso front end que contem nome: diego email: diengo@rockteseat.com.br eu tenho que salvar todos esses dados por completo 
// não posso apenas salvar nome: diego email: die, seria uma informação incompleta, nesse caso eu preciso ler todos os dados que estão
//  sendo enviados para o servidor para depois processar esses dados e salvar essas informações no banco de dados, por exemplo.

// por isso que nessa aula usamos o  for await of para ler os dados que estão sendo enviados para o servidor, para depois processar 
// esses dados e enviar uma resposta para o cliente, nesse caso a resposta é a mesma coisa que foi enviada para o servidor, ou seja,
//  o que foi enviado para o servidor é o que vai ser enviado de volta para o cliente.

// so vamos usar a stream de leitura e escrita de maneira parcial quando os dados que forem enviados para nosso servidor 
// permitirem isso 