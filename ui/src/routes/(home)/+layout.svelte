<script lang="ts">
	import Footer from './_components/footer.svelte';
	import Navbar from './_components/navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<div class="max-w-screen-lg mx-auto min-h-screen p-3">
	{@render children()}
</div>
<Footer />
