<script lang="ts" module>
	import { Info, X } from '@lucide/svelte';
	import type { ToastConfig } from './types';

	let showToast = $state(false);
	let toastTitle = $state('');
	let toastParagraph: string | undefined = $state('');
	let timeoutId: number | undefined = $state(undefined);

	const defaultConfig: ToastConfig = {
		message: '',
		duration: 3000,
		type: 'default'
	};

	export function toast(title: string, config: ToastConfig = defaultConfig) {
		// Avoid re-triggering if the same toast is already visible
		if (showToast && toastTitle === title && toastParagraph === config.message) {
			return; // Prevent duplicate toasts
		}

		// Clear any existing timeout
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}

		// Set toast content
		toastTitle = title;
		toastParagraph = config.message;
		showToast = true;

		// Set new timeout
		timeoutId = setTimeout(() => {
			closeToast();
		}, config.duration || 3000);
	}

	function closeToast() {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
		showToast = false;
		toastTitle = '';
		toastParagraph = '';
	}
</script>

<article
	class={[
		'fixed bottom-8 right-8 z-[999] min-w-[320px] max-w-[400px]',
		'bg-background border border-border rounded-xl shadow-lg',
		'p-4 flex items-center gap-3',
		'transition-all duration-300 ease-out',
		'backdrop-blur-sm bg-background/95',
		showToast ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'
	]}
>
	<Info class="size-4 text-foreground" />

	<div class="flex-1 min-w-0">
		<h6 class="font-semibold text-sm leading-5 mb-1">{toastTitle}</h6>
		<p class="text-neutral-500 text-sm leading-5">{toastParagraph}</p>
	</div>

	<button
		class="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
		onclick={closeToast}
	>
		<X class="size-4" />
	</button>
</article>
