import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useLocation } from 'wouter';
import { usePrototype } from './PrototypeProvider';
import { Check, CheckCircle2, AlertCircle } from 'lucide-react';

interface ServiceConnectionCardProps {
  service: 'supabase' | 'cloudinary';
}

export function ServiceConnectionCard({ service }: ServiceConnectionCardProps) {
  const [, setLocation] = useLocation();
  const { state, updateState } = usePrototype();

  const isSupabase = service === 'supabase';
  const status = isSupabase ? state.supabaseStatus : state.cloudinaryStatus;
  
  const title = isSupabase ? 'Database' : 'Media storage';
  const logoColor = isSupabase ? 'bg-[#3ECF8E]' : 'bg-[#3448C5]';
  const brandName = isSupabase ? 'Supabase' : 'Cloudinary';

  const markConfirmed = () => {
    updateState(isSupabase ? { supabaseStatus: 'confirmed' } : { cloudinaryStatus: 'confirmed' });
  };

  const markNeedsHelp = () => {
    updateState(isSupabase ? { supabaseStatus: 'needs_help' } : { cloudinaryStatus: 'needs_help' });
  };

  const handleOpenGuide = () => {
    setLocation(isSupabase ? '/guides/supabase' : '/guides/cloudinary');
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-xs ${logoColor}`}>
            {brandName.charAt(0)}
          </div>
          <div>
            <CardTitle className="text-base">{brandName}</CardTitle>
            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pt-4 space-y-4">
        {status === 'confirmed' && (
          <div className="text-sm text-gray-600 bg-success/5 p-3 rounded-md border border-success/10 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
            <div>
              <span className="font-medium text-gray-900 block mb-1">Confirmed</span>
              You confirmed {brandName} is connected.
            </div>
          </div>
        )}

        {status === 'needs_help' && (
          <div className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <div className="font-medium text-amber-900 mb-1">Having trouble?</div>
              <p className="text-amber-800 mb-2 text-xs">Review the guide carefully.</p>
              <Button variant="outline" size="sm" onClick={handleOpenGuide} className="h-7 text-xs bg-white">View {brandName} Guide</Button>
            </div>
          </div>
        )}

        {status !== 'confirmed' && status !== 'needs_help' && (
          <p className="text-sm text-gray-600">
            {isSupabase 
              ? "Connect your database to store CMS content and device settings."
              : "Connect your media storage to upload and deliver images and video."}
          </p>
        )}

        <div className="flex flex-col gap-2">
           <Button variant="outline" onClick={handleOpenGuide} className="w-full">
             Open {brandName} guide
           </Button>
           <Button variant="outline" onClick={() => window.open('https://replit.com', '_blank')} className="w-full">
             Open Replit
           </Button>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 items-start bg-gray-50 pt-4 rounded-b-[11px] border-t border-border">
        {status === 'confirmed' ? (
          <Button variant="outline" size="sm" onClick={() => updateState(isSupabase ? { supabaseStatus: 'not_started' } : { cloudinaryStatus: 'not_started' })} className="w-full text-gray-500">
            Undo confirmation
          </Button>
        ) : (
          <div className="flex gap-2 w-full">
            <Button className="flex-1" onClick={markConfirmed}>
              I confirmed it is connected
            </Button>
            <Button variant="secondary" onClick={markNeedsHelp}>
              I'm stuck
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
