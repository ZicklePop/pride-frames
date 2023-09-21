<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { toPng } from 'html-to-image';
	import Svg from '$lib/components/svg.svelte';
	import File from '$lib/components/file.svelte';
	import Checkbox from '$lib/components/checkbox.svelte';
	import FlagPicker from '$lib/components/flag-picker.svelte';
	import { frameProps } from '$lib/stores';
	import Gradient from '$lib/components/gradient.svelte';

	let files: FileList | null = null;
	let inputImage: string | null = '/favicon.png';
	let outputImage: string | null = '';

	const DEFAULT_SIZE = 1024;

	onMount(renderPng);
	const framePropsUnsubscribe = frameProps.subscribe(renderPng);

	onDestroy(() => {
		framePropsUnsubscribe();
	});

	async function renderPng() {
		if (typeof document !== 'undefined') {
			const svg = document.querySelector('#preview');
			if (svg) {
				outputImage = await toPng(<HTMLElement>svg);

				// Double render on Safari to fix a bug :(
				if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
					outputImage = await toPng(<HTMLElement>svg);
				}
			}
		}
	}

	function getImageMinSize() {
		let size = DEFAULT_SIZE;
		if (typeof Image !== 'undefined' && inputImage) {
			const img = new Image();
			img.src = inputImage;
			img.onload = () => {
				const { width, height } = img;
				const min = Math.min(width, height);
				size = min;
			};
		}
		frameProps.update((a) => {
			a.size = size;
			return a;
		});
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
		renderPng();
	}
</script>

<h1><Gradient>Pride Frames</Gradient></h1>
<p class="my-3">
	To get started, hit the blue `Select image` button. Please note that no data ever leaves your
	device.
</p>

<div id="preview" class="relative">
	<Svg angle={$frameProps.vertical ? 0 : 90} image={inputImage} size={$frameProps.size} />
</div>

<div class="my-5 gap-4 flex md:flex-row flex-col flex-wrap md:flex-nowrap md:items-center">
	<File bind:files name="file">Import Image</File>
	<div class="flex grow gap-x-5 justify-around">
		<Checkbox bind:checked={$frameProps.blur} name="blur">Blur</Checkbox>
		<Checkbox bind:checked={$frameProps.round} name="round">Circle</Checkbox>
		<Checkbox bind:checked={$frameProps.vertical} name="vertical">Vertical</Checkbox>
	</div>
</div>

<FlagPicker angle={$frameProps.vertical ? 90 : 0} />

<img src={outputImage} id="output" alt="output" />
