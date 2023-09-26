<script lang="ts">
	import { frameProps } from '$lib/stores';
	import { fade } from 'svelte/transition';
</script>

<div
	class={`absolute inset-0 bg-white/10 dark:bg-black/25 backdrop-blur-lg flex justify-center items-center z-10 overflow-hidden ${
		$frameProps.round ? 'rounded-full' : ''
	}`}
	in:fade
	out:fade
>
	<span
		role="img"
		aria-label="loading"
		class="block w-24 h-24 border-8 ring-8 ring-inset border-cerulean-600 ring-cerulean-600 rounded-full border-dashed motion-safe:animate-spin"
	/>
</div>
