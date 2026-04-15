"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface BirthDataFormProps {
  onSubmit: (data: any) => void;
  title: string;
  loading?: boolean;
}

export default function BirthDataForm({
  onSubmit,
  title,
  loading = false,
}: BirthDataFormProps) {
  const [formData, setFormData] = useState({
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    latitude: "",
    longitude: "",
    timezone: "Asia/Kolkata",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.birthDate || !formData.birthTime || !formData.birthPlace) {
      toast.error("Please fill all required fields");
      return;
    }

    onSubmit(formData);
  };

  // In real app, integrate with Google Places API for location autocomplete
  const handlePlaceChange = (place: string) => {
    setFormData({
      ...formData,
      birthPlace: place,
      // These would come from Google Places API
      latitude: "11.0168", // Example: Coimbatore
      longitude: "76.9558",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="birth-form">
      <h2 className="form-title">{title}</h2>

      <div className="form-group">
        <label className="form-group-label">
          Birth Date <span className="form-required">*</span>
        </label>
        <input
          type="date"
          required
          className="input-field"
          value={formData.birthDate}
          onChange={(e) =>
            setFormData({ ...formData, birthDate: e.target.value })
          }
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="form-group">
        <label className="form-group-label">
          Birth Time <span className="form-required">*</span>
        </label>
        <input
          type="time"
          required
          className="input-field"
          value={formData.birthTime}
          onChange={(e) =>
            setFormData({ ...formData, birthTime: e.target.value })
          }
        />
        <p className="form-hint">
          Use 24-hour format (e.g., 15:30 for 3:30 PM)
        </p>
      </div>

      <div className="form-group">
        <label className="form-group-label">
          Birth Place <span className="form-required">*</span>
        </label>
        <input
          type="text"
          required
          className="input-field"
          value={formData.birthPlace}
          onChange={(e) => handlePlaceChange(e.target.value)}
          placeholder="City, Country (e.g., Bengaluru, India)"
        />
        <p className="form-hint">
          Enter city and country for accurate calculations
        </p>
      </div>

      <div className="form-group">
        <label className="form-group-label">Timezone</label>
        <select
          className="input-field"
          value={formData.timezone}
          onChange={(e) =>
            setFormData({ ...formData, timezone: e.target.value })
          }
        >
          <option value="Asia/Kolkata">IST (India)</option>
          <option value="America/New_York">EST (US East)</option>
          <option value="America/Los_Angeles">PST (US West)</option>
          <option value="Europe/London">GMT (UK)</option>
          <option value="Australia/Sydney">AEDT (Australia)</option>
        </select>
      </div>

      <div className="privacy-note">
        <p className="privacy-note-text">
          <span className="privacy-note-title">Privacy Note:</span> Your birth
          data is encrypted and never shared. We use it only to calculate your
          astrological charts.
        </p>
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Analyzing..." : "Continue"}
      </button>
    </form>
  );
}
