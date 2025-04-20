<script lang="ts">
	import BookCard from "$lib/components/BookCard.svelte";
	import BookButton from "$lib/components/BookButton.svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { bookStack, currentlyReadingBook } from "$lib/data.svelte";
</script>

<BookCard
	title={currentlyReadingBook.title}
	author={currentlyReadingBook.author}
	coverImg={currentlyReadingBook.coverImg}
	pageNumber={currentlyReadingBook.pageNumber}
	isReading={currentlyReadingBook.isReading}
	pagesRead={currentlyReadingBook.pagesRead}
/>

<div class="mx-4 mt-4 text-2xl font-bold font-serif">Pile de livres</div>

<div class="overflow-x-auto whitespace-nowrap px-2">
	{#each bookStack as book}
		<BookButton
			title={book.title}
			author={book.author}
			coverImg={book.coverImg}
		/>
	{/each}
	<a
		href="/stack"
		class="inline-block w-32 h-56 my-4 mx-2 overflow-hidden text-center content-center text-green-900"
	>
		<span class="text-lg">Voir plus</span>
		<br />
		<ArrowRight class="inline" />
		<br />
	</a>
</div>
