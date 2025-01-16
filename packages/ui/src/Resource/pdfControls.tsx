import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../button";
import { Input } from "../input";

export interface PDFControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  allowDownload: boolean;
  onDownload: () => void;
}

export function PDFControls({
  currentPage,
  totalPages,
  onPageChange,
  allowDownload,
  onDownload,
}: PDFControlsProps) {
  return (
    totalPages >= 1 && (
      <div className="flex items-center justify-between w-full p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center space-x-2">
          {currentPage === 1 && (
            <Button onClick={() => onPageChange(currentPage - 1)}>
              <ChevronLeft />
            </Button>
          )}
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="w-16 text-center"
          />
          {currentPage > totalPages && (
            <div>
              <span>of {totalPages}</span>
              <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
        {allowDownload && <Button onClick={onDownload}>Download</Button>}
      </div>
    )
  );
}
