// TypeScript ASCII Art!
// Your goal for this challenge is to take an input like Hi and turn it into ASCII art!

// So for example Hi would turn into:

// █ █ █
// █▀█ █
// ▀ ▀ █
// but there's a twist!
// You'll also need to handle newlines! Take a look at the tests to see some examples of that in action.

// Enjoy!

// ...wait

// ....what's that.....

// !! BREAKING NEWS JUST-IN FROM THE TYPEHERO INVESTIGATIVE REPORTING TEAM !!

// We have just received word that the term "ASCII art" is commonly used to refer to text-based visual art in general. That means that although characters are not part of the ISO-8859-1 character encoding set, it's still ASCII art! We also just received word that pencil lead has actually been made of graphite since the 16th century but we all still call it "lead" even though it's not made from the 82nd atomic element, lead(!!). News, Sports, and Weather at 11. Back to you Carol.

type Letters = {
	A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
	B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
	C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
	E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
	H: ["█ █ ", "█▀█ ", "▀ ▀ "];
	I: ["█ ", "█ ", "▀ "];
	M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
	N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
	P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
	R: ["█▀█ ", "██▀ ", "▀ ▀ "];
	S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
	T: ["▀█▀ ", "░█ ░", "░▀ ░"];
	Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
	W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
	" ": ["░", "░", "░"];
	":": ["#", "░", "#"];
	"*": ["░", "#", "░"];
};

type Split<S extends string, D extends string> = string extends S
	? string[]
	: S extends ""
	? []
	: S extends `${infer T}${D}${infer U}`
	? [T, ...Split<U, D>]
	: [S];

type ToAscii<
	S extends string,
	N extends number
> = S extends `${infer First extends string}${infer Rest extends string}`
	? Uppercase<First> extends keyof Letters
		? N extends keyof Letters[Uppercase<First>]
			? Letters[Uppercase<First>][N] extends string
				? `${Letters[Uppercase<First>][N]}${ToAscii<Rest, N>}`
				: ""
			: ""
		: ""
	: "";

type TripleElements<A extends string[]> = A extends [
	infer First extends string,
	...infer Rest extends string[]
]
	? [
			ToAscii<First, 0>,
			ToAscii<First, 1>,
			ToAscii<First, 2>,
			...TripleElements<Rest>
	  ]
	: [];

export type ToAsciiArt<S extends string> = TripleElements<Split<S, "\n">>;
