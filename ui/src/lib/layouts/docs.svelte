<script lang="ts">
	import { page } from '$app/state';
	import { DOCS_ROUTES } from './routes';
	import { onMount } from 'svelte';

	let { children } = $props();
	let isMobileMenuOpen = $state(false);
	let isMobile = $state(false);

	// Function to check if the screen is mobile size
	function checkMobile() {
		isMobile = window.innerWidth < 768;
	}

	onMount(() => {
		// Check initial state
		checkMobile();

		// Add event listener for resize
		window.addEventListener('resize', checkMobile);

		// Cleanup
		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	});

	// Toggle mobile menu
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}
</script>

<div class="max-w-screen-xl mx-auto border-x min-h-screen p-3">
	<!-- Mobile menu button (only visible on mobile) -->
	{#if isMobile}
		<button
			class="md:hidden flex items-center px-3 py-2 mb-4 border rounded text-muted-foreground border-muted-foreground hover:text-accent-foreground hover:border-accent-foreground"
			onclick={toggleMobileMenu}
		>
			<span class="mr-2">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
			<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
				{#if isMobileMenuOpen}
					<path
						d="M10 8.586L5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586z"
					/>
				{:else}
					<path
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					/>
				{/if}
			</svg>
		</button>
	{/if}

	<div class="flex flex-col md:flex-row gap-5">
		<!-- Sidebar navigation -->
		<div
			class={`${isMobile && !isMobileMenuOpen ? 'hidden' : 'block'} md:block md:flex-[0.3] border-r overflow-y-auto ${isMobile ? 'h-auto mb-6' : 'h-screen'}`}
		>
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
										onclick={() => {
											if (isMobile) isMobileMenuOpen = false;
										}}
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
			</nav>
		</div>

		<!-- Main content area -->
		<div class="flex-1">
			{@render children()}
		</div>
	</div>
</div>
