<script lang="ts">
	import { appState } from "$lib/data.svelte";
	import { onMount } from "svelte";

	let themeSelected: "light" | "system" | "dark" = $state("system");

	onMount(() => {
		themeSelected =
			(localStorage.getItem("theme") as "dark" | "light") || "system";
	});

	$effect(() => {
		switch (themeSelected) {
			case "light":
				appState.darkColorTheme = false;
				localStorage.setItem("theme", "light");
				break;
			case "system":
				appState.darkColorTheme = window.matchMedia(
					"(prefers-color-scheme: dark)"
				).matches;
				localStorage.removeItem("theme");
				break;
			case "dark":
				appState.darkColorTheme = true;
				localStorage.setItem("theme", "dark");
				break;
		}
	});

	function exportData(): void {
		const data = {
			bookFinished: appState.bookFinished,
			bookStack: appState.bookStack,
			currentlyReading: appState.currentlyReadingBook,
			lastVisit: appState.lastVisit,
			statsPerDay: appState.statsPerDay,
			theme: themeSelected == "system" ? undefined : themeSelected,
		};

		const dataToSave = encodeURIComponent(JSON.stringify(data));

		const a = document.createElement("a");
		a.setAttribute(
			"href",
			"data:application/json;charset=utf-8, " + dataToSave
		);
		a.setAttribute("download", "book-stack-backup.json");
		a.click();
	}

	function loadData(): void {
		const input = document.createElement("input");
		input.type = "file";
		input.multiple = false;
		input.accept = "application/json";

		input.onchange = async () => {
			if (input.files) {
				const file = Array.from(input.files)[0];
				const data = JSON.parse(await file.text());

				if (
					data.bookFinished &&
					data.bookStack &&
					data.currentlyReading &&
					data.lastVisit &&
					data.statsPerDay
				) {
					appState.bookFinished = data.bookFinished;
					appState.bookStack = data.bookStack;
					appState.currentlyReadingBook = data.currentlyReading;
					appState.lastVisit = data.lastVisit;
					appState.statsPerDay = data.statsPerDay;
					appState.darkColorTheme = data.theme || "system";

					localStorage.setItem(
						"bookFinished",
						JSON.stringify(data.bookFinished)
					);
					localStorage.setItem("bookStack", JSON.stringify(data.bookStack));
					localStorage.setItem(
						"currentlyReading",
						JSON.stringify(data.currentlyReading)
					);
					localStorage.setItem("lastVisit", JSON.stringify(data.lastVisit));
					localStorage.setItem("statsPerDay", JSON.stringify(data.statsPerDay));
					if (data.theme)
						localStorage.setItem("theme", JSON.stringify(data.theme));
				}
			}
		};

		input.click();
	}
</script>

<div class="mx-4 mt-4 text-2xl font-bold font-serif">Paramètres</div>

<div class="m-4">
	<div class="italic text-green-900 dark:text-green-100">Thème</div>
	<div class="flex flex-row">
		<button
			class="w-full p-2 text-center {themeSelected == 'light'
				? 'bg-green-300 dark:bg-green-700 font-bold'
				: 'bg-green-200 dark:bg-green-800'} border-2 border-green-900 dark:border-green-300 transition"
			onclick={() => (themeSelected = "light")}
		>
			Clair
		</button>
		<button
			class="w-full p-2 text-center {themeSelected == 'system'
				? 'bg-green-300 dark:bg-green-700 font-bold'
				: 'bg-green-200 dark:bg-green-800'} border-y-2 border-green-900 dark:border-green-300 transition"
			onclick={() => (themeSelected = "system")}
		>
			Système
		</button>
		<button
			class="w-full p-2 text-center {themeSelected == 'dark'
				? 'bg-green-300 dark:bg-green-700 font-bold'
				: 'bg-green-200 dark:bg-green-800'} border-2 border-green-900 dark:border-green-300 transition"
			onclick={() => (themeSelected = "dark")}
		>
			Sombre
		</button>
	</div>
</div>

<div class="m-4">
	<button
		class="w-full p-2 text-center font-serif font-bold text-lg bg-green-200 dark:bg-green-800 border-2 border-green-900 dark:border-green-300"
		onclick={exportData}
	>
		Exporter les données
	</button>
</div>

<div class="m-4">
	<button
		class="w-full p-2 text-center font-serif font-bold text-lg bg-green-200 dark:bg-green-800 border-2 border-green-900 dark:border-green-300"
		onclick={loadData}
	>
		Charger les données
	</button>
</div>
