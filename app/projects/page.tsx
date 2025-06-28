'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  User, 
  BookOpen,
  Code,
  Cpu,
  Palette,
  FlaskRoundIcon as Flask
} from "lucide-react";

const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Interactive Data Visualization Dashboard",
      difficulty: "Intermediate",
      time: "3-4 hours",
      domain: "coding",
      description: "Build a responsive dashboard that visualizes complex datasets using D3.js or Chart.js libraries.",
      author: "Sarah Chen",
      authorAvatar: "https://readdy.ai/api/search-image?query=Professional%252520headshot%252520of%252520a%252520young%252520diverse%252520student%252520with%252520a%252520friendly%252520smile%252520and%252520modern%252520casual%252520attire%252520against%252520a%252520clean%252520neutral%252520background%252520with%252520soft%252520lighting%252520perfect%252520for%252520a%252520profile%252520picture&width=40&height=40&seq=8&orientation=squarish",
      progress: 85,
      tags: ["JavaScript", "D3.js", "Data Visualization"]
    },
    {
      id: 2,
      title: "Arduino Weather Station",
      difficulty: "Advanced",
      time: "8-10 hours",
      domain: "hardware",
      description: "Create a DIY weather station that measures temperature, humidity, and pressure with real-time data display.",
      author: "Mike Rodriguez",
      authorAvatar: "https://readdy.ai/api/search-image?query=Professional%252520headshot%252520of%252520a%252520young%252520diverse%252520student%252520with%252520a%252520friendly%252520smile%252520and%252520modern%252520casual%252520attire%252520against%252520a%252520clean%252520neutral%252520background%252520with%252520soft%252520lighting%252520perfect%252520for%252520a%252520profile%252520picture&width=40&height=40&seq=8&orientation=squarish",
      progress: 60,
      tags: ["Arduino", "Sensors", "IoT"]
    },
    {
      id: 3,
      title: "Mobile App Prototype",
      difficulty: "Beginner",
      time: "2-3 hours",
      domain: "design",
      description: "Design a clickable prototype for a mobile app focused on habit tracking using Figma or Adobe XD.",
      author: "Emma Thompson",
      authorAvatar: "https://readdy.ai/api/search-image?query=Professional%252520headshot%252520of%252520a%252520young%252520diverse%252520student%252520with%252520a%252520friendly%252520smile%252520and%252520modern%252520casual%252520attire%252520against%252520a%252520clean%252520neutral%252520background%252520with%252520soft%252520lighting%252520perfect%252520for%252520a%252520profile%252520picture&width=40&height=40&seq=8&orientation=squarish",
      progress: 100,
      tags: ["Figma", "UI/UX", "Prototyping"]
    },
    {
      id: 4,
      title: "Machine Learning Image Classifier",
      difficulty: "Intermediate",
      time: "5-6 hours",
      domain: "coding",
      description: "Build an ML model that can identify and classify images using TensorFlow or PyTorch.",
      author: "Alex Kim",
      authorAvatar: "https://readdy.ai/api/search-image?query=Professional%252520headshot%252520of%252520a%252520young%252520diverse%252520student%252520with%252520a%252520friendly%252520smile%252520and%252520modern%252520casual%252520attire%252520against%252520a%252520clean%252520neutral%252520background%252520with%252520soft%252520lighting%252520perfect%252520for%252520a%252520profile%252520picture&width=40&height=40&seq=8&orientation=squarish",
      progress: 45,
      tags: ["Python", "TensorFlow", "Machine Learning"]
    },
    {
      id: 5,
      title: "Research Literature Review",
      difficulty: "Advanced",
      time: "10-12 hours",
      domain: "research",
      description: "Conduct a comprehensive literature review on an emerging technology or scientific concept.",
      author: "Dr. James Wilson",
      authorAvatar: "https://readdy.ai/api/search-image?query=Professional%252520headshot%252520of%252520a%252520young%252520diverse%252520student%252520with%252520a%252520friendly%252520smile%252520and%252520modern%252520casual%252520attire%252520against%252520a%252520clean%252520neutral%252520background%252520with%252520soft%252520lighting%252520perfect%252520for%252520a%252520profile%252520picture&width=40&height=40&seq=8&orientation=squarish",
      progress: 30,
      tags: ["Research", "Academic Writing", "Literature Review"]
    }
  ];

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'coding': return <Code className="w-4 h-4" />;
      case 'hardware': return <Cpu className="w-4 h-4" />;
      case 'design': return <Palette className="w-4 h-4" />;
      case 'research': return <Flask className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === "all" || project.domain === selectedDomain;
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesDomain && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                    CN
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">Curious Nova</span>
                </div>
              </div>
              <nav className="ml-10 flex space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">Home</Link>
                <Link href="/projects" className="text-indigo-600 font-medium border-b-2 border-indigo-600 px-3 py-2 text-sm">Projects</Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">My Learning</Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">Community</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <i className="fas fa-bell text-lg"></i>
              </button>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://readdy.ai/api/search-image?query=Professional%252520headshot%252520of%252520a%252520young%252520diverse%252520student%252520with%252520a%252520friendly%252520smile%252520and%252520modern%252520casual%252520attire%252520against%252520a%252520clean%252520neutral%252520background%252520with%252520soft%252520lighting%252520perfect%252520for%252520a%252520profile%252520picture&width=40&height=40&seq=8&orientation=squarish" alt="User profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Explore Projects</h1>
              <p className="mt-2 text-gray-600">
                Discover hands-on projects to enhance your skills and knowledge
              </p>
            </div>
            <Link href="/project">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Domains</option>
                <option value="coding">Coding</option>
                <option value="hardware">Hardware</option>
                <option value="design">Design</option>
                <option value="research">Research</option>
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    {getDomainIcon(project.domain)}
                    <Badge variant="outline" className="text-xs">
                      {project.domain.charAt(0).toUpperCase() + project.domain.slice(1)}
                    </Badge>
                  </div>
                  <Badge className={`text-xs ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.time}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {project.author}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage; 