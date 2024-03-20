import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function ShoppingCartModal(){
    return(
        <Sheet defaultOpen>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent className="w-[100vw]">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <div className="h-[100vh] flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
                <ul className="-my-6 divide-y divide-gray-200">
                <h1>Hello</h1>


                </ul>
            </div>
          </div>

         
          
        </SheetContent>
      </Sheet>
    )
}