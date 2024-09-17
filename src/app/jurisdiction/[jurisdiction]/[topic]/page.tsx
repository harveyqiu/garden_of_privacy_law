import { useMDXComponent } from 'next-contentlayer/hooks'
import { allLegalDocuments, allLegalTexts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import dynamic from 'next/dynamic'

const ToggleableMarkdown = dynamic(() => import('@/components/ToggleableMarkdown'), { ssr: false })

interface Params {
  jurisdiction: string;
  topic: string;
}

interface DocumentType {
  jurisdiction: string;
  topic: string;
  title: string;
  body: { code: string };
}

const createComponentWithId = (Component: React.ComponentType<any>) => {
  return React.forwardRef((props: any, ref) => {
    // 根据 props.children 生成 id
    const id = props.children ? uuidv4(props.children) : uuidv4(); // 修改此行
    return <Component id={id} ref={ref} {...props} />
  })
}

const components = {
  h1: createComponentWithId((props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />),
  h2: createComponentWithId((props: any) => <h2 className="text-2xl font-semibold mt-6 mb-4" {...props} />),
  h3: createComponentWithId((props: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />),
  p: createComponentWithId((props: any) => <p className="mb-4" {...props} />),
  ul: createComponentWithId((props: any) => <ul className="list-disc ml-6 mb-4" {...props} />),
  ol: createComponentWithId((props: any) => <ol className="list-decimal ml-6 mb-4" {...props} />),
  li: createComponentWithId((props: any) => <li className="mb-2" {...props} />),
  a: createComponentWithId((props: any) => {
    if (props.children && props.children.startsWith('^')) {
      return (
        <>
        <sup>
          <a
            className="text-blue-500 hover:text-blue-600 footnote-ref"
            {...props}
            data-footnote-id={props.children.substring(1)}
            style={{ backgroundColor: 'yellow' }} // 添加这行以突出显示脚注引用
          >
            {props.children}
        </a>
        </sup>
        <span className='sidenote'>
            <sup>{props.children.substring(1)}</sup> {props.href}
        </span>
        </>
      )
    }
    return <a className="text-blue-500 hover:text-blue-600" {...props} />
  }),
  pre: createComponentWithId((props: any) => {
    if (props.children?.props?.className === 'language-markdown') {
      return <ToggleableMarkdown>{props.children.props.children}</ToggleableMarkdown>
    }
    return <pre {...props} />
  }),
  code: createComponentWithId((props: any) => {
    if (props.className === 'language-markdown') {
      return <ToggleableMarkdown>{props.children}</ToggleableMarkdown>
    }
    return <code {...props} />
  }),
}

export default function LegalDocumentPage({ params }: { params: Params }) {
  const doc = allLegalDocuments.find(
    (doc: DocumentType) => doc.jurisdiction === params.jurisdiction && doc.topic === params.topic
  )

  if (!doc) notFound()
//   let footnotes = doc.footnotes;

  let MDXContent = useMDXComponent(doc.body.code);

  return (
    <div className="relative mx-auto max-w-4xl py-16">
      <article className="main-content">
        <h1 className='mb-4 text-3xl font-bold'>
          <Link href={`/jurisdiction/${doc.jurisdiction}`}>
            {doc.jurisdiction}
          </Link>
          <span className='text-gray-500'> / {doc.topic}</span>
        </h1>
        <h1 className="mb-4 text-3xl font-bold">{doc.title}</h1>
        <div className="mdx-content">
          <MDXContent components={components} />
        </div>
      </article>
     </div>
  )
}

export async function generateStaticParams() {
  const allDocs = [...allLegalDocuments,]
  return allDocs.map((doc: DocumentType) => ({
    jurisdiction: doc.jurisdiction,
    topic: doc.topic,
  }))
}