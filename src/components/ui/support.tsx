import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 text-purple-900">
      <header className="bg-purple-700 text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AccessAlign</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/"><Button variant="ghost" className="text-white hover:text-blue-200">Home</Button></Link></li>
              <li><Link href="/about"><Button variant="ghost" className="text-white hover:text-blue-200">About</Button></Link></li>
              <li><Button variant="ghost" className="text-white hover:text-blue-200">Support</Button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact For Support</h2>
        <p className="pt-4 mb-4 font-bold text-2xl text-center">
          For assistance or inquiries, please contact the platform developers:
        </p>
        <ul className="list-disc list-inside mb-4 text-center text-2xl">
          <li><strong>Quintin Rossouw</strong>: quintin.rossouw@nwu.ac.za</li>
          <li><strong>Ethan Terblanche</strong>: 41043170@mynwu.ac.za</li>
        </ul>
      </main>

      <footer className="bg-purple-700 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AccessAlign. Ethan Terblanche, Quintin Roussouw.</p>
        </div>
      </footer>
    </div>
  )
}

