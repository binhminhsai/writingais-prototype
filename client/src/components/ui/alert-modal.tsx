import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  showIcon?: boolean;
}

export function AlertModal({ isOpen, onClose, title, message, showIcon = true }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-4">
          {showIcon && (
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          {message}
        </p>
        
        <div className="flex justify-end">
          <Button 
            onClick={onClose}
            className="bg-[#1fb2aa] hover:bg-[#0d9488] text-white px-6"
            data-testid="button-alert-ok"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}