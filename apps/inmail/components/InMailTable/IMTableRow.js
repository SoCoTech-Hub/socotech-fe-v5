import React, { useEffect, useState } from "react"
import { withStyles } from "@mui/styles"
import Chip from "@mui/material/Chip"
import Link from "next/link"
import api from "@/api/api"

import {
  DefaultStarredIcon,
  ImportantBlueIcon,
  ImportantDefaultIcon,
  StarredIcon,
} from "../SvgIcons"
import getDataRequest from "@/snippets/getDataRequest"
import IMComposeButton from "../InMailMenu/IMComposeButton"

const PromotionChip = withStyles({
  root: {
    backgroundColor: "#4396EC",
    color: "#fff",
  },
})(Chip)
const ForumChip = withStyles({
  root: {
    backgroundColor: "#FCE58C",
    color: "#000",
  },
})(Chip)

const IMTableRow = ({
  userid,
  promotion,
  forum,
  mail,
  draftMails,
  setCheckBoxList,
  checkBoxList,
  isPrimaryChecked,
}) => {
  const [responses, setResponses] = useState([])
  const [starred, setStarred] = useState()
  const [important, setImportant] = useState()
  const [read, setRead] = useState()
  const [checkboxValue, setCheckboxValue] = useState()
  const [isChecked, setIsChecked] = useState(false)
  const [fullName, setFullName] = useState(
    `${mail.from?.firstName} ${mail.from?.lastName}`
  )

  let date = new Date(`${mail.updated_at}`)
  let currentDate = date.toUTCString().substring(0, 22)

  useEffect(async () => {
    let mounted = true
    if (mail.from.firstName === undefined || !mail?.from?.lastName) {
      await getDataRequest(`/profiles?id=${mail.from}`, () => {}).then(
        (name) => {
          if (mounted) {
            setFullName(`${name[0].firstName} ${name[0].lastName}`)
          }
        }
      )
    }
    return () => {
      mounted = false
    }
  }, [mail.from])

  useEffect(() => {
    setIsChecked(isPrimaryChecked)
    if (isPrimaryChecked) {
      if (!checkBoxList.includes(checkboxValue)) {
        setCheckBoxList((checkBoxList) => [...checkBoxList, checkboxValue])
      }
    } else if (!isPrimaryChecked) {
      setCheckBoxList([])
    }
  }, [isPrimaryChecked])

  useEffect(async () => {
    getDataRequest(
      `/mail-responses?profile=${userid}&inMail=${mail.id}`,
      () => {}
    )
      .then((response) => {
        setResponses(response[0])
        setStarred(response[0]?.starred)
        setImportant(response[0]?.important)
        setRead(response[0]?.read)
        setCheckboxValue({
          inMailId: response[0]?.inMail.id,
          responseId: response[0]?.id,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleStarred = async () => {
    setStarred((state) => !state)
    try {
      await api
        .put(`/mail-responses/${responses.id}`, { starred: !starred })
        .then(setStarred(!starred))
    } catch (error) {
      console.error(error)
    }
  }

  const handleImportant = async () => {
    setImportant((state) => !state)
    try {
      await api
        .put(`/mail-responses/${responses.id}`, { important: !important })
        .then(setImportant(!important))
    } catch (error) {
      console.error(error)
    }
  }

  const handleChecked = () => {
    setIsChecked(!isChecked)
    if (!isChecked) {
      setCheckBoxList((checkBoxList) => [...checkBoxList, checkboxValue])
    } else {
      let removedCheckValue = checkBoxList.filter((e) => e !== checkboxValue)
      setCheckBoxList(removedCheckValue)
    }
  }

  return (
    <div className="overflow-hidden divTableRow">
      <div className="flex justify-between h-16 ml-2 mr-2">
        <div className="flex items-center space-x-5 align-middle">
         <div className="">
            {!mail.draft ? (
              starred ? (
                <StarredIcon className="w-5" onClick={handleStarred} />
              ) : (
                <DefaultStarredIcon className="w-5" onClick={handleStarred} />
              )
            ) : (
              <></>
            )}
          </div>
          <div className="">
            {!mail.draft ? (
              important ? (
                <ImportantBlueIcon className="w-5" onClick={handleImportant} />
              ) : (
                <ImportantDefaultIcon
                  className="w-5"
                  onClick={handleImportant}
                />
              )
            ) : (
              <></>
            )}
          </div>

          <div className="flex items-center ml-5 align-middle">
            {!mail.draft ? (
              read ? (
                <div className="">{fullName}</div>
              ) : (
                <div className="font-bold">{fullName}</div>
              )
            ) : (
              <div className="">{fullName}</div>
            )}
          </div>
          <div className="flex items-center ml-5 align-middle">
            {!mail?.draft ? (
              read ? (
                <Link href={`/${mail.id}`} passHref>
                  <a>
                    <div className="">{mail.subject}</div>
                  </a>
                </Link>
              ) : (
                <Link href={`/${mail.id}`} passHref>
                  <a>
                    <div className="font-bold">{mail.subject}</div>
                  </a>
                </Link>
              )
            ) : (
              <div className="">
                {mail.subject}
                <IMComposeButton
                  link="#"
                  userid={userid}
                  mail={mail}
                  draftMails={draftMails}
                />
              </div>
            )}
            {promotion ? (
              <PromotionChip label="Promotion" className="mx-2 font-bold" />
            ) : (
              <></>
            )}
            {forum ? (
              <ForumChip label="Forum" className="mx-2 font-bold" />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex items-center ml-5 align-end">
          {!mail?.draft ? (
            read ? (
              <div className="">{currentDate}</div>
            ) : (
              <div className="font-bold">{currentDate}</div>
            )
          ) : (
            <div className="">{currentDate}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IMTableRow
