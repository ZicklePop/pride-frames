<script lang="ts">
	import { cssGradient } from '$lib/css-gradient';
	import type { Flag } from '$lib/constants/flags';

	export let type: Flag = 'lgbtqia';
	export let angle = 45;
</script>

<span
	class="bg-clip-text text-transparent text-shadow"
	style={`background-image: ${cssGradient(type, angle)}`}
>
	<slot />
</span>
