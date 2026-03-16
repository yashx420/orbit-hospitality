/**
 * Migration script: Seed existing properties from projects.ts into Sanity.
 *
 * Usage:
 *   node migrate.mjs
 *
 * This script:
 *   1. Reads property data from the hardcoded projects array
 *   2. Uploads every local image to Sanity's asset CDN
 *   3. Creates property documents matching the Sanity schema
 */

import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')

const client = createClient({
  projectId: '78cxu1v9',
  dataset: 'property',
  token: process.env.SANITY_TOKEN, // needs write access
  useCdn: false,
  apiVersion: '2024-01-01',
})

// ── The data (copied from projects.ts) ───────────────────────────────
// We dynamically import from a temporary .mjs copy so we can run in Node
async function loadProjects() {
  // Read the TS source, strip the export keyword, wrap in a default export
  const tsSource = fs.readFileSync(
    path.resolve(__dirname, '..', 'src', 'data', 'projects.ts'),
    'utf-8',
  )
  const jsSource =
    tsSource.replace('export const projects', 'const projects') + '\nexport default projects;\n'
  const tmpFile = path.resolve(__dirname, '_projects_tmp.mjs')
  fs.writeFileSync(tmpFile, jsSource)
  const mod = await import('file:///' + tmpFile.replace(/\\/g, '/'))
  fs.unlinkSync(tmpFile)
  return mod.default
}

// ── Upload a single image file to Sanity CDN ─────────────────────────
async function uploadImage(imagePath) {
  const absPath = path.join(PUBLIC_DIR, imagePath)
  if (!fs.existsSync(absPath)) {
    console.warn(`  ⚠ Image not found, skipping: ${absPath}`)
    return null
  }
  const ext = path.extname(absPath).replace('.', '')
  const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`
  const stream = fs.createReadStream(absPath)
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(absPath),
    contentType,
  })
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
  }
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  const projects = await loadProjects()
  console.log(`\n🏨 Found ${projects.length} properties to migrate\n`)

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    console.log(`[${i + 1}/${projects.length}] Migrating "${p.title}"...`)

    // Upload hero image
    console.log('  📸 Uploading hero image...')
    const heroImage = await uploadImage(p.heroImage)

    // Upload gallery images (sequentially to avoid rate limits)
    console.log(`  🖼  Uploading ${p.images.length} gallery images...`)
    const images = []
    for (const img of p.images) {
      const uploaded = await uploadImage(img)
      if (uploaded) {
        images.push({...uploaded, _key: Math.random().toString(36).slice(2, 10)})
      }
    }

    // Create the document
    const doc = {
      _type: 'property',
      title: p.title,
      slug: {_type: 'slug', current: p.id},
      category: p.category,
      location: p.location,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      description: p.description,
      amenities: p.amenities,
      heroImage,
      images,
    }

    await client.create(doc)
    console.log(`  ✅ Created "${p.title}"\n`)
  }

  console.log('🎉 Migration complete! All properties have been seeded.\n')
}

main().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
