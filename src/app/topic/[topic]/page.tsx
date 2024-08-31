import Link from 'next/link'
import { allLegalDocuments } from 'contentlayer/generated'

export default function TopicPage({ params }) {
  const documents = allLegalDocuments.filter((doc) => doc.topic === params.topic)

  return (
    <div>
      <h1>{params.topic}</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <Link href={doc.url}>
              {doc.jurisdiction}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function generateStaticParams() {
  const topics = [...new Set(allLegalDocuments.map((doc) => doc.topc))]
  return topics.map((topic) => ({ topic }))
}