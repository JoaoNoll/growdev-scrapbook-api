import express, { Request, Response} from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request:Request, response:Response ) => {
    return response.send('OK')
})

const port = process.env.PORT || 8080 ;

app.listen(port, () => {
    console.log('API rodando...');
})