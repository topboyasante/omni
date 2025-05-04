<script lang="ts">
	let { children } = $props();
</script>

<div class="max-w-screen-xl mx-auto min-h-screen">
	{@render children()}
</div>
