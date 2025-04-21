export type Book = {
	isbn: number;
	title: string;
	author: string;
	coverImg: string;
	buyingDate?: number;
	pageNumber?: number;
	tags?: string[];
	isReading?: boolean;
	pagesRead?: number;
};

export type AppState = {
	currentlyReadingBook?: Book;
	bookStack: Book[];
};

export let appState: AppState = $state({
	currentlyReadingBook: undefined,
	bookStack: [],
});
