// import fetch from 'node-fetch';

//!Node now support native fetch

type JSONRespnse<T> = {
    next?: string,
    results : T[]
}

interface Pokemon {
    name: string,
    url: string
}

//We're separating the traversal of the pages and the code that this is going to interpret the results
//Separation of concerns !

class VisitAllPages<DataType> {
    constructor(private baseUrl: string){
        //shorthand initialization
    }



    async visit(visitor: (results: DataType[]) => void){
        let nextUrl : string | undefined = this.baseUrl;

        do {
            const RESPONSE = await fetch(nextUrl);
            const JSON = await RESPONSE.json() as JSONRespnse<DataType>;
            visitor(JSON.results);
            nextUrl = JSON.next;
        } while (nextUrl);
    }
}

const visitor = new VisitAllPages<Pokemon[]>("https://pokeapi.co/api/v2/pokemon");

visitor.visit((results) => {
console.log(results)
})

// run : npx ts-node visitor-class.ts