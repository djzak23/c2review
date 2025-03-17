import React from "react";
import DashboardHeader from "../dashboard/DashboardHeader";
import SettingsPanel from "./SettingsPanel";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader activeTab="settings" />
      <SettingsPanel />
    </div>
  );
};

export default SettingsPage;
