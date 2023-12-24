// Reindeer Sudoku
// Santa's reindeer sure do like to cause trouble! This time they've decided to make a game out of arranging themselves into a Sudoku board.

// Before arranging themselves in this configuration, the reindeer left Santa a foreboding message:

// SaNtA.... yOu MuSt ImPleMeNt ThE Validate TyPe To DeTerMinE WhEThEr OuR SuDokU ConFiGuRaTiOn Is vALid

// Oh.. and what's that... also Vixen seems to have left a separate note

// make sure Validate is a predicate

// Vixen
// Well that's sorta condescending. Vixen seems to be assuming we already know that a "predicate" is just a fancy computer science term for a function that returns true or false. Oh well. That's Vixen for you.

// What is Sudoku
// If you're not already familiar: Sudoku is a logic-based number placement puzzle. Here are the basic rules:

// Grid Structure: The game is played on a 9x9 grid, divided into nine 3x3 subgrids or "regions."
// Number Placement: The objective is to fill the grid with numbers from 1 to 9.
// Row Constraint: Every row must contain each number from 1 to 9 without repeating.
// Column Constraint: Every column must also contain each number from 1 to 9 without repeating.
// Region Constraint: Each of the nine 3x3 regions must contain each number from 1 to 9, again without repetition.
// Normally you solve the puzzle by logically deducing the numbers for the empty cells, ensuring that all rows, columns, and 3x3 regions have numbers from 1 to 9 according to the rules. However, in this case the cells are all already filled in and your mission is to instead determine whether the configuration follows the rules of Sudoku.

/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer =
	| Dasher
	| Dancer
	| Prancer
	| Vixen
	| Comet
	| Cupid
	| Donner
	| Blitzen
	| Rudolph;

type HasDuplicate<T extends any[]> = T extends [infer L, ...infer R]
	? L extends R[number]
		? true
		: HasDuplicate<R>
	: false;

type ValidateRow<Row extends Reindeer[][]> = HasDuplicate<
	[...Row[0], ...Row[1], ...Row[2]]
>;

type ValidateColumn<
	Grid extends Reindeer[][][],
	N extends number
> = HasDuplicate<
	[
		[...Grid[0][0], ...Grid[0][1], ...Grid[0][2]][N],
		[...Grid[1][0], ...Grid[1][1], ...Grid[1][2]][N],
		[...Grid[2][0], ...Grid[2][1], ...Grid[2][2]][N],
		[...Grid[3][0], ...Grid[3][1], ...Grid[3][2]][N],
		[...Grid[4][0], ...Grid[4][1], ...Grid[4][2]][N],
		[...Grid[5][0], ...Grid[5][1], ...Grid[5][2]][N],
		[...Grid[6][0], ...Grid[6][1], ...Grid[6][2]][N],
		[...Grid[7][0], ...Grid[7][1], ...Grid[7][2]][N],
		[...Grid[8][0], ...Grid[8][1], ...Grid[8][2]][N]
	]
>;

type ValidateSection<
	Grid extends Reindeer[][][],
	X extends number,
	Y1 extends number,
	Y2 extends number,
	Y3 extends number
> = HasDuplicate<[...Grid[Y1][X], ...Grid[Y2][X], ...Grid[Y3][X]]>;

type Any<T extends any[], E extends any> = T extends [infer L, ...infer R]
	? L extends E
		? false
		: Any<R, E>
	: true;

export type Validate<T extends Reindeer[][][]> = Any<
	[
		ValidateRow<T[0]>,
		ValidateRow<T[1]>,
		ValidateRow<T[2]>,
		ValidateRow<T[3]>,
		ValidateRow<T[4]>,
		ValidateRow<T[5]>,
		ValidateRow<T[6]>,
		ValidateRow<T[7]>,
		ValidateRow<T[8]>,
		ValidateColumn<T, 0>,
		ValidateColumn<T, 1>,
		ValidateColumn<T, 2>,
		ValidateColumn<T, 3>,
		ValidateColumn<T, 4>,
		ValidateColumn<T, 5>,
		ValidateColumn<T, 6>,
		ValidateColumn<T, 7>,
		ValidateColumn<T, 8>,
		ValidateSection<T, 0, 0, 1, 2>,
		ValidateSection<T, 0, 3, 4, 5>,
		ValidateSection<T, 0, 6, 7, 8>,
		ValidateSection<T, 1, 0, 1, 2>,
		ValidateSection<T, 1, 3, 4, 5>,
		ValidateSection<T, 1, 6, 7, 8>,
		ValidateSection<T, 2, 0, 1, 2>,
		ValidateSection<T, 2, 3, 4, 5>,
		ValidateSection<T, 2, 6, 7, 8>
	],
	true
>;
