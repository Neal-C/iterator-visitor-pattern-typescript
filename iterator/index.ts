type JSONResponse<T> = {
	next?: string;
	results: T[];
};

interface Pokemon {
	name: string;
	url: string;
}

export async function* iterateResults<DataType>(baseUrl: string) {
	let nextUrl: string | undefined = baseUrl;

	do {
		const RESPONSE = await fetch(nextUrl);
		const JSON = (await RESPONSE.json()) as JSONResponse<DataType>;
		yield JSON.results;
		nextUrl = JSON.next;
	} while (nextUrl);
}

for await (const result of iterateResults<Pokemon[]>("https://pokeapi.co/api/v2/pokemon")) {
	console.log(result);
}
