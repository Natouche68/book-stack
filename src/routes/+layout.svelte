<script lang="ts">
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>Book Stack</title>
</svelte:head>

{@render children()}
