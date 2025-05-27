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
