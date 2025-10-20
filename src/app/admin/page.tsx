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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
        throw new Error('ডেটা আনতে ব্যর্থ হয়েছে');
      }
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'ডেটা আনতে ত্রুটি',
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
            title: 'ত্রুটি',
            description: 'এই বৈশিষ্ট্যটি শুধুমাত্র ডেভেলপমেন্ট মোডে উপলব্ধ।',
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
        throw new Error(errorData.error || 'ডেটা সংরক্ষণ করতে ব্যর্থ হয়েছে');
      }
      toast({
        title: 'সফল',
        description: `${selectedFile} সফলভাবে সংরক্ষণ করা হয়েছে।`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'ডেটা সংরক্ষণ করতে ত্রুটি',
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
          <AlertTitle>অ্যাক্সেস অস্বীকৃত</AlertTitle>
          <AlertDescription>
            এই অ্যাডমিন প্যানেলটি শুধুমাত্র ডেভেলপমেন্ট পরিবেশে উপলব্ধ।
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>বিষয়বস্তু সম্পাদক</span>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'সংরক্ষণ করা হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-between items-center">
            <Select
              value={selectedFile}
              onValueChange={(value: DataFile) => setSelectedFile(value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="সম্পাদনা করার জন্য একটি ফাইল নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quran.json">quran.json</SelectItem>
                <SelectItem value="hadith.json">hadith.json</SelectItem>
                <SelectItem value="quote.json">quote.json</SelectItem>
                <SelectItem value="motivation.json">motivation.json</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addNewQuote} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                নতুন উক্তি যোগ করুন
            </Button>
          </div>
          
          {loading ? (
             <p>ডেটা লোড হচ্ছে...</p>
          ) : (
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">আইডি</TableHead>
                            <TableHead>উক্তি</TableHead>
                            <TableHead className="w-[200px]">লেখক</TableHead>
                            <TableHead className="w-[100px]">কার্যকলাপ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((quote, index) => (
                            <TableRow key={quote.id}>
                                <TableCell>{quote.id}</TableCell>
                                <TableCell>
                                    <Textarea
                                        value={quote.text}
                                        onChange={(e) => handleFieldChange(index, 'text', e.target.value)}
                                        className="min-h-[60px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={quote.author}
                                        onChange={(e) => handleFieldChange(index, 'author', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="destructive" size="icon" onClick={() => deleteQuote(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
