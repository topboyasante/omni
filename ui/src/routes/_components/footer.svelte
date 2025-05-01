<script>
	import ModeToggle from '$lib/components/theme-switcher/theme-switcher.svelte';
	import { siteConfig } from '$lib/config';
</script>

<div class="border-dashed border-t">
	<div class="mx-auto max-w-screen-xl px-4 sm:px-8">
		<footer
			class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-5"
		>
			<div>
				<div class="text-balance text-sm leading-loose text-muted-foreground">
					Made in 🇬🇭 by{' '}
					<a
						href={siteConfig.links.twitter}
						target="_blank"
						rel="noreferrer"
						class="font-medium underline underline-offset-4"
					>
						topboyasante
					</a>
					. The source code is available on{' '}
					<a
						href={siteConfig.links.github}
						target="_blank"
						rel="noreferrer"
						class="font-medium underline underline-offset-4"
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
