"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { type User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogOut, User as UserIcon, LayoutDashboard, PlusCircle } from 'lucide-react'
import { useLanguage } from "@/components/LanguageProvider"
import { getInitials } from "@/lib/utils"

interface UserNavProps {
  user: User
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter()
  const { t } = useLanguage()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user.user_metadata.avatar_url ? (
              <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || user.email} />
            ) : (
              <AvatarFallback className="flex items-center justify-center p-0 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#ff861b" d="M5.88450545,12.7673223 C7.32107647,12.6441193 8.76545208,12.6441193 10.2020231,12.7673223 C10.9876051,12.819974 11.7678606,12.9347129 12.5355802,13.1104786 C14.1961639,13.4448359 15.2799133,14.1047518 15.7343888,15.0726283 C16.0974922,15.8767717 16.08789,16.80158 15.7081691,17.5979063 C15.2449536,18.5657829 14.1612043,19.2256987 12.4744008,19.568855 C11.7092951,19.7410988 10.9319902,19.8528915 10.1495836,19.9032123 C9.2843321,20 8.5501793,20 7.86846599,20 L7.59752865,20 C7.21132744,19.9581349 6.91855939,19.6299512 6.91855939,19.2388971 C6.91855939,18.8478429 7.21132744,18.5196592 7.59752865,18.4777941 L7.59752865,18.4777941 L8.19552997,18.4776566 C8.7948969,18.470645 9.39795098,18.4425986 10.0010051,18.3898053 C10.7124372,18.3432116 11.4194216,18.2432131 12.1160643,18.0906435 C13.3134326,17.8266771 14.0650652,17.4483254 14.3010429,16.9467893 C14.484604,16.5631348 14.484604,16.1161987 14.3010429,15.7325442 C14.0650652,15.2222093 13.3134326,14.8262598 12.1422841,14.5886901 C11.4348379,14.4289038 10.7159053,14.3259265 9.99226515,14.2807293 C8.64034215,14.1575279 7.28012802,14.1575279 5.92820502,14.2807293 C5.21388459,14.3273105 4.50399397,14.4273069 3.80440586,14.5798912 C2.6070376,14.8438575 1.86414489,15.2222093 1.61942729,15.7237453 C1.53272302,15.9142245 1.48799947,16.1213408 1.48832858,16.3308679 C1.48783807,16.5432444 1.53254045,16.7532629 1.61942729,16.9467893 C2.03541113,17.5187562 2.66831687,17.8915039 3.36741014,17.9762581 L3.36741014,17.9762581 L3.46883074,18.003768 C3.69882672,18.0836728 3.87936538,18.2709306 3.94969781,18.5098707 C4.03007773,18.7829451 3.95322349,19.0783682 3.75020277,19.2767179 C3.54718205,19.4750675 3.25156561,19.5435453 2.98285392,19.4544696 C1.85607336,19.2695203 0.86780853,18.5933528 0.282220408,17.6067052 C-0.0940734694,16.8075691 -0.0940734694,15.8805633 0.282220408,15.0814272 C0.745435864,14.087154 1.82918523,13.4448359 3.49850886,13.1016797 C4.28445329,12.9305221 5.08200812,12.8187582 5.88450545,12.7673223 Z M5.96471469,0.407206951 C7.95471011,-0.421671419 10.2447427,0.0383955276 11.7663081,1.57274551 C13.2878734,3.1070955 13.7410933,5.41333076 12.9145002,7.41538679 C12.0879072,9.41744281 10.1444105,10.7207439 7.99082479,10.717191 C5.05464341,10.7123299 2.67695692,8.31466134 2.67695692,5.35866706 L2.67695692,5.35866706 L2.68189526,5.12722783 C2.77053718,3.05238043 4.04579053,1.20648252 5.96471469,0.407206951 Z M7.99082479,1.53114502 C6.98099466,1.52881803 6.01172919,1.93104061 5.29685022,2.6490918 C4.58197126,3.367143 4.18021208,4.34202145 4.18021208,5.35866706 C4.17668538,6.91110569 5.10286315,8.31266199 6.52650415,8.90922336 C7.95014515,9.50578474 9.59058472,9.17974169 10.6822224,8.08325997 C11.77386,6.98677826 12.1014841,5.3360245 11.512191,3.90141287 C10.9228979,2.46680125 9.53286415,1.53114502 7.99082479,1.53114502 Z" transform="translate(4 2)"/>
                </svg>
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent dir="rtl" className="w-56 text-right" align="start" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.user_metadata.full_name || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.user_metadata.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex items-center justify-between w-full">
                <span>{t('dashboard')}</span>
                <LayoutDashboard className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/submit-product" className="flex items-center justify-between w-full">
              <span>{t('submit')}</span>
              <PlusCircle className="h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center justify-between w-full">
              <span>{t('profile')}</span>
              <UserIcon className="h-4 w-4" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="flex items-center justify-between w-full">
          <span>{t('logout')}</span>
          <LogOut className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 