import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <p className="text-7xl font-bold tracking-tight text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-muted-foreground">
          Oops, the page you are looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back to safety.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">
              <HomeIcon className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}