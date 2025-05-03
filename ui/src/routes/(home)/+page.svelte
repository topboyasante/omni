<script>
	import AccordionContent from '$lib/components/acccordion/accordion-content.svelte';
	import AccordionItem from '$lib/components/acccordion/accordion-item.svelte';
	import AccordionTrigger from '$lib/components/acccordion/accordion-trigger.svelte';
	import Accordion from '$lib/components/acccordion/accordion.svelte';
	import Button from '$lib/components/button/button.svelte';
</script>

<div class="py-10 px-5 border-x border-dashed min-h-screen">
	<section class="mb-16">
		<h1 class="text-primary text-3xl font-extrabold leading-tight">Omni</h1>
		<p class="text-muted-foreground mb-10 text-base">
			Elegant, user-friendly, dependency-free (90% of the time, I swear) UI components and blocks
			for your SvelteKit projects. Easily integrate into your applications. Open source and free for
			all.
		</p>

		<div>
			<a href="/docs/introduction"> <Button>Get Started</Button></a>
		</div>
	</section>
	<section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<Accordion type="single" collapsible class="w-full">
			<AccordionItem value="item-1">
				<AccordionTrigger>Is it accessible?</AccordionTrigger>
				<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Is it styled?</AccordionTrigger>
				<AccordionContent>
					Yes. It comes with default styles that matches the other components&apos; aesthetic.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Is it animated?</AccordionTrigger>
				<AccordionContent>
					Yes. It's animated by default, but you can disable it if you prefer.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	</section>
</div>
