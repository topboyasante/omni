<script>
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '.';
</script>

<div class="w-full">
	<Tabs defaultValue="details" class="w-full">
		<TabsList class="bg-background border-border">
			<TabsTrigger
				value="details"
				class="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
				>Details</TabsTrigger
			>
			<TabsTrigger
				value="settings"
				class="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
				>Settings</TabsTrigger
			>
		</TabsList>
		<TabsContent value="details">
			<div class="p-4 bg-card text-card-foreground rounded-md">
				<h3 class="text-lg font-bold mb-2 tracking-tight">Product Details</h3>
				<p class="text-muted-foreground">
					This premium widget features advanced capabilities and a sleek design. Perfect for both
					personal and professional use.
				</p>
				<ul class="mt-2 list-disc pl-5 text-muted-foreground">
					<li>High-quality materials</li>
					<li>Energy efficient</li>
					<li>2-year warranty</li>
				</ul>
			</div>
		</TabsContent>
		<TabsContent value="settings">
			<div class="p-4 bg-card text-card-foreground rounded-md">
				<h3 class="text-lg font-medium mb-2 tracking-tight">Product Settings</h3>
				<p class="text-muted-foreground">
					Customize your widget settings to suit your preferences and needs. Adjust the features for
					optimum performance.
				</p>
				<ul class="mt-2 list-disc pl-5 text-muted-foreground">
					<li>Enable or disable specific functionalities</li>
					<li>Adjust performance settings</li>
					<li>Reset to factory defaults</li>
				</ul>
			</div>
		</TabsContent>
	</Tabs>
</div>
