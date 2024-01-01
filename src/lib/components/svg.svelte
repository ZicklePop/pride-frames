<script lang="ts">
	import LinearGradient from '$lib/components/linear-gradient.svelte';
	import Rect from '$lib/components/rect.svelte';
	import { frameProps } from '$lib/stores';

	export let angle = 90;
	export let image: string | null = '/favicon.png';
	export let size = 1024;

	const FRAME_SHAPE = 'frame-shape';
	const FRAME_BLUR = 'frame-blur';
	const FRAME_IMAGE = 'frame-image';

	$: roundProps = $frameProps.round ? { 'clip-path': `url(#${FRAME_SHAPE})` } : {};
	$: blurProps = $frameProps.blur
		? {
				filter: `url(#${FRAME_BLUR})`,
				transform: 'scale(1.03)',
				style: 'transform-origin: 50% 50%'
			}
		: {};
</script>

<svg id="preview" viewBox={`0 0 ${size} ${size}`}>
	<defs>
		{#each $frameProps.flags as flag}
			<LinearGradient type={flag} {angle} />
		{/each}
		<clipPath id={FRAME_IMAGE}>
			<circle cx="50%" cy="50%" r="50%" />
		</clipPath>
		{#if $frameProps.round}
			<clipPath id={FRAME_SHAPE}>
				<rect x="0" y="0" rx="100%" width="100%" height="100%" />
			</clipPath>
		{/if}
		{#if $frameProps.blur}
			<filter id={FRAME_BLUR}>
				<feGaussianBlur stdDeviation="32" />
			</filter>
		{/if}
	</defs>
	<g {...roundProps}>
		<rect width="100%" height="100%" fill="white" />
		<g {...blurProps}>
			<Rect flags={$frameProps.flags} />
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
