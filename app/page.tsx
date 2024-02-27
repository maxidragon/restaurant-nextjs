import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
      <main className="h-full"
            style={{
              backgroundImage: `url('https://source.unsplash.com/random/?food')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="space-y-6 text-center flex-grow">
            <h1 className={cn(
                "text-6xl font-semibold text-white drop-shadow-md",
                font.className,
            )}>
              Welcome to restaurant website!
            </h1>
            <p className="text-white text-lg">
              Sign in to order your favorite food
            </p>
            <div>
              <LoginButton asChild>
                <Button variant="secondary" size="lg">
                  Sign in
                </Button>
              </LoginButton>
            </div>
          </div>
        </div>
      </main>
  )
}