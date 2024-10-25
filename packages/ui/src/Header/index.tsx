import { Button } from "@/components/ui/button";

import LogoOverlay from "../LogoOverlay";

interface HeaderProps {
  logoUrl?: string;
  logoName?: string;
  navItems?: NavItems[];
}

type NavItems = {
  variant?: string;
  name: string;
  url: string;
};

export default function Header(props: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <LogoOverlay text={props.logoName} imageSrc={props.logoUrl} />
        {props.navItems && (
          <nav className="flex items-center space-x-4">
            {props.navItems.map((x, i) => (
              <Button
                variant={x.variant ?? "ghost"}
                asChild
                key={`button-${i}`}
              >
                <a href={x.url ?? "#"}>{x.name}</a>
              </Button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

// USE:
// import Header from '@acme/ui/Header'

// export default function Layout({ children }) {
//   return (
//     <>
//       <Header
//         logoUrl=""
//         logoName=""
//         navItems={[
//           { variant: "ghost", name: "About", url: "#" },
//           { variant: "ghost", name: "Contact", url: "#" },
//           { variant: "ghost", name: "Products", url: "#" },
//         ]}
//       />
//       <main>{children}</main>
//     </>
//   );
// }
