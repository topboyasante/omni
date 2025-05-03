<script>
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '.';
</script>

<Tabs defaultValue="details">
	<TabsList>
		<TabsTrigger value="details">Details</TabsTrigger>
		<TabsTrigger value="settings">Settings</TabsTrigger>
	</TabsList>
	<TabsContent value="details">
		<div class="p-4 bg-gray-100 rounded-md">
			<h3 class="text-lg font-medium mb-2">Product Details</h3>
			<p>
				This premium widget features advanced capabilities and a sleek design. Perfect for both
				personal and professional use.
			</p>
			<ul class="mt-2 list-disc pl-5">
				<li>High-quality materials</li>
				<li>Energy efficient</li>
				<li>2-year warranty</li>
			</ul>
		</div>
	</TabsContent>
	<TabsContent value="settings">
		<div class="p-4 bg-gray-100 rounded-md">
			<h3 class="text-lg font-medium mb-2">Product Settings</h3>
			<p>
				Customize your widget settings to suit your preferences and needs. Adjust the features for
				optimum performance.
			</p>
			<ul class="mt-2 list-disc pl-5">
				<li>Enable or disable specific functionalities</li>
				<li>Adjust performance settings</li>
				<li>Reset to factory defaults</li>
			</ul>
		</div>
	</TabsContent>
</Tabs>
