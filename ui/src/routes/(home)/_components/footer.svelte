<script>
	import ModeToggle from '$lib/components/theme-switcher/theme-switcher.svelte';
	import { siteConfig } from '$lib/config';
</script>

<div class="border-border border-dotted border-t-1">
	<div
		class="mx-auto max-w-screen-lg px-4 sm:px-8 border-border border-dotted border-r-1 border-l-1"
	>
		<footer
			class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5"
		>
			<div>
				<div class="text-balance text-sm leading-loose text-muted-foreground">
					Built by{' '}
					<a
						href={siteConfig.links.twitter}
						target="_blank"
						rel="noreferrer"
						class="font-medium underline underline-offset-4"
						data-umami-event="View Twitter Profile"
					>
						topboyasante
					</a>
					. The source code is available on{' '}
					<a
						href={siteConfig.links.github}
						target="_blank"
						rel="noreferrer"
						class="font-medium underline underline-offset-4"
						data-umami-event="View GitHub Repository"
					>
						GitHub
					</a>
					.
				</div>
			</div>

			<ModeToggle />
		</footer>
	</div>
</div>
