<script lang="ts">
	import { Check, Clipboard } from '@lucide/svelte';
	import { codeToHtml } from 'shiki';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

	type CodePreviewProps = {
		componentName: string;
	};

	let { componentName }: CodePreviewProps = $props();

	// Convert component name to kebab-case for directory path
	const kebabCase = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

	// Get all files in the component directory
	const componentFiles = import.meta.glob('/src/lib/components/*/*.{svelte,ts}', { as: 'raw' });

	// Filter files for this specific component (exclude usage.svelte)
	const relevantFiles = $derived(() => {
		const pattern = `/src/lib/components/${kebabCase}/`;
		return Object.keys(componentFiles)
			.filter(path => path.includes(pattern) && !path.includes('usage.svelte'))
			.map(path => ({
				name: path.split('/').pop() || '',
				path: path
			}));
	});

	const files = $derived(relevantFiles());

	let fileContents = $state<{ [key: string]: { raw: string; highlighted: string } }>({});
	let copySuccess = $state<{ [key: string]: boolean }>({});

	// Load all files
	$effect(() => {
		const loadFiles = async () => {
			const contents: { [key: string]: { raw: string; highlighted: string } } = {};

			for (const file of files) {
				try {
					const content = await componentFiles[file.path]();
					if (content) {
						const highlighted = await codeToHtml(content, {
							lang: file.name.endsWith('.ts') ? 'typescript' : 'svelte',
							themes: {
								dark: 'vitesse-black',
								light: 'vitesse-light'
							}
						});
						contents[file.name] = { raw: content, highlighted };
					}
				} catch (error) {
					console.error(`Failed to load ${file.path}:`, error);
				}
			}

			fileContents = contents;
		};

		if (files.length > 0) {
			loadFiles();
		}
	});

	function copyFileToClipboard(fileName: string) {
		const content = fileContents[fileName]?.raw;
		if (content) {
			navigator.clipboard
				.writeText(content)
				.then(() => {
					copySuccess[fileName] = true;
					setTimeout(() => {
						copySuccess[fileName] = false;
					}, 2000);
				})
				.catch((err) => {
					console.error('Failed to copy code: ', err);
				});
		}
	}
</script>

<div class="w-full">
	{#if files.length > 0}
		{#if files.length === 1}
			<!-- Single file component -->
			<div class="relative">
				<div class="absolute top-3 right-3 z-10">
					<button
						onclick={() => copyFileToClipboard(files[0].name)}
						class="flex items-center gap-1 p-2 text-xs rounded hover:bg-muted text-muted-foreground transition-colors bg-background/80 backdrop-blur"
					>
						{#if copySuccess[files[0].name]}
							<Check class="h-4 w-4 text-green-500" />
							Copied!
						{:else}
							<Clipboard class="h-4 w-4" />
							Copy
						{/if}
					</button>
				</div>
				<div class="border rounded-lg">
					<div class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[400px] [&_pre]:overflow-auto">
						{@html fileContents[files[0].name]?.highlighted}
					</div>
				</div>
			</div>
		{:else}
			<!-- Multi-file component with tabs -->
			<Tabs defaultValue={files[0]?.name}>
				<TabsList class="w-full overflow-x-auto">
					{#each files as file}
						<TabsTrigger value={file.name} class="whitespace-nowrap">{file.name}</TabsTrigger>
					{/each}
				</TabsList>
				
				{#each files as file}
					<TabsContent value={file.name} class="relative mt-4">
						<div class="absolute top-3 right-3 z-10">
							<button
								onclick={() => copyFileToClipboard(file.name)}
								class="flex items-center gap-1 p-2 text-xs rounded hover:bg-muted text-muted-foreground transition-colors bg-background/80 backdrop-blur"
							>
								{#if copySuccess[file.name]}
									<Check class="h-4 w-4 text-green-500" />
									Copied!
								{:else}
									<Clipboard class="h-4 w-4" />
									Copy
								{/if}
							</button>
						</div>
						<div class="border rounded-lg">
							<div class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[400px] [&_pre]:overflow-auto">
								{@html fileContents[file.name]?.highlighted}
							</div>
						</div>
					</TabsContent>
				{/each}
			</Tabs>
		{/if}
	{:else}
		<div class="p-4 text-gray-500 border rounded-lg">
			No component files found for "{componentName}"
		</div>
	{/if}
</div>
