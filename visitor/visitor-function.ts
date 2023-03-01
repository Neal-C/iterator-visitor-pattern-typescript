
type JSONResponse<T> = {
    next?: string,
    results : T[]
}

interface Pokemon {
    name: string,
    url: string
}

export async function visit<DataType>(baseUrl: string, visitor: (results: DataType[]) => void) {
	let nextUrl: string | undefined = baseUrl;

	do {
		const RESPONSE = await fetch(nextUrl);
		const JSON = (await RESPONSE.json()) as JSONResponse<DataType>;
		visitor(JSON.results);
		nextUrl = JSON.next;
	} while (nextUrl);
}


visit<Pokemon[]>("https://pokeapi.co/api/v2/pokemon", (results) => {
	console.log(results);
});

//run : npx ts-node visitor-function.ts
