import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    tsh: "",
    t3: "",
    t4: "",
    tumorSize: "",
    country: "",
    ethnicity: "",
    familyHistory: "",
    radiationExposure: "",
    iodineDeficiency: "",
    smoking: "",
    obesity: "",
    diabetes: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(import.meta.env.VITE_PREDICTION_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setPrediction(data.prediction);
    setConfidence(data.confidence);
  } catch (err) {
    console.error("Error predicting:", err);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg mt-10 space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Thyroid Cancer Risk Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        <FormField label="Age">
          <Input
            type="number"
            placeholder="Enter your age (e.g., 45)"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            required
          />
        </FormField>

        <FormSelect label="Gender" value={formData.gender} onValueChange={(value) => handleChange("gender", value)} options={["Male", "Female"]} />

        <FormField label="TSH Level">
          <Input
            type="number"
            placeholder="TSH (μIU/mL), e.g., 2.5"
            value={formData.tsh}
            onChange={(e) => handleChange("tsh", e.target.value)}
            required
          />
        </FormField>

        <FormField label="T3 Level">
          <Input
            type="number"
            placeholder="T3 (ng/dL), e.g., 110"
            value={formData.t3}
            onChange={(e) => handleChange("t3", e.target.value)}
            required
          />
        </FormField>

        <FormField label="T4 Level">
          <Input
            type="number"
            placeholder="T4 (μg/dL), e.g., 8.3"
            value={formData.t4}
            onChange={(e) => handleChange("t4", e.target.value)}
            required
          />
        </FormField>

        <FormField label="Nodule (Tumor) Size">
          <Input
            type="number"
            placeholder="Size in mm, e.g., 15"
            value={formData.tumorSize}
            onChange={(e) => handleChange("tumorSize", e.target.value)}
            required
          />
        </FormField>

        <FormField label="Country">
          <Input
            type="text"
            placeholder="Country of residence, e.g., India"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            required
          />
        </FormField>

        <FormField label="Ethnicity">
          <Input
            type="text"
            placeholder="Your ethnicity, e.g., South Asian"
            value={formData.ethnicity}
            onChange={(e) => handleChange("ethnicity", e.target.value)}
            required
          />
        </FormField>

        <FormSelect label="Family History" value={formData.familyHistory} onValueChange={(value) => handleChange("familyHistory", value)} options={["Yes", "No"]} />

        <FormSelect label="Radiation Exposure" value={formData.radiationExposure} onValueChange={(value) => handleChange("radiationExposure", value)} options={["Yes", "No"]} />

        <FormSelect label="Iodine Deficiency" value={formData.iodineDeficiency} onValueChange={(value) => handleChange("iodineDeficiency", value)} options={["Yes", "No"]} />

        <FormSelect label="Smoking" value={formData.smoking} onValueChange={(value) => handleChange("smoking", value)} options={["Yes", "No"]} />

        <FormSelect label="Obesity" value={formData.obesity} onValueChange={(value) => handleChange("obesity", value)} options={["Yes", "No"]} />

        <FormSelect label="Diabetes" value={formData.diabetes} onValueChange={(value) => handleChange("diabetes", value)} options={["Yes", "No"]} />

        <Button type="submit" className="w-full">
          Predict
        </Button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-center">
          <h3 className="text-xl font-semibold mb-2">Prediction Result:</h3>
          <p className="text-green-800 text-lg">
            <strong>{prediction}</strong> (Confidence: {confidence}%)
          </p>
        </div>
      )}
    </div>
  );
};

// Reusable components

const FormField = ({ label, children }) => (
  <div className="space-y-2">
    <Label className="font-medium">{label}</Label>
    {children}
  </div>
);

const FormSelect = ({ label, value, onValueChange, options }) => (
    <div className="space-y-2">
      <Label className="font-medium">{label}</Label>
      <Select value={value} onValueChange={onValueChange} required>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
  

export default PredictionForm;
