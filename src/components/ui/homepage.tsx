"use  client";

import { useState } from 'react'
import {useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, BarChart2, UserCheck, Book, HelpCircle, Zap, Users } from 'lucide-react'
import { Label } from "@/components/ui/label"

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

interface FeedbackItemProps {
  student: string
  message: string
  timestamp: string
  avatar: string
}

interface ChatMessageProps {
  name: string
  message: string
  avatar: string
}

export default function Homepage() {
  const [activeTab, setActiveTab] = useState ('feedback')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <><main className="container mx-auto px-4 py-8">
      <section className="text-center py-20 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white rounded-lg shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-4">Your Voice, Real-Time.</h2>
          <p className="text-2xl mb-8">Elevating Education Together</p>
          <Button className="bg-white text-purple-700 hover:bg-blue-100">Get Started</Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 gap-4">
          <TabsTrigger value="feedback" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <MessageSquare className="mr-2 h-4 w-4" />
            Smart Attendance & Feedback
          </TabsTrigger>
          <TabsTrigger value="lecturer" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Users className="mr-2 h-4 w-4" />
            Lecturer Portal
          </TabsTrigger>
          <TabsTrigger value="conversation" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
            <Zap className="mr-2 h-4 w-4" />
            Dual Conversation
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feedback" className="space-y-8">
          <SmartAttendanceAndFeedback />
        </TabsContent>
        <TabsContent value="lecturer" className="space-y-8">
          <LecturerPortal />
        </TabsContent>
        <TabsContent value="conversation" className="space-y-8">
          <DualConversation />
        </TabsContent>
      </Tabs>
    </main><footer className="bg-purple-700 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AccessAlign. Empowering students and educators together.</p>
        </div>
      </footer></></>
  )
}

function SmartAttendanceAndFeedback() {
  return (
    <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheck className="mr-2 h-6 w-6 text-purple-500" />
          Smart Attendance & Feedback
        </CardTitle>
        <CardDescription>Check in to your lecture and provide feedback in one go</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moduleCode">Module Code</Label>
              <Input id="moduleCode" placeholder="e.g. CS101" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentNumber">Student Number</Label>
              <Input id="studentNumber" placeholder="e.g. 12345678" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lessonFeedback">Feedback on the Lesson</Label>
            <Textarea id="lessonFeedback" placeholder="What did you think about today's lesson?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="questions">Questions on the Lesson</Label>
            <Textarea id="questions" placeholder="Any questions about the material covered?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="improvements">Suggestions for Improvement</Label>
            <Textarea id="improvements" placeholder="How can we make the lessons better?" />
          </div>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Badge variant="outline" className="bg-green-100 text-green-800">Attended</Badge>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Feedback Provided</Badge>
            </div>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">Submit Attendance & Feedback</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function LecturerPortal() {
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-blue-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="mr-2 h-6 w-6 text-blue-500" />
            Lecture Analytics
          </CardTitle>
          <CardDescription>Real-time insights into student engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard title="Attendance" value="87%" icon={<UserCheck className="h-8 w-8 text-green-500" />} />
            <StatCard title="Engagement" value="92%" icon={<Zap className="h-8 w-8 text-yellow-500" />} />
            <StatCard title="Questions" value="15" icon={<HelpCircle className="h-8 w-8 text-red-500" />} />
          </div>
          <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
            <BarChart2 className="h-24 w-24 text-purple-300" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-purple-100 to-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-6 w-6 text-purple-500" />
            Student Feedback
          </CardTitle>
          <CardDescription>Address student concerns in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <FeedbackItem
              student="Emma W."
              message="The explanation of neural networks was a bit fast. Could we have more examples?"
              timestamp="5 minutes ago"
              avatar="/placeholder.svg?height=40&width=40"
            />
            <FeedbackItem
              student="Liam S."
              message="I loved the practical demonstration of algorithms. It really helped me understand better."
              timestamp="10 minutes ago"
              avatar="/placeholder.svg?height=40&width=40"
            />
            <FeedbackItem
              student="Sophia R."
              message="Can we have more group discussions? I find them very helpful for understanding complex topics."
              timestamp="15 minutes ago"
              avatar="/placeholder.svg?height=40&width=40"
            />
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">Address Feedback</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function DualConversation() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="bg-gradient-to-br from-pink-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-6 w-6 text-pink-500" />
            Student Discussion
          </CardTitle>
          <CardDescription>Collaborate with your peers</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-auto space-y-4">
          <ChatMessage name="Alex" message="Has anyone started on the group project yet?" avatar="/placeholder.svg?height=40&width=40" />
          <ChatMessage name="Sarah" message="I've done some initial research. Want to meet up to discuss?" avatar="/placeholder.svg?height=40&width=40" />
          <ChatMessage name="Jordan" message="That sounds great! How about tomorrow after class?" avatar="/placeholder.svg?height=40&width=40" />
          <ChatMessage name="Emma" message="I can join too. Should we book a study room?" avatar="/placeholder.svg?height=40&width=40" />
        </CardContent>
        <CardFooter>
          <Input placeholder="Type your message..." className="mr-2" />
          <Button>Send</Button>
        </CardFooter>
      </Card>
      <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Book className="mr-2 h-6 w-6 text-blue-500" />
            Lecture Notes
          </CardTitle>
          <CardDescription>Collaborative note-taking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg shadow-inner h-[400px] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Introduction to Machine Learning</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Definition: Machine Learning is a subset of AI</li>
              <li>Types of Machine Learning:
                <ul className="list-circle list-inside ml-4">
                  <li>Supervised Learning</li>
                  <li>Unsupervised Learning</li>
                  <li>Reinforcement Learning</li>
                </ul>
              </li>
              <li>Key Concepts:
                <ul className="list-circle list-inside ml-4">
                  <li>Features and Labels</li>
                  <li>Training and Test Sets</li>
                  <li>Model Evaluation</li>
                </ul>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Contribute to Notes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <h4 className="font-semibold text-lg">{value}</h4>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function FeedbackItem({ student, message, timestamp, avatar }: FeedbackItemProps) {
  return (
    <li className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={avatar} alt={student} />
          <AvatarFallback>{student[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold">{student}</span>
            <span className="text-sm text-gray-500">{timestamp}</span>
          </div>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </li>
  )
}

function ChatMessage({ name, message, avatar }: ChatMessageProps) {
  return (
    <div className="flex items-start space-x-4">
      <Avatar>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 bg-white p-3 rounded-lg shadow-md">
        <p className="font-semibold">{name}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  )
}