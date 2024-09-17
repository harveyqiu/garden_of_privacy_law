import Link from 'next/link'
import { allLegalDocuments } from 'contentlayer/generated'

export default function HomePage() {
  const topics = Array.from(new Set(allLegalDocuments.map((doc) => doc.topic)))
  const jurisdictions = Array.from(new Set(allLegalDocuments.map((doc) => doc.jurisdiction)))

  return (
    <div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <h2 className="text-2xl font-bold">Compare</h2>
      <Link href="/compare/notification" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Compare</Link>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <h2 className="text-2xl font-bold">Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic} className="my-4">
            <Link href={`/topic/${topic}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{topic}</Link>
          </li>
        ))}
      </ul>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <h2 className="text-2xl font-bold">Jurisdictions</h2>
      <ul>
        {jurisdictions.map((jurisdiction) => (
          <li key={jurisdiction} className="my-4">
            <Link href={`/jurisdiction/${jurisdiction}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{jurisdiction}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}