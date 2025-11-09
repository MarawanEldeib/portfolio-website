#!/usr/bin/env node

/**
 * AI-Powered Translation Script
 * Automatically translates en.json to de.json using OpenAI GPT-4
 * Preserves technical terms and maintains professional tone
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SOURCE_LANG = 'en';
const TARGET_LANG = 'de';

// Technical terms that should NOT be translated
const PRESERVE_TERMS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js',
  'Python', 'Java', 'C++', 'HTML', 'CSS', 'Tailwind',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker',
  'Git', 'GitHub', 'AWS', 'Azure', 'Google Cloud',
  'API', 'REST', 'GraphQL', 'SQL', 'NoSQL',
  'Machine Learning', 'AI', 'ML', 'Deep Learning',
  'Full-Stack', 'Frontend', 'Backend', 'DevOps',
  'CI/CD', 'Kubernetes', 'TensorFlow', 'PyTorch',
  'Express', 'Framer Motion', 'Lucide',
];

async function translateWithOpenAI(text, context = '') {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator specializing in German translations for developer portfolios. 
          
Rules:
1. Translate from English to German
2. Maintain professional, native-sounding German
3. PRESERVE these technical terms exactly: ${PRESERVE_TERMS.join(', ')}
4. Keep proper nouns, product names, and frameworks in English
5. Maintain the same tone and formality level
6. Return ONLY the translated text, no explanations
7. Preserve any placeholders like {variable} or {{variable}}
8. Keep HTML tags unchanged

Context: This is for a software engineer's portfolio website.`,
        },
        {
          role: 'user',
          content: `Translate this to German:\n\n${text}\n\nContext: ${context}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function translateObject(obj, keyPath = []) {
  const translated = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = [...keyPath, key];
    const context = currentPath.join(' > ');

    if (typeof value === 'string') {
      console.log(`Translating: ${context}`);
      try {
        translated[key] = await translateWithOpenAI(value, context);
        console.log(`  ✓ "${value}" → "${translated[key]}"`);
        
        // Rate limiting: wait 500ms between requests to avoid hitting API limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`  ✗ Error translating "${value}":`, error.message);
        translated[key] = value; // Keep original on error
      }
    } else if (typeof value === 'object' && value !== null) {
      translated[key] = await translateObject(value, currentPath);
    } else {
      translated[key] = value;
    }
  }

  return translated;
}

async function main() {
  try {
    console.log('🌍 AI-Powered Translation Script');
    console.log('================================\n');

    if (!OPENAI_API_KEY) {
      console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
      console.log('\n💡 To use this script:');
      console.log('1. Get an API key from https://platform.openai.com/api-keys');
      console.log('2. Add to .env.local: OPENAI_API_KEY=your_key_here');
      console.log('3. Run: npm run translate\n');
      process.exit(1);
    }

    // Read source file (en.json)
    const sourcePath = path.join(__dirname, '..', 'messages', `${SOURCE_LANG}.json`);
    const targetPath = path.join(__dirname, '..', 'messages', `${TARGET_LANG}.json`);

    console.log(`📖 Reading source file: ${sourcePath}`);
    const sourceContent = await fs.readFile(sourcePath, 'utf-8');
    const sourceData = JSON.parse(sourceContent);

    console.log(`\n🤖 Translating ${SOURCE_LANG} → ${TARGET_LANG} using OpenAI GPT-4...\n`);
    
    const translatedData = await translateObject(sourceData);

    console.log(`\n💾 Writing translations to: ${targetPath}`);
    await fs.writeFile(
      targetPath,
      JSON.stringify(translatedData, null, 2) + '\n',
      'utf-8'
    );

    console.log('\n✅ Translation complete!');
    console.log(`📝 Translated file saved to: messages/${TARGET_LANG}.json\n`);
  } catch (error) {
    console.error('\n❌ Translation failed:', error.message);
    process.exit(1);
  }
}

main();
