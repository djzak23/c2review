import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { settingsApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import {
  mockBusinessSettings,
  mockIntegrationSettings,
  mockTemplateSettings,
  mockTimingSettings,
} from "@/lib/mockData";

interface BusinessSettings {
  businessName: string;
  businessLogo?: string;
  primaryColor: string;
  secondaryColor: string;
}

interface IntegrationSettings {
  googleEnabled: boolean;
  googleApiKey: string;
  googleBusinessId: string;
  googleLocationId: string;
  emailEnabled: boolean;
  emailSmtpServer: string;
  emailSmtpPort: string;
  emailUsername: string;
  emailPassword: string;
  emailFromEmail: string;
  emailFromName: string;
  smsEnabled: boolean;
  smsAccountSid: string;
  smsAuthToken: string;
  smsFromNumber: string;
}

interface TimingSettings {
  initialDelay: number;
  initialDelayUnit: "hours" | "days" | "weeks";
  followUpDelay: number;
  followUpDelayUnit: "hours" | "days" | "weeks";
  maxFollowUps: number;
}

interface TemplateSettings {
  email: {
    subject: string;
    body: string;
  };
  sms: {
    body: string;
  };
}

interface AppContextType {
  businessSettings: BusinessSettings;
  updateBusinessSettings: (
    settings: Partial<BusinessSettings>,
  ) => Promise<void>;
  integrationSettings: IntegrationSettings;
  updateIntegrationSettings: (
    settings: Partial<IntegrationSettings>,
  ) => Promise<void>;
  timingSettings: TimingSettings;
  updateTimingSettings: (settings: Partial<TimingSettings>) => Promise<void>;
  templateSettings: TemplateSettings;
  updateTemplateSettings: (
    settings: Partial<TemplateSettings>,
  ) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isConnectedToDb: boolean;
}

const defaultBusinessSettings: BusinessSettings = mockBusinessSettings;
const defaultIntegrationSettings: IntegrationSettings = mockIntegrationSettings;
const defaultTimingSettings: TimingSettings = mockTimingSettings;
const defaultTemplateSettings: TemplateSettings = mockTemplateSettings;

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>(
    defaultBusinessSettings,
  );
  const [integrationSettings, setIntegrationSettings] =
    useState<IntegrationSettings>(defaultIntegrationSettings);
  const [timingSettings, setTimingSettings] = useState<TimingSettings>(
    defaultTimingSettings,
  );
  const [templateSettings, setTemplateSettings] = useState<TemplateSettings>(
    defaultTemplateSettings,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectedToDb, setIsConnectedToDb] = useState(false);

  // Load settings from API on mount
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        // Check if we're connected to a database
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        setIsConnectedToDb(!!(supabaseUrl && supabaseKey));

        // Only try to load from API if connected to DB
        if (supabaseUrl && supabaseKey) {
          // Load integration settings
          const integrationData = await settingsApi.getIntegrationSettings();
          if (Object.keys(integrationData).length > 0) {
            setIntegrationSettings((prev) => ({
              ...prev,
              ...integrationData,
            }));
          }

          // Load timing settings
          const timingData = await settingsApi.getTimingSettings();
          if (Object.keys(timingData).length > 0) {
            setTimingSettings((prev) => ({
              ...prev,
              ...timingData,
            }));
          }

          // Load template settings
          const templateData = await settingsApi.getTemplates();
          if (Object.keys(templateData).length > 0) {
            setTemplateSettings((prev) => ({
              ...prev,
              ...templateData,
            }));
          }
        } else {
          console.log("Using mock data as database is not connected");
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        toast({
          title: "Error loading settings",
          description:
            "There was a problem loading your settings. Using defaults.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [toast]);

  const updateBusinessSettings = async (
    settings: Partial<BusinessSettings>,
  ) => {
    setBusinessSettings((prev) => ({ ...prev, ...settings }));
    // In a real implementation, this would save to the database
    // await settingsApi.updateBusinessSettings(settings);
  };

  const updateIntegrationSettings = async (
    settings: Partial<IntegrationSettings>,
  ) => {
    setIsLoading(true);
    try {
      const updatedSettings = { ...integrationSettings, ...settings };
      setIntegrationSettings(updatedSettings);

      if (isConnectedToDb) {
        const success =
          await settingsApi.updateIntegrationSettings(updatedSettings);
        if (success) {
          toast({
            title: "Settings updated",
            description: "Your integration settings have been saved.",
          });
        } else {
          throw new Error("Failed to save settings");
        }
      } else {
        // Mock successful update when not connected to DB
        toast({
          title: "Settings updated",
          description: "Your integration settings have been saved locally.",
        });
      }
    } catch (error) {
      console.error("Error updating integration settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your integration settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTimingSettings = async (settings: Partial<TimingSettings>) => {
    setIsLoading(true);
    try {
      const updatedSettings = { ...timingSettings, ...settings };
      setTimingSettings(updatedSettings);

      if (isConnectedToDb) {
        const success = await settingsApi.updateTimingSettings(updatedSettings);
        if (success) {
          toast({
            title: "Settings updated",
            description: "Your timing settings have been saved.",
          });
        } else {
          throw new Error("Failed to save settings");
        }
      } else {
        // Mock successful update when not connected to DB
        toast({
          title: "Settings updated",
          description: "Your timing settings have been saved locally.",
        });
      }
    } catch (error) {
      console.error("Error updating timing settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your timing settings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTemplateSettings = async (
    settings: Partial<TemplateSettings>,
  ) => {
    setIsLoading(true);
    try {
      const updatedSettings = { ...templateSettings, ...settings };
      setTemplateSettings(updatedSettings);

      if (isConnectedToDb) {
        const success = await settingsApi.updateTemplates(updatedSettings);
        if (success) {
          toast({
            title: "Templates updated",
            description: "Your message templates have been saved.",
          });
        } else {
          throw new Error("Failed to save templates");
        }
      } else {
        // Mock successful update when not connected to DB
        toast({
          title: "Templates updated",
          description: "Your message templates have been saved locally.",
        });
      }
    } catch (error) {
      console.error("Error updating templates:", error);
      toast({
        title: "Error saving templates",
        description: "There was a problem saving your message templates.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        businessSettings,
        updateBusinessSettings,
        integrationSettings,
        updateIntegrationSettings,
        timingSettings,
        updateTimingSettings,
        templateSettings,
        updateTemplateSettings,
        isLoading,
        setIsLoading,
        isConnectedToDb,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a mock context for use in storyboards and testing
export const MockAppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const mockContext: AppContextType = {
    businessSettings: defaultBusinessSettings,
    updateBusinessSettings: async () => {},
    integrationSettings: defaultIntegrationSettings,
    updateIntegrationSettings: async () => {},
    timingSettings: defaultTimingSettings,
    updateTimingSettings: async () => {},
    templateSettings: defaultTemplateSettings,
    updateTemplateSettings: async () => {},
    isLoading,
    setIsLoading,
    isConnectedToDb: false,
  };

  return (
    <AppContext.Provider value={mockContext}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
