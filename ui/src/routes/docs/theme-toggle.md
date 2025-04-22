<script>
	import ThemeSwitcher from '$lib/components/theme-switcher/theme-switcher.svelte';
</script>

<section>
	<div>
		<h4>Theme Toggle</h4>
		<p class="text-muted-foreground">Toggle between light and dark themes.</p>
	</div>
	<br />
	<div class="border p-4 rounded-xl bg-muted/50">
		<ThemeSwitcher />
	</div>
</section>
