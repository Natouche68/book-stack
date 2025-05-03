<script lang="ts">
	import { goto } from "$app/navigation";
	import { appState } from "$lib/data.svelte";
	import { onMount } from "svelte";
	import { fade, slide } from "svelte/transition";

	interface Props {
		pageNumber: number;
		pagesRead: number;
		onInit: (openDialog: () => void) => void;
	}

	let { pageNumber, pagesRead, onInit }: Props = $props();

	let open: boolean = $state(false);
	let newPagesRead: number = $state(0);

	onMount(() => {
		onInit(openDialog);
	});

	function openDialog(): void {
		open = true;
	}

	function onSubmit(event: MouseEvent): void {
		if (
			appState.currentlyReadingBook?.pagesRead != undefined &&
			appState.currentlyReadingBook?.pageNumber
		) {
			event.stopPropagation();
			event.preventDefault();

			if (
				newPagesRead >
				appState.currentlyReadingBook.pageNumber -
					appState.currentlyReadingBook.pagesRead
			) {
				newPagesRead =
					appState.currentlyReadingBook.pageNumber -
					appState.currentlyReadingBook.pagesRead;
			}
			if (newPagesRead <= 0) {
				return;
			}

			appState.currentlyReadingBook.pagesRead += newPagesRead;
			localStorage.setItem(
				"currentlyReading",
				JSON.stringify(appState.currentlyReadingBook)
			);
			open = false;

			updateStats();

			if (
				appState.currentlyReadingBook.pagesRead ==
				appState.currentlyReadingBook.pageNumber
			) {
				goto("/book-finished");
			}
		}
	}

	function onCancel(event: MouseEvent): void {
		event.stopPropagation();
		event.preventDefault();
		open = false;
	}

	function updateStats(): void {
		const hasAlreadySetToday =
			new Date(appState.lastVisit).getDate() == new Date().getDate();

		switch (new Date().getDay()) {
			case 0:
				appState.statsPerDay.su.pages += newPagesRead;
				appState.statsPerDay.su.days += hasAlreadySetToday ? 0 : 1;
				break;
			case 1:
				appState.statsPerDay.mo.pages += newPagesRead;
				appState.statsPerDay.mo.days += hasAlreadySetToday ? 0 : 1;
				break;
			case 2:
				appState.statsPerDay.tu.pages += newPagesRead;
				appState.statsPerDay.tu.days += hasAlreadySetToday ? 0 : 1;
				break;
			case 3:
				appState.statsPerDay.we.pages += newPagesRead;
				appState.statsPerDay.we.days += hasAlreadySetToday ? 0 : 1;
				break;
			case 4:
				appState.statsPerDay.th.pages += newPagesRead;
				appState.statsPerDay.th.days += hasAlreadySetToday ? 0 : 1;
				break;
			case 5:
				appState.statsPerDay.fr.pages += newPagesRead;
				appState.statsPerDay.fr.days += hasAlreadySetToday ? 0 : 1;
				break;
			case 6:
				appState.statsPerDay.sa.pages += newPagesRead;
				appState.statsPerDay.sa.days += hasAlreadySetToday ? 0 : 1;
				break;
		}

		localStorage.setItem("statsPerDay", JSON.stringify(appState.statsPerDay));

		appState.lastVisit = Date.now();
		localStorage.setItem("lastVisit", appState.lastVisit.toString());
	}
</script>

{#if open}
	<div
		class="fixed inset-0 backdrop-blur-xs bg-gray-900/30 z-10"
		transition:fade={{ duration: 300 }}
	></div>
	<div
		class="fixed z-10 bottom-0 w-screen p-4 bg-green-50 border-t-2 border-t-green-900"
		transition:slide={{ duration: 300, axis: "y" }}
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
	</div>
{/if}
