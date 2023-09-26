<script lang="ts">
	import { fade } from 'svelte/transition';
	import { frameProps } from '$lib/stores';
	import Gradient from './gradient.svelte';
</script>

<div
	class={`absolute inset-0 bg-white/25 dark:bg-black/25 backdrop-blur-sm flex justify-center items-center z-10 overflow-hidden ${
		$frameProps.round ? 'rounded-full' : ''
	}`}
	in:fade
	out:fade
>
	<div class="animate-spin text-7xl">
		<Gradient angle={0} className="" type={$frameProps.flags.at(-1) || 'lgbtqia'}>⚪️</Gradient>
	</div>
</div>
