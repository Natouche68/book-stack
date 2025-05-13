<script lang="ts">
	import type { PageProps } from "./$types";
	import { appState, type Book } from "$lib/data.svelte";
	import { goto } from "$app/navigation";

	let { data }: PageProps = $props();
	let book: Book | undefined = $state();

	let isbn: number | undefined = $state();
	let title: string = $state("");
	let author: string = $state("");
	let coverImg: string = $state("");
	let buyingDate: string = $state("");
	let pageNumber: number | undefined = $state();
	let tags: string = $state("");

	$effect(() => {
		book =
			appState.bookStack.find((value) => value.isbn === data.isbn) ||
			(data.isbn == appState.currentlyReadingBook?.isbn
				? appState.currentlyReadingBook
				: undefined);

		if (book && book.buyingDate && book.tags) {
			isbn = book.isbn;
			title = book.title;
			author = book.author;
			coverImg = book.coverImg;
			const buyingDateObject = new Date(book.buyingDate);
			buyingDate = `${buyingDateObject.getFullYear()}-${(buyingDateObject.getMonth() + 1).toString().padStart(2, "0")}-${buyingDateObject.getDate().toString().padStart(2, "0")}`;
			pageNumber = book.pageNumber;
			tags = book.tags?.join(", ");
		}
	});

	function onUpdateBook(event: SubmitEvent) {
		event.preventDefault();
		if (isbn && pageNumber) {
			const parsedTags = tags.split(",").map((part) => part.trim());
			const updatedBook: Book = {
				isbn,
				title,
				author,
				coverImg,
				buyingDate: Date.parse(buyingDate),
				pageNumber,
				tags: parsedTags,
			};
			if (isbn == appState.currentlyReadingBook?.isbn) {
				appState.currentlyReadingBook = updatedBook;
			} else {
				const index = appState.bookStack.findIndex((v) => v.isbn == isbn);
				if (index >= 0) {
					appState.bookStack[index] = updatedBook;
				}
			}

			goto(`/book/${isbn}`);

			localStorage.setItem("bookStack", JSON.stringify(appState.bookStack));
		}
	}
</script>

{#if book}
	<form class="mx-4 my-2" onsubmit={onUpdateBook}>
		<div class="py-2 flex flex-col">
			<label for="isbn" class="text-green-900 dark:text-green-100">ISBN</label>
			<input
				type="number"
				id="isbn"
				class="w-full bg-transparent border-2 border-green-900 dark:border-green-300 disabled:text-gray-900 dark:disabled:text-gray-100 disabled:border-gray-900 disabled:dark:border-gray-300"
				required
				bind:value={isbn}
				disabled
			/>
		</div>
		<div class="py-2 flex flex-col">
			<label for="title" class="text-green-900 dark:text-green-100">
				Titre
			</label>
			<input
				type="text"
				id="title"
				class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
				required
				bind:value={title}
			/>
		</div>
		<div class="py-2 flex flex-col">
			<label for="author" class="text-green-900 dark:text-green-100">
				Auteur
			</label>
			<input
				type="text"
				id="author"
				class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
				required
				bind:value={author}
			/>
		</div>
		<div class="py-2 flex flex-col">
			<label for="coverImg" class="text-green-900 dark:text-green-100">
				Image de couverture
			</label>
			<div
				class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
			>
				<input
					type="text"
					id="coverImg"
					class="w-full bg-transparent border-0"
					required
					bind:value={coverImg}
				/>
				{#if coverImg}
					<img src={coverImg} alt="Couverture" class="mx-auto mb-4 w-1/2" />
				{/if}
			</div>
		</div>
		<div class="py-2 flex flex-col">
			<label for="buyingDate" class="text-green-900 dark:text-green-100">
				Date d'achat
			</label>
			<input
				type="date"
				id="buyingDate"
				class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
				required
				bind:value={buyingDate}
			/>
		</div>
		<div class="py-2 flex flex-col">
			<label for="pageNumber" class="text-green-900 dark:text-green-100">
				Nombre de pages
			</label>
			<input
				type="number"
				id="pageNumber"
				class="w-full bg-transparent border-2 border-green-900 dark:border-green-300 disabled:text-gray-900 dark:disabled:text-gray-100 disabled:border-gray-900 disabled:dark:border-gray-300"
				required
				bind:value={pageNumber}
				disabled={isbn == appState.currentlyReadingBook?.isbn}
			/>
		</div>
		<div class="py-2 flex flex-col">
			<label for="tags" class="text-green-900 dark:text-green-100">
				Tags <span class="italic">(séparé par des virgules)</span>
			</label>
			<input
				type="text"
				id="tags"
				class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
				placeholder="romance, best-friends to lover"
				bind:value={tags}
			/>
		</div>
		<div class="py-6">
			<button
				type="submit"
				class="w-full py-2 text-lg font-serif font-bold bg-green-300 dark:bg-green-700 border-2 border-green-900 dark:border-green-300"
			>
				Modifier
			</button>
		</div>
	</form>
{:else}
	<div
		class="py-4 text-center font-medium italic text-green-900 dark:text-green-100"
	>
		Aucun livre n'a été trouvé avec cet ISBN.
	</div>
	<a
		href="/"
		class="block mx-4 py-2 text-center text-xl font-serif font-bold bg-green-300 dark:bg-green-700 border-2 border-green-900 dark:border-green-300"
	>
		Retourner à l'accueil
	</a>
{/if}
