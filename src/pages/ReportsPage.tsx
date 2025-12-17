import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BarChart, PieChart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function ReportsPage() {
  const reports = [
    { title: "Monthly Patient Volume", date: "Oct 2023", type: "Analytics", icon: BarChart },
    { title: "Department Efficiency", date: "Q3 2023", type: "Performance", icon: PieChart },
    { title: "Clinical Outcomes Summary", date: "Sep 2023", type: "Clinical", icon: FileText },
    { title: "Pharmacy Inventory Log", date: "Weekly", type: "Inventory", icon: FileText },
  ];
  return (
    <AppLayout container contentClassName="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Access clinical insights and operational metrics.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, i) => (
          <Card key={i} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                <report.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded">
                {report.type}
              </span>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="text-base mb-1 group-hover:text-primary transition-colors">
                {report.title}
              </CardTitle>
              <CardDescription>
                Generated: {report.date}
              </CardDescription>
              <Button variant="ghost" size="sm" className="mt-4 w-full justify-between text-muted-foreground group-hover:text-foreground">
                View Report
                <Download className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {/* Empty State / Coming Soon */}
        <Card className="border-dashed flex flex-col items-center justify-center p-6 text-center bg-muted/10">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg">Custom Report</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Create a new custom report based on specific metrics.
          </p>
          <Button variant="secondary">Create New</Button>
        </Card>
      </div>
    </AppLayout>
  );
}
import { Plus } from 'lucide-react';