<script lang="ts">
	import flags from '$lib/constants/flags';
	import type { Flag } from '$lib/constants/flags';

	export let angle = 90;
	export let type: Flag = 'lgbtqia';

	$: colors = flags[type];
</script>

<linearGradient id={type} gradientTransform={`rotate(${angle})`}>
	{#each colors as color, i}
		<stop offset={`${Math.ceil((100 / colors.length) * i)}%`} stop-color={color} />
		<stop offset={`${Math.ceil((100 / colors.length) * (i + 1))}%`} stop-color={color} />
	{/each}
</linearGradient>
