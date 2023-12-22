// What is Tic Tac Toe?
// Tic-Tac-Toe is a two-player game where players alternate marking ❌s and ⭕s in a 3x3 grid, aiming to get three in a row.

// fun fact: Did you know that tic tac toe is widely considered to be the first computer video game ever created?! That's right! A S Douglas implemented it all the way back in 1952, the same year as the coronation of Queen Elizabeth II.

// Solving Tic Tac Toe
// Your goal for this challenge is to use TypeScript types to encode the game logic of Tic Tac Toe. Eventually, every game will end with one of the players winning or a draw.

type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

export type NewGame = {
	board: EmptyBoard;
	state: "❌";
};

type YToString = {
	top: "0";
	middle: "1";
	bottom: "2";
};

type XToString = {
	left: "0";
	center: "1";
	right: "2";
};

type UpdatedRow<
	R extends TicTacToeCell[],
	C extends TicTacToeChip,
	X extends keyof XToString
> = {
	[K in keyof R]: K extends XToString[X]
		? R[K] extends TicTacToeChip
			? R[K]
			: C
		: R[K];
};

type FindRow<
	B extends TicTactToeBoard,
	C extends TicTacToeChip,
	X extends keyof XToString,
	Y extends keyof YToString
> = {
	[K in keyof B]: K extends YToString[Y] ? UpdatedRow<B[K], C, X> : B[K];
};

type IncludeInTuple<T extends TicTacToeCell[], E> = T extends [
	infer F,
	...infer R extends TicTacToeCell[]
]
	? [F] extends [E]
		? [F, ...IncludeInTuple<R, E>]
		: IncludeInTuple<R, E>
	: [];

type UpdatedBoard<
	G extends TicTacToeGame,
	P extends `${TicTacToeYPositions}-${TicTacToeXPositions}`
> = P extends `${infer Y extends keyof YToString}-${infer X extends keyof XToString}`
	? G["state"] extends TicTacToeChip
		? FindRow<G["board"], G["state"], X, Y>
		: never
	: P;

type BoardToArray<B extends TicTacToeGame["board"]> = [
	...B[0],
	...B[1],
	...B[2]
];

export type TicTacToe<
	G extends TicTacToeGame,
	P extends `${TicTacToeYPositions}-${TicTacToeXPositions}`
> = {
	board: UpdatedBoard<G, P>;
	state: UpdatedBoard<G, P> extends TicTacToeGame["board"]
		? MoveWins<UpdatedBoard<G, P>, G["state"]> extends true
			? `${G["state"]} Won`
			: IncludeInTuple<
					BoardToArray<UpdatedBoard<G, P>>,
					"  "
			  >["length"] extends 0
			? "Draw"
			: IncludeInTuple<
					BoardToArray<UpdatedBoard<G, P>>,
					"❌"
			  >["length"] extends IncludeInTuple<
					BoardToArray<UpdatedBoard<G, P>>,
					"⭕"
			  >["length"]
			? "❌"
			: "⭕"
		: never;
};

type MoveWins<
	B extends TicTacToeGame["board"],
	P extends TicTacToeGame["state"]
> = IncludeInTuple<[B[0][0], B[1][0], B[2][0]], P>["length"] extends 3
	? true
	: IncludeInTuple<[B[0][1], B[1][1], B[2][1]], P>["length"] extends 3
	? true
	: IncludeInTuple<[B[0][2], B[1][2], B[2][2]], P>["length"] extends 3
	? true
	: IncludeInTuple<[B[0][0], B[0][1], B[0][2]], P>["length"] extends 3
	? true
	: IncludeInTuple<[B[1][0], B[1][1], B[1][2]], P>["length"] extends 3
	? true
	: IncludeInTuple<[B[2][0], B[2][1], B[2][2]], P>["length"] extends 3
	? true
	: IncludeInTuple<[B[0][0], B[1][1], B[2][2]], P>["length"] extends 3
	? true
	: IncludeInTuple<[B[2][2], B[1][1], B[0][0]], P>["length"] extends 3
	? true
	: false;
