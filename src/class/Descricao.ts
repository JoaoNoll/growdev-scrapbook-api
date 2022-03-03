
export default class Descricao{ 
    id:number

    constructor(
                public descricao: string,
                public detalhamento: string) {
    this.id = Math.floor(Math.random() * (10000 - 1 + 1 ) + 1 );
    }
}