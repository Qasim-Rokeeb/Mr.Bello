'use client';

import { useContext, RefObject } from 'react';
import { AppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { FileDown, Lightbulb, Microscope, BookOpen, Globe } from 'lucide-react';
import ExampleSelector from './example-selector';


interface ActionButtonsProps {
  topic: string;
  contentRef:  RefObject<HTMLDivElement>;
}

export default function ActionButtons({ topic, contentRef }: ActionButtonsProps) {
  const { refineExplanation, isLoading } = useContext(AppContext);

  const handleDownload = () => {
    if (contentRef.current) {
        const printableContent = contentRef.current.innerHTML;
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Mr.Bello Explanation</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                        <style>
                            @media print {
                                body { font-family: sans-serif; }
                                .no-print { display: none; }
                            }
                        </style>
                    </head>
                    <body class="p-8">
                        <h1 class="text-2xl font-bold mb-4">Topic: ${topic}</h1>
                        <div>${printableContent}</div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            // Timeout to allow content to load before printing
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    }
  };

  const actions = [
    { label: 'Simplify', icon: Lightbulb, refinement: 'simplify' as const },
    { label: 'Technical', icon: Microscope, refinement: 'technical' as const },
    { label: 'Resources', icon: BookOpen, refinement: 'resources' as const },
    { label: 'Applications', icon: Globe, refinement: 'applications' as const },
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-2 border-t pt-3">
      {actions.map(action => (
        <Button 
            key={action.label} 
            variant="outline" 
            size="sm" 
            onClick={() => refineExplanation(topic, action.refinement)}
            disabled={isLoading}
        >
            <action.icon className="mr-2 h-4 w-4" />
            {action.label}
        </Button>
      ))}
      <ExampleSelector topic={topic} />
      <Button variant="outline" size="sm" onClick={handleDownload}>
        <FileDown className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
}
