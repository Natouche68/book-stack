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

type ReadStats = {
	pages: number;
	days: number;
};

export type AppState = {
	currentlyReadingBook?: Book;
	bookStack: Book[];
	statsPerDay: {
		mo: ReadStats;
		tu: ReadStats;
		we: ReadStats;
		th: ReadStats;
		fr: ReadStats;
		sa: ReadStats;
		su: ReadStats;
	};
	bookFinished: number;
	lastVisit: number;
};

export let appState: AppState = $state({
	currentlyReadingBook: undefined,
	bookStack: [],
	statsPerDay: {
		mo: {
			pages: 0,
			days: 0,
		},
		tu: {
			pages: 0,
			days: 0,
		},
		we: {
			pages: 0,
			days: 0,
		},
		th: {
			pages: 0,
			days: 0,
		},
		fr: {
			pages: 0,
			days: 0,
		},
		sa: {
			pages: 0,
			days: 0,
		},
		su: {
			pages: 0,
			days: 0,
		},
	},
	bookFinished: 0,
	lastVisit: 0,
});

export function getTags(): string[] {
	const tags = new Set<string>();
	[appState.currentlyReadingBook, ...appState.bookStack].forEach((book) => {
		if (book && book.tags) {
			for (let i = 0; i < book.tags.length; i++) {
				tags.add(book.tags[i]);
			}
		}
	});
	return Array.from(tags.values());
}
