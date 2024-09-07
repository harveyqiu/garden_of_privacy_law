import Link from 'next/link'
import { allLegalDocuments } from 'contentlayer/generated'

export default function JurisdictionPage({ params }) {
  const documents = allLegalDocuments.filter((doc) => doc.jurisdiction === params.jurisdiction)

  return (
    <div>
      <h1>{params.jurisdiction}</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <Link href={doc.url}>
              {doc.topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function generateStaticParams() {
  const jurisdictions = Array.from(new Set(allLegalDocuments.map((doc) => doc.jurisdiction)))
  return jurisdictions.map((jurisdiction) => ({ jurisdiction }))
}