<script lang="ts">
	import { goto } from "$app/navigation";
	import { appState, type Book } from "$lib/data.svelte";

	let isbn: number | undefined = $state();
	let title: string = $state("");
	let author: string = $state("");
	let coverImg: string = $state("");
	let buyingDate: string = $state("");
	let pageNumber: number | undefined = $state();
	let tags: string = $state("");

	let loadingDataFromIsbn: boolean = $state(false);

	function onAddBook(event: SubmitEvent) {
		event.preventDefault();
		if (isbn && pageNumber) {
			const parsedTags = tags.split(",").map((part) => part.trim());
			const newBook: Book = {
				isbn,
				title,
				author,
				coverImg,
				buyingDate: Date.parse(buyingDate),
				pageNumber,
				tags: parsedTags,
			};
			appState.bookStack.unshift(newBook);
			goto("/");

			localStorage.setItem("bookStack", JSON.stringify(appState.bookStack));
		}
	}

	async function onIsbnEntered(): Promise<void> {
		loadingDataFromIsbn = true;
		const response = await fetch(`/api/load-with-isbn/${isbn}`);
		const data = await response.json();
		title = data.title;
		author = data.author;
		coverImg = data.coverImg;
		pageNumber = data.pageNumber;
		loadingDataFromIsbn = false;
	}
</script>

<form class="mx-4 my-2" onsubmit={onAddBook}>
	<div class="py-2 flex flex-col">
		<label for="isbn" class="text-green-900 dark:text-green-100">ISBN</label>
		<input
			type="number"
			id="isbn"
			class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
			required
			bind:value={isbn}
			onchange={onIsbnEntered}
		/>
		{#if loadingDataFromIsbn}
			<div class="text-right italic text-green-900 dark:text-green-100">
				Chargement...
			</div>
		{/if}
	</div>
	<div class="py-2 flex flex-col">
		<label for="title" class="text-green-900 dark:text-green-100">Titre</label>
		<input
			type="text"
			id="title"
			class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
			required
			bind:value={title}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="author" class="text-green-900 dark:text-green-100">Auteur</label
		>
		<input
			type="text"
			id="author"
			class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
			required
			bind:value={author}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="coverImg" class="text-green-900 dark:text-green-100"
			>Image de couverture</label
		>
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
		<label for="buyingDate" class="text-green-900 dark:text-green-100"
			>Date d'achat</label
		>
		<input
			type="date"
			id="buyingDate"
			class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
			required
			placeholder="2023-08-22"
			bind:value={buyingDate}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="pageNumber" class="text-green-900 dark:text-green-100"
			>Nombre de pages</label
		>
		<input
			type="number"
			id="pageNumber"
			class="w-full bg-transparent border-2 border-green-900 dark:border-green-300"
			required
			bind:value={pageNumber}
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
			Ajouter
		</button>
	</div>
</form>
