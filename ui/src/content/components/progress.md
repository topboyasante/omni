<script>
 import ComponentPreview from '$lib/components/component-preview/component-preview.svelte';
 import InstallationSnippets from '$lib/components/installation-snippets/installation-snippets.svelte';
</script>

# Progress Bar

A customizable progress bar component for your SvelteKit app.

<br/>

<ComponentPreview name="Progress" />

## Setting Up

This component is standalone and does not require additional dependencies. You can directly copy and use it in your project.

<br/>

Copy the `<Progress/>` component:

```ts
<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { cva } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';

	const progressStyles = cva(
		'w-[60%] min-w-[300px] flex h-2.5 bg-neutral-200 rounded-full overflow-hidden'
	);

	type Props = HTMLAttributes<HTMLElement> & {
		class?: string;
		progress: number;
		animated?: boolean;
		animationDuration?: string;
		showPulse?: boolean;
	};

	let {
		class: className,
		progress = 0,
		animated = true,
		animationDuration = '0.6s',
		showPulse = false,
		...props
	}: Props = $props();

	// Clamp progress between 0 and 100
	const clampedProgress = $derived(Math.max(0, Math.min(100, progress)));

	// Generate CSS custom properties for animation
	const animationStyles = $derived(() => {
		return `
            --progress-width: ${clampedProgress}%;
            --animation-duration: ${animationDuration};
        `;
	});
</script>

<article class={cn(progressStyles({ className }))} style={animationStyles()} {...props}>
	<div
		class="h-full bg-foreground rounded-l-full relative {animated
			? 'animate-progress'
			: ''} {showPulse ? 'animate-pulse-glow' : ''}"
		style="width: {clampedProgress}%"
	>
		<!-- Optional: Add a subtle highlight effect -->
		{#if showPulse && clampedProgress > 0}
			<div
				class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"
			></div>
		{/if}
	</div>
</article>

<style>
	.animate-progress {
		transition: width var(--animation-duration) cubic-bezier(0.4, 0, 0.2, 1);
	}

	.animate-pulse-glow {
		animation: pulse-glow 2s infinite;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
		}
		50% {
			box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
		}
	}

	.animate-shine {
		animation: shine 2s infinite;
	}

	@keyframes shine {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>

```

## Usage Example

Here’s how you can use the `<Progress/>` component in your project:

```ts
<script>
 import Progress from './Progress.svelte';
</script>

<Progress/>
```
