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
</script>

<form class="mx-4 my-2" onsubmit={onAddBook}>
	<div class="py-2 flex flex-col">
		<label for="isbn" class="text-green-900">ISBN</label>
		<input
			type="number"
			id="isbn"
			class="w-full bg-transparent border-2 border-green-900"
			required
			bind:value={isbn}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="title" class="text-green-900">Titre</label>
		<input
			type="text"
			id="title"
			class="w-full bg-transparent border-2 border-green-900"
			required
			bind:value={title}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="author" class="text-green-900">Auteur</label>
		<input
			type="text"
			id="author"
			class="w-full bg-transparent border-2 border-green-900"
			required
			bind:value={author}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="coverImg" class="text-green-900">Image de couverture</label>
		<input
			type="text"
			id="coverImg"
			class="w-full bg-transparent border-2 border-green-900"
			required
			bind:value={coverImg}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="buyingDate" class="text-green-900">Date d'achat</label>
		<input
			type="date"
			id="buyingDate"
			class="w-full bg-transparent border-2 border-green-900"
			required
			placeholder="2023-08-22"
			bind:value={buyingDate}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="pageNumber" class="text-green-900">Nombre de pages</label>
		<input
			type="number"
			id="pageNumber"
			class="w-full bg-transparent border-2 border-green-900"
			required
			bind:value={pageNumber}
		/>
	</div>
	<div class="py-2 flex flex-col">
		<label for="tags" class="text-green-900">
			Tags <span class="italic">(séparé par des virgules)</span>
		</label>
		<input
			type="text"
			id="tags"
			class="w-full bg-transparent border-2 border-green-900"
			placeholder="romance, best-friends to lover"
			bind:value={tags}
		/>
	</div>
	<div class="py-6">
		<button
			type="submit"
			class="w-full py-2 text-lg font-serif font-bold bg-green-300 border-2 border-green-900"
		>
			Ajouter
		</button>
	</div>
</form>
