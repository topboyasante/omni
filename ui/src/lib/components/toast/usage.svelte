<script lang="ts" module>
	import Button from '../button/button.svelte';
	import {toast} from './toast.svelte'
</script>

<Button onclick={() => toast({title: "This is a toast title"})}>Show toast</Button>
