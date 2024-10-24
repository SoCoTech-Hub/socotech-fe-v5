import Link from 'next/link'
import Clamp from 'react-multiline-clamp'
import { baseUrl, profileId } from '@/context/constants'
import BtnSm from '@/components/BtnSm'
import handleArticleDelete from '@/snippets/blog/handleArticleDelete'

interface SavedArticleProps {
  imgSrc?: string;
  title: string;
  description: string;
  blogPostId: string;
  setSavedArticlesList: (articles: any[]) => void; // Update `any[]` with the specific type if available
}

const SavedArticle: React.FC<SavedArticleProps> = ({
  imgSrc,
  title,
  description,
  blogPostId,
  setSavedArticlesList
}) => {
  const deleteArticle = async () => {
    await handleArticleDelete(blogPostId, profileId, setSavedArticlesList)
  }

  const mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`

  return (
    <div>
      <div className='flex w-full px-2 py-4 rounded-lg shadow-md cursor-pointer align-items-center'>
        <a href={`${baseUrl}/${blogPostId}`}>
          <div className='w-1/3 mr-2'>
            <div className='w-20 overflow-hidden rounded-lg'>
              <img
                src={mediaUrl}
                alt='Blog Image'
                style={{
                  width: '100%',
                  height: '80px',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </div>
        </a>
        <div className='w-2/3'>
          <div className='w-full'>
            <a href={`${baseUrl}/${blogPostId}`}>
              <div>
                <div className='w-full text-lg leading-none text-textColor line-clamp-1'>
                  <Clamp lines={1}>
                    <div
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                  </Clamp>
                </div>
                <div className='w-full pt-1 text-xs text-textColor line-clamp-2'>
                  <Clamp lines={2}>
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  </Clamp>
                </div>
              </div>
            </a>
            <div className='flex w-full mt-2 '>
              <BtnSm
                color='bg-themeColorMain'
                label='Delete'
                onClickFunction={() => deleteArticle()}
                trackingAction={`Delete article: ${title}`}
                id={blogPostId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedArticle
