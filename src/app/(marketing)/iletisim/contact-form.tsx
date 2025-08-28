"use client";

import { useState } from "react";
import Button from "@/components/ui/button";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Ad Soyad zorunludur.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-posta zorunludur.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta girin.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Mesaj zorunludur.";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Mesaj en fazla 1000 karakter olabilir.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1" htmlFor="name">
          Ad Soyad
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border rounded p-2"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label className="block mb-1" htmlFor="email">
          E-posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border rounded p-2"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label className="block mb-1" htmlFor="message">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full border rounded p-2"
          rows={6}
          maxLength={1000}
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && (
          <p className="text-sm text-red-600 mt-1">{errors.message}</p>
        )}
      </div>
      {status === "success" && (
        <p className="text-green-600">Teşekkürler! Mesajınız gönderildi.</p>
      )}
      {status === "error" && (
        <p className="text-red-600">
          Mesaj gönderilemedi. Lütfen daha sonra deneyin.
        </p>
      )}
      <Button type="submit" isLoading={isSubmitting}>
        Gönder
      </Button>
    </form>
  );
}
