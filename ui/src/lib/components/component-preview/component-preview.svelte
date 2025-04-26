<script lang="ts">
	import { COMPONENT_LIST } from './component-list';
	import type { ComponentItem } from './types';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-javascript';
	import 'prism-svelte';

	interface ComponentPreviewProps {
		name: string;
	}

	const { name }: ComponentPreviewProps = $props();

	const componentData = $derived(
		COMPONENT_LIST.find((comp) => comp.name === name) as ComponentItem | undefined
	);

	const selectedComponent = $derived(componentData?.component);
	const codePromise = $derived(componentData?.code);

	let codeContent = $state('');
	$effect(() => {
		if (codePromise) {
			codePromise.then((rawCode) => {
				codeContent = Prism.highlight(rawCode.default, Prism.languages.svelte, 'svelte');
			});
		}
	});
</script>

<div class="component-preview border rounded-lg shadow-sm">
	{#if selectedComponent}
		<div class="p-4">
			{#await selectedComponent}
				<div class="p-4 text-gray-500 text-sm">Loading...</div>
			{:then module}
				<module.default />
			{:catch}
				<div class="p-4 text-red-500">Failed to load component</div>
			{/await}
		</div>
	{:else}
		<div class="p-4 text-gray-500">Component not found</div>
	{/if}

	{#if codePromise}
		<div class="p-4">
			<pre class=" text-white p-4 rounded-lg overflow-auto">
				<code class="language-svelte">{@html codeContent}</code>
			</pre>
		</div>
	{:else}
		<div class="p-4 text-gray-500">No code available</div>
	{/if}
</div>

<style>
	.component-preview {
		max-width: 800px;
		margin: 0 auto;
	}
</style>
