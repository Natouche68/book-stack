<script lang="ts">
	import { relativeDateFormatter } from "$lib/utils";

	interface Props {
		title: string;
		author: string;
		coverImg: string;
		buyingDate?: number;
		pageNumber?: number;
		tags?: string[];
		isReading?: boolean;
		pagesRead?: number;
	}

	let {
		title,
		author,
		coverImg,
		buyingDate,
		pageNumber,
		tags,
		isReading,
		pagesRead,
	}: Props = $props();
</script>

<div class=" p-4 border-b-2 border-b-green-900">
	<div class="flex flex-row">
		<img src={coverImg} alt={`${title} de ${author}`} class="w-1/3" />

		<div class="pl-4 flex flex-col">
			{#if isReading}
				<div class="mb-1 text-sm italic text-green-900">
					En cours de lecture
				</div>
			{/if}

			<div class="font-bold font-serif text-2xl">{title}</div>
			<div class="mb-1 font-serif text-xl italic">{author}</div>

			{#if buyingDate && pageNumber && tags}
				<div class="text-md text-green-900">
					Acheté {relativeDateFormatter(buyingDate)}
				</div>
				<div class="mb-1 text-md text-green-900">{pageNumber} pages</div>
				<div>
					{#each tags as tag}
						<span class="mr-1 p-1 text-md bg-green-200">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	{#if isReading && pageNumber && pagesRead}
		<div class="relative mt-4 h-8 bg-green-100 border-2 border-green-900">
			<div
				class="h-full bg-green-300"
				style="width: {(100 * pagesRead) / pageNumber}%;"
			></div>
			<div class="absolute inset-0 text-center content-center">
				{Math.floor((100 * pagesRead) / pageNumber)}%
			</div>
		</div>
	{/if}
</div>
