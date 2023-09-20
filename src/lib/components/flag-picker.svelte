<script lang="ts">
	import { cssGradient } from '$lib/css-gradient';
	import { frameProps } from '$lib/stores';
	import allFlags from '$lib/constants/flags';
	import Checkbox from '$lib/components/checkbox.svelte';
	import type { Flag } from '$lib/constants/flags';

	export let angle = 90;

	const flagsArray = Object.keys(allFlags) as Flag[];

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement | null;
		if (target?.checked) {
			frameProps.update((a) => {
				a.flags.push(target?.name as Flag);
				return a;
			});
		} else {
			frameProps.update((a) => {
				a.flags.splice(a.flags.indexOf(target?.name as Flag), 1);
				return a;
			});
		}
	}
</script>

<div class="grid grid-cols-1 gap-y-4 gap-x-2 md:grid-cols-3 py-2 px-4">
	{#each flagsArray as type}
		<Checkbox name={type} checked={$frameProps.flags.includes(type)} on:change={onChange}>
			<span
				role="img"
				aria-label={`${type} flag`}
				class={`relative overflow-hidden inline-block w-4 h-4 mx-1 ${
					$frameProps.round ? 'rounded-full' : 'rounded-sm'
				} align-middle`}
			>
				<span
					class={`absolute inset-0 ${$frameProps.blur ? 'blur-[1px]' : ''}`}
					style={`background-image: ${cssGradient(type, angle)}`}
				/>
			</span>
			{type}
		</Checkbox>
	{/each}
</div>
