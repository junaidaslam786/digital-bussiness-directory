"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const services = [
        {
            id: "1",
            name: "IT Consultation",
            description: "Expert technology consulting for businesses of all sizes",
            price: "From ₩500,000/month",
            duration: "Ongoing",
        },
        {
            id: "2",
            name: "Software Development",
            description: "Custom software solutions tailored to your needs",
            price: "From ₩10,000,000",
            duration: "3-6 months",
        },
        {
            id: "3",
            name: "Cloud Migration",
            description: "Seamless transition to cloud infrastructure",
            price: "From ₩5,000,000",
            duration: "1-2 months",
        },
    ];

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Services
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage your service offerings
                    </p>
                </div>
                <Link href="/dashboard/services/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Service
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search services..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                        <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <CardTitle className="text-lg">{service.name}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {service.description}
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Price:</span>
                                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                        {service.price}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                        {service.duration}
                                    </Badge>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Link href={`/dashboard/services/${service.id}/edit`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
