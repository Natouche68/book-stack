<script lang="ts">
	import { appState } from "$lib/data.svelte";
	import { onMount } from "svelte";

	interface Props {
		pageNumber: number;
		pagesRead: number;
		onInit: (openDialog: () => void) => void;
	}

	let { pageNumber, pagesRead, onInit }: Props = $props();

	let dialog: HTMLDialogElement | undefined;
	let newPagesRead: number = $state(0);

	onMount(() => {
		onInit(openDialog);
	});

	function openDialog(): void {
		if (dialog) {
			dialog.showModal();
		}
	}

	function onSubmit(event: MouseEvent): void {
		if (appState.currentlyReadingBook?.pagesRead && dialog) {
			event.stopPropagation();
			event.preventDefault();

			appState.currentlyReadingBook.pagesRead += newPagesRead;
			localStorage.setItem(
				"currentlyReading",
				JSON.stringify(appState.currentlyReadingBook)
			);
			dialog.close();
		}
	}

	function onCancel(event: MouseEvent): void {
		if (dialog) {
			event.stopPropagation();
			event.preventDefault();
			dialog.close();
		}
	}
</script>

<dialog
	bind:this={dialog}
	class="mx-auto mt-auto p-4 bg-green-50 border-2 border-green-900 backdrop:backdrop-blur-xs backdrop:bg-gray-900/30"
>
	<div class="mb-2 font-serif font-bold text-2xl text-left">
		Mettre à jour le progrès de lecture
	</div>
	<div class="py-2 flex flex-col">
		<label for="newPagesRead" class="text-left text-green-900">
			Nombre de pages lues aujourd'hui
		</label>
		<input
			type="number"
			id="newPagesRead"
			min="1"
			max={pageNumber - pagesRead}
			class="w-full bg-transparent border-2 border-green-900"
			required
			bind:value={newPagesRead}
		/>
	</div>
	<div class="pt-4">
		<button
			onclick={onSubmit}
			class="w-full py-2 text-lg font-serif font-bold bg-green-300 border-2 border-green-900"
		>
			Mettre à jour
		</button>
		<button
			class="w-full py-2 text-lg font-serif underline text-green-900"
			onclick={onCancel}
		>
			Annuler
		</button>
	</div>
</dialog>
