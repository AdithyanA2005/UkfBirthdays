import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-semibold text-xl text-primary-foreground">
            UKF Birthdays
          </Link>
        </div>
        
        <div className="ml-auto">
          <Link 
            href="/all" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          >
            View All Birthdays
          </Link>
        </div>
      </div>
    </nav>
  )
}
