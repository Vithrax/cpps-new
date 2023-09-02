import { buttonVariants } from "@/components/ui/button";
import Text from "@/components/ui/text";
import { GithubIcon, LinkedinIcon } from "lucide-react";

export default async function Home() {
  return (
    <div className="mt-36 snap-start snap-always grid place-items-center px-2">
      <Text variant="h1">Welcome to CPPS</Text>
      <Text className="text-center">
        Custom Production Proposal System <br />
        This site is inspired by webapp used by{" "}
        <span className="italic">&copy;Demant Poland</span> <br />
      </Text>
      <Text className="pt-8">Created by Adrian Gajdulewicz</Text>
      <div className="flex gap-1">
        <a
          href="https://www.linkedin.com/in/adrian-gajdulewicz-50137518b/"
          target="_blank"
          className={buttonVariants({ variant: "link" })}
        >
          <LinkedinIcon className="h-3 w-3 mr-1" />
          Linkedin
        </a>
        <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          &bull;
        </span>
        <a
          href="https://github.com/Vithrax"
          target="_blank"
          className={buttonVariants({ variant: "link" })}
        >
          <GithubIcon className="h-3 w-3 mr-1" />
          GitHub
        </a>
      </div>
    </div>
  );
}
