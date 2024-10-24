import { useEffect, useState } from 'react'
import Accordion from '@/components/Accordion'
import getGQLRequest from '@/snippets/getGQLRequest'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface IndexProps {
  categoryId?: number
}

const Index: React.FC<IndexProps> = ({ categoryId = 0 }) => {
  const [faqData, setFaqData] = useState<FAQ[]>([])

  useEffect(() => {
    const fetchFAQs = async () => {
      const { faqs } = await getGQLRequest({
        endpoint: 'faqs',
        where: `categories: { id : ${categoryId} }`,
        fields: 'id,question,answer',
      })
      setFaqData(faqs)
    }

    fetchFAQs()
  }, [categoryId])

  return (
    <div className="">
      <Accordion faqs={faqData} />
    </div>
  )
}

export default Index
