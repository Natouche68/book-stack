<script lang="ts">
	import { relativeDateFormatter } from "$lib/utils";

	interface Props {
		title: string;
		author: string;
		coverImg: string;
		buyingDate: number;
		pageNumber: number;
		tags: string[];
	}

	let { title, author, coverImg, buyingDate, pageNumber, tags }: Props =
		$props();
</script>

<div class="mx-8 my-4 p-4 flex flex-row bg-amber-200 border-2">
	<img src={coverImg} alt={`${title} de ${author}`} class="w-1/3" />

	<div class="pl-4 flex flex-col">
		<div class="font-bold font-serif text-4xl">{title}</div>
		<div class="mb-2 font-serif text-4xl italic">{author}</div>

		<div class="text-2xl">Acheté {relativeDateFormatter(buyingDate)}</div>
		<div class="text-2xl">{pageNumber} pages</div>
		<div>
			{#each tags as tag}
				<div class="text-2xl">{tag}</div>
			{/each}
		</div>
	</div>
</div>
