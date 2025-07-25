import PlaceholderPattern from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { List, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Props {
    stats?: {
        totalLists: number;
        totalTasks: number;
        completedTasks: number;
        pendingTasks: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    stats = {
        totalLists: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
    },
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Dashboard' />
            <div className='flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background to-muted/20'>
            <div className='flex justify-between items-center'>
                <div>
                <h1 className='text-3x1 font-bold tracking-tight'>Dashboard</h1> 
                <p className='text-muted-foreground mt-1'> Welcome back! here's your overview</p>
                </div>
                <div className='flex gaps-2'>
                    <Link href={route('lists.index')}>
                    <Button className='bg-primary hover:bg-primary/90 text-white shadow-lg'>
                    <List className='h-4 w-4 mr-2'/>
                    view lists
                    </Button>
                    </Link>
                    
                    <Link href={route('tasks.index')}>
                    <Button className='bg-primary hover-bg-primary/90 text-white shadow-lg'>
                    <CheckCircle className='h-4 w-4 mr-2'/>
                    views asks
                    </Button>
                    </Link>
                </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card className='bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20'>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 gb-2'>
                    <CardTitle className='text-sm font-medium text-blue-500'>
                    totalLists
                    </CardTitle>
                    <List className='h-4 w-4 text-blue-500'/>
                </CardHeader>
                <CardContent>
                    <div className='text-sm font-bold text-blue-500'>{stats.totalLists}</div>
                    <p className='text-xs text-muted-foreground'>
                        Your tasks lists
                    </p>
                </CardContent>
                </Card>
                <Card className=''>

                </Card>
            </div>
            </div>
        </AppLayout>
    );
}