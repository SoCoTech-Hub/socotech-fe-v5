// import { useRouter } from 'next/router';
// import React from 'react';

// const AccessDenied: React.FC = () => {
//   const router = useRouter();

//   return (
//     <div className='px-1 w-30'>
//       <h1>Access Denied</h1>
//       <a
//         className='px-3 py-2 text-center rounded-full text-textColor'
//         href='#'
//         onClick={() => router.back()}
//       >
//         Return
//       </a>
//     </div>
//   );
// };

// export default AccessDenied;
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertOctagon, Home } from "lucide-react"
import Link from "next/link"

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-destructive">
            <AlertOctagon className="w-8 h-8" />
            Access Denied
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Sorry, you don't have permission to access this page. If you believe this is an error, please contact the administrator.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// USE:
// import AccessDenied from '@acme/ui/AccessDenied'

// export default function ProtectedPage() {
//   const userHasAccess = false // Replace with your actual access check logic

//   if (!userHasAccess) {
//     return <AccessDenied />
//   }

//   // Render the protected content here
//   return (
//     // ...
//   )
// }
