<script lang="ts">
	import { onMount } from 'svelte';
	import { toPng } from 'html-to-image';
	import Svg from '$lib/components/svg.svelte'

	let files: FileList | null = null;
	let inputImage: string | null = '/favicon.png';
	let outputImage: string | null = '';

	onMount(async () => {
		await renderPng();
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
		renderPng()
	}
</script>

<h1 class="text-3xl font-bold underline">Pride Frames</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<label>
	Upload
	<input
		accept="image/png, image/jpeg"
		class="sr-only"
		name="file"
		type="file"
		bind:files
	/>
</label>

<button on:click={renderPng}>Render</button>

<h2>Input</h2>

<div id="preview" class="relative">
	<Svg image={inputImage} />
</div>

<h2>Output</h2>
<img src={outputImage} id="output" alt="output" />
