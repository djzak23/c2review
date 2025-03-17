import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import { Database, AlertCircle, Info } from "lucide-react";
import { useAppContext } from "./context/AppContext";

export function DbConnectionBanner() {
  const { isConnectedToDb } = useAppContext();

  if (isConnectedToDb) return null;

  return (
    <Alert variant="info" className="mb-4">
      <Info className="h-4 w-4" />
      <AlertTitle>Using Demo Mode</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>
          The app is running in demo mode with mock data. All changes will be
          stored locally and not persisted.
        </span>
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => window.open("https://supabase.com", "_blank")}
        >
          <Database className="mr-2 h-4 w-4" />
          Connect Database
        </Button>
      </AlertDescription>
    </Alert>
  );
}
