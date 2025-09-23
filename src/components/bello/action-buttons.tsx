'use client';

import { useContext, RefObject } from 'react';
import { AppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { FileDown, Lightbulb, Microscope, BookOpen, Globe, MessageSquareQuote } from 'lucide-react';
import ExampleSelector from './example-selector';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface ActionButtonsProps {
  topic: string;
  content: string;
  contentRef:  RefObject<HTMLDivElement>;
}

export default function ActionButtons({ topic, content, contentRef }: ActionButtonsProps) {
  const { refineExplanation, simplifyResponse, isLoading } = useContext(AppContext);

  const handleDownload = () => {
    if (contentRef.current) {
      const input = contentRef.current;
      html2canvas(input, {
        scale: 2, // Increase resolution
        useCORS: true, 
        backgroundColor: '#ffffff' // Set a white background to avoid transparent areas
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${topic.replace(/ /g, '_')}.pdf`);
      });
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
      <Button
          variant="outline"
          size="sm"
          onClick={() => simplifyResponse(topic, content)}
          disabled={isLoading}
        >
          <MessageSquareQuote className="mr-2 h-4 w-4" />
          Explain This Response
        </Button>
      <Button variant="outline" size="sm" onClick={handleDownload} disabled={isLoading}>
        <FileDown className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
}
