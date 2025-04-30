<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
