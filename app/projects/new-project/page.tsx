"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    service: "",
    location: "",
    image: "",
    details: {
      category: "",
      service: "",
      location: "",
      year: "",
      area: "",
      description: "",
      fullDescription: "",
      description2: "",
      images: [] as string[]
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name in formData.details) {
      setFormData({
        ...formData,
        details: { ...formData.details, [name]: value }
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        router.push('/projects')
      }
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <h1 className="text-2xl font-bold">Add New Project</h1>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter project title"
                        className="mt-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        placeholder="project-slug"
                        className="mt-3"
                      />
                    </div>
                  
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        value={formData.details.category}
                        onChange={handleInputChange}
                        placeholder="Residential/Commercial"
                        className="mt-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service</Label>
                      <Input
                        id="service"
                        name="service"
                        value={formData.details.service}
                        onChange={handleInputChange}
                        placeholder="Interior Design"
                        className="mt-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.details.location}
                        onChange={handleInputChange}
                        placeholder="Dubai, UAE"
                        className="mt-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        name="year"
                        value={formData.details.year}
                        onChange={handleInputChange}
                        placeholder="2024"
                        className="mt-3"
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">Area</Label>
                      <Input
                        id="area"
                        name="area"
                        value={formData.details.area}
                        onChange={handleInputChange}
                        placeholder="2,500 sq ft"
                        className="mt-3"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Project Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="mt-3"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.details.description}
                      onChange={handleInputChange}
                      placeholder="Brief project description"
                      rows={3}
                      className="mt-3"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fullDescription">Full Description</Label>
                    <Textarea
                      id="fullDescription"
                      name="fullDescription"
                      value={formData.details.fullDescription}
                      onChange={handleInputChange}
                      placeholder="Detailed project description"
                      rows={5}
                      className="mt-3"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description2">Additional Description (Optional)</Label>
                    <Textarea
                      id="description2"
                      name="description2"
                      value={formData.details.description2}
                      onChange={handleInputChange}
                      placeholder="Additional project details"
                      rows={3}
                      className="mt-3"
                    />
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Project'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => router.push('/projects')}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}