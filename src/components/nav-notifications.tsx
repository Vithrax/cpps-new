import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { buttonVariants } from "./ui/button";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardDescription, CardTitle } from "./ui/card";
import Text from "./ui/text";
import { Separator } from "./ui/separator";

interface NavNotificationsProps {}

const NavNotifications: FC<NavNotificationsProps> = ({}) => {
  const hasNotifications = false;

  // TODO: add functionality

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ size: "icon", variant: "ghost" }),
          "mr-3 relative"
        )}
      >
        <Bell className="h-5 w-5 " />
        {hasNotifications && (
          <div className="bg-red-500 rounded-full absolute top-0 right-0 m-2 h-2 w-2"></div>
        )}
        <span className="sr-only">Notifications</span>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col mt-2">
        <Text className="text-center text-muted-foreground">
          Nothing to show. All clear!
        </Text>
        {/* <Text variant="h3">
            1{" "}
            <span className="text-muted-foreground font-normal text-base">
              proposal to review
            </span>
          </Text> */}
        {/* <Text variant="h3">
            1{" "}
            <span className="text-muted-foreground font-normal text-base">
              proposal to review
            </span>
          </Text> */}
      </PopoverContent>
    </Popover>
  );
};

export default NavNotifications;
