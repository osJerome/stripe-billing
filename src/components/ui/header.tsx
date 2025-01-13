import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  to: string
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  navItems: NavItem[]
  logoSrc?: string
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, title, navItems, logoSrc, ...props }, ref) => (
    <>
      <header
        ref={ref}
        className={cn(
          "fixed top-0 left-0 w-full bg-white text-green-600 p-7 shadow-sm z-50",
          className
        )}
        {...props}
      >
        <nav className="container mx-auto flex justify-between items-center">
          <HeaderLogo title={title} logoSrc={logoSrc} />
          <HeaderNav navItems={navItems} />
        </nav>
      </header>
      <div className="h-[76px]"></div>
    </>
  )
)
Header.displayName = "Header"

interface HeaderLogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string
  logoSrc?: string
}

const HeaderLogo = React.forwardRef<HTMLAnchorElement, HeaderLogoProps>(
  ({ className, title, logoSrc, ...props }, ref) => (
    <Link
      ref={ref}
      to="/"
      className={cn("flex items-center space-x-2 text-2xl font-bold", className)}
      {...props}
    >
      {logoSrc && <img src={logoSrc} alt="Logo" className="h-8 w-8" />}
      <span>{title}</span>
    </Link>
  )
)
HeaderLogo.displayName = "HeaderLogo"

interface HeaderNavProps extends React.HTMLAttributes<HTMLUListElement> {
  navItems: NavItem[]
}

const HeaderNav = React.forwardRef<HTMLUListElement, HeaderNavProps>(
  ({ className, navItems, ...props }, ref) => (
    <ul ref={ref} className={cn("flex space-x-4", className)} {...props}>
      {navItems.map((item, index) => (
        <HeaderNavItem key={index} to={item.to} label={item.label} />
      ))}
    </ul>
  )
)
HeaderNav.displayName = "HeaderNav"

interface HeaderNavItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string
  label: string
}

const HeaderNavItem = React.forwardRef<HTMLAnchorElement, HeaderNavItemProps>(
  ({ to, label, className, ...props }, ref) => (
    <li>
      <Link
        ref={ref}
        to={to}
        className={cn("hover:underline font-semibold leading-none tracking-tight", className)}
        {...props}
      >
        {label}
      </Link>
    </li>
  )
)
HeaderNavItem.displayName = "HeaderNavItem"

export { Header, HeaderLogo, HeaderNav, HeaderNavItem }
