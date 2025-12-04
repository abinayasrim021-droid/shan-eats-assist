import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
  error: string | null;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-IN';

    recognitionInstance.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(prev => {
        if (finalTranscript) {
          return prev + finalTranscript;
        }
        return prev + interimTranscript;
      });
    };

    recognitionInstance.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

    return () => {
      recognitionInstance.stop();
    };
  }, [isSupported]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setError(null);
    setTranscript('');
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      setError('Failed to start speech recognition');
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    recognition.stop();
    setIsListening(false);
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
    error,
  };
};

// Parse voice order into menu items
export const parseVoiceOrder = (transcript: string): { itemName: string; quantity: number }[] => {
  const orders: { itemName: string; quantity: number }[] = [];
  
  // Common patterns: "1 dosa", "2 teas", "one samosa", etc.
  const numberWords: Record<string, number> = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'a': 1, 'an': 1
  };

  // Split by 'and' or comma
  const parts = transcript.toLowerCase().split(/\s+and\s+|,\s*/);

  parts.forEach(part => {
    const trimmed = part.trim();
    
    // Match patterns like "2 dosas" or "two dosas"
    const numericMatch = trimmed.match(/^(\d+)\s+(.+)$/);
    const wordMatch = trimmed.match(/^(one|two|three|four|five|six|seven|eight|nine|ten|a|an)\s+(.+)$/);
    
    if (numericMatch) {
      orders.push({
        quantity: parseInt(numericMatch[1], 10),
        itemName: numericMatch[2].replace(/s$/, ''), // Remove trailing 's'
      });
    } else if (wordMatch) {
      orders.push({
        quantity: numberWords[wordMatch[1]] || 1,
        itemName: wordMatch[2].replace(/s$/, ''),
      });
    } else if (trimmed) {
      // Assume quantity of 1 if no number specified
      orders.push({
        quantity: 1,
        itemName: trimmed.replace(/s$/, ''),
      });
    }
  });

  return orders;
};
