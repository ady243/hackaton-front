import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Menu } from "lucide-react";
  import { Card } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  
  const landings = [
    { id: 1, route: "/about", title: "About" },
    { id: 2, route: "/contact", title: "Contact" },
    { id: 3, route: "/services", title: "Services" },
  ];
  
  const Navbar = () => {
    return (
      <Card className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5">
  
        <ul className="hidden md:flex items-center gap-10 text-card-foreground">
          <li className="text-primary font-medium">
            <a href="#home">Home</a>
          </li>
         
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="cursor-pointer">Pages</span>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="start">
                {landings.map((page) => (
                  <DropdownMenuItem key={page.id}>
                    <Link href={page.route}>{page.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
  
        <div className="flex items-center">
          <div className="flex md:hidden mr-2 items-center gap-2">
      
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5 rotate-0 scale-100" />
                </Button>
              </DropdownMenuTrigger>
  
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <a href="#home">Home</a>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
  
        </div>
      </Card>
    );
  };
  
  
  
  export default Navbar;