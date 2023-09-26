<script lang="ts">
	import { cssGradient } from '$lib/css-gradient';
	import type { Flag } from '$lib/constants/flags';

	export let type: Flag = 'lgbtqia';
	export let angle = 45;
	export let className = 'text-shadow';
</script>

<span
	class={`bg-clip-text text-transparent ${className}`}
	style={`background-image: ${cssGradient(type, angle)}`}
>
	<slot />
</span>
