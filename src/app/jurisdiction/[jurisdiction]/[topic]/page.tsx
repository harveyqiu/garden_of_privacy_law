import { useMDXComponent } from 'next-contentlayer/hooks'
import { allLegalDocuments } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default function LegalDocumentPage({ params }) {
  const doc = allLegalDocuments.find(
    (doc) => doc.jurisdiction === params.jurisdiction && doc.topic === params.topic
  )

  if (!doc) notFound()

  const MDXContent = useMDXComponent(doc.body.code)

  return (
    <article className="mx-auto max-w-2xl py-16">
        <h1 className='mb-4 text-3xl font-bold'>
            <Link href={`/jurisdiction/${doc.jurisdiction}`}>
                {doc.jurisdiction}
            </Link>
            <span className='text-gray-500'> / {doc.topic}</span>
        </h1>
      <h1 className="mb-4 text-3xl font-bold">{doc.title}</h1>
      {/* <div>{doc.body.html}</div> */}
      <MDXContent />
    </article>
  )
}

export async function generateStaticParams() {
  return allLegalDocuments.map((doc) => ({
    jurisdiction: doc.jurisdiction,
    topic: doc.topic,
  }))
}