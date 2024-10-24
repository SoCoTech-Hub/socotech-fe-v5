import { useRouter } from "next/router"
import DigilibLoad from "@/components/DigilibLoad"
import Btn from "@/components/Btn"

interface IndexProps {
  name: string;
  loading: boolean;
  category: string;
  subject: string;
}

const Index: React.FC<IndexProps> = ({ name, loading, category, subject }) => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className="flex flex-row justify-between w-full p-3 rounded-lg bg-digilibWelcome shadow-menu">
      <div>
        <div className="pt-2 pb-1 pl-4 font-bold leading-tight banner-main-text text-digilibWelcomeFont">
          {name}
        </div>
        <div className="pb-3 pl-4 leading-tight text-textColor desktop:text-5xl laptop:text-4xl mobile:text-3xl">
          {category} {subject}
        </div>
        <Btn
          label="Back to List"
          onClickFunction={goBack}
          color="bg-themeColorMain"
        />
      </div>
      <div className="flex items-center pr-4 align-middle">
        <DigilibLoad loading={loading} />
      </div>
    </div>
  )
}

export default Index
