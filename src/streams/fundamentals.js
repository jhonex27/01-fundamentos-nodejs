import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  
  index = 1; 

    _read(){

const i = this.index++;

     setTimeout(() => {
        if(i >100){
            
          this.push(null);

        } else {
     
          const buf = Buffer.from(String(i));

          this.push(buf);
        }
      }, 1000)
    }
}

// vamos aprender usar a stream de transformação, 
class InverseNumberStream extends Transform {
  _transform (chunk, encoding, callback){
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from (String(transformed)))
  }
  // no final das contas essa stream de transformação vai receber os dados da stream de leitura e vai transformar esses dados e depois passar para a stream de escrita que vai processar esses dados  e mostrar o resultado no console
  // ler dados de um lugar, transformar esses dados e escrever em outro lugar
  // usada mesmo no intermeio de uma stream de leitura e uma stream de escrita, ou seja, ela é usada para transformar os dados que estão sendo lidos antes de serem escritos em outro lugar
}

// Nesta aula vamos aprender a criar uma estream de escrita, a stream de escrita diferente da de leitura como essa que criamos 
// essa stream vai receber dados de uma stream de leitura como essa que criamos na ultima aula e vai fazer alguma coisa com esses dados 
// por exemplo o procces.stdout é uma stream de escrita que processa dados e não que escreve 

class MultiplybytenStream extends Writable {
  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}



new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplybytenStream())

// aqui nos trabalhamos com as três streams, a stream de leitura que gera os números de 1 a 100, a stream de transformação que transforma esses números em seus negativos e a stream de escrita que multiplica esses números por 10 e mostra o resultado no console.
// existe uma ultima stream que é a stream de duplex, ela é uma stream que pode ser tanto de leitura quanto de escrita, 
// ou seja, ela pode ler dados e escrever dados ao mesmo tempo, ela é usada para criar conexões de rede, por exemplo, 
// onde você precisa ler dados de um cliente e escrever dados para esse cliente ao mesmo tempo.