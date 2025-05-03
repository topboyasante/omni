<script>
 import ComponentPreview from '$lib/components/component-preview/component-preview.svelte';
 import InstallationSnippets from '$lib/components/installation-snippets/installation-snippets.svelte';
</script>

# Theme Toggle

Toggle between light and dark themes in your SvelteKit app.

<br/>

<ComponentPreview name="Theme Toggle"/>

## Setting Up

This component relies on the [`mode-watcher`](https://www.npmjs.com/package/mode-watcher) package. We need to install that:
<InstallationSnippets
 packageName="mode-watcher"
 hasBunVersion=true
  />

Import the `<ModeWatcher/>` component into your `+layout.svelte` file:

```ts
<script lang="ts">
 import '../app.css';
 import { ModeWatcher } from 'mode-watcher';

 let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
```

<br/>

Copy the `<ThemeToggle/>` component:

```ts
<script lang="ts" module>
 import { cn } from '$lib/utils/cn';
 import { Monitor, Moon, Sun } from '@lucide/svelte';
 import { setMode } from 'mode-watcher';

 // Theme options definition
 const THEMES = [
  {
   type: 'system',
   icon: Monitor,
   label: 'system theme'
  },
  {
   type: 'light',
   icon: Sun,
   label: 'light theme'
  },
  {
   type: 'dark',
   icon: Moon,
   label: 'dark theme'
  }
 ] as const;

 // This state value holds the current theme mode. The default theme is your system theme.
 let currentTheme = $state('system');

 // This function sets the mode to the specified value and updates the current theme.
 function switchTheme(mode: 'light' | 'dark' | 'system') {
  currentTheme = mode;
  setMode(mode);
 }
</script>

<div class="relative isolate inline-flex h-8 items-center rounded-full border px-1">
 {#each THEMES as { type, icon: Icon, label }}
  {@const isActive = currentTheme === type}
  <button
   onclick={() => switchTheme(type)}
   aria-label={`Switch to ${label}`}
   class="group relative size-6 rounded-full transition duration-200 ease-out"
   title={`Switch to ${label}`}
   type="button"
  >
   {#if isActive}
    <div class="-z-1 absolute inset-0 rounded-full bg-muted"></div>
   {/if}
   <Icon
    class={cn(
     'relative m-auto size-3.5',
     'transition duration-200 ease-out',
     isActive
      ? 'text-foreground'
      : 'text-secondary-foreground group-hover:text-foreground group-focus-visible:text-foreground'
    )}
   />
  </button>
 {/each}
</div>

```
