<script lang="ts">
	import { Check, Clipboard } from '@lucide/svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

	interface InstallationSnippetsProps {
		packageName: string;
		isDevDependency?: boolean;
		hasBunVersion: boolean;
	}

	const {
		packageName,
		hasBunVersion,
		isDevDependency = false
	}: InstallationSnippetsProps = $props();

	const installationMap = {
		npm: `npm install ${isDevDependency ? '--save-dev ' : ''}${packageName}`,
		pnpm: `pnpm add ${isDevDependency ? '--save-dev ' : ''}${packageName}`,
		yarn: `yarn add ${isDevDependency ? '--dev ' : ''}${packageName}`,
		...(hasBunVersion && { bun: `bun add ${isDevDependency ? '--dev ' : ''}${packageName}` })
	};

	let copySuccess = $state(false);
	let selectedCommand = $state(installationMap.npm);

	function copyCodeToClipboard(code: string) {
		if (code) {
			navigator.clipboard
				.writeText(code)
				.then(() => {
					showCopySuccess();
				})
				.catch((err) => {
					console.error('Failed to copy code: ', err);
				});
		}
	}

	function showCopySuccess() {
		copySuccess = true;
		setTimeout(() => {
			copySuccess = false;
		}, 2000);
	}
</script>

<div class="w-full">
	<Tabs defaultValue="npm">
		<TabsList>
			<TabsTrigger value="npm" onClick={() => (selectedCommand = installationMap.npm)}
				><code>npm</code></TabsTrigger
			>
			<TabsTrigger value="pnpm" onClick={() => (selectedCommand = installationMap.pnpm)}
				><code>pnpm</code></TabsTrigger
			>
			<TabsTrigger value="yarn" onClick={() => (selectedCommand = installationMap.yarn)}
				><code>yarn</code></TabsTrigger
			>
			{#if installationMap.bun}
				<TabsTrigger value="bun" onClick={() => (selectedCommand = installationMap.bun as string)}
					><code>bun</code></TabsTrigger
				>
			{/if}
		</TabsList>
		<div class="my-5 relative">
			<div class="absolute top-5 right-5 z-10">
				<button
					onclick={() => copyCodeToClipboard(selectedCommand)}
					class="flex items-center gap-1 p-2 text-xs rounded hover:bg-muted text-muted-foreground transition-colors"
				>
					{#if copySuccess}
						<Check class="h-4 w-4 text-green-500" />
						Copied {selectedCommand}!
					{:else}
						<Clipboard class="h-4 w-4" />
					{/if}
				</button>
			</div>
			<TabsContent
				value="npm"
				class="flex justify-start px-4 py-2 items-center min-h-[60px] border rounded-lg"
			>
				<pre class="text-sm">{installationMap.npm}</pre>
			</TabsContent>
			<TabsContent
				value="pnpm"
				class="flex justify-start px-4 py-2 items-center min-h-[60px] border rounded-lg"
			>
				<pre class="text-sm">{installationMap.pnpm}</pre>
			</TabsContent>
			<TabsContent
				value="yarn"
				class="flex justify-start px-4 py-2 items-center min-h-[60px] border rounded-lg"
			>
				<pre class="text-sm">{installationMap.yarn}</pre>
			</TabsContent>
			{#if installationMap.bun}
				<TabsContent
					value="bun"
					class="flex justify-start px-4 py-2 items-center min-h-[60px] border rounded-lg"
				>
					<pre class="text-sm">{installationMap.bun}</pre>
				</TabsContent>
			{/if}
		</div>
	</Tabs>
</div>
