import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import type { DocumentTypes } from 'contentlayer/generated'

export const LegalDocument = defineDocumentType(() => ({
  name: 'LegalDocument',
  filePathPattern: `**/*.md`,
  contentType: "mdx",
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc: DocumentTypes['LegalDocument']) => {
        const [jurisdiction, topic] = doc._raw.flattenedPath.split('.')
        return `/${jurisdiction}/${topic}`
      },
    },
    jurisdiction: {
      type: 'string',
      resolve: (doc: DocumentTypes['LegalDocument']) => doc._raw.flattenedPath.split('.')[0],
    },
    topic: {
      type: 'string',
      resolve: (doc: DocumentTypes['LegalDocument']) => doc._raw.flattenedPath.split('.')[1],
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [LegalDocument],
})