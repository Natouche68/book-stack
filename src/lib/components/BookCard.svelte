<script lang="ts">
	interface Props {
		title: string;
		author: string;
		coverImg: string;
	}

	let { title, author, coverImg }: Props = $props();
</script>

<div class="mx-8 my-4 p-4 flex flex-row bg-amber-200 border-2">
	<img src={coverImg} alt={`${title} de ${author}`} class="w-1/3" />
	<div class="pl-4 flex flex-col">
		<div class="font-bold font-serif text-4xl">{title}</div>
		<div class="font-serif text-3xl italic">{author}</div>
	</div>
</div>
