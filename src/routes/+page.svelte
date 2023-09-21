<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { toPng } from 'html-to-image';
	import Svg from '$lib/components/svg.svelte';
	import File from '$lib/components/file.svelte';
	import Checkbox from '$lib/components/checkbox.svelte';
	import FlagPicker from '$lib/components/flag-picker.svelte';
	import { frameProps } from '$lib/stores';

	let files: FileList | null = null;
	let inputImage: string | null = '/favicon.png';
	let outputImage: string | null = '';

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
		renderPng();
	}
</script>

<h1>Pride Frames</h1>
<p class="my-3">
	To get started, hit the blue `Select image` button. Please note that no data ever leaves your
	device.
</p>

<div id="preview" class="relative">
	<Svg angle={$frameProps.vertical ? 0 : 90} image={inputImage} />
</div>

<div class="my-5 mx-4 gap-4 flex md:flex-row flex-col flex-wrap md:items-center">
	<File bind:files name="file">Import Image</File>

	<button
		class="text-center select-none text-lg cursor-pointer font-bold rounded-3xl py-2 px-4 bg-gradient-to-b from-cerulean-400 to-cerulean-600 text-white hover:from-cerulean-400 hover:to-cerulean-500 active:from-cerulean-500 active:to-cerulean-600"
		on:click={renderPng}>Save</button
	>

	<Checkbox bind:checked={$frameProps.blur} name="blur">Blur</Checkbox>
	<Checkbox bind:checked={$frameProps.round} name="round">Circle</Checkbox>
	<Checkbox bind:checked={$frameProps.vertical} name="vertical">Vertical</Checkbox>

	<FlagPicker angle={$frameProps.vertical ? 90 : 0} />
</div>
<h2>Input</h2>

<h2>Output</h2>
<img src={outputImage} id="output" alt="output" />
