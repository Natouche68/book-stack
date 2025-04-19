<script lang="ts">
	import BookCard from "$lib/components/BookCard.svelte";
	import BookButton from "$lib/components/BookButton.svelte";

	const books = $state([
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
			title: "Poulets grillés",
			author: "Sophie Hénaff",
			coverImg:
				"http://www.mediathequesroannaisagglomeration.fr/sites/default/files/poulets_grilles_-_sophie_henaff.jpg",
			buyingDate: 1744136180376,
			pageNumber: 330,
			tags: ["policier"],
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
</script>

<div class="min-h-dvh flex flex-col bg-green-50">
	<div
		class="fixed top-0 left-0 right-0 py-4 text-4xl font-black text-center font-serif uppercase bg-green-200 border-b-2 border-b-green-900"
	>
		Book Stack
	</div>
	<div class="h-18"></div>

	<BookCard
		title="Le Dernier des Yakuzas"
		author="Jake Adelstein"
		coverImg="https://5livres.fr/wp-content/uploads/2020/03/Le-Dernier-des-Yakuzas.jpg"
		pageNumber={380}
		isReading={true}
		pagesRead={320}
	/>

	<div class="mx-4 mt-4 text-3xl font-bold font-serif">Pile de livres</div>

	<div class="overflow-x-auto whitespace-nowrap px-2">
		{#each books as book}
			<BookButton
				title={book.title}
				author={book.author}
				coverImg={book.coverImg}
			/>
		{/each}
	</div>

	<!-- <div class="h-full flex flex-col">
		<BookCard
			title="36 façons de tuer"
			author="Stefen Ahnhem"
			coverImg="https://static.fnac-static.com/multimedia/PE/Images/FR/NR/b7/a4/f3/15967415/1507-1/tsp20240105073935/36-Facons-de-tuer.jpg"
			buyingDate={1745000233132}
			pageNumber={630}
			tags={["policier", "suédois"]}
		/>
		<BookCard
			title="Poulets grillés"
			author="Sophie Hénaff"
			coverImg="http://www.mediathequesroannaisagglomeration.fr/sites/default/files/poulets_grilles_-_sophie_henaff.jpg"
			buyingDate={1744136180376}
			pageNumber={330}
			tags={["policier"]}
		/>
		<BookCard
			title="Rester groupés"
			author="Sophie Hénaff"
			coverImg="https://m.media-amazon.com/images/I/81aU0zEBFJL._SL1500_.jpg"
			buyingDate={1744136180376}
			pageNumber={310}
			tags={["policier"]}
		/>
	</div> -->
</div>
