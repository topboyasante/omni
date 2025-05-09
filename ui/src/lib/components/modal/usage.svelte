<script>
	import Button from '$lib/components/button/button.svelte';
	import Modal from '$lib/components/modal/modal.svelte';

	let isOpen = $state(false);
</script>

<div class="flex justify-center items-center">
	<Button
		onclick={() => {
			isOpen = true;
		}}>Click this modal</Button
	>
	<Modal {isOpen} onClose={() => (isOpen = false)} title="Confirm Action">
		<div>
			<p>Are you sure you want to proceed with this action?</p>
		</div>
		<div class="flex justify-end gap-2 items-center">
			<Button
				size="sm"
				variant="outline"
				onclick={() => {
					isOpen = false;
				}}>Cancel</Button
			>
			<Button
				size="sm"
				onclick={() => {
					isOpen = false;
				}}>Confirm</Button
			>
		</div>
	</Modal>
</div>
