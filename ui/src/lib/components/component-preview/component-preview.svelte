<script lang="ts">
	import { Check, Clipboard } from '@lucide/svelte';
	import { codeToHtml } from 'shiki';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';
	import { COMPONENT_LIST } from './component-list';
	import type { ComponentItem } from './types';

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
	let rawCodeText = $state('');
	$effect(() => {
		if (codePromise) {
			codePromise.then(async (rawCode) => {
				rawCodeText = rawCode.default;
				codeContent = await codeToHtml(rawCode.default, {
					lang: 'svelte',
					themes: {
						dark: 'vitesse-black',
						light: 'vitesse-light'
					}
				});
			});
		}
	});

	function copyCodeToClipboard() {
		if (rawCodeText) {
			navigator.clipboard
				.writeText(rawCodeText)
				.then(() => {
					showCopySuccess();
				})
				.catch((err) => {
					console.error('Failed to copy code: ', err);
				});
		}
	}

	let copySuccess = $state(false);
	function showCopySuccess() {
		copySuccess = true;
		setTimeout(() => {
			copySuccess = false;
		}, 2000);
	}
</script>

<div class="w-full">
	<Tabs defaultValue="preview">
		<TabsList>
			<TabsTrigger value="preview">Preview</TabsTrigger>
			<TabsTrigger value="code">Code</TabsTrigger>
		</TabsList>
		<div class="my-5 relative">
			{#if codePromise}
				<div class="absolute top-5 right-5 z-10">
					<button
						onclick={copyCodeToClipboard}
						class="flex items-center gap-1 p-2 text-xs rounded hover:bg-muted text-muted-foreground transition-colors"
					>
						{#if copySuccess}
							<Check class="h-4 w-4 text-green-500" />
							Copied!
						{:else}
							<Clipboard class="h-4 w-4" />
						{/if}
					</button>
				</div>
			{/if}

			<TabsContent
				value="preview"
				class="flex justify-center items-center min-h-[280px] border rounded-lg"
			>
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
			</TabsContent>
			<TabsContent value="code" class="border rounded-lg">
				{#if codePromise}
					<div class="rounded-lg">
						<div class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
							{@html codeContent}
						</div>
					</div>
				{:else}
					<div class="p-4 text-gray-500">No code available</div>
				{/if}
			</TabsContent>
		</div>
	</Tabs>
</div>
