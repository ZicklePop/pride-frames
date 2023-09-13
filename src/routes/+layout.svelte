<script lang="ts">
	import '../app.css';

  const TITLE = 'Pride Frames by melanie kat';
  const DESCRIPTION = 'Surround yourself with pride flags';
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESCRIPTION} />
</svelte:head>
<slot />
