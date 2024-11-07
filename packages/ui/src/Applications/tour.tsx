// import { useState } from 'react'
// // import { useTour } from "@reactour/tour"
// // import Btn from "@/components/Btn"
// // import { CloseIcon } from "@/components/SvgIcons"
// import { baseUrl } from '@/context/constants'

// const index = ({
// 	header = 'Explore qualifications currently available in SA'
// }) => {
// 	// const { setIsOpen } = useTour()
// 	const [closed, setClosed] = useState(false)

// 	if (!closed) {
// 		return (
// 			<div>
// 				<div className='rounded-lg bg-applicationsBg'>
// 					<div className='row'>
// 						<div className='flex p-10 col place-content-center'>
// 							<img
// 								src={`${baseUrl}/applications-tour.png`}
// 								alt='Welcome Image'
// 								className='object-contain'
// 							/>
// 						</div>
// 						<div className='col'>
// 							<div className='p-3'>
// 								<a
// 									onClick={() => {
// 										setClosed(true)
// 									}}
// 								>
// 									{/* <div className="float-right w-6 h-6 cursor-pointer ">
//                     <CloseIcon />
//                   </div> */}
// 								</a>
// 							</div>
// 							<div className='pb-5 pr-3'>
// 								<div className='pt-3 font-bold leading-tight text-textColor text-4xl'>
// 									{header}
// 								</div>
// 								<div className='pt-2 pr-1 desktop:pr-6 laptop:pr-2 mobile:pr-1 '>
// 									<p className='leading-tight break-words text-textColor text-lg'>
// 										Start your career by searching and selecting the perfect
// 										qualification to land the job of your dreams
// 									</p>
// 								</div>
// 								<div className='pt-3'></div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	} else {
// 		return <></>
// 	}
// }

// export default index
// TODO:data fetch

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { baseUrl } from "@/context/constants";
import { X } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent } from "../card";

interface WelcomeBannerProps {
  header?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  header = "Explore qualifications currently available in SA",
}) => {
  const [closed, setClosed] = useState(false);

  if (closed) {
    return null;
  }

  return (
    <Card className="bg-applicationsBg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 md:p-10">
            <Image
              src={`${baseUrl}/applications-tour.png`}
              alt="Welcome Image"
              width={400}
              height={300}
              className="mx-auto object-contain"
            />
          </div>
          <div className="relative flex-1 p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setClosed(true)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <h2 className="text-textColor mb-4 text-3xl font-bold leading-tight md:text-4xl">
              {header}
            </h2>
            <p className="text-textColor mb-6 text-lg leading-snug">
              Start your career by searching and selecting the perfect
              qualification to land the job of your dreams
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
