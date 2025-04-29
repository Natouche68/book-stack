<script lang="ts">
	import { onMount } from "svelte";
	import { appState, type Book } from "$lib/data.svelte";
	import "../app.css";
	import { onNavigate } from "$app/navigation";

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

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Book Stack</title>
</svelte:head>

<div class="min-h-dvh flex flex-col bg-green-50">
	<div
		class="fixed top-0 left-0 right-0 py-4 text-3xl font-black text-center font-serif uppercase bg-green-200 border-b-2 border-b-green-900"
		style="view-transition-name: header;"
	>
		Book Stack
	</div>
	<div class="h-17"></div>

	{@render children()}
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			150ms ease both fade-out,
			300ms ease both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			150ms ease 150ms both fade-in,
			300ms ease both slide-from-right;
	}
</style>
