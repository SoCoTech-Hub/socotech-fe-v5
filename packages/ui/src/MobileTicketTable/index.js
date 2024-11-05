import React from "react"
import Link from "next/link"
import { profileId } from "@/context/constants"
import { useQuery } from "@apollo/client"
import GetSupportTicketsTable from "graphql/queries/GetSupportTicketsTable"
import DigilibLoad from "@/components/DigilibLoad"

const index = () => {
  const { data, error, loading } = useQuery(GetSupportTicketsTable, {
    variables: {
      id: profileId,
    },
  })

  if (loading) {
    return (
      <div className="flex justify-center">
        <DigilibLoad />
      </div>
    )
  }

  if (error) {
    console.error(error)
    return null
  }

  return (
    <>
      {data?.supportTickets?.length ? (
        data.supportTickets.map((ticket) => (
          <Link href={`/${ticket.id}`} passHref key={ticket.id}>
            <div className="w-full p-2">
              <div className="flex gap-2">
                <div className="pt-2 pr-3 font-bold">#{ticket?.id}</div>
                <div className="flex flex-wrap w-full ">
                  <div className="flex justify-between w-full">
                    <div className="flex">
                      <div className="font-bold">{ticket?.title}</div>
                    </div>
                    <div className="font-bold">
                      {ticket?.supportStatus?.name}
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="">
                      {ticket.assignedTo
                        ? `${ticket.assignedTo.firstName} ${ticket.assignedTo.lastName}`
                        : "Unassigned"}
                    </div>
                    <div className="">{ticket?.supportTopic?.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>No Tickets Created</>
      )}
    </>
  )
}

export default index
