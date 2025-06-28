"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Rocket,
  User,
  Settings,
  BookOpen,
  Users,
  Share,
  Bookmark,
  ExternalLink,
  Check,
  Clock,
  Code,
  Cpu,
  Palette,
  FlaskRoundIcon as Flask,
  Lightbulb,
  CheckCircle,
  CuboidIcon as Cube,
  UserPlus,
  GraduationCap,
  Folder,
  LoaderPinwheelIcon as Spinner,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Moon,
  Sun,
} from "lucide-react"

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
  const [experienceLevel, setExperienceLevel] = useState("Beginner")
  const [timeCommitment, setTimeCommitment] = useState("Medium")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  useEffect(() => {
    if (isProcessing) {
      const timer = setTimeout(() => {
        setIsProcessing(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isProcessing])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsProcessing(true)
    }
  }

  const projects = [
    {
      id: 1,
      title: "Interactive Data Visualization Dashboard",
      difficulty: "Intermediate",
      time: "3-4 hours",
      domain: "coding",
      description: "Build a responsive dashboard that visualizes complex datasets using D3.js or Chart.js libraries.",
      objectives: [
        "Learn data visualization principles",
        "Practice JavaScript DOM manipulation",
        "Implement responsive design",
      ],
      materials: ["Code editor", "D3.js or Chart.js library", "Sample dataset"],
      steps: [
        "Set up project structure and dependencies",
        "Import and format your dataset",
        "Create basic chart components",
        "Add interactivity and filters",
        "Implement responsive layout",
      ],
      tips: "Start with a simple chart type before adding complexity. Consider using a CSS framework for layout.",
    },
    {
      id: 2,
      title: "Arduino Weather Station",
      difficulty: "Advanced",
      time: "8-10 hours",
      domain: "hardware",
      description:
        "Create a DIY weather station that measures temperature, humidity, and pressure with real-time data display.",
      objectives: ["Learn sensor integration", "Practice Arduino programming", "Build a physical project enclosure"],
      materials: ["Arduino board", "Temperature/humidity sensors", "LCD display", "Project enclosure"],
      steps: [
        "Connect sensors to Arduino",
        "Write code to read sensor data",
        "Program LCD display output",
        "Design and build enclosure",
        "Calibrate and test system",
      ],
      tips: "Test each sensor individually before combining them. Consider adding data logging capabilities.",
    },
    {
      id: 3,
      title: "Mobile App Prototype",
      difficulty: "Beginner",
      time: "2-3 hours",
      domain: "design",
      description: "Design a clickable prototype for a mobile app focused on habit tracking using Figma or Adobe XD.",
      objectives: ["Apply UI/UX principles", "Create user flows", "Design consistent interface elements"],
      materials: ["Figma or Adobe XD", "UI kit (optional)", "User personas"],
      steps: [
        "Define app features and user stories",
        "Create wireframes for key screens",
        "Design high-fidelity mockups",
        "Add interactive elements",
        "Test with potential users",
      ],
      tips: "Focus on solving one specific problem well. Use established design patterns for familiar interactions.",
    },
    {
      id: 4,
      title: "Machine Learning Image Classifier",
      difficulty: "Intermediate",
      time: "5-6 hours",
      domain: "coding",
      description: "Build an ML model that can identify and classify images using TensorFlow or PyTorch.",
      objectives: ["Understand ML fundamentals", "Work with image data", "Train and evaluate models"],
      materials: ["Python environment", "TensorFlow or PyTorch", "Image dataset"],
      steps: [
        "Set up development environment",
        "Prepare and preprocess image dataset",
        "Build classification model",
        "Train and tune hyperparameters",
        "Evaluate model performance",
      ],
      tips: "Start with a pre-trained model and fine-tune it for your specific use case to save time.",
    },
    {
      id: 5,
      title: "Research Literature Review",
      difficulty: "Advanced",
      time: "10-12 hours",
      domain: "research",
      description: "Conduct a comprehensive literature review on an emerging technology or scientific concept.",
      objectives: ["Develop research methodology", "Synthesize information", "Create structured knowledge summary"],
      materials: ["Access to academic databases", "Reference management software", "Note-taking system"],
      steps: [
        "Define research question and scope",
        "Search for relevant literature",
        "Evaluate source credibility",
        "Organize findings by themes",
        "Write structured review document",
      ],
      tips: "Use a systematic approach to track sources and findings. Consider creating a concept map to visualize relationships.",
    },
    {
      id: 6,
      title: "Personal Finance Tracker",
      difficulty: "Beginner",
      time: "4-5 hours",
      domain: "coding",
      description: "Create a web app that helps track expenses, categorize spending, and visualize financial habits.",
      objectives: ["Practice CRUD operations", "Implement data visualization", "Build practical utility app"],
      materials: ["Web development stack", "Chart library", "Local storage or database"],
      steps: [
        "Design data structure for finances",
        "Create input forms for transactions",
        "Implement category system",
        "Add reporting and visualization",
        "Set up data persistence",
      ],
      tips: "Focus on privacy and data security. Consider using localStorage for a simple implementation before adding backend.",
    },
  ]

  const resources = [
    {
      title: "Video Tutorial: Building Interactive Dashboards",
      type: "video",
    },
    {
      title: "Getting Started with Arduino Sensors",
      type: "documentation",
    },
    {
      title: "UI/UX Design Principles Guide",
      type: "ebook",
    },
    {
      title: "Machine Learning Fundamentals",
      type: "course",
    },
    {
      title: "Research Methodology Workshop",
      type: "workshop",
    },
  ]

  const communityMembers = [
    {
      name: "Alex Chen",
      project: "Interactive Dashboard",
      progress: 75,
    },
    {
      name: "Maya Johnson",
      project: "Weather Station",
      progress: 40,
    },
    {
      name: "David Park",
      project: "ML Image Classifier",
      progress: 90,
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-slate-50"}`}>
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Curious Nova
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="#"
              className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Projects
            </a>
            <a
              href="#"
              className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              My Learning
            </a>
            <a
              href="#"
              className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Community
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-indigo-600"
              />
              <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Button>
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Notifications (3)</p>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      {
                        title: "New Project Template Available",
                        description: "Check out our latest Arduino Weather Station template",
                        time: "5 minutes ago",
                      },
                      {
                        title: "Community Milestone",
                        description: "Your Machine Learning project inspired 5 other learners",
                        time: "2 hours ago",
                      },
                      {
                        title: "Achievement Unlocked",
                        description: "You've completed your first project milestone!",
                        time: "1 day ago",
                      },
                    ].map((notification, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                              <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{notification.description}</p>
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-xs text-gray-400 dark:text-gray-500">{notification.time}</span>
                              <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                                Mark as read
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                    <a
                      href="#"
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                    >
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <Avatar className="cursor-pointer" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                  JD
                </AvatarFallback>
              </Avatar>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                  </div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <User className="w-4 h-4 inline mr-2" /> My Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <Settings className="w-4 h-4 inline mr-2" /> Account Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <Folder className="w-4 h-4 inline mr-2" /> My Projects
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <Bookmark className="w-4 h-4 inline mr-2" /> Saved Resources
                  </a>
                  <div className="border-t border-gray-100 dark:border-gray-700 mt-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 inline mr-2" /> Sign Out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero/Input Section */}
        <section className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl"></div>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
            <div className="flex flex-col md:flex-row items-center p-8 md:p-16">
              <div className="md:w-1/2 text-left mb-8 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Transform Learning into Building</h2>
                <p className="text-lg md:text-xl text-indigo-100 dark:text-indigo-200 mb-6">
                  Generate personalized projects based on what you've just learned. Turn concepts into hands-on
                  experience.
                </p>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter a concept, paste lecture notes, or describe what you learned"
                      className="w-full pl-4 pr-12 py-4 text-white bg-white/20 border-white/30 focus:ring-2 focus:ring-white/50 rounded-xl placeholder:text-indigo-200 dark:placeholder:text-indigo-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-indigo-200 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                      onClick={handleSearch}
                    >
                      {isProcessing ? <Spinner className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-6">
                    <div className="flex items-center space-x-4">
                      <Label className="text-white">Experience:</Label>
                      <div className="flex bg-white/10 rounded-full p-1 border border-white/20">
                        {["Beginner", "Intermediate", "Advanced"].map((level) => (
                          <button
                            key={level}
                            onClick={() => setExperienceLevel(level)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
                              experienceLevel === level
                                ? "bg-white/30 text-white shadow-sm"
                                : "text-indigo-100 dark:text-indigo-200 hover:bg-white/10"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Label className="text-white">Time:</Label>
                      <div className="flex bg-white/10 rounded-full p-1 border border-white/20">
                        {["Quick", "Medium", "Extended"].map((time) => (
                          <button
                            key={time}
                            onClick={() => setTimeCommitment(time)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${
                              timeCommitment === time
                                ? "bg-white/30 text-white shadow-sm"
                                : "text-indigo-100 dark:text-indigo-200 hover:bg-white/10"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Students exploring creative projects"
                  className="max-w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Project Suggestions Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Recommended Projects</h2>
            <Tabs defaultValue="all" className="w-auto">
              <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="coding"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
                >
                  Coding
                </TabsTrigger>
                <TabsTrigger
                  value="hardware"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
                >
                  Hardware
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
                >
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="research"
                  className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
                >
                  Research
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${
                  selectedProject === project.id ? "ring-2 ring-indigo-500 dark:ring-indigo-400" : ""
                }`}
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge
                        variant={
                          project.difficulty === "Beginner"
                            ? "outline"
                            : project.difficulty === "Intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                        className="dark:border-gray-600"
                      >
                        {project.difficulty}
                      </Badge>
                      <Badge variant="outline" className="ml-2 dark:border-gray-600">
                        <Clock className="w-3 h-3 mr-1" /> {project.time}
                      </Badge>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        project.domain === "coding"
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : project.domain === "hardware"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : project.domain === "design"
                              ? "bg-purple-100 dark:bg-purple-900/30"
                              : "bg-amber-100 dark:bg-amber-900/30"
                      }`}
                    >
                      {project.domain === "coding" && <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                      {project.domain === "hardware" && <Cpu className="w-5 h-5 text-green-600 dark:text-green-400" />}
                      {project.domain === "design" && (
                        <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      )}
                      {project.domain === "research" && (
                        <Flask className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl mt-2 text-gray-900 dark:text-gray-100">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{project.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button
                    variant="default"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                  >
                    <Rocket className="w-4 h-4 mr-2" /> Start Project
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Project Details Panel */}
        {selectedProject && (
          <section className="mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {projects[selectedProject - 1].title}
              </h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                >
                  <Bookmark className="w-4 h-4 mr-2" /> Save for Later
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                >
                  <Share className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {projects[selectedProject - 1].objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-1 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Required Materials</h3>
                  <ul className="space-y-2">
                    {projects[selectedProject - 1].materials.map((material, index) => (
                      <li key={index} className="flex items-start">
                        <Cube className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-1 mr-2" />
                        <span className="text-gray-700 dark:text-gray-300">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Step-by-Step Guidance</h3>
                <div className="space-y-4">
                  {projects[selectedProject - 1].steps.map((step, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300"
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-indigo-600 dark:bg-indigo-700 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                          {index + 1}
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{step}</h4>
                      </div>
                      <div className="pl-8">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Additional guidance for this step will appear here as you progress.
                        </p>
                        <Button
                          variant="link"
                          className="text-indigo-600 dark:text-indigo-400 p-0 h-auto hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          <Lightbulb className="w-3 h-3 mr-1" /> Get AI hint
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 transition-colors duration-300">
                  <div className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mt-1 mr-3" />
                    <div>
                      <h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-1">Pro Tips</h4>
                      <p className="text-indigo-700 dark:text-indigo-300">{projects[selectedProject - 1].tips}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Related Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {["Data Visualization", "JavaScript", "Web Development", "Responsive Design", "User Experience"].map(
                  (concept, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {concept}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

        {/* Learning Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="overflow-hidden h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 dark:bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {resource.type}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{resource.title}</h3>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="dark:border-gray-600 text-gray-600 dark:text-gray-400">
                      Recommended
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
            >
              <Code className="w-4 h-4 mr-2" /> Start with Code Template
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
            >
              <Cube className="w-4 h-4 mr-2" /> Use Project Boilerplate
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
            >
              <GraduationCap className="w-4 h-4 mr-2" /> Find a Tutorial
            </Button>
          </div>
        </section>

        {/* Community Integration & Progress Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Track Your Progress</h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Overall Completion</h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Milestones</h3>
                  <ul className="space-y-3">
                    {["Project Setup", "Core Functionality", "Testing & Debugging", "Final Touches"].map(
                      (milestone, index) => (
                        <li key={index} className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                              index < 2 ? "bg-green-500 dark:bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-600"
                            }`}
                          >
                            {index < 2 && <Check className="w-3 h-3" />}
                          </div>
                          <span
                            className={`${index < 2 ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-300"}`}
                          >
                            {milestone}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                  <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Achievements</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Rocket, label: "First Project", earned: true },
                      { icon: Lightbulb, label: "3-Day Streak", earned: true },
                      { icon: Lightbulb, label: "Creative Solution", earned: true },
                      { icon: Users, label: "Team Player", earned: false },
                      { icon: Code, label: "Code Master", earned: false },
                      { icon: GraduationCap, label: "Expert", earned: false },
                    ].map((badge, index) => {
                      const IconComponent = badge.icon
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                              badge.earned
                                ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                                : "bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="text-xs text-center text-gray-700 dark:text-gray-300">{badge.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Recommended Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="default"
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                  >
                    <Code className="w-4 h-4 mr-2" /> Add Advanced Features
                  </Button>
                  <Button
                    variant="default"
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                  >
                    <Share className="w-4 h-4 mr-2" /> Share Your Project
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                  >
                    <BookOpen className="w-4 h-4 mr-2" /> Explore Related Concepts
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" /> Join a Study Group
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Community</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Others Working on This</h3>
                <ScrollArea className="h-[200px] pr-4">
                  {communityMembers.map((member, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <Avatar className="mr-3">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{member.name}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            <UserPlus className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{member.project}</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${member.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Questions & Help</h3>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {[
                    "How do I connect the temperature sensor to Arduino?",
                    "Best practices for responsive dashboard design?",
                    "Trouble with image classification accuracy",
                  ].map((question, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300"
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300">{question}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">2 answers</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                          Answer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div>
                <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Connect with Mentors</h3>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800 transition-colors duration-300">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-3">
                    Get personalized guidance from experts in your field of interest.
                  </p>
                  <Button
                    variant="default"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" /> Find a Mentor
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="text-white w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold">Curious Nova</h3>
              </div>
              <p className="text-gray-400 dark:text-gray-500 mb-4">
                Transform your learning journey with personalized, hands-on projects that reinforce concepts and build
                real skills.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-400 dark:text-gray-500 mb-4">
                Get weekly updates on new projects and learning resources.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 dark:bg-gray-900 border-gray-700 dark:border-gray-600 text-white rounded-l-lg rounded-r-none border-r-0"
                />
                <Button
                  variant="default"
                  className="rounded-l-none bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700 dark:bg-gray-800" />
          <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
            <p>© 2025 Curious Nova. All rights reserved. | Last updated: June 14, 2025</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
