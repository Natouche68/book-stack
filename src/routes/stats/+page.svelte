<script lang="ts">
	import { appState } from "$lib/data.svelte";

	let means = $derived(
		[
			appState.statsPerDay.mo,
			appState.statsPerDay.tu,
			appState.statsPerDay.we,
			appState.statsPerDay.th,
			appState.statsPerDay.fr,
			appState.statsPerDay.sa,
			appState.statsPerDay.su,
		].map((day) => day.pages / day.days)
	);

	let maxMean = $derived(means.toSorted()[0]);

	let totalPerYear = $derived(
		appState.statsPerDay.mo.pages +
			appState.statsPerDay.tu.pages +
			appState.statsPerDay.we.pages +
			appState.statsPerDay.th.pages +
			appState.statsPerDay.fr.pages +
			appState.statsPerDay.sa.pages +
			appState.statsPerDay.su.pages
	);

	let daysReading = $derived(
		appState.statsPerDay.mo.days +
			appState.statsPerDay.tu.days +
			appState.statsPerDay.we.days +
			appState.statsPerDay.th.days +
			appState.statsPerDay.fr.days +
			appState.statsPerDay.sa.days +
			appState.statsPerDay.su.days
	);

	let globalMean = $derived(totalPerYear / daysReading);
</script>

<div class="mx-4 mt-4 text-2xl font-bold font-serif">
	Statistiques de lecture
</div>

<div class="mx-4 mt-6 flex flex-row items-end gap-4">
	<div class="w-full">
		<div class="text-center">{Math.floor(means[0])}</div>
		<div
			class="bg-green-300"
			style="height: {(12 * means[0]) / maxMean}rem"
		></div>
		<div class="italic text-center text-green-900">Lu</div>
	</div>
	<div class="w-full">
		<div class="text-center">{Math.floor(means[1])}</div>
		<div
			class="bg-green-300"
			style="height: {(12 * means[1]) / maxMean}rem"
		></div>
		<div class="italic text-center text-green-900">Ma</div>
	</div>
	<div class="w-full">
		<div class="text-center">{Math.floor(means[2])}</div>
		<div
			class="bg-green-300"
			style="height: {(12 * means[2]) / maxMean}rem"
		></div>
		<div class="italic text-center text-green-900">Me</div>
	</div>
	<div class="w-full">
		<div class="text-center">{Math.floor(means[3])}</div>
		<div
			class="bg-green-300"
			style="height: {(12 * means[3]) / maxMean}rem"
		></div>
		<div class="italic text-center text-green-900">Je</div>
	</div>
	<div class="w-full">
		<div class="text-center">{Math.floor(means[4])}</div>
		<div
			class="bg-green-300"
			style="height: {(12 * means[4]) / maxMean}rem"
		></div>
		<div class="italic text-center text-green-900">Ve</div>
	</div>
	<div class="w-full">
		<div class="text-center">{Math.floor(means[5])}</div>
		<div
			class="bg-green-300"
			style="height: {(12 * means[5]) / maxMean}rem"
		></div>
		<div class="italic text-center text-green-900">Sa</div>
	</div>
	<div class="w-full">
		<div class="text-center">{Math.floor(means[6])}</div>
		<div
			class="bg-green-300"
			style="height: {(12 * means[6]) / maxMean}rem"
		></div>
		<div class="italic text-center text-green-900">Di</div>
	</div>
</div>
<div class="mb-6 text-center text-sm text-green-900">
	Moyenne de pages lues par jour
</div>

<div class="flex flex-row flex-wrap">
	<div class="w-1/2 my-4">
		<div class="italic text-green-900 text-center">Pages lues</div>
		<div class="text-4xl font-serif font-bold text-center">
			{totalPerYear}
		</div>
	</div>
	<div class="w-1/2 my-4">
		<div class="italic text-green-900 text-center">Jours de lecture</div>
		<div class="text-4xl font-serif font-bold text-center">
			{daysReading}
		</div>
	</div>
	<div class="w-1/2 my-4">
		<div class="italic text-green-900 text-center">Moyenne par jour</div>
		<div class="text-4xl font-serif font-bold text-center">
			{Math.floor(globalMean * 100) / 100}
			<span class="text-base italic text-green-900 text-center">pages</span>
		</div>
	</div>
	<div class="w-1/2 my-4">
		<div class="italic text-green-900 text-center">Livres terminés</div>
		<div class="text-4xl font-serif font-bold text-center">
			{appState.bookFinished}
		</div>
	</div>
</div>
