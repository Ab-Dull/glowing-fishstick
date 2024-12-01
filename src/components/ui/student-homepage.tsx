"use client";

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, UserCheck, Book, Zap, Users, QrCode, Key, X } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import jsQR from 'jsqr'
import Link from 'next/link';

interface ChatMessageProps {
  name: string
  message: string
  avatar: string
}

export default function StudentHomepage() {
  const [activeTab, setActiveTab] = useState('feedback')
  const [mounted, setMounted] = useState(false)
  const [showAccessForm, setShowAccessForm] = useState(false)
  const [accessMethod, setAccessMethod] = useState<'qr' | 'code' | null>(null)
  const [accessCode, setAccessCode] = useState('')
  const [showQrScanner, setShowQrScanner] = useState(false)
  const [showSmartAttendance, setShowSmartAttendance] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()

  useEffect(() => {
    setMounted(true)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }, [])

  const captureQRCode = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code) {
          setAccessCode(code.data)
          setShowQrScanner(false)
          setShowAccessForm(false)
          stopCamera()
          // Verify QR code and show Smart Attendance form if valid
          verifyAccessCode(code.data)
        } else {
          requestRef.current = requestAnimationFrame(captureQRCode)
        }
      }
    }
  }, [stopCamera])

  useEffect(() => {
    if (showQrScanner) {
      startCamera()
      requestRef.current = requestAnimationFrame(captureQRCode)
    } else {
      stopCamera()
    }
  }, [showQrScanner, startCamera, stopCamera, captureQRCode])

  if (!mounted) {
    return null
  }

  const handleAccessMethod = (method: 'qr' | 'code') => {
    setAccessMethod(method)
    setShowAccessForm(true)
    if (method === 'qr') {
      setShowQrScanner(true)
    } else {
      setShowQrScanner(false)
    }
  }

  const verifyAccessCode = (code: string) => {
    // Implement your access code verification logic here
    // For this example, we'll assume any non-empty code is valid
    if (code.trim() !== '') {
      setShowSmartAttendance(true)
      setShowAccessForm(false)
      setAccessMethod(null)
    } else {
      console.error('Invalid access code')
      setShowSmartAttendance(false)
    }
  }

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    verifyAccessCode(accessCode)
  }

  const handleCloseAccessForm = () => {
    setShowAccessForm(false);
    setShowQrScanner(false);
    stopCamera();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 text-purple-900">
      <header className="bg-purple-700 text-white py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AccessAlign</h1>
          <nav>
            <ul className="flex space-x-4">
            <li><Link href="/"><Button variant="ghost" className="text-white hover:text-blue-200">Home</Button></Link></li>
              <li><Link href="/aboutbutton"><Button variant="ghost" className="text-white hover:text-blue-200">About</Button></Link></li>
              <li><Link href="/supportbutton"><Button variant="ghost" className="text-white hover:text-blue-200">Support</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
          <TabsList className="grid w-full grid-cols-2 gap-4">
            <TabsTrigger value="feedback" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Access Smart Attendance & Feedback
            </TabsTrigger>
            <TabsTrigger value="conversation" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Zap className="mr-2 h-4 w-4" />
              Dual Conversation
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feedback" className="space-y-8">
            {!showSmartAttendance && !showAccessForm && (
              <AccessButtons handleAccessMethod={handleAccessMethod} />
            )}
            {showAccessForm && !showSmartAttendance && (
              <AccessForm
                accessMethod={accessMethod}
                accessCode={accessCode}
                setAccessCode={setAccessCode}
                handleAccessSubmit={handleAccessSubmit}
                showQrScanner={showQrScanner}
                videoRef={videoRef}
                canvasRef={canvasRef}
                setShowQrScanner={setShowQrScanner}
                handleCloseAccessForm={handleCloseAccessForm}
              />
            )}
            {showSmartAttendance && <SmartAttendanceAndFeedback />}
          </TabsContent>
          <TabsContent value="conversation" className="space-y-8">
            <DualConversation />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-purple-700 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 AccessAlign. Empowering students and educators together.</p>
        </div>
      </footer>
    </div>
  )
}

function AccessButtons({ handleAccessMethod }: { handleAccessMethod: (method: 'qr' | 'code') => void }) {
  return (
    <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheck className="mr-2 h-6 w-6 text-purple-500" />
          Access Smart Attendance & Feedback
        </CardTitle>
        <CardDescription>Choose a method to access the attendance form</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center space-x-4">
        <Button onClick={() => handleAccessMethod('qr')} className="flex items-center">
          <QrCode className="mr-2 h-4 w-4" />
          Scan QR
        </Button>
        <Button onClick={() => handleAccessMethod('code')} className="flex items-center">
          <Key className="mr-2 h-4 w-4" />
          Use Access Code
        </Button>
      </CardContent>
    </Card>
  )
}

function AccessForm({ accessMethod, accessCode, setAccessCode, handleAccessSubmit, showQrScanner, videoRef, canvasRef, handleCloseAccessForm}: {
  accessMethod: 'qr' | 'code' | null
  accessCode: string
  setAccessCode: (code: string) => void
  handleAccessSubmit: (e: React.FormEvent) => void
  showQrScanner: boolean
  videoRef: React.RefObject<HTMLVideoElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  setShowQrScanner: React.Dispatch<React.SetStateAction<boolean>>
  handleCloseAccessForm: () => void
}) {
  return (
    <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center">
          {accessMethod === 'qr' ? <QrCode className="mr-2 h-6 w-6 text-purple-500" /> : <Key className="mr-2 h-6 w-6 text-purple-500" />}
          {accessMethod === 'qr' ? 'Scan QR Code' : 'Enter Access Code'}
        </CardTitle>
        <CardDescription>
          {accessMethod === 'qr' ? 'Please scan the QR code provided by your lecturer' : 'Please enter the access code provided by your lecturer'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {accessMethod === 'qr' ? (
          showQrScanner ? (
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ display: 'none' }} />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100"
                onClick={handleCloseAccessForm}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              <QrCode className="h-24 w-24 text-gray-400" />
            </div>
          )
        ) : (
          <form onSubmit={handleAccessSubmit} className="flex flex-col items-center">
            <div className="space-y-2 w-64">
              <Label htmlFor="accessCode">Access Code</Label>
              <Input
                id="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                className="w-full"
              />
            </div>
            <Button type="button" onClick={handleCloseAccessForm} className="mt-4 w-32">Back</Button> {/* Back button */}
            <Button type="submit" className="mt-4 w-32">Submit</Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

function SmartAttendanceAndFeedback() {
  return (
    <Card className="bg-gradient-to-br from-purple-100 to-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheck className="mr-2 h-6 w-6 text-purple-500" />
          Complete Smart Attendance & Feedback
        </CardTitle>
        <CardDescription>Provide feedback on your lecture</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lessonFeedback">Feedback on the lesson</Label>
            <Textarea id="lessonFeedback" placeholder="What did you think about today's lesson?" />
            <div className="flex items-center space-x-2">
              <Checkbox id="lessonFeedbackAnonymous" />
              <label htmlFor="lessonFeedbackAnonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Make response anonymous
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="questions">Questions on the lesson</Label>
            <Textarea id="questions" placeholder="Any questions about the material covered?" />
            <div className="flex items-center space-x-2">
              <Checkbox id="questionsAnonymous" />
              <label htmlFor="questionsAnonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Make response anonymous
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="improvements">Suggestions for Improvement</Label>
            <Textarea id="improvements" placeholder="How can we make the lessons better?" />
            <div className="flex items-center space-x-2">
              <Checkbox id="improvementsAnonymous" />
              <label htmlFor="improvementsAnonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Make response anonymous
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="concerns">Complaints or Concerns</Label>
            <Textarea id="concerns" placeholder="Any complaints or concerns you'd like to share?" />
            <div className="flex items-center space-x-2">
              <Checkbox id="concernsAnonymous" />
              <label htmlFor="concernsAnonymous" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Make response anonymous
              </label>
            </div>
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




