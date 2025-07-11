<script lang="ts">
	import Progress from './progress.svelte';
	import { onMount } from 'svelte';

	let progress1 = $state(0);
	let progress2 = $state(0);
	let progress3 = $state(0);
	let progress4 = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			progress1 = (progress1 + Math.random() * 15) % 100;
			progress2 = (progress2 + Math.random() * 20) % 100;
			progress3 = (progress3 + Math.random() * 10) % 100;
			progress4 = (progress4 + Math.random() * 25) % 100;
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="space-y-6 p-6">
	<div class="space-y-2">
		<h3 class="text-sm font-medium">Basic animated progress</h3>
		<Progress progress={progress1} />
		<p class="text-xs text-gray-600">Progress: {progress1.toFixed(1)}%</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-sm font-medium">Faster animation</h3>
		<Progress progress={progress2} animationDuration="0.3s" />
		<p class="text-xs text-gray-600">Progress: {progress2.toFixed(1)}%</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-sm font-medium">With pulse effect</h3>
		<Progress progress={progress3} showPulse={true} />
		<p class="text-xs text-gray-600">Progress: {progress3.toFixed(1)}%</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-sm font-medium">No animations</h3>
		<Progress progress={progress4} animated={false} />
		<p class="text-xs text-gray-600">Progress: {progress4.toFixed(1)}%</p>
	</div>
</div>
