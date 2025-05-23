<script lang="ts" module>
	import Button from '../button/button.svelte';
	import { toast } from './toast.svelte';
</script>

<Button onclick={() => toast('this is a toast')}>Show toast</Button>
