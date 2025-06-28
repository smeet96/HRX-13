'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetPortal } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const App: React.FC = () => {
const router = useRouter();
// State for filters and view options
const [searchQuery, setSearchQuery] = useState('');
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
const [selectedCategory, setSelectedCategory] = useState('all');
const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([]);
const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
const [sortOption, setSortOption] = useState('newest');
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [selectedProject, setSelectedProject] = useState<number | null>(null);
// Mock data for projects
const projects = [
{
id: 1,
title: "Build a Weather Prediction Model",
difficulty: "Intermediate",
time: "4-6 hours",
domain: "Coding",
category: "Machine Learning",
description: "Create a machine learning model that predicts local weather patterns using historical data and APIs.",
image: "https://readdy.ai/api/search-image?query=A%2520professional%25203D%2520visualization%2520of%2520a%2520weather%2520prediction%2520model%2520interface%2520with%2520data%2520charts%252C%2520cloud%2520patterns%252C%2520and%2520temperature%2520gradients%2520on%2520a%2520sleek%2520digital%2520display%2520with%2520a%2520clean%2520minimal%2520background%2520and%2520soft%2520blue%2520tones&width=400&height=250&seq=1&orientation=landscape",
steps: [
"Set up your development environment",
"Gather weather data from public APIs",
"Clean and preprocess the data",
"Build a simple prediction model",
"Visualize your predictions",
"Test and refine your model"
],
materials: ["Python", "Jupyter Notebook", "Weather API key", "Basic statistics knowledge"],
objectives: ["Learn data preprocessing", "Understand basic ML concepts", "Practice API integration", "Create data visualizations"],
date: "2025-06-01",
popularity: 87
},
{
id: 2,
title: "Arduino Smart Plant Monitor",
difficulty: "Beginner",
time: "2-3 hours",
domain: "Hardware",
category: "IoT",
description: "Build a device that monitors soil moisture and light levels for your plants and sends alerts when they need attention.",
image: "https://readdy.ai/api/search-image?query=A%2520detailed%25203D%2520render%2520of%2520an%2520Arduino-based%2520plant%2520monitoring%2520device%2520with%2520soil%2520moisture%2520sensors%2520and%2520a%2520small%2520display%2520showing%2520plant%2520health%2520metrics%252C%2520next%2520to%2520a%2520healthy%2520green%2520plant%2520on%2520a%2520clean%2520minimal%2520background&width=400&height=250&seq=2&orientation=landscape",
steps: [
"Gather components and tools",
"Connect sensors to Arduino board",
"Write basic monitoring code",
"Test sensor readings",
"Add notification system",
"Design and build enclosure"
],
materials: ["Arduino Uno", "Soil moisture sensor", "Light sensor", "Jumper wires", "Breadboard"],
objectives: ["Learn basic electronics", "Understand sensor integration", "Practice Arduino programming", "Build a useful household device"],
date: "2025-06-05",
popularity: 92
},
{
id: 3,
title: "Interactive Data Visualization Dashboard",
difficulty: "Advanced",
time: "8-10 hours",
domain: "Design",
category: "Web Development",
description: "Create an interactive web dashboard that visualizes complex datasets in an intuitive and engaging way.",
image: "https://readdy.ai/api/search-image?query=A%2520sleek%2520modern%2520data%2520visualization%2520dashboard%2520with%2520multiple%2520interactive%2520charts%252C%2520graphs%252C%2520and%2520data%2520elements%2520in%2520a%2520professional%2520layout%2520with%2520vibrant%2520colors%2520on%2520a%2520clean%2520minimal%2520background%2520with%2520soft%2520gradient%2520lighting&width=400&height=250&seq=3&orientation=landscape",
steps: [
"Define dashboard requirements",
"Select appropriate visualization libraries",
"Design UI wireframes",
"Implement core visualizations",
"Add interactive elements",
"Optimize for performance"
],
materials: ["HTML/CSS/JavaScript", "D3.js or similar library", "Sample dataset", "Web development environment"],
objectives: ["Master data visualization techniques", "Learn interactive web development", "Practice UI/UX design", "Work with complex datasets"],
date: "2025-06-10",
popularity: 78
},
{
id: 4,
title: "Sustainable Energy Research Paper",
difficulty: "Intermediate",
time: "12-15 hours",
domain: "Research",
category: "Environmental Science",
description: "Conduct research on emerging sustainable energy technologies and write a comprehensive analysis paper.",
image: "https://readdy.ai/api/search-image?query=A%2520professional%2520composition%2520showing%2520sustainable%2520energy%2520technologies%2520like%2520solar%2520panels%252C%2520wind%2520turbines%252C%2520and%2520hydroelectric%2520systems%2520with%2520research%2520documents%2520and%2520data%2520charts%2520on%2520a%2520clean%2520minimal%2520background%2520with%2520soft%2520natural%2520lighting&width=400&height=250&seq=4&orientation=landscape",
steps: [
"Define research question",
"Gather academic sources",
"Analyze current technologies",
"Compare efficiency metrics",
"Evaluate implementation challenges",
"Draft and refine paper"
],
materials: ["Access to academic journals", "Data analysis tools", "Reference management software"],
objectives: ["Develop research methodology", "Practice critical analysis", "Improve scientific writing", "Understand energy technologies"],
date: "2025-06-07",
popularity: 65
},
{
id: 5,
title: "Mobile App for Habit Tracking",
difficulty: "Intermediate",
time: "6-8 hours",
domain: "Coding",
category: "Mobile Development",
description: "Build a mobile application that helps users track and maintain positive habits with reminders and progress visualization.",
image: "https://readdy.ai/api/search-image?query=A%2520modern%2520mobile%2520app%2520interface%2520for%2520habit%2520tracking%2520with%2520clean%2520UI%2520elements%2520showing%2520progress%2520charts%2520calendar%2520views%2520and%2520achievement%2520badges%2520on%2520a%2520smartphone%2520display%2520with%2520a%2520minimal%2520background%2520and%2520soft%2520gradient%2520lighting&width=400&height=250&seq=13&orientation=landscape",
steps: [
"Design user interface mockups",
"Set up development environment",
"Implement core tracking features",
"Create data visualization components",
"Add notification system",
"Test on multiple devices"
],
materials: ["React Native or Flutter", "Mobile device for testing", "UI design tools", "Backend service (optional)"],
objectives: ["Learn mobile app development", "Practice UI/UX design", "Implement local storage", "Create engaging visualizations"],
date: "2025-06-12",
popularity: 83
},
{
id: 6,
title: "Smart Home Security System",
difficulty: "Advanced",
time: "10-12 hours",
domain: "Hardware",
category: "IoT",
description: "Build a DIY home security system with motion sensors, cameras, and mobile notifications using Raspberry Pi.",
image: "https://readdy.ai/api/search-image?query=A%2520detailed%25203D%2520render%2520of%2520a%2520smart%2520home%2520security%2520system%2520with%2520a%2520Raspberry%2520Pi%2520connected%2520to%2520cameras%2520and%2520motion%2520sensors%2520with%2520a%2520mobile%2520app%2520interface%2520showing%2520security%2520footage%2520on%2520a%2520clean%2520minimal%2520background%2520with%2520soft%2520ambient%2520lighting&width=400&height=250&seq=14&orientation=landscape",
steps: [
"Set up Raspberry Pi with required OS",
"Connect and configure cameras and sensors",
"Write detection and notification software",
"Create mobile app interface",
"Test system reliability",
"Install in desired locations"
],
materials: ["Raspberry Pi", "Pi Camera or USB camera", "Motion sensors", "Power supply", "SD card", "Networking equipment"],
objectives: ["Learn IoT integration", "Practice Python programming", "Understand sensor networks", "Build practical security solutions"],
date: "2025-05-30",
popularity: 91
},
{
id: 7,
title: "Virtual Reality Art Gallery",
difficulty: "Advanced",
time: "15-20 hours",
domain: "Design",
category: "VR Development",
description: "Create an immersive virtual reality art gallery showcasing 3D artwork and interactive exhibits.",
image: "https://readdy.ai/api/search-image?query=A%2520stunning%2520virtual%2520reality%2520art%2520gallery%2520with%2520floating%25203D%2520artwork%2520digital%2520sculptures%2520and%2520interactive%2520exhibits%2520in%2520a%2520futuristic%2520space%2520with%2520dramatic%2520lighting%2520and%2520impossible%2520architecture%2520on%2520a%2520clean%2520minimal%2520background&width=400&height=250&seq=15&orientation=landscape",
steps: [
"Learn basics of VR development",
"Design gallery space and layout",
"Create or import 3D artwork",
"Implement movement and interaction",
"Add ambient audio and effects",
"Test with VR headset"
],
materials: ["Unity or Unreal Engine", "VR headset (Oculus, HTC Vive, etc.)", "3D modeling software", "Audio editing tools"],
objectives: ["Learn VR development", "Practice 3D modeling", "Understand spatial design", "Create interactive experiences"],
date: "2025-06-03",
popularity: 76
},
{
id: 8,
title: "Biodiversity Mapping Project",
difficulty: "Beginner",
time: "3-5 hours",
domain: "Research",
category: "Environmental Science",
description: "Conduct a local biodiversity survey and create digital maps showing species distribution in your area.",
image: "https://readdy.ai/api/search-image?query=A%2520detailed%2520biodiversity%2520map%2520showing%2520various%2520species%2520distributions%2520with%2520colorful%2520markers%2520and%2520overlays%2520on%2520a%2520geographical%2520map%2520with%2520sample%2520photographs%2520of%2520local%2520flora%2520and%2520fauna%2520on%2520a%2520clean%2520minimal%2520background%2520with%2520natural%2520lighting&width=400&height=250&seq=16&orientation=landscape",
steps: [
"Research local species",
"Design survey methodology",
"Collect field data",
"Organize and analyze findings",
"Create digital maps",
"Share results with community"
],
materials: ["Field guide", "Camera", "GPS device or smartphone", "Mapping software (QGIS, Google Earth)", "Notebook"],
objectives: ["Learn field research techniques", "Practice data collection", "Understand mapping tools", "Contribute to citizen science"],
date: "2025-06-08",
popularity: 72
}
];
// Filter projects based on selected filters
const filteredProjects = projects.filter(project => {
// Filter by search query
if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
!project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
return false;
}
// Filter by category
if (selectedCategory !== 'all' && project.category !== selectedCategory) {
return false;
}
// Filter by difficulty
if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(project.difficulty)) {
return false;
}
// Filter by time range
if (selectedTimeRange.length > 0) {
const projectTime = project.time.split('-')[0];
let match = false;
for (const range of selectedTimeRange) {
if (range === 'short' && parseInt(projectTime) <= 3) match = true;
if (range === 'medium' && parseInt(projectTime) > 3 && parseInt(projectTime) <= 8) match = true;
if (range === 'long' && parseInt(projectTime) > 8) match = true;
}
if (!match) return false;
}
// Filter by domain
if (selectedDomains.length > 0 && !selectedDomains.includes(project.domain)) {
return false;
}
return true;
});
// Sort projects based on selected sort option
const sortedProjects = [...filteredProjects].sort((a, b) => {
if (sortOption === 'newest') {
return new Date(b.date).getTime() - new Date(a.date).getTime();
} else if (sortOption === 'oldest') {
return new Date(a.date).getTime() - new Date(b.date).getTime();
} else if (sortOption === 'popular') {
return b.popularity - a.popularity;
} else if (sortOption === 'az') {
return a.title.localeCompare(b.title);
} else if (sortOption === 'za') {
return b.title.localeCompare(a.title);
}
return 0;
});
// Handle difficulty filter change
const handleDifficultyChange = (difficulty: string) => {
setSelectedDifficulty(prev =>
prev.includes(difficulty)
? prev.filter(d => d !== difficulty)
: [...prev, difficulty]
);
};
// Handle time range filter change
const handleTimeRangeChange = (timeRange: string) => {
setSelectedTimeRange(prev =>
prev.includes(timeRange)
? prev.filter(t => t !== timeRange)
: [...prev, timeRange]
);
};
// Handle domain filter change
const handleDomainChange = (domain: string) => {
setSelectedDomains(prev =>
prev.includes(domain)
? prev.filter(d => d !== domain)
: [...prev, domain]
);
};
// Clear all filters
const clearFilters = () => {
setSearchQuery('');
setSelectedCategory('all');
setSelectedDifficulty([]);
setSelectedTimeRange([]);
setSelectedDomains([]);
setSortOption('newest');
};
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
<a href="https://readdy.ai/home/c720ef4e-af14-410b-b640-c259f294cc92/83fa1565-b513-4366-a080-fd767d90de95" data-readdy="true" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">Home</a>
<a href="#" className="text-indigo-600 font-medium border-b-2 border-indigo-600 px-3 py-2 text-sm">Projects</a>
<a href="#" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">My Learning</a>
<a href="#" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">Community</a>
</nav>
</div>
<div className="flex items-center space-x-4">
<button className="text-gray-500 hover:text-gray-700 cursor-pointer">
<i className="fas fa-bell text-lg"></i>
</button>
<Avatar className="cursor-pointer">
<img src="https://readdy.ai/api/search-image?query=Professional%2520headshot%2520of%2520a%2520young%2520diverse%2520student%2520with%2520a%2520friendly%2520smile%2520and%2520modern%2520casual%2520attire%2520against%2520a%2520clean%2520neutral%2520background%2520with%2520soft%2520lighting%2520perfect%2520for%2520a%2520profile%2520picture&width=40&height=40&seq=8&orientation=squarish" alt="User profile" />
</Avatar>
</div>
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/* Page Header */}
<div className="mb-8">
<div className="flex flex-col md:flex-row md:items-center md:justify-between">
<div>
<h1 className="text-3xl font-bold text-gray-900">Projects</h1>
<p className="mt-1 text-gray-500">Discover and explore projects to enhance your learning journey</p>
</div>
<div className="mt-4 md:mt-0">
<a  data-readdy="true">
<Button onClick={() => router.push('/project')} className="!rounded-button whitespace-nowrap">
<i className="fas fa-plus mr-2"></i> Create Project
</Button>
</a>
</div>
</div>
</div>
{/* Search and Filter Bar */}
<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
<div className="flex flex-col md:flex-row md:items-center gap-4">
<div className="relative flex-grow">
<Input
type="text"
placeholder="Search projects..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="pl-10 pr-4 py-2 border-gray-300 text-sm"
/>
<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
<i className="fas fa-search text-gray-400"></i>
</div>
</div>
<div className="flex flex-wrap gap-2">
<Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
<DialogTrigger asChild>
<Button variant="outline" className="!rounded-button whitespace-nowrap">
<i className="fas fa-filter mr-2"></i> Filters
</Button>
</DialogTrigger>
<DialogContent className="w-[400px] max-h-[80vh] overflow-y-auto">
<DialogHeader>
<DialogTitle>Filter Projects</DialogTitle>
<DialogDescription>
Refine your project search with these filters
</DialogDescription>
</DialogHeader>
<div className="py-4 space-y-6">
<div>
<h3 className="text-sm font-medium text-gray-900 mb-3">Difficulty Level</h3>
<div className="space-y-2">
{['Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
<div key={difficulty} className="flex items-center">
<Checkbox
id={`difficulty-${difficulty}`}
checked={selectedDifficulty.includes(difficulty)}
onCheckedChange={() => handleDifficultyChange(difficulty)}
/>
<label
htmlFor={`difficulty-${difficulty}`}
className="ml-2 text-sm text-gray-700"
>
{difficulty}
</label>
</div>
))}
</div>
</div>
<div>
<h3 className="text-sm font-medium text-gray-900 mb-3">Time Requirement</h3>
<div className="space-y-2">
<div className="flex items-center">
<Checkbox
id="time-short"
checked={selectedTimeRange.includes('short')}
onCheckedChange={() => handleTimeRangeChange('short')}
/>
<label htmlFor="time-short" className="ml-2 text-sm text-gray-700">
Short (1-3 hours)
</label>
</div>
<div className="flex items-center">
<Checkbox
id="time-medium"
checked={selectedTimeRange.includes('medium')}
onCheckedChange={() => handleTimeRangeChange('medium')}
/>
<label htmlFor="time-medium" className="ml-2 text-sm text-gray-700">
Medium (4-8 hours)
</label>
</div>
<div className="flex items-center">
<Checkbox
id="time-long"
checked={selectedTimeRange.includes('long')}
onCheckedChange={() => handleTimeRangeChange('long')}
/>
<label htmlFor="time-long" className="ml-2 text-sm text-gray-700">
Long (8+ hours)
</label>
</div>
</div>
</div>
<div>
<h3 className="text-sm font-medium text-gray-900 mb-3">Domain</h3>
<div className="space-y-2">
{['Coding', 'Hardware', 'Design', 'Research'].map((domain) => (
<div key={domain} className="flex items-center">
<Checkbox
id={`domain-${domain}`}
checked={selectedDomains.includes(domain)}
onCheckedChange={() => handleDomainChange(domain)}
/>
<label
htmlFor={`domain-${domain}`}
className="ml-2 text-sm text-gray-700"
>
{domain}
</label>
</div>
))}
</div>
</div>
<div className="pt-4 flex justify-between">
<Button
variant="outline"
onClick={clearFilters}
className="!rounded-button whitespace-nowrap"
>
Clear Filters
</Button>
<Button
onClick={() => setIsFilterOpen(false)}
className="!rounded-button whitespace-nowrap"
>
Apply Filters
</Button>
</div>
</div>
</DialogContent>
</Dialog>
<Select value={sortOption} onValueChange={setSortOption}>
<SelectTrigger className="w-[180px] !rounded-button">
<SelectValue placeholder="Sort by" />
</SelectTrigger>
<SelectContent>
<SelectItem value="newest">Newest First</SelectItem>
<SelectItem value="oldest">Oldest First</SelectItem>
<SelectItem value="popular">Most Popular</SelectItem>
<SelectItem value="az">A-Z</SelectItem>
<SelectItem value="za">Z-A</SelectItem>
</SelectContent>
</Select>
<div className="flex border rounded-md overflow-hidden">
<button
onClick={() => setViewMode('grid')}
className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'} cursor-pointer !rounded-button`}
>
<i className="fas fa-th-large"></i>
</button>
<button
onClick={() => setViewMode('list')}
className={`px-3 py-2 ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-500'} cursor-pointer !rounded-button`}
>
<i className="fas fa-list"></i>
</button>
</div>
</div>
</div>
{/* Category Pills */}
<div className="mt-4 flex flex-wrap gap-2">
<Badge
variant={selectedCategory === 'all' ? 'default' : 'outline'}
className="cursor-pointer !rounded-button"
onClick={() => setSelectedCategory('all')}
>
All Categories
</Badge>
<Badge
variant={selectedCategory === 'Machine Learning' ? 'default' : 'outline'}
className="cursor-pointer !rounded-button"
onClick={() => setSelectedCategory('Machine Learning')}
>
<i className="fas fa-brain mr-1"></i> Machine Learning
</Badge>
<Badge
variant={selectedCategory === 'IoT' ? 'default' : 'outline'}
className="cursor-pointer !rounded-button"
onClick={() => setSelectedCategory('IoT')}
>
<i className="fas fa-microchip mr-1"></i> IoT
</Badge>
<Badge
variant={selectedCategory === 'Web Development' ? 'default' : 'outline'}
className="cursor-pointer !rounded-button"
onClick={() => setSelectedCategory('Web Development')}
>
<i className="fas fa-globe mr-1"></i> Web Development
</Badge>
<Badge
variant={selectedCategory === 'Mobile Development' ? 'default' : 'outline'}
className="cursor-pointer !rounded-button"
onClick={() => setSelectedCategory('Mobile Development')}
>
<i className="fas fa-mobile-alt mr-1"></i> Mobile Development
</Badge>
<Badge
variant={selectedCategory === 'VR Development' ? 'default' : 'outline'}
className="cursor-pointer !rounded-button"
onClick={() => setSelectedCategory('VR Development')}
>
<i className="fas fa-vr-cardboard mr-1"></i> VR Development
</Badge>
<Badge
variant={selectedCategory === 'Environmental Science' ? 'default' : 'outline'}
className="cursor-pointer !rounded-button"
onClick={() => setSelectedCategory('Environmental Science')}
>
<i className="fas fa-leaf mr-1"></i> Environmental Science
</Badge>
</div>
{/* Active Filters */}
{(selectedDifficulty.length > 0 || selectedTimeRange.length > 0 || selectedDomains.length > 0) && (
<div className="mt-4 flex flex-wrap items-center gap-2">
<span className="text-sm text-gray-500">Active filters:</span>
{selectedDifficulty.map(difficulty => (
<Badge key={difficulty} variant="secondary" className="!rounded-button">
{difficulty}
<button
onClick={() => handleDifficultyChange(difficulty)}
className="ml-1 text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</Badge>
))}
{selectedTimeRange.map(time => (
<Badge key={time} variant="secondary" className="!rounded-button">
{time === 'short' ? 'Short (1-3h)' : time === 'medium' ? 'Medium (4-8h)' : 'Long (8h+)'}
<button
onClick={() => handleTimeRangeChange(time)}
className="ml-1 text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</Badge>
))}
{selectedDomains.map(domain => (
<Badge key={domain} variant="secondary" className="!rounded-button">
{domain}
<button
onClick={() => handleDomainChange(domain)}
className="ml-1 text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</Badge>
))}
<Button
variant="ghost"
size="sm"
onClick={clearFilters}
className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap"
>
Clear all
</Button>
</div>
)}
</div>
{/* Results Count */}
<div className="mb-6 flex justify-between items-center">
<p className="text-sm text-gray-500">
Showing {sortedProjects.length} {sortedProjects.length === 1 ? 'project' : 'projects'}
</p>
<a
href="https://readdy.ai/home/c720ef4e-af14-410b-b640-c259f294cc92/83fa1565-b513-4366-a080-fd767d90de95"
data-readdy="true"
className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
>
<i className="fas fa-arrow-left mr-1"></i> Back to Home
</a>
</div>
{/* Projects Grid/List View */}
{sortedProjects.length > 0 ? (
viewMode === 'grid' ? (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{sortedProjects.map((project) => (
<Card
key={project.id}
className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
onClick={() => setSelectedProject(project.id)}
>
<div className="relative h-[200px] overflow-hidden">
<img
src={project.image}
alt={project.title}
className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
/>
<div className="absolute top-2 right-2">
<Badge className={`
${project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
'bg-red-100 text-red-800'} !rounded-button
`}>
{project.difficulty}
</Badge>
</div>
</div>
<div className="p-5">
<div className="flex justify-between items-start mb-2">
<h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
<Badge variant="outline" className="!rounded-button">
{project.domain}
</Badge>
</div>
<p className="text-gray-600 text-sm mb-4">{project.description}</p>
<div className="flex justify-between items-center">
<span className="text-xs text-gray-500">
<i className="far fa-clock mr-1"></i> {project.time}
</span>
<div className="flex space-x-2">
<TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
<i className="far fa-bookmark"></i>
</Button>
</TooltipTrigger>
<TooltipContent>
<p>Save Project</p>
</TooltipContent>
</Tooltip>
</TooltipProvider>
<Button size="sm" className="!rounded-button whitespace-nowrap">
Start <i className="fas fa-arrow-right ml-1"></i>
</Button>
</div>
</div>
</div>
</Card>
))}
</div>
) : (
<div className="space-y-4">
{sortedProjects.map((project) => (
<Card
key={project.id}
className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
onClick={() => setSelectedProject(project.id)}
>
<div className="flex flex-col md:flex-row">
<div className="md:w-1/4 h-[200px] md:h-auto relative">
<img
src={project.image}
alt={project.title}
className="w-full h-full object-cover"
/>
<div className="absolute top-2 right-2">
<Badge className={`
${project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
'bg-red-100 text-red-800'} !rounded-button
`}>
{project.difficulty}
</Badge>
</div>
</div>
<div className="p-5 md:w-3/4">
<div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
<h3 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">{project.title}</h3>
<div className="flex flex-wrap gap-2">
<Badge variant="outline" className="!rounded-button">
{project.domain}
</Badge>
<Badge variant="secondary" className="!rounded-button">
{project.category}
</Badge>
</div>
</div>
<p className="text-gray-600 text-sm mb-4">{project.description}</p>
<div className="flex flex-col md:flex-row md:justify-between md:items-center">
<div className="flex items-center space-x-4 mb-3 md:mb-0">
<span className="text-xs text-gray-500">
<i className="far fa-clock mr-1"></i> {project.time}
</span>
<span className="text-xs text-gray-500">
<i className="far fa-calendar-alt mr-1"></i> {new Date(project.date).toLocaleDateString()}
</span>
<span className="text-xs text-gray-500">
<i className="fas fa-fire mr-1"></i> {project.popularity} popularity
</span>
</div>
<div className="flex space-x-2">
<TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
<i className="far fa-bookmark"></i>
</Button>
</TooltipTrigger>
<TooltipContent>
<p>Save Project</p>
</TooltipContent>
</Tooltip>
</TooltipProvider>
<TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
<Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
<i className="fas fa-share-alt"></i>
</Button>
</TooltipTrigger>
<TooltipContent>
<p>Share Project</p>
</TooltipContent>
</Tooltip>
</TooltipProvider>
<Button size="sm" className="!rounded-button whitespace-nowrap">
Start Project <i className="fas fa-arrow-right ml-1"></i>
</Button>
</div>
</div>
</div>
</div>
</Card>
))}
</div>
)
) : (
<div className="text-center py-12">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
<i className="fas fa-search text-2xl"></i>
</div>
<h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
<p className="text-gray-500 max-w-md mx-auto">
We couldn't find any projects matching your current filters. Try adjusting your search criteria or clearing filters.
</p>
<Button
variant="outline"
onClick={clearFilters}
className="mt-4 !rounded-button whitespace-nowrap"
>
Clear all filters
</Button>
</div>
)}
{/* Pagination */}
{sortedProjects.length > 0 && (
<div className="mt-8 flex justify-center">
<nav className="flex items-center space-x-2">
<Button variant="outline" size="sm" disabled className="!rounded-button whitespace-nowrap">
<i className="fas fa-chevron-left mr-1"></i> Previous
</Button>
<Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-600 !rounded-button whitespace-nowrap">1</Button>
<Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">2</Button>
<Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">3</Button>
<span className="px-2 text-gray-500">...</span>
<Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">8</Button>
<Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
Next <i className="fas fa-chevron-right ml-1"></i>
</Button>
</nav>
</div>
)}
</main>
{/* Project Detail Modal */}
<Dialog open={selectedProject !== null} onOpenChange={(open: boolean) => !open && setSelectedProject(null)}>
<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
{selectedProject !== null && (
<>
<DialogHeader>
<DialogTitle className="text-2xl">{projects[selectedProject - 1].title}</DialogTitle>
<DialogDescription>
<div className="flex flex-wrap gap-2 mt-2">
<Badge className={`
${projects[selectedProject - 1].difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
projects[selectedProject - 1].difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
'bg-red-100 text-red-800'} !rounded-button
`}>
{projects[selectedProject - 1].difficulty}
</Badge>
<Badge variant="outline" className="!rounded-button">
{projects[selectedProject - 1].domain}
</Badge>
<Badge variant="secondary" className="!rounded-button">
{projects[selectedProject - 1].category}
</Badge>
</div>
</DialogDescription>
</DialogHeader>
<div className="relative h-[300px] overflow-hidden rounded-md mt-4">
<img
src={projects[selectedProject - 1].image}
alt={projects[selectedProject - 1].title}
className="w-full h-full object-cover"
/>
</div>
<div className="mt-6">
<h3 className="text-lg font-medium mb-2">Project Description</h3>
<p className="text-gray-700">{projects[selectedProject - 1].description}</p>
<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<h3 className="text-lg font-medium mb-3">Step-by-Step Instructions</h3>
<ol className="space-y-2 list-decimal list-inside text-gray-700">
{projects[selectedProject - 1].steps.map((step, index) => (
<li key={index} className="pl-2">{step}</li>
))}
</ol>
</div>
<div>
<h3 className="text-lg font-medium mb-3">Required Materials</h3>
<ul className="space-y-2 list-disc list-inside text-gray-700">
{projects[selectedProject - 1].materials.map((material, index) => (
<li key={index} className="pl-2">{material}</li>
))}
</ul>
<h3 className="text-lg font-medium mt-6 mb-3">Learning Objectives</h3>
<ul className="space-y-2 text-gray-700">
{projects[selectedProject - 1].objectives.map((objective, index) => (
<li key={index} className="flex items-start">
<i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
<span>{objective}</span>
</li>
))}
</ul>
</div>
</div>
<div className="mt-6">
<h3 className="text-lg font-medium mb-3">Project Details</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Time Required</div>
<div className="font-medium">{projects[selectedProject - 1].time}</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Difficulty</div>
<div className="font-medium">{projects[selectedProject - 1].difficulty}</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Domain</div>
<div className="font-medium">{projects[selectedProject - 1].domain}</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Category</div>
<div className="font-medium">{projects[selectedProject - 1].category}</div>
</div>
</div>
</div>
<div className="mt-8 flex justify-between">
<div className="flex space-x-2">
<Button variant="outline" className="!rounded-button whitespace-nowrap">
<i className="far fa-bookmark mr-2"></i> Save
</Button>
<Button variant="outline" className="!rounded-button whitespace-nowrap">
<i className="fas fa-share-alt mr-2"></i> Share
</Button>
</div>
<div>
<Button className="!rounded-button whitespace-nowrap">
Start Project <i className="fas fa-arrow-right ml-2"></i>
</Button>
</div>
</div>
</div>
</>
)}
</DialogContent>
</Dialog>
{/* Footer */}
<footer className="bg-gray-900 text-white mt-16">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div>
<div className="flex items-center mb-4">
<div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
CN
</div>
<span className="ml-2 text-xl font-bold">Curious Nova</span>
</div>
<p className="text-gray-400 text-sm">
Transforming learning into building, one project at a time.
</p>
<div className="flex space-x-4 mt-4">
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-facebook"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-instagram"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white cursor-pointer">
<i className="fab fa-github"></i>
</a>
</div>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Resources</h3>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Documentation</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Tutorials</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Blog</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Community Forum</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Company</h3>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">About Us</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Careers</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Contact</a></li>
<li><a href="#" className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Subscribe</h3>
<p className="text-gray-400 text-sm mb-4">
Get the latest updates and news directly to your inbox.
</p>
<div className="flex">
<Input
type="email"
placeholder="Your email"
className="bg-gray-800 border-gray-700 text-white rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
/>
<Button className="rounded-l-none !rounded-button whitespace-nowrap">
Subscribe
</Button>
</div>
</div>
</div>
<div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
<p className="text-gray-400 text-sm">
© 2025 Curious Nova. All rights reserved.
</p>
<div className="flex space-x-6 mt-4 md:mt-0">
<a href="#" className="text-gray-400 hover:text-white text-sm cursor-pointer">Terms of Service</a>
<a href="#" className="text-gray-400 hover:text-white text-sm cursor-pointer">Privacy Policy</a>
<a href="#" className="text-gray-400 hover:text-white text-sm cursor-pointer">Cookie Policy</a>
</div>
</div>
</div>
</footer>
{/* Back to Top Button */}
<button
onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors cursor-pointer !rounded-button"
>
<i className="fas fa-arrow-up"></i>
</button>
</div>
);
};
export default App