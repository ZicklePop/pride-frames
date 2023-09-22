<script lang="ts">
	import type { Flag } from '$lib/constants/flags';

	export let checked = false;
	export let name: Flag | string;
</script>

<label class="text-lg font-semibold cursor-pointer">
	<input
		bind:checked
		on:change
		class="accent-cerulean-400 align-middle"
		{name}
		type="checkbox"
	/>{' '}<slot />
</label>
