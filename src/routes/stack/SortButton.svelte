<script lang="ts">
	import ArrowUp from "@lucide/svelte/icons/arrow-up";
	import ArrowDown from "@lucide/svelte/icons/arrow-down";
	import type { Book } from "$lib/data.svelte";

	interface Props {
		property: keyof Book;
		ascendingOrder: boolean;
		display: string;
		selected: boolean;
		index: number;
		onClick: (
			property: keyof Book,
			ascendingOrder: boolean,
			index: number
		) => void;
	}

	let { property, ascendingOrder, display, selected, index, onClick }: Props =
		$props();
</script>

<button
	class="mr-1 pl-1 pr-2 text-lg {selected
		? 'bg-green-300 dark:bg-green-700 font-medium'
		: 'bg-green-200 dark:bg-green-800'} transition"
	onclick={() => onClick(property, ascendingOrder, index)}
>
	{#if ascendingOrder}
		<ArrowDown class="inline" size={20} />
	{:else}
		<ArrowUp class="inline" size={20} />
	{/if}
	{display}
</button>
