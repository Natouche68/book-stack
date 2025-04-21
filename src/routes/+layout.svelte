<script lang="ts">
	import { onMount } from "svelte";
	import { appState, type Book } from "$lib/data.svelte";
	import "../app.css";

	let { children } = $props();

	onMount(() => {
		const bookStackStored = localStorage.getItem("bookStack") || "[]";
		appState.bookStack = JSON.parse(bookStackStored) as Book[];

		const currentlyReadingStored = localStorage.getItem("currentlyReading");
		if (currentlyReadingStored) {
			appState.currentlyReadingBook = JSON.parse(
				currentlyReadingStored
			) as Book;
		}
	});
</script>

<svelte:head>
	<title>Book Stack</title>
</svelte:head>

<div class="min-h-dvh flex flex-col bg-green-50">
	<div
		class="fixed top-0 left-0 right-0 py-4 text-3xl font-black text-center font-serif uppercase bg-green-200 border-b-2 border-b-green-900"
	>
		Book Stack
	</div>
	<div class="h-17"></div>

	{@render children()}
</div>
