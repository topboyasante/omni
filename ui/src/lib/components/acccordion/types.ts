export type AccordionData = {
	type: 'single' | 'multiple';
	collapsible: boolean;
	openValues: Set<string>;
	toggleValue: (value: string) => void;
};

export type AccordionItemData = {
	value: string;
};
