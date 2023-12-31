<script lang="ts">
	import { frameProps } from '$lib/stores';
	import { IS_SAFARI } from '$lib/is-safari';
	import { onMount, onDestroy } from 'svelte';
	import { toPng } from 'html-to-image';
	import Checkbox from '$lib/components/checkbox.svelte';
	import File from '$lib/components/file.svelte';
	import FlagPicker from '$lib/components/flag-picker.svelte';
	import Gradient from '$lib/components/gradient.svelte';
	import Loading from '$lib/components/loading.svelte';
	import Svg from '$lib/components/svg.svelte';

	let files: FileList | null = null;
	let inputImage: string | null = '/apple-touch-icon.png';
	let outputImage: string | null = '';
	let loading = false;
	let firstLoad = true;

	const DEFAULT_SIZE = 1024;

	onMount(renderPng);
	const framePropsUnsubscribe = frameProps.subscribe(renderPng);

	onDestroy(() => {
		framePropsUnsubscribe();
	});

	async function renderPng() {
		if (typeof document !== 'undefined') {
			const svg = document.querySelector('#preview');
			const options = {
				height: $frameProps.size,
				width: $frameProps.size
			};
			loading = firstLoad ? false : true;
			if (svg) {
				outputImage = await toPng(<HTMLElement>svg, options);
				// Double render on Safari to fix a bug :(
				if (IS_SAFARI) {
					outputImage = await toPng(<HTMLElement>svg, options);
				}
				loading = false;
			}

			if (firstLoad) {
				firstLoad = false;
			}
		}
	}

	function getImageMinSize() {
		if (typeof Image !== 'undefined' && inputImage) {
			const img = new Image();
			img.src = inputImage;
			img.onload = () => {
				const { width, height } = img;
				const min = Math.min(width, height);
				frameProps.update((a) => {
					// Safari doesn't want to work with bigger images :(
					if (IS_SAFARI) {
						a.size = min < DEFAULT_SIZE ? min : DEFAULT_SIZE;
					} else {
						a.size = min || DEFAULT_SIZE;
					}
					return a;
				});
			};
		}
	}

	$: if (files) {
		const file = files[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = () => {
				inputImage = reader.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	$: if (inputImage) {
		getImageMinSize();
	}
</script>

<h1><Gradient>Pride Frames</Gradient></h1>
<p class="my-3">
	To get started framing yourself in pride flags, hit the `Import image` button. Your data never
	leaves your device.
</p>
<div class="xl:flex xl:flex-row xl:justify-between xl:items-center xl:gap-x-4 xl:my-8">
	<div class="xl:w-1/2">
		<div class="relative">
			<Svg angle={$frameProps.vertical ? 0 : 90} image={inputImage} size={$frameProps.size} />
			{#if loading}
				<Loading />
			{/if}
			{#if outputImage && !loading}
				<img src={outputImage} id="output" alt="output" class="absolute inset-0 w-full" />
			{/if}
		</div>
	</div>
	<div class="xl:w-1/2 xl:max-w-lg">
		<div class="my-5 gap-4 flex md:flex-row flex-col flex-wrap md:flex-nowrap md:items-center">
			<File bind:files name="file">Import Image</File>
			<div class="flex grow gap-x-5 justify-around">
				<Checkbox bind:checked={$frameProps.blur} name="blur">Blur</Checkbox>
				<Checkbox bind:checked={$frameProps.round} name="round">Circle</Checkbox>
				<Checkbox bind:checked={$frameProps.vertical} name="vertical">Vertical</Checkbox>
			</div>
		</div>
		<FlagPicker angle={$frameProps.vertical ? 90 : 0} />
	</div>
</div>
