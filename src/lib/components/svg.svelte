<script lang="ts">
	import LinearGradient from '$lib/components/linear-gradient.svelte';
	import Rect from '$lib/components/rect.svelte';
	import type { Flag } from '$lib/constants/flags';

	export let angle = 90;
	export let blur = false;
	export let flags: Flag[] = ['lgbtqia'];
	export let image: string | null = '/favicon.png';
	export let round = false;
	export let size = 1024;

	const FRAME_SHAPE = 'frame-shape';
	const FRAME_BLUR = 'frame-blur';
	const FRAME_IMAGE = 'frame-image';

	$: frameProps = round ? { 'clip-path': `url(#${FRAME_SHAPE})` } : {};
	$: flagProps = blur
		? {
				filter: `url(#${FRAME_BLUR})`,
				transform: 'scale(1.03)',
				style: 'transform-origin: 50% 50%'
		  }
		: {};
</script>

<svg viewBox={`0 0 ${size} ${size}`}>
	<defs>
		{#each flags as flag}
			<LinearGradient type={flag} {angle} />
		{/each}
		<clipPath id={FRAME_IMAGE}>
			<circle cx="50%" cy="50%" r="50%" />
		</clipPath>
		{#if round}
			<clipPath id={FRAME_SHAPE}>
				<rect x="0" y="0" rx="100%" width="100%" height="100%" />
			</clipPath>
		{/if}
		{#if blur}
			<filter id={FRAME_BLUR}>
				<feGaussianBlur stdDeviation="32" />
			</filter>
		{/if}
	</defs>
	<g {...frameProps}>
		<rect width="100%" height="100%" fill="white" />
		<g {...flagProps}>
			<Rect {flags} />
		</g>
		<g transform="scale(.925)" style="transform-origin: 50% 50%">
			{#if image}
				<image
					width="100%"
					height="100%"
					href={image}
					clip-path={`url(#${FRAME_IMAGE})`}
					preserveAspectRatio="xMidYMid slice"
				/>
			{/if}
		</g>
	</g>
</svg>
