<script lang="ts">
	import Plus from "@lucide/svelte/icons/plus";

	interface Props {
		small?: boolean;
	}

	let { small }: Props = $props();
</script>

<a
	href="/stack/add"
	class="fixed flex flex-row gap-1 items-center p-2 bottom-2 right-2 bg-green-300 dark:bg-green-700 border-2 border-green-900 dark:border-green-300"
	style="view-transition-name: add-book-button;"
>
	<Plus size={28} />
	{#if !small}
		<div class="text-lg font-bold font-serif">Ajouter un livre</div>
	{/if}
</a>
