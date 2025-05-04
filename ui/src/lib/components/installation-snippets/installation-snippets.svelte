<script lang="ts">
	import { Check, Clipboard } from '@lucide/svelte';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';
	import { pref } from '$lib/utils/local-storage';
	import type { PackageManager } from './types';

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
	const config = pref.get('@omni/config');

	let copySuccess = $state(false);
	let selectedCommand = $state(config?.packageManager);

	function copyCodeToClipboard(packageManager: PackageManager) {
		const command = installationMap[packageManager];
		if (command) {
			navigator.clipboard
				.writeText(command)
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

	function toggleCommand(command: keyof typeof installationMap) {
		selectedCommand = command;
		pref.set('@omni/config', {
			packageManager: command
		});
	}
</script>

<div class="w-full">
	<Tabs defaultValue={selectedCommand as PackageManager}>
		<TabsList>
			<TabsTrigger value="npm" onClick={() => toggleCommand('npm')}><code>npm</code></TabsTrigger>
			<TabsTrigger value="pnpm" onClick={() => toggleCommand('pnpm')}><code>pnpm</code></TabsTrigger
			>
			<TabsTrigger value="yarn" onClick={() => toggleCommand('yarn')}><code>yarn</code></TabsTrigger
			>
			{#if installationMap.bun}
				<TabsTrigger value="bun" onClick={() => toggleCommand('bun')}><code>bun</code></TabsTrigger>
			{/if}
		</TabsList>
		<div class="my-5 relative">
			<div class="absolute top-5 right-5 z-10">
				<button
					onclick={() => copyCodeToClipboard(selectedCommand as PackageManager)}
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
