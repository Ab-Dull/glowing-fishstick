// c:\Users\30328837\Documents\AA\my-project\src\components\ui\LoginPage.tsx

"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X } from 'lucide-react'; // Ensure you have lucide-react installed for the X icon
import {useRouter} from 'next/navigation';
import Link from 'next/link';


export default function LoginPage() {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');
  const [staffNumber, setStaffNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  // User profiles for demonstration purposes
  const users = [
    {
      role: 'Student',
      staffNumber: '41043170',
      password: 'Ethan@nwu123',
    },
    {
      role: 'Lecturer',
      staffNumber: '30328837',
      password: 'Access@147',
    },
  ];

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields
    const staffNumberValid = /^\d{1,8}$/.test(staffNumber);
    const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{1,12}$/.test(password);

    if (!role || !staffNumberValid || !passwordValid) {
      setError('Please fill in all fields correctly.');
      return;
    }

    // Find user in the predefined array
    const user = users.find(
      (u) => 
        u.role === role && 
        u.staffNumber === staffNumber && 
        u.password === password
    );

    if (user) {
      // Successful login: navigate to the appropriate homepage based on role
      setError('');
      if (role === 'Lecturer') {
        router.push('/lecturerhomepage'); // Redirect to the lecturer homepage
      } else if (role === 'Student') {
        router.push('/studenthomepage'); // Redirect to the student homepage
      } else {
        router.push('/home'); // Redirect to the home page for other roles
      }
    } else {
      // Failed login
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
      <header className="bg-purple-700 text-white py-4 sticky top-0 z-10 w-full">
        <div className="container px-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AccessAlign</h1>
          <nav className="flex-grow ml-auto">
            <ul className="flex space-x-4 justify-end">
              <li><Link href="/homebutton"><Button variant="ghost" className="text-white hover:text-blue-200">Home</Button></Link></li>
              <li><Link href="/aboutbutton"><Button variant="ghost" className="text-white hover:text-blue-200">About</Button></Link></li>
              <li><Link href="/supportbutton"><Button variant="ghost" className="text-white hover:text-blue-200">Support</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>
     
      <div className="text-center py-20 flex-grow">
      {!showForm ? (
        <div className="text-center py-20">
          <h2 className="text-5xl font-bold mb-4">Welcome to AccessAlign</h2>
          <p className="mt-8 mb-8 text-2xl">Streamlining attendance tracking and fostering connection between students and lecturers for an enhanced learning experience!</p>
          <Button onClick={() => setShowForm(true)} className="bg-purple-600 text-white hover:bg-purple-700">Login</Button>
          <Button className="ml-4">Sign Up</Button>
        </div>
      ) : (
        <Card className="w-full max-w-md relative">
          <div className="absolute top-2 right-2">
            <Button variant="ghost" onClick={() => setShowForm(false)}><X /></Button>
          </div>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Please enter your credentials to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border rounded"
                required
                aria-label="Select Role"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
              </select>
              <Input
                type="number"
                placeholder="Staff/Student Number (max 8 digits)"
                value={staffNumber}
                onChange={(e) => setStaffNumber(e.target.value)}
                maxLength={8}
                required
              />
              <Input
                type="password"
                placeholder="Password (1 uppercase, 1 special character, max 12 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={12}
                required
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  )
}