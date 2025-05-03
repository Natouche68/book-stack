<script lang="ts">
	import BookCard from "$lib/components/BookCard.svelte";
	import BookButton from "$lib/components/BookButton.svelte";
	import AddBookLink from "./stack/add/AddBookLink.svelte";
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { appState } from "$lib/data.svelte";
</script>

{#if appState.currentlyReadingBook}
	<BookCard
		isbn={appState.currentlyReadingBook.isbn}
		title={appState.currentlyReadingBook.title}
		author={appState.currentlyReadingBook.author}
		coverImg={appState.currentlyReadingBook.coverImg}
		pageNumber={appState.currentlyReadingBook.pageNumber}
		isReading={appState.currentlyReadingBook.isReading}
		pagesRead={appState.currentlyReadingBook.pagesRead}
	/>
{:else}
	<div class="py-4 border-b-2 border-b-green-900">
		<div class="mb-4 text-center font-medium italic text-green-900">
			Vous ne lisez pas de livre.
			<br />
			Choisissez votre prochaine lecture !
		</div>
		<a
			href="/stack"
			class="block mx-4 py-2 text-center text-xl font-serif font-bold bg-green-300 border-2 border-green-900"
		>
			Ma pile de livres
		</a>
	</div>
{/if}

<div class="mx-4 mt-4 text-2xl font-bold font-serif">Pile de livres</div>

{#if appState.bookStack.length > 0}
	<div class="overflow-x-auto whitespace-nowrap px-2">
		{#each appState.bookStack as book}
			<BookButton
				isbn={book.isbn}
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
{:else}
	<div class="py-4 text-center font-medium italic text-green-900">
		Vous n'avez aucun livre dans votre pile.
		<br />
		Allez en rajouter !
	</div>
	<a
		href="/stack/add"
		class="block mx-4 py-2 text-center text-xl font-serif font-bold bg-green-300 border-2 border-green-900"
	>
		Ajouter un livre
	</a>
{/if}

<a
	href="/stats"
	class="fixed bottom-2 left-2 block p-2 text-center text-lg font-serif font-bold bg-green-300 border-2 border-green-900"
>
	Statistiques
</a>

<AddBookLink />
