import { Readable } from "node:stream";


class OneToHundredStream extends Readable {
  
  index = 1; 

    _read(){

const i = this.index++;

     setTimeout(() => {
        if(i >5){
            
          this.push(null);

        } else {
     
          const buf = Buffer.from(String(i));

          this.push(buf);
        }
      }, 1000)
    }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(Response=>{
    // aqui nos usamos o .then para ler a resposta do servidor, ou seja, depois de enviar os dados para o servidor, eu quero ler a resposta que o servidor vai me enviar, e para isso eu uso o .then para ler essa resposta e mostrar no console
  return Response.text()
}).then(data => {
  console.log(data)
})