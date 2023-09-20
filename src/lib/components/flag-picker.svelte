<script lang="ts">
	import Checkbox from '$lib/components/checkbox.svelte';
	import allFlags from '$lib/constants/flags';
	import type { Flag } from '$lib/constants/flags';
	import { flagsStore } from '$lib/stores';
	import { cssGradient } from '$lib/css-gradient';

	export let angle = 90;
	export let blur = false;
	export let round = false;

	const localAllFlags: Flag[] = Object.keys(allFlags);

	function onChange(e) {
		console.log(e.target.name, e.target.checked);
		if (e.target.checked) {
			flagsStore.update((a) => {
				a.push(e.target.name);
				return a;
			});
		} else {
			flagsStore.update((a) => {
				a.splice(a.indexOf(e.target.name), 1);
				return a;
			});
		}
	}
</script>

<div class="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-3 py-2 px-4">
	{#each localAllFlags as type}
		<Checkbox name={type} checked={$flagsStore.includes(type)} on:change={onChange}>
			<span
				role="img"
				aria-label={`${type} flag`}
				class={`relative overflow-hidden inline-block w-4 h-4 mx-1 ${
					round ? 'rounded-full' : 'rounded-sm'
				} align-middle`}
			>
				<span
					class={`absolute inset-0 ${blur ? 'blur-[1px]' : ''}`}
					style={`background-image: ${cssGradient(type, angle)}`}
				/>
			</span>
			{type}
		</Checkbox>
	{/each}
</div>
