<script>
 import ComponentPreview from '$lib/components/component-preview/component-preview.svelte';
 import InstallationSnippets from '$lib/components/installation-snippets/installation-snippets.svelte';
</script>

# Tabs

A versatile and customizable Tab component for your SvelteKit application.

<br/>

<ComponentPreview name="Tabs"/>

## Getting Started

This component is self-contained and does not require any external dependencies. You can easily integrate it into your project by copying the provided code.

<br/>

### Tabs Component

Copy and use the `<Tabs/>` component:

```ts
<script lang="ts" module>
    export const getTabContext = () => getContext<() => TabData>('tabs');
</script>

<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import { getContext, setContext, type Snippet } from 'svelte';
    import type { TabData } from './types';

    type TabProps = {
        defaultValue: string;
        children: Snippet;
        class?: string;
    };

    const { defaultValue, children, class: className }: TabProps = $props();

    let tabData = $state({
        defaultValue,
        currentValue: defaultValue
    });

    function handleTabChange(tab: string) {
        tabData.currentValue = tab;
    }

    setContext('tabs', () => ({
        defaultValue: tabData.defaultValue,
        currentValue: tabData.currentValue,
        onChange: handleTabChange
    }));
</script>

<div class={cn('flex flex-col', className)} role="tablist">
    {@render children()}
</div>
```

<br/>

### TabsList Component

Copy and use the `<TabsList/>` component:

```ts
<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import type { Snippet } from 'svelte';

    type TabProps = {
        children: Snippet;
        class?: string;
    };

    const { children, class: className }: TabProps = $props();
</script>

<div
    class={cn(
        'flex h-auto items-center justify-start text-muted-foreground border-b',
        className
    )}
    role="tablist"
>
    {@render children()}
</div>
```

<br/>

### TabsTrigger Component

Copy and use the `<TabsTrigger/>` component:

```ts
<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import type { Snippet } from 'svelte';
    import { getTabContext } from './tabs.svelte';

    type TabProps = {
        value: string;
        children: Snippet;
        class?: string;
        onClick?: () => void;
    };

    const { value, children, class: className, onClick }: TabProps = $props();

    const { currentValue, onChange } = $derived(getTabContext()());

    let isActive = $derived(currentValue === value);
</script>

<button
    class={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all',
        isActive ? 'border-b-[1.5px] border-primary text-primary' : 'hover:text-primary/80',
        className
    )}
    role="tab"
    aria-selected={isActive}
    onclick={() => {
        onChange(value);

        // Perform additional actions after switching tabs, if needed
        if (onClick) {
            onClick();
        }
    }}
>
    {@render children()}
</button>
```

<br/>

### TabsContent Component

Copy and use the `<TabsContent/>` component:

```ts
<script lang="ts">
    import { cn } from '$lib/utils/cn';
    import type { Snippet } from 'svelte';
    import { getTabContext } from './tabs.svelte';

    type TabProps = {
        value: string;
        children: Snippet;
        class?: string;
    };

    const { value, children, class: className }: TabProps = $props();

    const { currentValue } = $derived(getTabContext()());

    let isActive = $derived(currentValue === value);
</script>

{#if isActive}
    <div
        class={cn(
            'tabs-content',
            'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className
        )}
        role="tabpanel"
    >
        {@render children()}
    </div>
{/if}
```

<br/>

### Types Definition

Copy the `types.ts` file to define the tab context:

```ts
export type TabData = {
    defaultValue: string;
    currentValue: string;
    onChange: (tab: string) => void;
};
```

<br/>

### Simplified Imports

Use an `index.ts` file to streamline your imports:

```ts
import List from './tabs-list.svelte';
import Trigger from './tabs-trigger.svelte';
import Root from './tabs.svelte';
import Content from './tabs-content.svelte';

export { Root as Tabs, List as TabsList, Trigger as TabsTrigger, Content as TabsContent };
```
