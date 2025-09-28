
'use client';

import { UploadCloud } from 'lucide-react';

export function FileUploadZone() {
  return (
    <div className="relative w-full rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
      <div className="dashed-gradient-border rounded-lg">
        <div className="flex flex-col items-center justify-center gap-4 rounded-md bg-background p-8 text-center">
          <div className="rounded-full border-4 border-muted bg-muted/50 p-4">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              Drop a file or click to upload
            </p>
            <p className="text-sm text-muted-foreground">
              Upload a PDF, document, or image to start learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
