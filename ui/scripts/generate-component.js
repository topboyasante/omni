#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
  console.error('Usage: npm run generate-component <ComponentName> [description]');
  process.exit(1);
}

const description = process.argv[3] || `A customizable ${componentName.toLowerCase()} component.`;

const kebabCase = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const componentDir = path.join(__dirname, '../src/lib/components', kebabCase);

// Create component directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Create empty component file
fs.writeFileSync(path.join(componentDir, `${kebabCase}.svelte`), '');

// Create empty usage file
fs.writeFileSync(path.join(componentDir, 'usage.svelte'), '');

// Update component list
const componentListPath = path.join(__dirname, '../src/lib/components/component-preview/component-list.ts');
const componentListContent = fs.readFileSync(componentListPath, 'utf-8');

const newEntry = `	{
		name: '${componentName}',
		description: '${description}',
		component: import('../${kebabCase}/usage.svelte'),
		code: import('../${kebabCase}/usage.svelte?raw')
	},`;

// Insert before the closing bracket
const updatedContent = componentListContent.replace(
	/(\]\s*as\s*const;)$/m,
	`${newEntry}
$1`
);

fs.writeFileSync(componentListPath, updatedContent);

// Update docs routes
const docsRoutesPath = path.join(__dirname, '../src/lib/layouts/routes.ts');
const docsRoutesContent = fs.readFileSync(docsRoutesPath, 'utf-8');

const newRouteEntry = `			{ title: '${componentName}', href: '/docs/components/${kebabCase}' },`;

// Insert before the closing bracket of the Components section
const updatedRoutesContent = docsRoutesContent.replace(
	/({\s*title:\s*'Label'[^}]*},?)\s*(\]\s*})/m,
	`$1
${newRouteEntry}
		$2`
);

fs.writeFileSync(docsRoutesPath, updatedRoutesContent);

console.log(`✅ Component "${componentName}" scaffolded successfully!`);
console.log(`📁 Location: src/lib/components/${kebabCase}/`);
console.log(`📝 Empty files created:`);
console.log(`   - ${kebabCase}.svelte`);
console.log(`   - usage.svelte`);
console.log(`📋 Component list updated automatically`);
console.log(`🗺️ Docs routes updated automatically`);
console.log(`\n🚀 Ready for you to add your component code!`);