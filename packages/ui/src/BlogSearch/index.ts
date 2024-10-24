import { useState } from 'react'
import {
  AppBg,
  baseUrl,
  grades,
  organizationId,
  Text
} from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'

interface IndexProps {
  setSearchFound: (articles: any[]) => void; // Replace `any[]` with the correct type if available
  articles: any[]; // Replace `any[]` with the correct type if available
}

const Index: React.FC<IndexProps> = ({ setSearchFound, articles }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const SearchBlog = () => {
    if (searchTerm) {
      getGQLRequest({
        endpoint: 'articles',
        stateSetter: setSearchFound,
        where: `_or:[{description_contains:"${searchTerm}"}, {title_contains:"${searchTerm}"}], grades:{id:[${grades}]},organization:{id:${organizationId}}`,
        fields: `id,title,description,published_at,image{url,formats},articleLike{id},author{firstName,lastName,profilePic{id,url,formats}}`,
        sort: 'title:asc'
      })
      setSearchTerm('')
    } else {
      setSearchFound(articles)
    }
  }

  return (
    <div className='flex flex-row justify-between px-2 mt-4 rounded-lg bg-compBg align-items-center text-textColor mobile:px-1'>
      <div className='w-full ml-2 col-xs-4'>
        <input
          className={`border-0 w-full py-1 px-2 rounded-lg shadow-none text-textColor bg-compBg`}
          style={{ background: AppBg }}
          type='text'
          placeholder='Start typing to search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='-mb-1.5'>
        <button onClick={() => SearchBlog()}>
          <div className='w-10 p-1 rounded-full '>
            <img
              src={`${baseUrl}/search_icon.svg`}
              alt='Search Icon'
            />
          </div>
        </button>
      </div>
    </div>
  )
}

export default Index
