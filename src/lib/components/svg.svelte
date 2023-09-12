<script lang="ts">
	import Gradient from '$lib/components/gradient.svelte';
	import Rect from '$lib/components/rect.svelte';
	import type { Flag } from '$lib/constants/flags.ts';

	export let angle = 90;
	export let blurFlags = true;
	export let flags: Flag[] = ['lgbtqia'];
	export let image: string | null = '/favicon.png';
	export let roundFrame = true;
	export let size = 1024;

	const FRAME_SHAPE = 'frame-shape';
	const FRAME_BLUR = 'frame-blur';
	const FRAME_IMAGE = 'frame-image';

	const frameProps = roundFrame ? { 'clip-path': `url(#${FRAME_SHAPE})` } : {};
	const flagProps = blurFlags
		? {
				filter: `url(#${FRAME_BLUR})`,
				transform: 'scale(1.03)',
				'style': 'transform-origin: 50% 50%',
		  }
		: {};
</script>

<svg viewBox={`0 0 ${size} ${size}`}>
	<defs>
		{#each flags as flag}
			<Gradient type={flag} {angle} />
		{/each}
		<clipPath id={FRAME_IMAGE}>
			<circle cx="50%" cy="50%" r="50%" />
		</clipPath>
		{#if roundFrame}
			<clipPath id={FRAME_SHAPE}>
				<rect x="0" y="0" rx="100%" width="100%" height="100%" />
			</clipPath>
		{/if}
		{#if blurFlags}
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
