<script lang="ts">
	interface Props {
		title: string;
		author: string;
		coverImg: string;
	}

	let { title, author, coverImg }: Props = $props();
</script>

<div class="inline-block w-48 my-4 mx-2">
	<div class="w-48 h-64 mb-2">
		<img
			src={coverImg}
			alt="{title} de {author}"
			class="w-full h-full object-cover"
		/>
	</div>
	<div class="text-xl font-bold font-serif">{title}</div>
	<div class="italic">{author}</div>
</div>
