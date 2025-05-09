<script lang="ts">
	import { page } from '$app/state';
	import { DOCS_ROUTES } from '$lib/layouts/routes';

	let { children } = $props();
</script>

<!-- there's a navbar in the parent layout -->
<div class="max-w-screen-xl mx-auto xl:border-x min-h-screen xl:border-dashed">
	<div
		class="flex-1 items-start md:grid md:grid-cols-[230px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10"
	>
		<!-- Sidebar with integrated styling -->
		<aside
			class="hidden md:block md:sticky top-14 h-[calc(100vh-3.5rem)] w-full shrink-0 border-r border-dashed py-5"
			style="
				overflow: hidden;
				position: sticky;
				scrollbar-width: thin;
				scrollbar-color: var(--muted) transparent;
			"
		>
			<!-- Scrollable content inside the fixed sidebar -->
			<div
				class="h-full py-1 px-3 lg:py-2"
				style="
					overflow-y: auto;
					overflow-x: hidden;
					padding-bottom: 2rem;
					height: 100%;
					scrollbar-width: thin;
					scrollbar-color: var(--muted) transparent;
				"
			>
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

<!-- there's a footer in the parent layout -->

<style>
	/* Target the scrollbars only inside the sidebar div */
	aside div::-webkit-scrollbar {
		width: 4px;
	}

	aside div::-webkit-scrollbar-track {
		background: transparent;
	}

	aside div::-webkit-scrollbar-thumb {
		background-color: var(--muted);
		border-radius: 20px;
	}
</style>
