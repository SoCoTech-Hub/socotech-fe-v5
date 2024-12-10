import { useRouter } from 'next/router';
import ResourceLoad from '@/components/ResourceLoad';
import Btn from '@/components/Btn';
import downloadHTMLLink from '@/snippets/lms/downloadHTMLLink'

const index = ({ name, loading, downloadLink, downloadable }) => {
  const router = useRouter();
  // const goBack = () => {
  //   router.back();
  // };

  // const download = () => {
  //   fetch(downloadLink).then((response) => {
  //     response.blob().then((blob) => {
  //       const fileURL = window.URL.createObjectURL(blob);
  //       let alink = document.createElement('a');
  //       alink.href = fileURL;
  //       alink.download = name;
  //       alink.click();
  //     });
  //   });
  // };

  return (
    <div className='flex flex-row justify-between w-full p-3 rounded-lg bg-compBg shadow-menu'>
      <div className=''>
        <div className='pt-2 pb-1 pl-4 mb-2 font-bold leading-tight break-all text-3xl text-textColor'>
          {name}
        </div>

        <div className='flex flex-wrap mobile:gap-1'>
          <Btn
            label='Back to Lesson'
            onClickFunction={() => router.back()}
            color='bg-themeColorMain'
            width='36'
            padding='py-2'
            fontWeight='bold'
          />
          {downloadable ? (
            <Btn
              label='Download'
              onClickFunction={() => downloadHTMLLink(downloadLink, name)}
              color='bg-themeColorMain'
              fontWeight='bold'
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='flex items-center pr-4 align-middle'>
        <ResourceLoad loading={loading} />
      </div>
    </div>
  );
};

export default index;
