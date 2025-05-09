<script>
 import ComponentPreview from '$lib/components/component-preview/component-preview.svelte';
 import InstallationSnippets from '$lib/components/installation-snippets/installation-snippets.svelte';
</script>

# Modal

A versatile modal component for your SvelteKit app, perfect for displaying dialogs, forms, or additional content.

<br/>

<ComponentPreview name="Modal"/>

## Setting Up

This component is standalone and does not require additional dependencies. You can directly copy and use it in your project.

<br/>

Copy the `<Modal/>` component:

```ts
<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '../button/button.svelte';

	type ModalProps = {
		isOpen: boolean;
		onClose: () => void;
		onLoadData?: () => void;
		title?: string;
		children: Snippet;
		class?: string;
	};

	let {
		isOpen = $bindable(),
		onClose,
		onLoadData,
		children,
		title,
		class: className = ''
	}: ModalProps = $props();

	let dialog = $state<HTMLDialogElement | undefined>();

	function handleBackdropClick(event: MouseEvent): void {
		if (event.target === dialog) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && isOpen) {
			onClose();
		}
	}

	$effect(() => {
		if (dialog) {
			if (isOpen) {
				dialog.showModal();
			} else {
				dialog.close();
			}
		}
	});

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<dialog
	bind:this={dialog}
	onclick={handleBackdropClick}
	class="p-2 bg-transparent max-w-md w-full {className}"
>
	<div class="bg-white p-5 rounded-md" in:fade={{ duration: 75 }} out:fade={{ duration: 75 }}>
		<div class="flex justify-between mb-1">
			<h4>{title}</h4>
			<Button
				onclick={onClose}
				variant="outline"
				size="icon"
				aria-label="Close dialog"
				class="size-6"
			>
				<X />
			</Button>
		</div>
		{@render children()}
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
		animation: backdrop-fade-in 0.3s ease forwards;
	}

	dialog:not([open])::backdrop {
		animation: backdrop-fade-out 0.3s ease forwards;
	}

	@keyframes backdrop-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.5;
		}
	}

	@keyframes backdrop-fade-out {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 0;
		}
	}
</style>
```
