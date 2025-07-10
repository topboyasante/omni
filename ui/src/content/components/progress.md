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

    const progressStyles = cva("w-[60%] min-w-[300px] flex h-5 bg-gray-200 rounded-full")

	type Props = HTMLAttributes<HTMLElement> & {
		class?: string;
        progress: number
	};

    let {
		class: className,
        progress = 0,
		...props
	}: Props = $props();

</script>


<article class={cn(progressStyles({  className }))} {...props}>
	<div class="h-full bg-foreground rounded-l-full" style="width: {progress}%"></div>
</article>

```

## Usage Example

Here’s how you can use the `<Toast/>` component in your project:

```ts
<script>
 import Progress from './Progress.svelte';
</script>

<Progress/>
```
