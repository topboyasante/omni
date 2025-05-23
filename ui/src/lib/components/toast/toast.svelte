<script lang="ts" module>
	import { Info, X } from '@lucide/svelte';
	import type { ToastConfig } from './types';

	let showToast = $state(false);
	let toastTitle = $state('');
	let toastParagraph: string | undefined = $state('');

	const defaultConfig: ToastConfig = {
		message: '',
		duration: 3000,
		type: 'default'
	};

	export function toast(title: string, config: ToastConfig = defaultConfig) {
		toastTitle = title;
		toastParagraph = config.message;
		showToast = true;
		setTimeout(() => {
			showToast = false;
			toastTitle = '';
			toastParagraph = '';
		}, config.duration || 3000);
	}
</script>

<article
	class={[
		'fixed bottom-8 right-8 z-[999] min-w-[320px] max-w-[400px]',
		'bg-white border border-gray-200 rounded-xl shadow-lg',
		'p-4 flex items-center gap-3',
		'transition-all duration-300 ease-out',
		'backdrop-blur-sm bg-white/95',
		showToast ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'
	]}
>
	<!-- Icon/Status indicator -->
	<Info class="size-4" />

	<!-- Content -->
	<div class="flex-1 min-w-0">
		<h6 class="font-semibold text-gray-900 text-sm leading-5 mb-1">{toastTitle}</h6>
		<p class="text-gray-600 text-sm leading-5">{toastParagraph}</p>
	</div>

	<!-- Close button -->
	<button
		class="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
		onclick={() => {
			showToast = false;
			toastTitle = '';
			toastParagraph = '';
		}}
	>
		<X class="size-4" />
	</button>
</article>
