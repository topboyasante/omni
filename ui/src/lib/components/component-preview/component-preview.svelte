<script lang="ts">
	import { COMPONENT_LIST } from './component-list';
	import type { ComponentItem } from './types';
	import { codeToHtml } from 'shiki';
	import Tabs from '../tabs/tabs.svelte';
	import TabsList from '../tabs/tabs-list.svelte';
	import TabsTrigger from '../tabs/tabs-trigger.svelte';
	import TabsContent from '../tabs/tabs-content.svelte';

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
			codePromise.then(async (rawCode) => {
				codeContent = await codeToHtml(rawCode.default, { lang: 'svelte', theme: 'vitesse-black' });
			});
		}
	});
</script>

<div class="w-full">
	<Tabs defaultValue="preview">
		<TabsList>
			<TabsTrigger value="preview">
				<div>
					<p>Preview</p>
				</div>
			</TabsTrigger>
			<TabsTrigger value="code">
				<div>
					<p>Code</p>
				</div>
			</TabsTrigger>
		</TabsList>
		<div class="border rounded-lg my-5">
			<TabsContent value="preview" class="flex justify-center items-center min-h-[250px]">
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
			<TabsContent value="code">
				{#if codePromise}
					<div class="p-4">
						<!-- Render the Shiki-highlighted HTML directly -->
						<div class="rounded-lg overflow-auto">{@html codeContent}</div>
					</div>
				{:else}
					<div class="p-4 text-gray-500">No code available</div>
				{/if}
			</TabsContent>
		</div>
	</Tabs>
</div>
