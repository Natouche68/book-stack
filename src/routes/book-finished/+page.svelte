<script lang="ts">
	import { goto } from "$app/navigation";
	import { appState } from "$lib/data.svelte";
	import PartyPopper from "@lucide/svelte/icons/party-popper";

	$effect(() => {
		if (
			appState.currentlyReadingBook?.pageNumber &&
			appState.currentlyReadingBook?.pagesRead
		) {
			if (
				appState.currentlyReadingBook.pageNumber ==
				appState.currentlyReadingBook.pagesRead
			) {
				appState.currentlyReadingBook = undefined;
				localStorage.setItem("currentlyReading", "");

				appState.bookFinished += 1;
				localStorage.setItem("bookFinished", appState.bookFinished.toString());
			} else {
				goto("/");
			}
		}
	});
</script>

<div class="py-12 flex flex-col items-center gap-12">
	<PartyPopper size={92} class="text-green-900" />
	<div class="text-3xl font-serif font-bold text-center">
		Vous avez terminé votre livre !
	</div>
	<div class="w-full">
		<div class="mb-4 text-center font-medium italic text-green-900">
			Choisissez votre prochaine lecture !
		</div>
		<a
			href="/stack"
			class="block mx-4 py-2 text-center text-xl font-serif font-bold bg-green-300 border-2 border-green-900"
		>
			Ma pile de livres
		</a>
	</div>
</div>
