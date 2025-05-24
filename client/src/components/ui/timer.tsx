
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TimerProps {
  time: string;
  onTimeSelect?: (minutes: number) => void;
  isRunning?: boolean;
}

export function Timer({ time, onTimeSelect, isRunning = false }: TimerProps) {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("30");

  useEffect(() => {
    if (isRunning) {
      setOpen(false);
    }
  }, [isRunning]);

  const handleConfirm = () => {
    const minutes = parseInt(selectedTime, 10);
    onTimeSelect?.(minutes);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center bg-gray-100 px-2 py-0.5 rounded-md text-gray-600 cursor-pointer h-6 hover:bg-gray-200 transition-colors">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          <span className="font-mono text-sm">{time}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Time Limit</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500 mb-4">
            Setting a time limit will help you practice under exam conditions.
          </p>
          <RadioGroup
            value={selectedTime}
            onValueChange={setSelectedTime}
            className="flex flex-col space-y-4"
          >
            <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <RadioGroupItem value="20" id="time-20" />
              <Label htmlFor="time-20" className="cursor-pointer">20 minutes</Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <RadioGroupItem value="30" id="time-30" />
              <Label htmlFor="time-30" className="cursor-pointer">30 minutes</Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <RadioGroupItem value="40" id="time-40" />
              <Label htmlFor="time-40" className="cursor-pointer">40 minutes</Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <RadioGroupItem value="60" id="time-60" />
              <Label htmlFor="time-60" className="cursor-pointer">60 minutes</Label>
            </div>
            <div className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-md cursor-pointer">
              <RadioGroupItem value="0" id="time-0" />
              <Label htmlFor="time-0" className="cursor-pointer">No time limit</Label>
            </div>
          </RadioGroup>
        </div>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 transition-colors" 
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
}
