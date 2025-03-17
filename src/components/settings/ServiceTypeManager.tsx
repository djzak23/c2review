import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { serviceTypes } from "@/lib/api";

interface ServiceType {
  value: string;
  label: string;
}

const ServiceTypeManager = () => {
  const [types, setTypes] = useState<ServiceType[]>(serviceTypes);
  const [newType, setNewType] = useState({ value: "", label: "" });

  const handleAddType = () => {
    if (newType.label.trim() === "") return;

    // Create a URL-friendly value if not provided
    const value =
      newType.value || newType.label.toLowerCase().replace(/\s+/g, "-");

    setTypes([...types, { value, label: newType.label }]);
    setNewType({ value: "", label: "" });

    // In a real implementation, this would save to the database
    // For now, we just update the local state
  };

  const handleRemoveType = (index: number) => {
    const newTypes = [...types];
    newTypes.splice(index, 1);
    setTypes(newTypes);

    // In a real implementation, this would save to the database
    // For now, we just update the local state
  };

  const handleSaveTypes = () => {
    // In a real implementation, this would save all types to the database
    // For now, we just log them
    console.log("Saving service types:", types);
    alert("Service types saved successfully!");
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Manage Service Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="New service type"
              value={newType.label}
              onChange={(e) =>
                setNewType({ ...newType, label: e.target.value })
              }
              className="flex-1"
            />
            <Button onClick={handleAddType} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Current Service Types</h3>
            {types.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No service types defined
              </p>
            ) : (
              <ul className="space-y-2">
                {types.map((type, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span>{type.label}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveType(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveTypes} className="flex items-center">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTypeManager;
