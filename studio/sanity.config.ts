import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Orbit Hospitality',

  projectId: '78cxu1v9',
  dataset: 'property',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
