<script lang="ts">
	interface Props {
		isbn: number;
		title: string;
		author: string;
		coverImg: string;
	}

	let { isbn, title, author, coverImg }: Props = $props();
</script>

<a href="/book/{isbn}" class="inline-block w-32 my-4 mx-2 overflow-hidden">
	<div class="w-full h-48 mb-2">
		<img
			src={coverImg}
			alt="{title} de {author}"
			class="w-full h-full object-cover"
		/>
	</div>
	<div class="relative">
		<div
			class="absolute top-0 bottom-0 right-0 w-2 bg-linear-to-r from-transparent to-green-50 dark:to-green-950"
		></div>
		<div class="font-bold font-serif">{title}</div>
		<div class="text-sm italic">{author}</div>
	</div>
</a>
