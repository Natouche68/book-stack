<script lang="ts">
	import { appState } from "$lib/data.svelte";
	import { onMount } from "svelte";

	// localStorage.theme === "dark" ||
	// 		(!("theme" in localStorage) &&
	// 			window.matchMedia("(prefers-color-scheme: dark)").matches);

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
