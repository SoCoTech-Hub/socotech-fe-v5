import React, { useEffect, useState } from "react";

import Cover from "@acme/ui/support/cover";
import TicketingDashboard from "@acme/ui/support/TicketingDashboard";
import { UpdateImages, UploadImages } from "@acme/snippets"//TODO: not sure if correct


export default function Home() {
  const [user,setUser]=useState<ApiProfile>()
  const [tickets,setTickets] = useState()
  
  useEffect(() => { 
    const fetchData = async () => { 
      const data = FetchUser()
      setUser(data)
      
    }
    fetchData()
  },[]);
  
  return (
    <div>
      <div className="col row">
        <div className="mobile:hidden">
          <Cover name={`${user.profile.firstName} ${user.profile.lastName}`} bannerImage={user.profile.banner.url} avatarImage={user.profile.avatar.url} user={user} updateImages={UpdateImages}
          uploadImage={UploadImages}/>
        </div>
        <div className="space-y-10 mobile:space-y-3 mobile:w-full mobile:px-3 mobile:mb-10">
          <TicketingDashboard tickets={ TicketItem[]}
            createTicket={ (ticket: TicketItem) => void}/>
        </div>
      </div>
    </div>
  );
}
