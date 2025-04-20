export type Book = {
	title: string;
	author: string;
	coverImg: string;
	buyingDate?: number;
	pageNumber?: number;
	tags?: string[];
	isReading?: boolean;
	pagesRead?: number;
};

export let currentlyReadingBook: Book = $state({
	title: "Le Dernier des Yakuzas",
	author: "Jake Adelstein",
	coverImg:
		"https://5livres.fr/wp-content/uploads/2020/03/Le-Dernier-des-Yakuzas.jpg",
	pageNumber: 380,
	isReading: true,
	pagesRead: 320,
});

export let bookStack: Book[] = $state([
	{
		title: "Poulets grillés",
		author: "Sophie Hénaff",
		coverImg:
			"http://www.mediathequesroannaisagglomeration.fr/sites/default/files/poulets_grilles_-_sophie_henaff.jpg",
		buyingDate: 1744136180376,
		pageNumber: 330,
		tags: ["policier"],
	},
	{
		title: "36 façons de tuer",
		author: "Stefen Ahnhem",
		coverImg:
			"https://static.fnac-static.com/multimedia/PE/Images/FR/NR/b7/a4/f3/15967415/1507-1/tsp20240105073935/36-Facons-de-tuer.jpg",
		buyingDate: 1745000233132,
		pageNumber: 630,
		tags: ["policier", "suédois"],
	},
	{
		title: "Rester groupés",
		author: "Sophie Hénaff",
		coverImg: "https://m.media-amazon.com/images/I/81aU0zEBFJL._SL1500_.jpg",
		buyingDate: 1744136180376,
		pageNumber: 310,
		tags: ["policier"],
	},
]);
