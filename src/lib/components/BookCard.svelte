<script lang="ts">
	import { relativeDateFormatter } from "$lib/utils";
	import Pencil from "@lucide/svelte/icons/pencil";
	import ReadProgressDialog from "./ReadProgressDialog.svelte";

	interface Props {
		isbn: number;
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
		isbn,
		title,
		author,
		coverImg,
		buyingDate,
		pageNumber,
		tags,
		isReading,
		pagesRead,
	}: Props = $props();

	let openProgressDialog: () => void = () => {};

	function onProgressDialogInit(openDialog: () => void): void {
		openProgressDialog = openDialog;
	}

	function onProgressButtonClicked(event: MouseEvent): void {
		event.stopPropagation();
		event.preventDefault();
		openProgressDialog();
	}
</script>

<a
	href="/book/{isbn}"
	class="block p-4 border-b-2 border-b-green-900 dark:border-b-green-300"
>
	<div class="flex flex-row">
		<img src={coverImg} alt="{title} de {author}" class="w-1/3" />

		<div class="pl-4 flex flex-col">
			{#if isReading}
				<div class="mb-1 text-sm italic text-green-900 dark:text-green-300">
					En cours de lecture
				</div>
			{/if}

			<div class="font-bold font-serif text-2xl">{title}</div>
			<div class="mb-1 font-serif text-xl italic">{author}</div>

			{#if !isReading && buyingDate && pageNumber && tags}
				<div class="text-md text-green-900 dark:text-green-100">
					Acheté {relativeDateFormatter(buyingDate)}
				</div>
				<div class="mb-1 text-md text-green-900 dark:text-green-100">
					{pageNumber} pages
				</div>
				<div>
					{#each tags as tag}
						<span class="mr-1 p-1 text-md bg-green-200 dark:bg-green-800"
							>{tag}</span
						>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	{#if isReading && pageNumber && pagesRead != undefined}
		<button
			class="relative w-full mt-4 h-8 bg-green-100 dark:bg-green-900 border-2 border-green-900 dark:border-green-300"
			onclick={onProgressButtonClicked}
		>
			<div
				class="h-full bg-green-300 dark:bg-green-700 transition-all"
				style="width: {(100 * pagesRead) / pageNumber}%;"
			></div>
			<div class="absolute inset-0 text-center content-center">
				{Math.floor((100 * pagesRead) / pageNumber)}%
			</div>
			<div
				class="absolute top-0 bottom-0 right-2 content-center text-green-900 dark:text-green-100"
			>
				<Pencil size={20} />
			</div>
		</button>
	{/if}
</a>

{#if isReading && pageNumber && pagesRead != undefined}
	<ReadProgressDialog {pageNumber} {pagesRead} onInit={onProgressDialogInit} />
{/if}
