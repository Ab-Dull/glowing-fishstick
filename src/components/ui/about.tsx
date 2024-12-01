"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 text-purple-900">
      <header className="bg-purple-700 text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AccessAlign</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/"><Button variant="ghost" className="text-white hover:text-blue-200">Home</Button></Link></li>
              <li><Button variant="ghost" className="text-white hover:text-blue-200">About</Button></li>
              <li><Link href="/support"><Button variant="ghost" className="text-white hover:text-blue-200">Support</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-3xl font-bold mb-6 text-center ">Purpose Statement</h2>
        <p className="pt-7 mb-4 text-2xl text-center">
          Our platform redefines communication in education by bridging the hierarchical gap between lecturers and students. Designed with accessibility and collaboration at its core, the platform integrates smart attendance tracking, real-time feedback, and dual-channel communication to foster mutual respect and empowerment. By streamlining interactions and reducing consultation delays, we aim to create an inclusive, student-centered environment that enhances learning and promotes shared growth.
        </p>
      </main>

      <footer className="bg-purple-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AccessAlign. Ethan Terblanche, Quintin Roussouw.</p>
        </div>
      </footer>
    </div>
  )
}

