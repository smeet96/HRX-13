// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const App: React.FC = () => {
const router = useRouter();
// State for the multi-step form
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({
title: '',
description: '',
category: '',
domain: '',
difficulty: '',
timeHours: 2,
steps: [{ title: '', description: '' }],
materials: [{ name: '', required: true }],
objectives: [''],
images: [] as File[],
imageUrls: [] as string[],
tags: [] as string[],
currentTag: ''
});
const [errors, setErrors] = useState<Record<string, string>>({});
const [previewMode, setPreviewMode] = useState(false);
// Handle input changes
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
// Clear error when field is filled
if (errors[name] && value.trim()) {
const newErrors = { ...errors };
delete newErrors[name];
setErrors(newErrors);
}
};
// Handle step changes
const handleNextStep = () => {
const newErrors: Record<string, string> = {};
// Validation for each step
if (currentStep === 1) {
if (!formData.title.trim()) newErrors.title = 'Project title is required';
if (!formData.description.trim()) newErrors.description = 'Project description is required';
if (!formData.category) newErrors.category = 'Category is required';
if (!formData.domain) newErrors.domain = 'Domain is required';
} else if (currentStep === 2) {
if (!formData.difficulty) newErrors.difficulty = 'Difficulty level is required';
} else if (currentStep === 3) {
const invalidSteps = formData.steps.some(step => !step.title.trim() || !step.description.trim());
if (invalidSteps) newErrors.steps = 'All steps must have a title and description';
} else if (currentStep === 4) {
const invalidMaterials = formData.materials.some(material => !material.name.trim());
if (invalidMaterials) newErrors.materials = 'All materials must have a name';
const invalidObjectives = formData.objectives.some(objective => !objective.trim());
if (invalidObjectives) newErrors.objectives = 'All objectives must be filled';
}
if (Object.keys(newErrors).length > 0) {
setErrors(newErrors);
return;
}
if (currentStep < 6) {
setCurrentStep(currentStep + 1);
window.scrollTo(0, 0);
}
};
const handlePreviousStep = () => {
if (currentStep > 1) {
setCurrentStep(currentStep - 1);
window.scrollTo(0, 0);
}
};
// Handle step-specific actions
const handleAddStep = () => {
setFormData({
...formData,
steps: [...formData.steps, { title: '', description: '' }]
});
};
const handleRemoveStep = (index: number) => {
const updatedSteps = [...formData.steps];
updatedSteps.splice(index, 1);
setFormData({ ...formData, steps: updatedSteps });
};
const handleStepChange = (index: number, field: string, value: string) => {
const updatedSteps = [...formData.steps];
updatedSteps[index] = { ...updatedSteps[index], [field]: value };
setFormData({ ...formData, steps: updatedSteps });
// Clear step error if all steps are valid
if (errors.steps && formData.steps.every(step => step.title.trim() && step.description.trim())) {
const newErrors = { ...errors };
delete newErrors.steps;
setErrors(newErrors);
}
};
const handleAddMaterial = () => {
setFormData({
...formData,
materials: [...formData.materials, { name: '', required: true }]
});
};
const handleRemoveMaterial = (index: number) => {
const updatedMaterials = [...formData.materials];
updatedMaterials.splice(index, 1);
setFormData({ ...formData, materials: updatedMaterials });
};
const handleMaterialChange = (index: number, field: string, value: any) => {
const updatedMaterials = [...formData.materials];
updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
setFormData({ ...formData, materials: updatedMaterials });
// Clear material error if all materials are valid
if (errors.materials && formData.materials.every(material => material.name.trim())) {
const newErrors = { ...errors };
delete newErrors.materials;
setErrors(newErrors);
}
};
const handleAddObjective = () => {
setFormData({
...formData,
objectives: [...formData.objectives, '']
});
};
const handleRemoveObjective = (index: number) => {
const updatedObjectives = [...formData.objectives];
updatedObjectives.splice(index, 1);
setFormData({ ...formData, objectives: updatedObjectives });
};
const handleObjectiveChange = (index: number, value: string) => {
const updatedObjectives = [...formData.objectives];
updatedObjectives[index] = value;
setFormData({ ...formData, objectives: updatedObjectives });
// Clear objective error if all objectives are valid
if (errors.objectives && formData.objectives.every(objective => objective.trim())) {
const newErrors = { ...errors };
delete newErrors.objectives;
setErrors(newErrors);
}
};
const handleAddTag = () => {
if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
setFormData({
...formData,
tags: [...formData.tags, formData.currentTag.trim()],
currentTag: ''
});
}
};
const handleRemoveTag = (tag: string) => {
setFormData({
...formData,
tags: formData.tags.filter(t => t !== tag)
});
};
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files) {
const filesArray = Array.from(e.target.files);
const newImageUrls = filesArray.map(file => URL.createObjectURL(file));
setFormData({
...formData,
images: [...formData.images, ...filesArray],
imageUrls: [...formData.imageUrls, ...newImageUrls]
});
}
};
const handleRemoveImage = (index: number) => {
const updatedImages = [...formData.images];
const updatedImageUrls = [...formData.imageUrls];
// Release object URL to prevent memory leaks
URL.revokeObjectURL(updatedImageUrls[index]);
updatedImages.splice(index, 1);
updatedImageUrls.splice(index, 1);
setFormData({
...formData,
images: updatedImages,
imageUrls: updatedImageUrls
});
};
const handleSubmit = () => {
// Here you would typically send the data to your backend
console.log("Project submitted:", formData);
// Redirect to projects page or show success message
alert("Project successfully created!");
};
const handleSaveDraft = () => {
// Save current form state as draft
console.log("Draft saved:", formData);
alert("Draft saved successfully!");
};
// Render the form steps
const renderStepContent = () => {
switch (currentStep) {
case 1:
return (
<div className="space-y-6">
<div className="space-y-2">
<Label htmlFor="title" className="text-base font-medium">
Project Title <span className="text-red-500">*</span>
</Label>
<Input
id="title"
name="title"
value={formData.title}
onChange={handleInputChange}
placeholder="Enter a descriptive title for your project"
className={`text-base ${errors.title ? 'border-red-500' : ''}`}
/>
{errors.title && (
<p className="text-red-500 text-sm">{errors.title}</p>
)}
</div>
<div className="space-y-2">
<Label htmlFor="description" className="text-base font-medium">
Project Description <span className="text-red-500">*</span>
</Label>
<Textarea
id="description"
name="description"
value={formData.description}
onChange={handleInputChange}
placeholder="Provide a detailed description of your project"
className={`min-h-[120px] text-base ${errors.description ? 'border-red-500' : ''}`}
/>
{errors.description && (
<p className="text-red-500 text-sm">{errors.description}</p>
)}
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<Label htmlFor="category" className="text-base font-medium">
Category <span className="text-red-500">*</span>
</Label>
<Select
value={formData.category}
onValueChange={(value: string) => {
setFormData({ ...formData, category: value });
if (errors.category) {
const newErrors = { ...errors };
delete newErrors.category;
setErrors(newErrors);
}
}}
>
<SelectTrigger className={`text-base ${errors.category ? 'border-red-500' : ''} !rounded-button`}>
<SelectValue placeholder="Select a category" />
</SelectTrigger>
<SelectContent>
<SelectItem value="Machine Learning">Machine Learning</SelectItem>
<SelectItem value="IoT">IoT</SelectItem>
<SelectItem value="Web Development">Web Development</SelectItem>
<SelectItem value="Mobile Development">Mobile Development</SelectItem>
<SelectItem value="VR Development">VR Development</SelectItem>
<SelectItem value="Environmental Science">Environmental Science</SelectItem>
<SelectItem value="Robotics">Robotics</SelectItem>
<SelectItem value="Data Science">Data Science</SelectItem>
</SelectContent>
</Select>
{errors.category && (
<p className="text-red-500 text-sm">{errors.category}</p>
)}
</div>
<div className="space-y-2">
<Label htmlFor="domain" className="text-base font-medium">
Domain <span className="text-red-500">*</span>
</Label>
<div className="grid grid-cols-2 gap-3">
{['Coding', 'Hardware', 'Design', 'Research'].map((domain) => (
<div
key={domain}
className={`border rounded-lg p-4 cursor-pointer transition-all ${
formData.domain === domain
? 'border-indigo-500 bg-indigo-50'
: 'border-gray-200 hover:border-indigo-300'
} ${errors.domain ? 'border-red-500' : ''}`}
onClick={() => {
setFormData({ ...formData, domain });
if (errors.domain) {
const newErrors = { ...errors };
delete newErrors.domain;
setErrors(newErrors);
}
}}
>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 mb-2">
<i className={`fas ${
domain === 'Coding' ? 'fa-code' :
domain === 'Hardware' ? 'fa-microchip' :
domain === 'Design' ? 'fa-paint-brush' :
'fa-flask'
} text-indigo-600 text-xl`}></i>
</div>
<span className="font-medium">{domain}</span>
</div>
</div>
))}
</div>
{errors.domain && (
<p className="text-red-500 text-sm">{errors.domain}</p>
)}
</div>
</div>
</div>
);
case 2:
return (
<div className="space-y-8">
<div className="space-y-4">
<Label className="text-base font-medium">
Difficulty Level <span className="text-red-500">*</span>
</Label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{['Beginner', 'Intermediate', 'Advanced'].map((level) => (
<div
key={level}
className={`border rounded-lg p-5 cursor-pointer transition-all ${
formData.difficulty === level
? 'border-indigo-500 bg-indigo-50'
: 'border-gray-200 hover:border-indigo-300'
} ${errors.difficulty ? 'border-red-500' : ''}`}
onClick={() => {
setFormData({ ...formData, difficulty: level });
if (errors.difficulty) {
const newErrors = { ...errors };
delete newErrors.difficulty;
setErrors(newErrors);
}
}}
>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 flex items-center justify-center rounded-full mb-3 text-white text-xl font-bold bg-gradient-to-br from-indigo-500 to-indigo-700">
{level === 'Beginner' ? 'B' : level === 'Intermediate' ? 'I' : 'A'}
</div>
<h3 className="font-semibold text-lg mb-2">{level}</h3>
<p className="text-gray-600 text-sm">
{level === 'Beginner'
? 'Perfect for newcomers with little to no experience.'
: level === 'Intermediate'
? 'Requires some prior knowledge and skills.'
: 'Challenging projects for experienced learners.'}
</p>
</div>
</div>
))}
</div>
{errors.difficulty && (
<p className="text-red-500 text-sm">{errors.difficulty}</p>
)}
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<Label htmlFor="timeHours" className="text-base font-medium">
Estimated Time Requirement (hours)
</Label>
<span className="text-indigo-600 font-medium">{formData.timeHours} hours</span>
</div>
<Slider
id="timeHours"
min={1}
max={24}
step={1}
value={[formData.timeHours]}
onValueChange={(value: number[]) => setFormData({ ...formData, timeHours: value[0] })}
className="py-4"
/>
<div className="flex justify-between text-sm text-gray-500">
<span>1 hour</span>
<span>12 hours</span>
<span>24 hours</span>
</div>
</div>
<Card className="bg-indigo-50 border-indigo-100">
<div className="p-5">
<div className="flex items-start">
<div className="flex-shrink-0 mt-1">
<i className="fas fa-info-circle text-indigo-600 text-lg"></i>
</div>
<div className="ml-3">
<h3 className="font-medium text-indigo-800">Time Commitment Breakdown</h3>
<div className="mt-3 space-y-2 text-sm text-indigo-700">
<div className="flex justify-between">
<span>Setup time:</span>
<span className="font-medium">{Math.round(formData.timeHours * 0.2)} hours</span>
</div>
<div className="flex justify-between">
<span>Core development:</span>
<span className="font-medium">{Math.round(formData.timeHours * 0.6)} hours</span>
</div>
<div className="flex justify-between">
<span>Testing & refinement:</span>
<span className="font-medium">{Math.round(formData.timeHours * 0.2)} hours</span>
</div>
<Separator className="my-2 bg-indigo-200" />
<div className="flex justify-between font-medium">
<span>Total estimated time:</span>
<span>{formData.timeHours} hours</span>
</div>
</div>
</div>
</div>
</div>
</Card>
</div>
);
case 3:
return (
<div className="space-y-6">
<div className="flex justify-between items-center">
<h3 className="text-lg font-medium">Step-by-Step Instructions</h3>
<Button
variant="outline"
onClick={handleAddStep}
className="!rounded-button whitespace-nowrap"
>
<i className="fas fa-plus mr-2"></i> Add Step
</Button>
</div>
{errors.steps && (
<Alert variant="destructive">
<AlertCircle className="h-4 w-4" />
<AlertTitle>Error</AlertTitle>
<AlertDescription>{errors.steps}</AlertDescription>
</Alert>
)}
<div className="space-y-6">
{formData.steps.map((step, index) => (
<Card key={index} className="relative">
<div className="absolute -left-4 top-4 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
{index + 1}
</div>
<div className="p-5 pl-8">
<div className="space-y-4">
<div className="flex justify-between items-center">
<Label htmlFor={`step-title-${index}`} className="text-base font-medium">
Step Title <span className="text-red-500">*</span>
</Label>
{formData.steps.length > 1 && (
<Button
variant="ghost"
size="sm"
onClick={() => handleRemoveStep(index)}
className="text-red-500 hover:text-red-700 hover:bg-red-50 !rounded-button whitespace-nowrap"
>
<i className="fas fa-trash-alt mr-1"></i> Remove
</Button>
)}
</div>
<Input
id={`step-title-${index}`}
value={step.title}
onChange={(e) => handleStepChange(index, 'title', e.target.value)}
placeholder="Enter step title"
className="text-base"
/>
<Label htmlFor={`step-description-${index}`} className="text-base font-medium">
Step Description <span className="text-red-500">*</span>
</Label>
<Textarea
id={`step-description-${index}`}
value={step.description}
onChange={(e) => handleStepChange(index, 'description', e.target.value)}
placeholder="Provide detailed instructions for this step"
className="min-h-[100px] text-base"
/>
</div>
</div>
</Card>
))}
</div>
{formData.steps.length < 10 && (
<div className="flex justify-center">
<Button
variant="outline"
onClick={handleAddStep}
className="w-full max-w-md !rounded-button whitespace-nowrap"
>
<i className="fas fa-plus mr-2"></i> Add Another Step
</Button>
</div>
)}
</div>
);
case 4:
return (
<div className="space-y-8">
<div className="space-y-4">
<div className="flex justify-between items-center">
<h3 className="text-lg font-medium">Required Materials</h3>
<Button
variant="outline"
onClick={handleAddMaterial}
className="!rounded-button whitespace-nowrap"
>
<i className="fas fa-plus mr-2"></i> Add Material
</Button>
</div>
{errors.materials && (
<Alert variant="destructive">
<AlertCircle className="h-4 w-4" />
<AlertTitle>Error</AlertTitle>
<AlertDescription>{errors.materials}</AlertDescription>
</Alert>
)}
<div className="space-y-3">
{formData.materials.map((material, index) => (
<div key={index} className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
<Checkbox
id={`material-required-${index}`}
checked={material.required}
onCheckedChange={(checked: boolean) =>
handleMaterialChange(index, 'required', checked === true)
}
/>
<Input
value={material.name}
onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
placeholder="Material name"
className="flex-grow text-base border-none"
/>
{formData.materials.length > 1 && (
<Button
variant="ghost"
size="sm"
onClick={() => handleRemoveMaterial(index)}
className="text-red-500 hover:text-red-700 hover:bg-red-50 !rounded-button whitespace-nowrap"
>
<i className="fas fa-times"></i>
</Button>
)}
</div>
))}
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<h3 className="text-lg font-medium">Learning Objectives</h3>
<Button
variant="outline"
onClick={handleAddObjective}
className="!rounded-button whitespace-nowrap"
>
<i className="fas fa-plus mr-2"></i> Add Objective
</Button>
</div>
{errors.objectives && (
<Alert variant="destructive">
<AlertCircle className="h-4 w-4" />
<AlertTitle>Error</AlertTitle>
<AlertDescription>{errors.objectives}</AlertDescription>
</Alert>
)}
<div className="space-y-3">
{formData.objectives.map((objective, index) => (
<div key={index} className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
<div className="flex-shrink-0 text-indigo-600">
<i className="fas fa-check-circle"></i>
</div>
<Input
value={objective}
onChange={(e) => handleObjectiveChange(index, e.target.value)}
placeholder="What will learners achieve?"
className="flex-grow text-base border-none"
/>
{formData.objectives.length > 1 && (
<Button
variant="ghost"
size="sm"
onClick={() => handleRemoveObjective(index)}
className="text-red-500 hover:text-red-700 hover:bg-red-50 !rounded-button whitespace-nowrap"
>
<i className="fas fa-times"></i>
</Button>
)}
</div>
))}
</div>
</div>
<div className="space-y-4">
<h3 className="text-lg font-medium">Skills & Tags</h3>
<p className="text-gray-600 text-sm">
Add tags to help others find your project. These could be technologies, concepts, or skills.
</p>
<div className="flex space-x-2">
<Input
value={formData.currentTag}
onChange={(e) => setFormData({ ...formData, currentTag: e.target.value })}
placeholder="Add a skill or tag"
className="text-base"
onKeyPress={(e) => {
if (e.key === 'Enter') {
e.preventDefault();
handleAddTag();
}
}}
/>
<Button
onClick={handleAddTag}
className="!rounded-button whitespace-nowrap"
>
Add
</Button>
</div>
<div className="flex flex-wrap gap-2 mt-3">
{formData.tags.map((tag, index) => (
<Badge key={index} variant="secondary" className="text-base py-2 px-3 !rounded-button">
{tag}
<button
onClick={() => handleRemoveTag(tag)}
className="ml-2 text-gray-500 hover:text-gray-700"
>
<i className="fas fa-times"></i>
</button>
</Badge>
))}
{formData.tags.length === 0 && (
<p className="text-gray-500 text-sm italic">No tags added yet</p>
)}
</div>
</div>
</div>
);
case 5:
return (
<div className="space-y-6">
<div className="space-y-4">
<h3 className="text-lg font-medium">Project Images</h3>
<p className="text-gray-600 text-sm">
Upload images that showcase your project. These could be diagrams, screenshots, or photos of the final result.
</p>
<div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
<input
type="file"
id="image-upload"
multiple
accept="image/*"
onChange={handleImageUpload}
className="hidden"
/>
<label
htmlFor="image-upload"
className="cursor-pointer flex flex-col items-center justify-center"
>
<div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
<i className="fas fa-cloud-upload-alt text-indigo-600 text-2xl"></i>
</div>
<h4 className="font-medium text-lg mb-2">Drag and drop or click to upload</h4>
<p className="text-gray-500 text-sm max-w-md mx-auto">
Supported formats: JPG, PNG, GIF. Maximum file size: 5MB.
</p>
</label>
</div>
{formData.imageUrls.length > 0 && (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
{formData.imageUrls.map((url, index) => (
<div key={index} className="relative group">
<div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
<img
src={url}
alt={`Project image ${index + 1}`}
className="w-full h-full object-cover"
/>
</div>
<button
onClick={() => handleRemoveImage(index)}
className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer !rounded-button"
>
<i className="fas fa-trash-alt"></i>
</button>
<div className="mt-2">
<Input
placeholder={`Caption for image ${index + 1}`}
className="text-sm"
/>
</div>
</div>
))}
</div>
)}
</div>
<div className="bg-indigo-50 rounded-lg p-5">
<div className="flex items-start">
<div className="flex-shrink-0 mt-1">
<i className="fas fa-lightbulb text-indigo-600 text-lg"></i>
</div>
<div className="ml-3">
<h3 className="font-medium text-indigo-800">Tips for Great Project Images</h3>
<ul className="mt-2 space-y-1 text-sm text-indigo-700 list-disc list-inside">
<li>Include images that clearly show the completed project</li>
<li>Add diagrams or sketches to explain complex concepts</li>
<li>Show the project from multiple angles if applicable</li>
<li>Use good lighting and clear, focused shots</li>
<li>Consider adding before/after or step-by-step images</li>
</ul>
</div>
</div>
</div>
</div>
);
case 6:
return (
<div className="space-y-8">
<div className="flex justify-between items-center">
<h3 className="text-lg font-medium">Project Preview</h3>
<div className="flex space-x-2">
<Button
variant={previewMode ? "default" : "outline"}
onClick={() => setPreviewMode(true)}
className="!rounded-button whitespace-nowrap"
>
<i className="fas fa-eye mr-2"></i> Preview
</Button>
<Button
variant={!previewMode ? "default" : "outline"}
onClick={() => setPreviewMode(false)}
className="!rounded-button whitespace-nowrap"
>
<i className="fas fa-edit mr-2"></i> Edit
</Button>
</div>
</div>
{previewMode ? (
<div className="bg-white rounded-lg border shadow-sm overflow-hidden">
<div className="relative h-[300px] overflow-hidden">
{formData.imageUrls.length > 0 ? (
<img
src={formData.imageUrls[0]}
alt={formData.title}
className="w-full h-full object-cover"
/>
) : (
<div className="w-full h-full bg-gray-200 flex items-center justify-center">
<p className="text-gray-500">No project image available</p>
</div>
)}
<div className="absolute top-4 right-4">
<Badge className={`
${formData.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
formData.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
'bg-red-100 text-red-800'} !rounded-button
`}>
{formData.difficulty}
</Badge>
</div>
</div>
<div className="p-6">
<div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
<h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{formData.title || "Untitled Project"}</h1>
<div className="flex flex-wrap gap-2">
<Badge variant="outline" className="!rounded-button">
{formData.domain || "No Domain"}
</Badge>
<Badge variant="secondary" className="!rounded-button">
{formData.category || "No Category"}
</Badge>
</div>
</div>
<p className="text-gray-700 mb-6">{formData.description || "No description provided."}</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
<div>
<h3 className="text-lg font-medium mb-4">Step-by-Step Instructions</h3>
<ol className="space-y-4 list-decimal list-inside text-gray-700">
{formData.steps.map((step, index) => (
<li key={index} className="pl-2">
<span className="font-medium">{step.title || `Step ${index + 1}`}</span>
<p className="mt-1 ml-6 text-gray-600">{step.description || "No description provided."}</p>
</li>
))}
</ol>
</div>
<div>
<h3 className="text-lg font-medium mb-4">Required Materials</h3>
<ul className="space-y-2 text-gray-700">
{formData.materials.map((material, index) => (
<li key={index} className="flex items-start">
<div className="flex-shrink-0 mt-1">
{material.required ? (
<i className="fas fa-check-circle text-green-500"></i>
) : (
<i className="fas fa-circle text-gray-300"></i>
)}
</div>
<span className="ml-2">{material.name || `Material ${index + 1}`}</span>
</li>
))}
</ul>
<h3 className="text-lg font-medium mt-6 mb-4">Learning Objectives</h3>
<ul className="space-y-2 text-gray-700">
{formData.objectives.map((objective, index) => (
<li key={index} className="flex items-start">
<i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
<span>{objective || `Objective ${index + 1}`}</span>
</li>
))}
</ul>
</div>
</div>
<div className="mb-6">
<h3 className="text-lg font-medium mb-4">Project Details</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Time Required</div>
<div className="font-medium">{formData.timeHours} hours</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Difficulty</div>
<div className="font-medium">{formData.difficulty || "Not specified"}</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Domain</div>
<div className="font-medium">{formData.domain || "Not specified"}</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="text-sm text-gray-500">Category</div>
<div className="font-medium">{formData.category || "Not specified"}</div>
</div>
</div>
</div>
{formData.tags.length > 0 && (
<div className="mb-6">
<h3 className="text-lg font-medium mb-3">Skills & Tags</h3>
<div className="flex flex-wrap gap-2">
{formData.tags.map((tag, index) => (
<Badge key={index} variant="secondary" className="!rounded-button">
{tag}
</Badge>
))}
</div>
</div>
)}
{formData.imageUrls.length > 1 && (
<div className="mb-6">
<h3 className="text-lg font-medium mb-3">Project Gallery</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
{formData.imageUrls.slice(1).map((url, index) => (
<div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
<img
src={url}
alt={`Project image ${index + 2}`}
className="w-full h-full object-cover"
/>
</div>
))}
</div>
</div>
)}
</div>
</div>
) : (
<div className="space-y-6">
<Card className="p-5 bg-amber-50 border-amber-200">
<div className="flex">
<div className="flex-shrink-0">
<i className="fas fa-exclamation-circle text-amber-500 text-xl"></i>
</div>
<div className="ml-3">
<h3 className="font-medium text-amber-800">Final Review</h3>
<p className="text-amber-700 text-sm mt-1">
Please review all the information you've provided before submitting your project.
Click the "Preview" button above to see how your project will appear to others.
</p>
</div>
</div>
</Card>
<div className="space-y-4">
<div className="flex justify-between">
<h3 className="font-medium">Basic Information</h3>
<Button
variant="ghost"
size="sm"
onClick={() => setCurrentStep(1)}
className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap"
>
Edit
</Button>
</div>
<div className="bg-gray-50 rounded-lg p-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<p className="text-sm text-gray-500">Title</p>
<p className="font-medium">{formData.title || "Not provided"}</p>
</div>
<div>
<p className="text-sm text-gray-500">Category</p>
<p className="font-medium">{formData.category || "Not selected"}</p>
</div>
<div>
<p className="text-sm text-gray-500">Domain</p>
<p className="font-medium">{formData.domain || "Not selected"}</p>
</div>
<div>
<p className="text-sm text-gray-500">Description</p>
<p className="font-medium line-clamp-2">{formData.description || "Not provided"}</p>
</div>
</div>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between">
<h3 className="font-medium">Difficulty & Time</h3>
<Button
variant="ghost"
size="sm"
onClick={() => setCurrentStep(2)}
className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap"
>
Edit
</Button>
</div>
<div className="bg-gray-50 rounded-lg p-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<p className="text-sm text-gray-500">Difficulty Level</p>
<p className="font-medium">{formData.difficulty || "Not selected"}</p>
</div>
<div>
<p className="text-sm text-gray-500">Time Requirement</p>
<p className="font-medium">{formData.timeHours} hours</p>
</div>
</div>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between">
<h3 className="font-medium">Steps, Materials & Objectives</h3>
<div className="space-x-2">
<Button
variant="ghost"
size="sm"
onClick={() => setCurrentStep(3)}
className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap"
>
Edit Steps
</Button>
<Button
variant="ghost"
size="sm"
onClick={() => setCurrentStep(4)}
className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap"
>
Edit Materials
</Button>
</div>
</div>
<div className="bg-gray-50 rounded-lg p-4">
<div className="space-y-4">
<div>
<p className="text-sm text-gray-500">Number of Steps</p>
<p className="font-medium">{formData.steps.length}</p>
</div>
<div>
<p className="text-sm text-gray-500">Number of Materials</p>
<p className="font-medium">{formData.materials.length}</p>
</div>
<div>
<p className="text-sm text-gray-500">Number of Learning Objectives</p>
<p className="font-medium">{formData.objectives.length}</p>
</div>
<div>
<p className="text-sm text-gray-500">Tags</p>
<div className="flex flex-wrap gap-2 mt-1">
{formData.tags.length > 0 ? (
formData.tags.map((tag, index) => (
<Badge key={index} variant="secondary" className="!rounded-button">
{tag}
</Badge>
))
) : (
<p className="text-sm italic">No tags added</p>
)}
</div>
</div>
</div>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between">
<h3 className="font-medium">Images</h3>
<Button
variant="ghost"
size="sm"
onClick={() => setCurrentStep(5)}
className="text-indigo-600 hover:text-indigo-800 !rounded-button whitespace-nowrap"
>
Edit
</Button>
</div>
<div className="bg-gray-50 rounded-lg p-4">
{formData.imageUrls.length > 0 ? (
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
{formData.imageUrls.map((url, index) => (
<div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
<img
src={url}
alt={`Project image ${index + 1}`}
className="w-full h-full object-cover"
/>
</div>
))}
</div>
) : (
<p className="text-sm italic">No images uploaded</p>
)}
</div>
</div>
</div>
)}
</div>
);
default:
return null;
}
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
<Link href="/" data-readdy="true" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">Home</Link>
<Link href="/projects" data-readdy="true" className="text-indigo-600 font-medium border-b-2 border-indigo-600 px-3 py-2 text-sm">Projects</Link>
<Link href="https://readdy.ai/home/c720ef4e-af14-410b-b640-c259f294cc92/379cab85-8202-4578-92bb-4ab86c9dcf19" data-readdy="true" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">My Learning</Link>
<Link href="#" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">Community</Link>
</nav>
</div>
<div className="flex items-center space-x-4">
<button className="text-gray-500 hover:text-gray-700 cursor-pointer">
<i className="fas fa-bell text-lg"></i>
</button>
<Avatar className="cursor-pointer">
<img src="https://readdy.ai/api/search-image?query=Professional%252520headshot%252520of%252520a%252520young%252520diverse%252520student%252520with%252520a%252520friendly%252520smile%252520and%252520modern%252520casual%252520attire%252520against%252520a%252520clean%252520neutral%252520background%252520with%252520soft%252520lighting%252520perfect%252520for%252520a%252520profile%252520picture&width=40&height=40&seq=8&orientation=squarish" alt="User profile" />
</Avatar>
</div>
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-64px-200px)]">
{/* Page Header */}
<div className="mb-8">
<div className="flex items-center space-x-2 mb-2">
<a
href="https://readdy.ai/home/c720ef4e-af14-410b-b640-c259f294cc92/8e39c929-c61b-494e-ada4-e8633877da16"
data-readdy="true"
className="text-indigo-600 hover:text-indigo-800 flex items-center cursor-pointer"
>
<i className="fas fa-arrow-left mr-1"></i> Back to Projects
</a>
</div>
<h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
<p className="mt-2 text-gray-600">
Share your knowledge and expertise by creating a project that others can learn from and build upon.
</p>
</div>
{/* Progress Bar */}
<div className="mb-8">
<div className="flex justify-between mb-2">
<span className="text-sm font-medium text-gray-700">Step {currentStep} of 6</span>
<span className="text-sm font-medium text-indigo-600">{Math.round((currentStep / 6) * 100)}% Complete</span>
</div>
<Progress value={Math.round((currentStep / 6) * 100)} className="h-2" />
</div>
{/* Step Tabs */}
<Tabs value={currentStep.toString()} className="mb-8">
<TabsList className="grid grid-cols-6 w-full">
<TabsTrigger
value="1"
onClick={() => setCurrentStep(1)}
className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
>
Basics
</TabsTrigger>
<TabsTrigger
value="2"
onClick={() => setCurrentStep(2)}
className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
>
Difficulty
</TabsTrigger>
<TabsTrigger
value="3"
onClick={() => setCurrentStep(3)}
className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
>
Steps
</TabsTrigger>
<TabsTrigger
value="4"
onClick={() => setCurrentStep(4)}
className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
>
Materials
</TabsTrigger>
<TabsTrigger
value="5"
onClick={() => setCurrentStep(5)}
className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
>
Images
</TabsTrigger>
<TabsTrigger
value="6"
onClick={() => setCurrentStep(6)}
className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 cursor-pointer !rounded-button whitespace-nowrap"
>
Preview
</TabsTrigger>
</TabsList>
</Tabs>
{/* Form Content */}
<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
{renderStepContent()}
</div>
{/* Navigation Buttons */}
<div className="flex justify-between items-center">
<div>
{currentStep > 1 && (
<Button
variant="outline"
onClick={handlePreviousStep}
className="!rounded-button whitespace-nowrap"
>
<i className="fas fa-arrow-left mr-2"></i> Previous Step
</Button>
)}
</div>
<div className="flex space-x-3">
<Button
variant="outline"
onClick={handleSaveDraft}
className="!rounded-button whitespace-nowrap"
>
<i className="far fa-save mr-2"></i> Save Draft
</Button>
{currentStep < 6 ? (
<Button
onClick={handleNextStep}
className="!rounded-button whitespace-nowrap"
>
Next Step <i className="fas fa-arrow-right ml-2"></i>
</Button>
) : (
<Button
onClick={handleSubmit}
className="bg-green-600 hover:bg-green-700 !rounded-button whitespace-nowrap"
>
<i className="fas fa-check mr-2"></i> Submit Project
</Button>
)}
</div>
</div>
</main>
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
</div>
);
};
export default App