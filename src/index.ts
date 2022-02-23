import express, { Request, Response} from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request:Request, response:Response ) => {
    return response.send('OK')
})

app.listen(8080, () => {
    console.log('API rodando...');
})