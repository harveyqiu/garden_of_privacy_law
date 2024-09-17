import Link from 'next/link'
import { allLegalDocuments } from 'contentlayer/generated'

export default function TopicPage({ params }) {
  const documents = allLegalDocuments.filter((doc) => doc.topic === params.topic)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{params.topic}</h1>
      
      <div className="space-y-6">
        {documents.map((doc) => (
          <div key={doc._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{doc.jurisdiction}</h2>
            <p className="text-gray-600">{doc.title}</p>
            <Link href={doc.url} className="mt-4 inline-block text-blue-600 hover:underline">
              了解更多
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const topics = [...new Set(allLegalDocuments.map((doc) => doc.topc))]
  return topics.map((topic) => ({ topic }))
}