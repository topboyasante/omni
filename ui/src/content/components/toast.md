<script>
 import ComponentPreview from '$lib/components/component-preview/component-preview.svelte';
 import InstallationSnippets from '$lib/components/installation-snippets/installation-snippets.svelte';
</script>

# Toast

A customizable toast component for your SvelteKit app.

<br/>

<ComponentPreview name="Toast" />

## Setting Up

This component is standalone and does not require additional dependencies. You can directly copy and use it in your project.

<br/>

Copy the `<Toast/>` component:

```ts
<script lang="ts">
    const showToast = $state(false)
</script>

<article class={ showToast ? "fixed bottom-8 min-w-[300px] transition-all translate-y-0 right-8 bg-black z-[999] p-2 border rounded-md flex flex-col": "translate-y-[300%]"}>
    <h6>This is a toast title</h6>
    <p>paragraph</p>
</article>
```

## Usage Example

Here’s how you can use the `<Toast/>` component in your project:

```ts
<script>
 import Toast from './toast.svelte';
</script>

<Toast/>
```
