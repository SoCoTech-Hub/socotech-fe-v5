// import Btn from '@/components/Btn'
// // import Loader from "@/components/Loader"
// import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
// import applyQualification from '@/snippets/user/applyQualification'
// // import saveQualification from "@/snippets/user/saveQualification"
// import DigilibLoad from '@/components/DigilibLoad'
// import {
// 	BriefcaseIcon,
// 	BuildingIcon,
// 	LightbulbIcon
// } from '@/components/SvgIcons'

// const ApplicationsPost = ({
// 	loading,
// 	qualificationId,
// 	qualificationUrl,
// 	profileId,
// 	courseTitle = '',
// 	companyDescription = '',
// 	timePosted = '',
// 	numberOfApplicants = '',
// 	positionTitle = '',
// 	fieldDescription = '',
// 	compareDescription = '',
// 	topDescription = '',
// 	responsibilitiesDescription = '',
// 	requirementsDescription = '',
// 	applicationFeatureImage = '',
// 	bgColor = '',
// 	svgIcon = ''
// }) => {
// 	const apply = async () => {
// 		await applyQualification({
// 			profileId,
// 			qualificationId,
// 			qualificationUrl
// 		})
// 	}
// 	// const save = async () => {
// 	//   await saveQualification({
// 	//     profileId,
// 	//     qualificationId,
// 	//   })
// 	// }
// 	return (
// 		<div>
// 			{loading ? (
// 				<div className='flex w-full place-content-center h-72'>
// 					<DigilibLoad loading={loading} />
// 					{/* <Loader /> */}
// 				</div>
// 			) : (
// 				<div className='p-3 mainPostFrame'>
// 					<div className='flex pb-2 courseTitleAndMenu'>
// 						<div className=' bg-compBg desktop:w-14 laptop:w-14 desktop:block laptop:block mobile:hidden'>
// 							{svgIcon ? (
// 								<div
// 									className={`flex place-self-center ${
// 										bgColor ? bgColor : 'bg-themeColorMain'
// 									} rounded-lg `}
// 									style={{ backgroundColor: bgColor }}
// 								>
// 									<div
// 										className='rounded-lg w-14 h-14'
// 										dangerouslySetInnerHTML={{
// 											__html: svgIcon
// 										}}
// 									/>
// 								</div>
// 							) : (
// 								applicationFeatureImage && (
// 									<img
// 										alt=''
// 										src={applicationFeatureImage?.url}
// 										className='flex rounded-lg place-self-center w-14 h-14'
// 									/>
// 								)
// 							)}
// 						</div>
// 						<div className='pl-2 text-xl font-bold mobile:pl-0 text-textColor mobile:text-lg'>
// 							{courseTitle}
// 						</div>
// 						{/* <div className="flex">
//             <Link href="">
//               <ForwardIcon className="w-10 h-10 cursor-pointer" />
//             </Link>
//             <DotsMenu links="#" />
//           </div> */}
// 					</div>
// 					<div className='pb-3 companyInformation text-textColor'>
// 						{companyDescription ? companyDescription : ''}
// 						<span className='ml-4 mobile:ml-0 text-textColor'>
// 							{timePosted && numberOfApplicants
// 								? getTimeDifferenceFromPostDate(timePosted) +
// 								  '  -  ' +
// 								  numberOfApplicants +
// 								  (numberOfApplicants !== 1 ? ' applicants' : ' applicant')
// 								: ''}
// 						</span>
// 					</div>
// 					<div className='text-textColor courseInfoLines'>
// 						{positionTitle && (
// 							<div className='flex positionLine'>
// 								<div className='positionIcon'>
// 									<BriefcaseIcon className='w-10 h-10 ' />
// 								</div>
// 								<div className='pt-1 positionTitle'>{positionTitle}</div>
// 							</div>
// 						)}
// 						{fieldDescription && (
// 							<div className='flex fieldInformation '>
// 								<div className='fieldIcon'>
// 									<BuildingIcon className='w-10 h-10 ' />
// 								</div>
// 								<div className='pt-1 fieldDescription'>{fieldDescription}</div>
// 							</div>
// 						)}
// 						{compareDescription && (
// 							<div className='flex compareApplicants text-textColor'>
// 								<div className='compareIcon'>
// 									<LightbulbIcon className='w-10 h-10 ' />
// 								</div>
// 								<div className='pt-1 compareDescription'>
// 									{compareDescription}
// 								</div>
// 							</div>
// 						)}
// 					</div>
// 					{courseTitle && qualificationUrl && (
// 						<div className='flex buttonsLine'>
// 							<div className='applyButton '>
// 								<Btn
// 									onClickFunction={apply}
// 									color='bg-themeColorMain'
// 									label='Apply'
// 								/>
// 							</div>
// 							{/* <div className="saveButton">
//                 <Btn
//                   onClickFunction={save}
//                   color="bg-compBg"
//                   label="Save"
//                   textSize="text-md"
//                   textColor="text-blue-600"
//                   borderColor="border-blue-600"
//                   padding="p-2"
//                 />
//               </div> */}
// 						</div>
// 					)}
// 					{topDescription && (
// 						<>
// 							<div className='pt-10 pb-2 text-textColor'>
// 								Programme Description:
// 							</div>
// 							<div
// 								className='py-2 text-textColor'
// 								dangerouslySetInnerHTML={{ __html: topDescription }}
// 							/>
// 						</>
// 					)}
// 					{responsibilitiesDescription && (
// 						<>
// 							<div className='py-2 text-textColor'>Responsibilities:</div>
// 							<div
// 								className='py-2 text-textColor'
// 								dangerouslySetInnerHTML={{
// 									__html: responsibilitiesDescription
// 								}}
// 							/>
// 						</>
// 					)}
// 					{requirementsDescription && (
// 						<>
// 							<div className='py-2 text-textColor'>Requirements:</div>
// 							<div
// 								className='py-2 text-textColor'
// 								dangerouslySetInnerHTML={{ __html: requirementsDescription }}
// 							/>
// 						</>
// 					)}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default ApplicationsPost
// TODO:data fetch

"use client";

import React from "react";
import Image from "next/image";

import applyQualification from "@acme/snippets/applyQualification";
import { getTimeDifferenceFromPostDate } from "@acme/snippets/getTimeDifferenceFromPostDate";

import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Skeleton } from "../skeleton";
import { BriefcaseIcon, BuildingIcon, LightbulbIcon } from "../SvgIcons";

interface ApplicationsPostProps {
  loading: boolean;
  qualificationId: string;
  qualificationUrl: string;
  profileId: string;
  courseTitle?: string;
  companyDescription?: string;
  timePosted?: string;
  numberOfApplicants?: string;
  positionTitle?: string;
  fieldDescription?: string;
  compareDescription?: string;
  topDescription?: string;
  responsibilitiesDescription?: string;
  requirementsDescription?: string;
  applicationFeatureImage?: string;
  bgColor?: string;
  svgIcon?: string;
}

export function ApplicationsPost({
  loading,
  qualificationId,
  qualificationUrl,
  profileId,
  courseTitle = "",
  companyDescription = "",
  timePosted = "",
  numberOfApplicants = "",
  positionTitle = "",
  fieldDescription = "",
  compareDescription = "",
  topDescription = "",
  responsibilitiesDescription = "",
  requirementsDescription = "",
  applicationFeatureImage = "",
  bgColor = "",
  svgIcon = "",
}: ApplicationsPostProps) {
  const apply = async () => {
    await applyQualification({
      profileId,
      qualificationId,
      qualificationUrl,
    });
  };

  if (loading) {
    return (
      <Card className="h-72 w-full">
        <CardContent className="flex h-full items-center justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4">
        <div className="h-14 w-14 overflow-hidden rounded-lg bg-primary">
          {svgIcon ? (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: bgColor || "var(--primary)" }}
              dangerouslySetInnerHTML={{ __html: svgIcon }}
            />
          ) : applicationFeatureImage ? (
            <Image
              src={applicationFeatureImage}
              alt={courseTitle}
              width={56}
              height={56}
              className="object-cover"
            />
          ) : null}
        </div>
        <div>
          <h2 className="text-xl font-bold">{courseTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {companyDescription}
            {timePosted && numberOfApplicants && (
              <span className="ml-4">
                {getTimeDifferenceFromPostDate(timePosted)} -{" "}
                {numberOfApplicants}{" "}
                {parseInt(numberOfApplicants) !== 1
                  ? "applicants"
                  : "applicant"}
              </span>
            )}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {positionTitle && (
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6" />
            <span>{positionTitle}</span>
          </div>
        )}
        {fieldDescription && (
          <div className="flex items-center space-x-2">
            <BuildingIcon className="h-6 w-6" />
            <span>{fieldDescription}</span>
          </div>
        )}
        {compareDescription && (
          <div className="flex items-center space-x-2">
            <LightbulbIcon className="h-6 w-6" />
            <span>{compareDescription}</span>
          </div>
        )}
        {topDescription && (
          <div>
            <h3 className="mb-2 font-semibold">Programme Description:</h3>
            <div dangerouslySetInnerHTML={{ __html: topDescription }} />
          </div>
        )}
        {responsibilitiesDescription && (
          <div>
            <h3 className="mb-2 font-semibold">Responsibilities:</h3>
            <div
              dangerouslySetInnerHTML={{ __html: responsibilitiesDescription }}
            />
          </div>
        )}
        {requirementsDescription && (
          <div>
            <h3 className="mb-2 font-semibold">Requirements:</h3>
            <div
              dangerouslySetInnerHTML={{ __html: requirementsDescription }}
            />
          </div>
        )}
      </CardContent>
      {courseTitle && qualificationUrl && (
        <CardFooter>
          <Button onClick={apply} className="w-full">
            Apply
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
