<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/ibm-plex-sans';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
