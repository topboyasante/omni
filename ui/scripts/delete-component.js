#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
  console.error('Usage: npm run delete-component <ComponentName>');
  process.exit(1);
}

// Convert to kebab-case for directory/file names
const kebabCase = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// Define paths
const componentDir = path.join(__dirname, '../src/lib/components', kebabCase);
const componentListPath = path.join(__dirname, '../src/lib/components/component-preview/component-list.ts');
const docsRoutesPath = path.join(__dirname, '../src/lib/layouts/routes.ts');
const markdownPath = path.join(__dirname, '../src/content/components', `${kebabCase}.md`);

// Check what exists
const filesToDelete = [];
const registrationsToRemove = [];

if (fs.existsSync(componentDir)) {
  const files = fs.readdirSync(componentDir);
  filesToDelete.push(`📁 Component directory: src/lib/components/${kebabCase}/`);
  files.forEach(file => {
    filesToDelete.push(`   - ${file}`);
  });
}

if (fs.existsSync(markdownPath)) {
  filesToDelete.push(`📄 Documentation: src/content/components/${kebabCase}.md`);
}

// Check component list
const componentListContent = fs.readFileSync(componentListPath, 'utf-8');
if (componentListContent.includes(`name: '${componentName}'`) || componentListContent.includes(`'../${kebabCase}/`)) {
  registrationsToRemove.push('🗂️ Component list registration');
}

// Check docs routes
const docsRoutesContent = fs.readFileSync(docsRoutesPath, 'utf-8');
if (docsRoutesContent.includes(`title: '${componentName}'`) || docsRoutesContent.includes(`/docs/components/${kebabCase}`)) {
  registrationsToRemove.push('🗺️ Documentation routes');
}

// Check if component exists
if (filesToDelete.length === 0 && registrationsToRemove.length === 0) {
  console.log(`❌ Component "${componentName}" not found.`);
  process.exit(1);
}

// Show what will be deleted
console.log(`\n🗑️  Component "${componentName}" will be deleted:\n`);

if (filesToDelete.length > 0) {
  console.log('📋 Files to delete:');
  filesToDelete.forEach(file => console.log(file));
  console.log('');
}

if (registrationsToRemove.length > 0) {
  console.log('🔗 Registrations to remove:');
  registrationsToRemove.forEach(reg => console.log(reg));
  console.log('');
}

// Confirmation
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('⚠️  Are you sure you want to delete this component? (yes/no): ', (answer) => {
  if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
    console.log('❌ Deletion cancelled.');
    rl.close();
    process.exit(0);
  }

  // Perform deletion
  try {
    // Remove from component list
    if (componentListContent.includes(`name: '${componentName}'`) || componentListContent.includes(`'../${kebabCase}/`)) {
      const updatedComponentList = componentListContent.replace(
        new RegExp(`\\s*{[^}]*name:\\s*'${componentName}'[^}]*},?\\s*`, 'g'),
        ''
      ).replace(
        new RegExp(`\\s*{[^}]*'\\.\\./${kebabCase}/[^}]*},?\\s*`, 'g'),
        ''
      );
      fs.writeFileSync(componentListPath, updatedComponentList);
      console.log('✅ Removed from component list');
    }

    // Remove from docs routes
    if (docsRoutesContent.includes(`title: '${componentName}'`) || docsRoutesContent.includes(`/docs/components/${kebabCase}`)) {
      const updatedDocsRoutes = docsRoutesContent.replace(
        new RegExp(`\\s*{\\s*title:\\s*'${componentName}',\\s*href:\\s*'[^']*'\\s*},?\\s*`, 'g'),
        ''
      ).replace(
        // Handle trailing comma issues
        /,(\s*\]\s*)/g,
        '$1'
      );
      fs.writeFileSync(docsRoutesPath, updatedDocsRoutes);
      console.log('✅ Removed from docs routes');
    }

    // Delete component directory
    if (fs.existsSync(componentDir)) {
      fs.rmSync(componentDir, { recursive: true, force: true });
      console.log('✅ Deleted component directory');
    }

    // Delete markdown file
    if (fs.existsSync(markdownPath)) {
      fs.unlinkSync(markdownPath);
      console.log('✅ Deleted documentation file');
    }

    console.log(`\n🎉 Component "${componentName}" successfully deleted!`);

  } catch (error) {
    console.error('❌ Error during deletion:', error.message);
    process.exit(1);
  }

  rl.close();
});