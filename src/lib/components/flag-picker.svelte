<script lang="ts">
	import { cssGradient } from '$lib/css-gradient';
	import { frameProps } from '$lib/stores';
	import { IS_SAFARI } from '$lib/is-safari';
	import allFlags from '$lib/constants/flags';
	import Checkbox from '$lib/components/checkbox.svelte';
	import type { Flag } from '$lib/constants/flags';

	export let angle = 90;
	let shouldWarn = IS_SAFARI;

	const FLAG_LIMIT = 4;
	const flagsArray = Object.keys(allFlags) as Flag[];

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement | null;
		const name = target?.name as Flag;
		if (target?.checked) {
			const flagLength = $frameProps.flags.length;
			if (shouldWarn && flagLength >= FLAG_LIMIT) {
				window.alert(
					`I won't stop you, just know that adding too many flags can lead to unforeseen consequences.`
				);
				shouldWarn = false;
			}
			frameProps.update((a) => {
				a.flags.push(name);
				return a;
			});
		} else {
			frameProps.update((a) => {
				a.flags = a.flags.filter((f) => f !== name);
				return a;
			});
		}
	}
</script>

<div class="grid grid-cols-1 gap-y-4 gap-x-0 md:grid-cols-3 md:gap-x-2 md:py-2">
	{#each flagsArray as type}
		<div class="truncate">
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
		</div>
	{/each}
</div>
