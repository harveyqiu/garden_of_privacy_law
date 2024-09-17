import { allLegalTexts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

interface PageProps {
  params: {
    jurisdiction: string
    title: string
  }
}

export default function LegalTextPage({ params }: PageProps) {
  const legalText = allLegalTexts.find(
    (text) => text.jurisdiction === params.jurisdiction && text.title === params.title
  )

  if (!legalText) {
    notFound()
  }

  const MDXContent = useMDXComponent(legalText.body.code)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{legalText.title}</h1>
      <p className="text-gray-600 mb-4">管辖区: {legalText.jurisdiction}</p>
      <p className="text-gray-600 mb-8">日期: {legalText.date}</p>
      <MDXContent code={legalText.body.code} />
    </div>
  )
}

export async function generateStaticParams() {
  return allLegalTexts.map((text) => ({
    jurisdiction: text.jurisdiction,
    title: text.title,
  }))
}
