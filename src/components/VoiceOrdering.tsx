import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSpeechRecognition, parseVoiceOrder } from '@/hooks/useSpeechRecognition';
import { useCanteen } from '@/context/CanteenContext';
import { menuItems } from '@/data/menuData';
import { Mic, MicOff, Volume2, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VoiceOrderingProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceOrdering: React.FC<VoiceOrderingProps> = ({ isOpen, onClose }) => {
  const { isListening, transcript, startListening, stopListening, resetTranscript, isSupported, error } = useSpeechRecognition();
  const { addToCart } = useCanteen();
  const [parsedItems, setParsedItems] = useState<{ itemName: string; quantity: number }[]>([]);
  const [matchedItems, setMatchedItems] = useState<{ item: typeof menuItems[0]; quantity: number }[]>([]);

  useEffect(() => {
    if (transcript) {
      const parsed = parseVoiceOrder(transcript);
      setParsedItems(parsed);
      
      // Match parsed items with menu
      const matched = parsed.map(p => {
        const item = menuItems.find(m => 
          m.name.toLowerCase().includes(p.itemName.toLowerCase()) ||
          p.itemName.toLowerCase().includes(m.name.toLowerCase().split(' ')[0])
        );
        return item ? { item, quantity: p.quantity } : null;
      }).filter(Boolean) as { item: typeof menuItems[0]; quantity: number }[];
      
      setMatchedItems(matched);
    }
  }, [transcript]);

  const handleAddToCart = () => {
    matchedItems.forEach(({ item, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        addToCart(item);
      }
    });
    
    toast({
      title: "Items added to cart",
      description: `${matchedItems.length} item(s) added from voice order`,
    });
    
    resetTranscript();
    setParsedItems([]);
    setMatchedItems([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-lg animate-scale-in">
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <CardContent className="p-8 text-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Voice Ordering</h2>
            <p className="text-muted-foreground">
              Say your order like "1 dosa and 2 teas"
            </p>
          </div>

          {!isSupported ? (
            <div className="p-4 bg-destructive/10 rounded-lg text-destructive">
              Voice recognition is not supported in your browser.
            </div>
          ) : (
            <>
              {/* Microphone Button */}
              <div className="relative">
                <Button
                  variant={isListening ? 'destructive' : 'voice'}
                  size="icon-lg"
                  className={`h-24 w-24 ${isListening ? 'animate-pulse-soft' : ''}`}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <MicOff className="h-10 w-10" />
                  ) : (
                    <Mic className="h-10 w-10" />
                  )}
                </Button>
                {isListening && (
                  <div className="absolute -inset-4 rounded-full border-4 border-primary/30 animate-ping" />
                )}
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-2">
                {isListening ? (
                  <>
                    <Volume2 className="h-5 w-5 text-primary animate-pulse" />
                    <span className="text-primary font-semibold">Listening...</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Click the mic to start</span>
                )}
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="bg-muted rounded-xl p-4 text-left">
                  <p className="text-sm text-muted-foreground mb-1">You said:</p>
                  <p className="font-medium">{transcript}</p>
                </div>
              )}

              {/* Matched Items */}
              {matchedItems.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Recognized items:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {matchedItems.map(({ item, quantity }, index) => (
                      <Badge key={index} variant="success" className="text-sm py-1 px-3">
                        {quantity}x {item.name} (₹{item.price * quantity})
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={handleAddToCart} variant="hero" className="w-full mt-4">
                    Add {matchedItems.length} item(s) to Cart
                  </Button>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-4 bg-destructive/10 rounded-lg text-destructive text-sm">
                  Error: {error}
                </div>
              )}

              {/* Tips */}
              <div className="bg-accent/20 rounded-xl p-4 text-left">
                <p className="text-sm font-semibold mb-2">💡 Tips:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Say quantity + item name (e.g., "2 samosas")</li>
                  <li>• Use "and" for multiple items</li>
                  <li>• Speak clearly and naturally</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceOrdering;
