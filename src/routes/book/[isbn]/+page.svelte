<script lang="ts">
	import type { PageProps } from "./$types";
	import { appState, type Book } from "$lib/data.svelte";
	import { relativeDateFormatter } from "$lib/utils";
	import Pencil from "@lucide/svelte/icons/pencil";
	import ReadProgressDialog from "$lib/components/ReadProgressDialog.svelte";
	import { goto } from "$app/navigation";

	let { data }: PageProps = $props();
	let book: Book | undefined = $state();

	$effect(() => {
		book =
			appState.bookStack.find((value) => value.isbn === data.isbn) ||
			(data.isbn == appState.currentlyReadingBook?.isbn
				? appState.currentlyReadingBook
				: undefined);
	});

	let openProgressDialog: () => void = () => {};

	function onProgressDialogInit(openDialog: () => void): void {
		openProgressDialog = openDialog;
	}

	function onProgressButtonClicked(event: MouseEvent): void {
		event.stopPropagation();
		event.preventDefault();
		openProgressDialog();
	}

	function onReadBookClick(): void {
		appState.currentlyReadingBook = book;
		if (appState.currentlyReadingBook) {
			appState.currentlyReadingBook.isReading = true;
			appState.currentlyReadingBook.pagesRead = 0;

			appState.bookStack = appState.bookStack.filter(
				(val) => val.isbn != book?.isbn
			);

			localStorage.setItem(
				"currentlyReading",
				JSON.stringify(appState.currentlyReadingBook)
			);
			localStorage.setItem("bookStack", JSON.stringify(appState.bookStack));

			goto("/");
		}
	}
</script>

{#if book}
	<div class="p-4">
		<img
			src={book.coverImg}
			alt="{book.title} de {book.author}"
			class="mx-auto mb-6 w-2/3"
		/>

		<div class="my-2">
			{#if book.isReading}
				<div class="italic text-green-900 dark:text-green-100">
					En cours de lecture
				</div>
			{/if}

			<div class="font-bold font-serif text-3xl">{book.title}</div>
			<div class="mb-1 font-serif text-2xl italic">{book.author}</div>
		</div>

		<div class="my-2">
			{#if book.buyingDate}
				<div class="text-md text-green-900 dark:text-green-100">
					Acheté {relativeDateFormatter(book.buyingDate)}
				</div>
			{/if}
			{#if book.pageNumber}
				<div class="mb-1 text-md text-green-900 dark:text-green-100">
					{book.pageNumber} pages
				</div>
			{/if}
			{#if book.tags}
				<div>
					{#each book.tags as tag}
						<span class="mr-1 p-1 text-md bg-green-200 dark:bg-green-800"
							>{tag}</span
						>
					{/each}
				</div>
			{/if}
		</div>

		{#if book.isReading && book.pageNumber && book.pagesRead != undefined}
			<button
				class="relative w-full mt-4 h-8 bg-green-100 dark:bg-green-900 border-2 border-green-900 dark:border-green-100"
				onclick={onProgressButtonClicked}
			>
				<div
					class="h-full bg-green-300 dark:bg-green-700 transition-all"
					style="width: {(100 * book.pagesRead) / book.pageNumber}%;"
				></div>
				<div class="absolute inset-0 text-center content-center">
					{Math.floor((100 * book.pagesRead) / book.pageNumber)}%
				</div>
				<div
					class="absolute top-0 bottom-0 right-2 content-center text-green-900 dark:text-green-100"
				>
					<Pencil size={20} />
				</div>
			</button>
		{/if}

		{#if !appState.currentlyReadingBook}
			<button
				onclick={onReadBookClick}
				class="block w-full my-8 py-2 text-center text-xl font-serif font-bold bg-green-300 dark:bg-green-700 border-2 border-green-900 dark:border-green-100"
			>
				Lire ce livre
			</button>
		{/if}
	</div>

	{#if book.isReading && book.pageNumber && book.pagesRead != undefined}
		<ReadProgressDialog
			pageNumber={book.pageNumber}
			pagesRead={book.pagesRead}
			onInit={onProgressDialogInit}
		/>
	{/if}
{:else}
	<div
		class="py-4 text-center font-medium italic text-green-900 dark:text-green-100"
	>
		Aucun livre n'a été trouvé avec cet ISBN.
	</div>
	<a
		href="/"
		class="block mx-4 py-2 text-center text-xl font-serif font-bold bg-green-300 dark:bg-green-700 border-2 border-green-900 dark:border-green-100"
	>
		Retourner à l'accueil
	</a>
{/if}
