import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Contact } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";

import React, { useState, useEffect } from "react";
import { DialogHeader, Dialog, DialogTitle, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useForm } from "@inertiajs/react";

interface List {
    id: number;
    title: string;
    description: string | null;
    task_count?: number;
}

interface props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lists',
        href: '/Lists',
    },
];

export default function ListsIndex({ lists, flash }: props) {
    const [isOpen, SetIsOpen] = useState(false);
    const [editingList, SetEditingList] = useState<List | null>(null);
    const [showToast, SetShowToast] = useState(false);
    const [toastMessage, setToastMassage] = useState('');
    const [toastType, SetToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        if (flash?.success) {
            setToastMassage(flash.success);
            SetToastType('success');
            SetShowToast(true);
        } else if (flash?.error) {
            setToastMassage(flash.error);
            SetToastType('error');
            SetShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                SetShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingList) {
            put(route('lists.update', editingList.id), {
                onSuccess: () => {
                    SetIsOpen(false);
                    reset();
                    SetEditingList(null);
                },
            });
        } else {
            post(route('lists.store'), {
                onSuccess: () => {
                    SetIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (list: List) => {
        SetEditingList(list);
        setData({
            title: list.title,
            description: list.description || '',
        });
        SetIsOpen(true);
    };

    const handleDelete = (listId: number) => {
    destroy(route('lists.destroy', listId), {
        onSuccess: () => {
            setToastMassage('List deleted successfully');
            SetToastType('success');
            SetShowToast(true);
        },
        onError: () => {
            setToastMassage('Failed to delete the list');
            SetToastType('error');
            SetShowToast(true);
        },
    });
};
    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lists" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showToast && (
                    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animation-in fade-in slide-in-form-top-5`}>
                        {toastType === 'success' ? (
                            <CheckCircle2 className="h-5 w-5" />
                        ) : (
                            <XCircle className="h-5 w-5" />
                        )}
                        <span>{toastMessage}</span>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Lists</h2>
                    <Dialog open={isOpen} onOpenChange={SetIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                New List
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingList ? 'Edit List' : 'Create New List'}</DialogTitle>
                            </DialogHeader>

                            {/* 💡 Enhanced form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
                                    <input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        className="w-full rounded-md border border-gray-600 bg-black/20 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Enter list title"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-md border border-gray-600 bg-black/20 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Add a description (optional)"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {editingList ? 'Update' : 'Create'}
                                </button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lists.map((list) => (
                        <Card key={list.id} className="hover:bg-accent/50 transition-colors">
                            <CardHeader className="flex flex-row item-center justify-between space-y-0 pd-2">
                                <CardTitle className="text-lg font-medium">{list.title}</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(list)} className="h-8 w-8">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(list.id)} className="text-destructive hover:text-destructive/90">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{list.description || 'no description'}</p>
                                {list.task_count !== undefined && (
                                    <p className="text-sm text-muted-foreground mt-2">{list.task_count} tasks</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );

}