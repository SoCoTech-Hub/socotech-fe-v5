import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { StyledMenu, StyledMenuItem } from './styles'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl, organizationId } from '@/context/constants'

interface Category {
  id: string
  name: string
}

const Index: React.FC = () => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [category, setCategory] = useState<string>('Category')
  const [search, setSearch] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      await getGQLRequest({
        endpoint: 'kbCategories',
        where: `organization:{id:${organizationId}}`,
        stateSetter: setCategories,
        fields: 'id,name',
      })
    }
    fetchCategories()
  }, [])

  const searchQuery = ({ searchValue }: { searchValue: string }) => {
    if (category === 'Category') {
      setSearch(`name_contains=${searchValue}`)
    } else {
      const selectedCategory = categories.find((item) => item.name === category)
      setSearch(
        `category=${selectedCategory?.id}&name_contains=${searchValue}`
      )
    }
  }

  const searchResult = () => {
    router.push(`/search?${search}`)
  }

  return (
    <div>
      <div className="flex flex-row justify-between px-2 mt-4 bg-compBg rounded-lg align-items-center">
        <div>
          <button
            className="h-8 rounded-full text-textColor bg-digilibWelcomeButton w-36"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {category}
          </button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {categories.length ? (
              categories.map((categoryItem) => (
                <div key={categoryItem.id}>
                  <StyledMenuItem>
                    <div className="flex justify-between">
                      <button
                        className="mt-2 item"
                        onClick={() => {
                          setCategory(categoryItem.name)
                          setAnchorEl(null)
                        }}
                      >
                        {categoryItem.name}
                      </button>
                    </div>
                  </StyledMenuItem>
                </div>
              ))
            ) : (
              <StyledMenuItem>
                <div className="flex justify-between">Coming Soon</div>
              </StyledMenuItem>
            )}
          </StyledMenu>
        </div>
        <div className="w-full ml-2 col-xs-4">
          <input
            className="h-10 border-0 shadow-none form-control"
            type="text"
            placeholder="Start typing to search..."
            onChange={(e) => searchQuery({ searchValue: e.target.value })}
          />
        </div>
        <div className="-mb-1.5">
          <button onClick={searchResult}>
            <div className="w-10 p-1 rounded-full">
              <img src={`${baseUrl}/search_icon.svg`} alt="Search Icon" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Index
