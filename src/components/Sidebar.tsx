import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Button } from "./ui/button";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-xl font-semibold">Application</span>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            {items.map((item) => (
              <li key={item.title} className="mb-4">
                <a href={item.url} className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                  <item.icon className="w-5 h-5" />
                  <span className="ml-3">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <Button className="w-full">Logout</Button>
        </div>
      </div>
    </div>
  );
}