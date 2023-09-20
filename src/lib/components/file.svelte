<script lang="ts">
	export let accept = 'image/png, image/jpeg';
	export let name: string;
	export let files: FileList | null = null;
</script>

<label
	class="text-center select-none text-lg cursor-pointer font-semibold rounded-3xl py-2 px-4 bg-gradient-to-br from-cerulean-400 to-cerulean-600 text-white hover:from-cerulean-400 hover:to-cerulean-500 active:from-cerulean-500 active:to-cerulean-600"
>
	<slot /><input bind:files {accept} class="sr-only" {name} type="file" />
</label>
