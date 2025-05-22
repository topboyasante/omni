<script lang="ts">
    let {
		position = "default"
	}: Props = $props();
</script>

<script lang=“ts” module>
    import { cva } from 'class-variance-authority';
    import { cn } from '$lib/utils/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';

    type Position = 'default' | 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';

    let showToast = $state(false)
    let toastTitle = $state('')

    let toastParagraph: string | undefined = $state('')

    const toastVariants = cva(
        `fixed min-w-[300px] transition-all bg-black z-[999] p-3 border rounded-md flex flex-col`,
        {
           variants: {
            position: {
                default: "right-8 bottom-8 translate-y-0",
                bottomRight: "right-8 bottom-8 translate-y-0",
                bottomLeft: "left-8 bottom-8 translate-y-0",
                topRight: "right-8 top-8 translate-y-0",
                topLeft: "left-8 top-8 translate-y-0"
            }
           },
           defaultVariants: {
            position: "default"
           }
        }
    )

    interface ToastConfig {
        title: string 
        message?: string 
        duration?: number 
    }

   type Props = HTMLButtonAttributes & {
		class?: string;
		position?: Position;
	};

    export function toast(config:ToastConfig) {
        toastTitle = config.title;
        toastParagraph = config.message;
        showToast = true;
        setTimeout(() => {
            showToast = false;
            toastTitle = '';
            toastParagraph = '';
        }, config.duration || 3000)
    }


</script>

<article class={cn(toastVariants({position}))}>
    <h6>{toastTitle}</h6>
    <p class="text-white">{toastParagraph}</p>
</article>