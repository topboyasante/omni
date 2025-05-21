<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from './_components/navbar.svelte';
	import Footer from './_components/footer.svelte';
	import Toast from '$lib/components/toast/toast.svelte';

	let { children } = $props();
</script>


<ModeWatcher />

<Navbar />
{@render children()}
<Toast/>
<Footer />
