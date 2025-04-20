<script lang="ts">
	import BookCard from "$lib/components/BookCard.svelte";
	import SortButton from "./SortButton.svelte";
	import { bookStack, type Book } from "$lib/data.svelte";

	let sortingProperty: keyof Book = $state("buyingDate");
	let ascendingOrder = $state(false);

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
		bookStack.sort(
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
</script>

<div class="px-2 py-4 border-b-2 border-b-green-900">
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

<!-- TODO: tags -->

{#each bookStack as book}
	<BookCard
		title={book.title}
		author={book.author}
		coverImg={book.coverImg}
		buyingDate={book.buyingDate}
		pageNumber={book.pageNumber}
		tags={book.tags}
	/>
{/each}
