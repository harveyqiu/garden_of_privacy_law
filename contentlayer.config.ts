import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { DocumentTypes, LegalDocument, LegalDocument } from 'contentlayer/generated'
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';

function extractFootnotes(content: string) {
    // 确保正则表达式正确匹配脚注
    const footnoteRegex = /\[\^(\d+)\]:\s*([\s\S]*?)(?=\n\n|\n\[\^|$)/g;
    const footnotes: { [key: string]: string } = {};
    let match;
  
    while ((match = footnoteRegex.exec(content)) !== null) {
      console.log('Found footnote match:', match);
      const [, id, text] = match;
      footnotes[`fn-${id}`] = text.trim();
    }
  
    // 移除脚注定义，但保留脚注引用
    const contentWithoutFootnotes = content.replace(footnoteRegex, '');
  
    console.log('Extracted footnotes:', footnotes);
    console.log('Content without footnotes:', contentWithoutFootnotes);
  
    return { contentWithoutFootnotes, footnotes };
}

export const LegalDocument = defineDocumentType(() => ({
  name: 'LegalDocument',
  filePathPattern: `notes/**/*.md`,
  contentType: "mdx",
  mdx: {
    remarkPlugins: [
        // // remark-gfm 4.0.0 has an issue to render table.
        // // @see https://github.com/remarkjs/remark-gfm/issues/57
        remarkGfm,
        // [remarkFootnotes, { inlineNotes: true }],
      ],
  },
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => {
        const [jurisdiction, topic] = doc._raw.flattenedPath.split('/')[1].split('.')
        return `/jurisdiction/${jurisdiction}/${topic}`
      },
    },
    jurisdiction: {
      type: 'string',
      resolve: (doc: LegalDocument) => doc._raw.flattenedPath.split('/')[1].split('.')[0],
    },
    topic: {
      type: 'string',
      resolve: (doc: LegalDocument) => doc._raw.flattenedPath.split('/')[1].split('.')[1],
    },
    footnotes: {
        type: 'list',
        resolve: (doc: LegalDocument) => {
            const { contentWithoutFootnotes, footnotes } = extractFootnotes(doc.body.raw);
            return footnotes
        }
    }
  },
}))

export const LegalText = defineDocumentType(() => ({
  name: 'LegalText',
  filePathPattern: `legal-texts/**/*.md`,
  contentType: "mdx",
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    jurisdiction: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => {
        return `/jurisdiction/${doc.jurisdiction}/file/${doc.title}`
      },
    }
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [LegalDocument, LegalText],
})