import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { StatusBadge } from './StatusBadge';
import { useLocation } from 'wouter';
import { usePrototype } from './PrototypeProvider';

interface ServiceConnectionCardProps {
  service: 'supabase' | 'cloudinary';
}

export function ServiceConnectionCard({ service }: ServiceConnectionCardProps) {
  const [, setLocation] = useLocation();
  const { state, updateState } = usePrototype();
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  const isSupabase = service === 'supabase';
  const status = isSupabase ? state.supabaseStatus : state.cloudinaryStatus;
  
  const title = isSupabase ? 'Database' : 'Media storage';
  const logoColor = isSupabase ? 'bg-[#3ECF8E]' : 'bg-[#3448C5]';
  const brandName = isSupabase ? 'Supabase' : 'Cloudinary';

  const markSuccess = () => {
    updateState(isSupabase ? { supabaseStatus: 'connected' } : { cloudinaryStatus: 'connected' });
  };

  const markError = () => {
    updateState(isSupabase ? { supabaseStatus: 'error' } : { cloudinaryStatus: 'error' });
    setShowErrorDetails(true);
  };

  const markConnecting = () => {
    updateState(isSupabase ? { supabaseStatus: 'connecting' } : { cloudinaryStatus: 'connecting' });
    setTimeout(markSuccess, 1500);
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
        <StatusBadge status={status} />
      </CardHeader>
      
      <CardContent className="flex-1 pt-4">
        {status === 'connected' && (
          <div className="text-sm text-gray-600 bg-success/5 p-3 rounded-md border border-success/10">
            <span className="font-medium text-gray-900 block mb-1">{brandName} connected</span>
            {isSupabase 
              ? "Your TomorrowOS CMS can access its database." 
              : "TomorrowOS can access your media storage."}
          </div>
        )}

        {status === 'error' && (
          <div className="text-sm">
            <div className="font-medium text-destructive mb-2">{brandName} could not connect</div>
            <p className="text-gray-600 mb-3">Common checks:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-4">
              {isSupabase ? (
                <>
                  <li>Complete Postgres connection string copied</li>
                  <li>[YOUR-PASSWORD] replaced, including brackets</li>
                  <li>Correct database password</li>
                  <li>Secret named exactly SUPABASE_URL</li>
                  <li>Approved connection method selected</li>
                </>
              ) : (
                <>
                  <li>All three values added</li>
                  <li>Correct variable names</li>
                  <li>Values copied from the same product environment</li>
                  <li>API key and API secret not swapped</li>
                  <li>No spaces before or after values</li>
                </>
              )}
            </ul>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={markConnecting}>Retry</Button>
              <Button variant="secondary" size="sm">Edit credentials</Button>
            </div>
          </div>
        )}

        {status === 'not_started' || status === 'connecting' ? (
          <p className="text-sm text-gray-600">
            {isSupabase 
              ? "Connect your database to store CMS content and device settings."
              : "Connect your media storage to upload and deliver images and video."}
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="flex flex-col gap-2 items-start bg-gray-50 pt-4 rounded-b-[11px] border-t border-border">
        <Button variant="tertiary" size="sm" onClick={handleOpenGuide} className="h-auto py-1">
          Open full {brandName} guide →
        </Button>
        
        {/* Prototype Controls */}
        <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-gray-200">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Prototype Controls</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={markError}>Simulate error</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs text-success border-success/30 hover:bg-success/10" onClick={markSuccess}>Simulate success</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
