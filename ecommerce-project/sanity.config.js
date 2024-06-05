import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  // name: 'default',
  // title: 'ecommerce project',
  // projectId: 'hwyf4d5u',
  // dataset: 'production',
  projectId: "hwyf4d5u",
  dataset: "production",
  apiVersion: "2024-04-11",
  useCdn: true,
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
