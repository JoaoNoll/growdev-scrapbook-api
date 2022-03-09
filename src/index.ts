import express, { Request, Response} from 'express';
import cors from 'cors';
import Descricao from './class/Descricao';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request:Request, response:Response ) => {
    return response.send('OK')
})

let anotacoes: Descricao[] = [ ]

app.post('/anotacoes', ( request:Request, response:Response ) => {
try{
    const { descricao, detalhes } = request.body;

    if(!descricao || !detalhes) { 
        return response.status(400).json({
            mensagem: 'Preencha todos os campos'
        })
    };

    const anotacao = new Descricao(descricao, detalhes);
    anotacoes.push(anotacao);

    return response.status(201).json(anotacao);

} catch(error) { 
    return response.json({error});
  };
}); 

app.get('/anotacoes', ( request: Request, response: Response) => {
    try {
        return response.json({anotacoes});
    } catch (error) {
        return response.json({error});
    };
   
});

app.get('/anotacoes/:id', (request:Request, response: Response) => {
    try {
        const {id} = request.params;
        const indexAnotacao = anotacoes.findIndex(anotacao => anotacao.id === parseInt(id));

        if(indexAnotacao < 0) {
            return response.status(404).json({
                mensagem: 'Anotação não encontrada.'
            });
        };
        return response.json(anotacoes[indexAnotacao]);

    } catch (error) {
        return response.json({error});
    };
});

app.put('/anotacoes/:id', ( request: Request, response: Response,) => {

try {
    const { id } = request.params;
    const {detalhes, descricao} = request.body;
    const indexAnotacao = anotacoes.findIndex(anotacao => anotacao.id === parseInt(id));   
    if(indexAnotacao < 0) {
        return response.status(404).json({
            mensagem: 'Anotação não encontrada.'
        });
    };
          
    if(!descricao || !detalhes) { 
        return response.status(400).json({
            mensagem: 'Preencha todos os campos'
        });
    };
        
    anotacoes[indexAnotacao].descricao = descricao;
    anotacoes[indexAnotacao].detalhamento = detalhes;
        
    return response.json(anotacoes[indexAnotacao]);

    } catch (error) {
        return response.json({error});
    };
     
});


app.delete('/anotacoes/:id', ( request: Request, response: Response ) => {
    try {
        const { id } = request.params;
    
        const indexAnotacao = anotacoes.findIndex(anotacao => anotacao.id === parseInt(id));   

        if(indexAnotacao < 0) {
            return response.status(404).json({
                mensagem: 'Anotação não encontrada.'
            });
        };

        anotacoes.splice(indexAnotacao, 1);

        return response.sendStatus(204);
    
        } catch (error) {
            return response.json({error});
        };
         
    });
    
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('API rodando...');
})