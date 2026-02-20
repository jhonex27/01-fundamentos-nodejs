// aula persistindo banco de dados 
// vamos persisitir o banco de dados em arquivos fisicos para quando a aplicação ser reiniciada ele guarda os dados 

import fs from 'node:fs/promises'
// aqui nos importamos um modulo interno do node que trabalaha com file system 

const databasePath = new URL('../db.json', import.meta.url)

//console.log(databasePath)

// nessa parte aqui usamos esse metodo database path para tratar o diretotio de onde o arquivo do banco vai ser criado 
// eu não0 entendi muito bem, vc me explica ok? 
// mas agora realizando os teste depois do post ele so ta criando o arquivo dentro da pasta src 
// mas ainda esta salvando os dados depois da reinicialização do server, mas já tratar isso 

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
    .then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }
// agora com esse metodo chamado constructor conseguimos fazer com que os dados fiquem salvos dentro do arquivo db. mesmo restartando a aplicação 
// ele verifica se o arquivo ja existe e salva os dados la, se não ele cria 

  async #persist() {
    await fs.writeFile(databasePath, JSON.stringify(this.#database))
  }
  // aqui usamos o metodo persist esse metodo é o que escreve nosso banco de dados em um arquivo fisico 
  // ele é chamado toda vez que eu insiro uma nova informação no banco de dados 
  //também usamo o json. stringify para converter o o banco de dados em um json pq o write file so aceita que seja enviado pra ele 
  // uma estrutura stryngy 

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  async insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    await this.#persist()

    return data
  }
}

