"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Quote = {
  id: number;
  text: string;
  author: string;
  type: string;
};

type DataFile = 'quran.json' | 'quote.json' | 'motivation.json' | 'hadith.json';

export default function AdminPage() {
  const [isDev, setIsDev] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DataFile>('quran.json');
  const [data, setData] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // This will run only on the client, after hydration
    setIsDev(process.env.NODE_ENV === 'development');
    fetchData(selectedFile);
  }, [selectedFile]);
  

  const fetchData = async (file: DataFile) => {
    if (process.env.NODE_ENV !== 'development') {
        setLoading(false);
        return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/data?file=${file}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error fetching data',
        description: (error as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (process.env.NODE_ENV !== 'development') {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'This feature is only available in development mode.',
        });
        return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/data?file=${selectedFile}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data, null, 2),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save data');
      }
      toast({
        title: 'Success',
        description: `${selectedFile} has been saved successfully.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error saving data',
        description: (error as Error).message,
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleFieldChange = (index: number, field: keyof Quote, value: string) => {
    const newData = [...data];
    if (field === 'id') {
        newData[index][field] = parseInt(value, 10);
    } else {
        (newData[index] as any)[field] = value;
    }
    setData(newData);
  };
  
  const addNewQuote = () => {
    const newId = data.length > 0 ? Math.max(...data.map(q => q.id)) + 1 : 1;
    const type = selectedFile.replace('.json', '');
    setData([...data, { id: newId, text: '', author: '', type }]);
  };

  const deleteQuote = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };
  

  if (!isDev) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <Alert variant="destructive" className="max-w-lg mx-auto">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            This admin panel is only available in the development environment.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Content Editor</span>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select
              value={selectedFile}
              onValueChange={(value: DataFile) => setSelectedFile(value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a file to edit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quran.json">quran.json</SelectItem>
                <SelectItem value="hadith.json">hadith.json</SelectItem>
                <SelectItem value="quote.json">quote.json</SelectItem>
                <SelectItem value="motivation.json">motivation.json</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {loading ? (
             <p>Loading data...</p>
          ) : (
            <div className="space-y-4">
              {data.map((quote, index) => (
                 <Card key={quote.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="ID"
                            type="number"
                            value={quote.id}
                            onChange={(e) => handleFieldChange(index, 'id', e.target.value)}
                        />
                         <Input
                            placeholder="Author"
                            value={quote.author}
                            onChange={(e) => handleFieldChange(index, 'author', e.target.value)}
                        />
                    </div>
                    <Textarea
                        placeholder="Quote text..."
                        value={quote.text}
                        onChange={(e) => handleFieldChange(index, 'text', e.target.value)}
                        className="mt-4 min-h-[100px]"
                    />
                     <Input
                        placeholder="Type"
                        value={quote.type}
                        onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                        className="mt-4"
                    />
                    <Button variant="destructive" size="icon" className="mt-4" onClick={() => deleteQuote(index)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                 </Card>
              ))}
               <Button onClick={addNewQuote} variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Quote
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
