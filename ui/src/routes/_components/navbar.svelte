<script>
	import { page } from '$app/state';
	import { Dices } from '@lucide/svelte';

	const NAV_LINKS = [
		{
			name: 'Docs',
			href: '/docs/introduction'
		},
		{
			name: 'Blocks',
			href: '/blocks'
		}
	];
</script>

<header class="border-b border-dashed sticky top-0 bg-background z-20 h-[3.5rem]">
	<nav class="max-w-screen-xl mx-auto p-3 h-full">
		<div class="flex justify-start items-center gap-5 h-full">
			<a href="/"><Dices /></a>
			<div class="flex">
				{#each NAV_LINKS as navLink}
					<a
						href={navLink.href}
						class={`block px-3 py-2 rounded-md text-sm transition-colors ${
							page.url.pathname === navLink.href
								? 'text-accent-foreground font-medium'
								: 'text-foreground/70 hover:bg-accent/50 hover:text-accent-foreground'
						}`}
					>
						{navLink.name}
					</a>
				{/each}
			</div>
		</div>
	</nav>
</header>
