<script lang="ts">
	export let flags = ['lgbtqia'];
</script>

{#each flags as flag, i}
	<rect
		y="0"
		x={`${Math.ceil((100 / flags.length) * i)}%`}
		height="100%"
		width={`${Math.ceil(100 / flags.length)}%`}
		fill={`url(#${flag})`}
	/>
{/each}
