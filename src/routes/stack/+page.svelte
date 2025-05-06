<script lang="ts">
	import BookCard from "$lib/components/BookCard.svelte";
	import SortButton from "./SortButton.svelte";
	import AddBookLink from "./add/AddBookLink.svelte";
	import { appState, getTags, type Book } from "$lib/data.svelte";
	import { flip } from "svelte/animate";
	import { SvelteSet } from "svelte/reactivity";

	let sortingProperty: keyof Book = $state("buyingDate");
	let ascendingOrder = $state(false);

	let tags = getTags();
	let tagsToFilter = new SvelteSet<string>();

	let filteredBooks = $derived(
		appState.bookStack.filter(
			(book) =>
				tagsToFilter.size == 0 || book.tags?.some((v) => tagsToFilter.has(v))
		)
	);

	let properties = $state([
		{
			property: "buyingDate" as keyof Book,
			ascendingOrder: false,
			display: "Date d'achat",
		},
		{
			property: "pageNumber" as keyof Book,
			ascendingOrder: true,
			display: "Nombre de pages",
		},
	]);

	$effect(() => {
		appState.bookStack.sort(
			(a, b) =>
				(Number(a[sortingProperty]!) - Number(b[sortingProperty]!)) *
				(ascendingOrder ? 1 : -1)
		);
	});

	function onSortButtonClick(
		property: keyof Book,
		order: boolean,
		index: number
	): void {
		if (property == sortingProperty) {
			ascendingOrder = !order;
			properties[index].ascendingOrder = ascendingOrder;
		} else {
			sortingProperty = property;
			ascendingOrder = order;
		}
	}

	function swapTag(tag: string): void {
		if (tagsToFilter.has(tag)) {
			tagsToFilter.delete(tag);
		} else {
			tagsToFilter.add(tag);
		}
	}
</script>

<div class="px-2 py-4 border-b-2 border-b-green-900 dark:border-b-green-100">
	{#each properties as property, i}
		<SortButton
			property={property.property}
			ascendingOrder={property.ascendingOrder}
			display={property.display}
			selected={sortingProperty == property.property}
			index={i}
			onClick={onSortButtonClick}
		/>
	{/each}
</div>

<div class="px-2 py-4 border-b-2 border-b-green-900 dark:border-b-green-100">
	{#each tags as tag}
		<button
			class="mr-1 pl-1 pr-2 text-lg {tagsToFilter.has(tag)
				? 'bg-green-300 dark:bg-green-700 font-medium'
				: 'bg-green-200 dark:bg-green-800'} transition"
			onclick={() => swapTag(tag)}
		>
			{tag}
		</button>
	{/each}
</div>

{#if appState.bookStack.length > 0}
	{#each filteredBooks as book (book.isbn)}
		<div animate:flip={{ duration: 300 }}>
			<BookCard
				isbn={book.isbn}
				title={book.title}
				author={book.author}
				coverImg={book.coverImg}
				buyingDate={book.buyingDate}
				pageNumber={book.pageNumber}
				tags={book.tags}
			/>
		</div>
	{/each}
{:else}
	<div
		class="py-4 text-center font-medium italic text-green-900 dark:text-green-100"
	>
		Vous n'avez aucun livre dans votre pile.
		<br />
		Allez en rajouter !
	</div>
	<a
		href="/stack/add"
		class="block mx-4 py-2 text-center text-xl font-serif font-bold bg-green-300 dark:bg-green-700 border-2 border-green-900 dark:border-green-100"
	>
		Ajouter un livre
	</a>
{/if}

<AddBookLink small />
