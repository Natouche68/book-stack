<script lang="ts">
	import BookCard from "$lib/components/BookCard.svelte";
</script>

<div class="min-h-dvh flex flex-col bg-amber-100">
	<div
		class="fixed top-0 left-0 right-0 py-6 text-5xl font-black text-center font-serif uppercase bg-amber-200 border-b-2"
	>
		Book Stack
	</div>
	<div class="h-24 mb-2"></div>

	<div class="mx-8 my-4 p-4 flex flex-row bg-amber-200 border-2">
		<img
			src="https://5livres.fr/wp-content/uploads/2020/03/Le-Dernier-des-Yakuzas.jpg"
			alt="Le Derniers des Yakuzas de Jake Adelstein"
			class="w-1/3"
		/>
		<div class="pl-4 flex flex-col">
			<div class="font-bold font-serif text-4xl">Le Dernier des Yakuzas</div>
			<div class="font-serif text-3xl italic">Jake Adelstein</div>
		</div>
	</div>

	<div class="h-full flex flex-col">
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
	</div>
</div>
