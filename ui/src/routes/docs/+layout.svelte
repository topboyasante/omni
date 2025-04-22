<script lang="ts">
	import { page } from '$app/state';
	import { DOCS_ROUTES } from './_components/routes';

	let { children } = $props();
</script>

<div class="max-w-screen-xl mx-auto border-x min-h-screen p-3">
	<div class="flex gap-5">
		<div class="flex-[0.3] border-r h-screen overflow-y-auto">
			<nav class="p-4">
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
										class={`block px-3 py-2 rounded-md text-sm transition-colors ${page.url.pathname === item.href ? 'bg-accent text-accent-foreground font-medium' : 'text-foreground/70 hover:bg-accent/50 hover:text-accent-foreground'}`}
									>
										{item.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</div>
		<div class="flex-1">
			{@render children()}
		</div>
	</div>
</div>
