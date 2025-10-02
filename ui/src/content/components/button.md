<script>
 import ComponentPreview from '$lib/components/component-preview/component-preview.svelte';
 import CodePreview from '$lib/components/code-preview/code-preview.svelte';
 import InstallationSnippets from '$lib/components/installation-snippets/installation-snippets.svelte';
</script>

# Button

A customizable button component for your SvelteKit app.

<br/>

<ComponentPreview name="Button"/>

## Getting Started

This component is standalone and does not require additional dependencies. Copy the file below to your project:

<CodePreview componentName="Button" />

## Usage Example

Here’s how you can use the `<Button/>` component in your project:

```ts
<script>
 import Button from './button.svelte';
</script>

<Button variant="primary" size="md">Primary Button</Button>
<Button variant="secondary" size="sm">Secondary Button</Button>
<Button variant="outline" size="lg" disabled>Disabled Button</Button>
```

## Fancy

Want some fancier looks for your buttons? I recently came across these:

- [Tailark Button Snippets](https://tailark.com/snippets/button)
