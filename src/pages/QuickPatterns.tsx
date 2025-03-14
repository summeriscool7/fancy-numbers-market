
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
// import { PatternChip } from '@/components/PatternChip';
import PatternChip from "@/components/PatternChip"
import { Check, Copy, Search } from 'lucide-react';

const patterns = [
  {
    name: "ABC",
    description: "Consecutive numbers (e.g., 123, 456, 789)",
    regex: /(\d)(?=\1{0})(?=(\d))(?=\2{0})(?=(\d))(?:\1\2\3){1}/,
    example: "123, 456, 789, 987, 654, 321",
  },
  {
    name: "ABCABC",
    description: "Repeated sequence of 3 consecutive digits (e.g., 123123)",
    regex: /(\d)(?=\1{0})(?=(\d))(?=\2{0})(?=(\d))(?:\1\2\3){2}/,
    example: "123123, 456456, 789789",
  },
  {
    name: "AA BB CC",
    description: "3 pairs of repeated digits (e.g., 112233, 445566)",
    regex: /(\d)\1(?=(\d))(?=\2{1})(?=(\d))(?=\3{1})(?:\2\2\3\3)/,
    example: "112233, 223344, 334455",
  },
  {
    name: "AAAA",
    description: "4 identical digits in a row (e.g., 1111, 9999)",
    regex: /(\d)\1{3}/,
    example: "1111, 2222, 9999",
  },
  {
    name: "AAA BBB",
    description: "Two sets of 3 identical digits (e.g., 111222, 999888)",
    regex: /(\d)\1{2}(\d)\2{2}/,
    example: "111222, 333444, 555666",
  },
  {
    name: "ABBA",
    description: "Palindrome pattern (e.g., 1221, 7887)",
    regex: /(\d)(\d)\2\1/,
    example: "1221, 1331, 7887",
  },
  {
    name: "ABAB",
    description: "Two alternating digits repeated (e.g., 1212, 9090)",
    regex: /(\d)(\d)\1\2/,
    example: "1212, 3434, 9090",
  },
  {
    name: "ABCD ABCD",
    description: "Sequence of 4 digits repeated (e.g., 12341234)",
    regex: /(\d)(?=\1{0})(?=(\d))(?=\2{0})(?=(\d))(?=\3{0})(?=(\d))(?:\1\2\3\4){2}/,
    example: "12341234, 56785678",
  },
  {
    name: "ABCD DCBA",
    description: "Sequence followed by its reverse (e.g., 12344321)",
    regex: /(\d)(?=\1{0})(?=(\d))(?=\2{0})(?=(\d))(?=\3{0})(?=(\d))(?:\1\2\3\4\4\3\2\1)/,
    example: "12344321, 56788765",
  },
  {
    name: "AABB",
    description: "Two pairs of identical digits (e.g., 1122, 7788)",
    regex: /(\d)\1(\d)\2/,
    example: "1122, 3344, 5566",
  },
  {
    name: "ABAB XY ABAB",
    description: "Double alternating pair with separator (e.g., 1212341212)",
    regex: /(\d)(\d)\1\2(\d)(\d)\1\2/,
    example: "1212341212, 5656785656",
  },
  {
    name: "ABAB XY CDCD",
    description: "Two different alternating pairs (e.g., 1212345656)",
    regex: /(\d)(\d)\1\2(\d)(\d)\3\4/,
    example: "1212345656, 9090343434",
  }
];

const QuickPatterns = () => {
  const [numberInput, setNumberInput] = useState("");
  const [matchingPatterns, setMatchingPatterns] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [tab, setTab] = useState("find");
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Check which patterns the input matches
  useEffect(() => {
    if (!numberInput) {
      setMatchingPatterns([]);
      return;
    }

    const matches = patterns
      .filter(pattern => pattern.regex.test(numberInput))
      .map(pattern => pattern.name);
    
    setMatchingPatterns(matches);
  }, [numberInput]);

  // Handle checkbox changes
  const handlePatternSelect = (patternName: string) => {
    if (selectedPatterns.includes(patternName)) {
      setSelectedPatterns(selectedPatterns.filter(name => name !== patternName));
    } else {
      setSelectedPatterns([...selectedPatterns, patternName]);
    }
  };

  // Copy pattern examples to clipboard
  const copyExamples = () => {
    const selected = patterns
      .filter(pattern => selectedPatterns.includes(pattern.name))
      .map(pattern => `${pattern.name}: ${pattern.example}`)
      .join('\n');
    
    navigator.clipboard.writeText(selected);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Number Pattern Identifier</h1>
        
        <Tabs defaultValue={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="find" className="flex items-center gap-2">
              <Search size={16} />
              <span>Find Patterns</span>
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Check size={16} />
              <span>Browse Patterns</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="find" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Identify Patterns</CardTitle>
                <CardDescription>
                  Enter a phone number to identify any special patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="number-input">Phone Number</Label>
                    <Input
                      id="number-input"
                      placeholder="Enter a 10-digit number"
                      value={numberInput}
                      onChange={(e) => setNumberInput(e.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                    />
                  </div>
                  
                  {numberInput && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Matching Patterns:</p>
                      {matchingPatterns.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {matchingPatterns.map(pattern => (
                            <PatternChip key={pattern} name={pattern} />
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No special patterns found</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="browse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Browse Patterns</CardTitle>
                <CardDescription>
                  View all available number patterns and their descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patterns.map((pattern) => (
                    <div key={pattern.name} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                      <Checkbox
                        id={`pattern-${pattern.name}`}
                        checked={selectedPatterns.includes(pattern.name)}
                        onCheckedChange={() => handlePatternSelect(pattern.name)}
                      />
                      <div className="space-y-1">
                        <Label
                          htmlFor={`pattern-${pattern.name}`}
                          className="text-base font-medium"
                        >
                          {pattern.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {pattern.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Examples: {pattern.example}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={copyExamples}
                  disabled={selectedPatterns.length === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {copySuccess ? (
                    <>
                      <Check size={16} className="text-green-500" />
                      {copySuccess}
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy examples
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default QuickPatterns;
