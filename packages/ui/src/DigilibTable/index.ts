import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import DigilibLoad from '@/components/DigilibLoad'
import Btn from '@/components/Btn'
import { profileId } from '@/context/constants'
import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/router'
import getDataRequest from '@/snippets/getDataRequest'
import Pagination from '@/components/Pagination'

interface Article {
  id: string
  name: string
  link?: string
  topics?: { name: string }[]
}

interface Progress {
  knowledgeBase: { id: string }
  read: boolean
}

interface Category {
  id: string
  name: string
}

interface IndexProps {
  articles: Article[]
  category: Category
}

const Index: React.FC<IndexProps> = ({ articles, category }) => {
  const { state } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [progresses, setReads] = useState<Progress[]>([])
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()

  useEffect(() => {
    const fetchReads = async () => {
      await getDataRequest(
        `/kb-reads?kbCategory=${category.id}&profile=${profileId}`,
        setReads
      )
    }
    fetchReads()
  }, [category.id])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return articles.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, articles])

  return (
    <div className="overflow-hidden rounded-lg shadow-menu bg-compBg">
      <div className="flex justify-between desktop:gap-5 mobile:gap-2">
        <div className="pt-4 pb-3 pl-8 heading">{category.name}</div>
        <div className="mt-3 mr-6">
          <Btn
            onClickFunction={() => router.back()}
            label="Back"
            color="bg-themeColorMain"
            padding="px-3 py-2"
            width="28"
          />
        </div>
      </div>

      <div className="ml-8 mr-8">
        <hr className="bg-compBg" />
      </div>
      <div className="mobile:overflow-scroll mobile:w-full">
        <table>
          <thead>
            <tr>
              <th className="px-8 py-4 text-textColor body-text">Title</th>
              <th className="px-8 py-4 text-textColor body-text">Tag</th>
              <th className="px-8 py-4 text-textColor body-text">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((article) => {
              const link = article.link?.startsWith('http')
                ? article.link
                : `/${article.link ?? article.id}`
              return (
                <Link href={link} key={article.id} passHref>
                  <tr onClick={() => setLoading(true)} className="cursor-pointer">
                    <td style={{ width: '50%' }} className="px-8 py-4 text-sm">
                      {article.name}
                    </td>
                    <td style={{ width: '30%' }} className="px-8 py-4 text-sm">
                      {article.topics
                        ? article.topics.map((topic) => topic.name).join(', ')
                        : ' '}
                    </td>
                    <td
                      style={{ width: '10%' }}
                      className={`px-8 py-4 text-xs font-extrabold ${
                        progresses.find((item) => item.knowledgeBase.id === article.id)
                          ?.read
                          ? 'text-digilibSeen'
                          : 'text-digilibUnseen'
                      }`}
                    >
                      {progresses.find((item) => item.knowledgeBase.id === article.id)
                        ?.read
                        ? 'Read'
                        : 'Unread'}
                    </td>
                  </tr>
                </Link>
              )
            })}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={articles.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <DigilibLoad loading={loading} />
      </div>
    </div>
  )
}

export default Index
