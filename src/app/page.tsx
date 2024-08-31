import Link from 'next/link'
import { allLegalDocuments } from 'contentlayer/generated'

export default function HomePage() {
  const topics = [...new Set(allLegalDocuments.map((doc) => doc.topic))]
  const jurisdictions = [...new Set(allLegalDocuments.map((doc) => doc.jurisdiction))]

  return (
    <div>
      <h1>Legal Documents</h1>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic}>
            <Link href={`/topic/${topic}`}>{topic}</Link>
          </li>
        ))}
      </ul>
      <h2>Jurisdictions</h2>
      <ul>
        {jurisdictions.map((jurisdiction) => (
          <li key={jurisdiction}>
            <Link href={`/jurisdiction/${jurisdiction}`}>{jurisdiction}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}