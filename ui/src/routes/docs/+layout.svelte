<script lang="ts">
	import { page } from '$app/state';
	import { DOCS_ROUTES } from '$lib/layouts/routes';

	let { children } = $props();
</script>

<div class="max-w-screen-xl mx-auto xl:border-x min-h-screen xl:border-dashed">
	<div
		class="flex-1 items-start md:grid md:grid-cols-[230px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10"
	>
		<aside
			class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r border-dashed md:sticky md:block"
		>
			<div class="h-full overflow-auto py-1 px-3 lg:py-2">
				{#each DOCS_ROUTES as section}
					<div class="mb-6">
						<h3
							class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-2"
						>
							{section.section}
						</h3>
						<ul class="space-y-1">
							{#each section.items as item}
								<li>
									<a
										href={item.href}
										class={`block px-3 py-2 rounded-md text-sm transition-colors ${
											page.url.pathname === item.href
												? 'bg-accent text-accent-foreground font-medium'
												: 'text-foreground/70 hover:bg-accent/50 hover:text-accent-foreground'
										}`}
									>
										{item.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</aside>
		<div class="p-3">
			{@render children()}
		</div>
	</div>
</div>