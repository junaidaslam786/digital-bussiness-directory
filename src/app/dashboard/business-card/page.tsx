"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  CreditCard,
  Upload,
  Trash2,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import type { BusinessCard } from "@/types";

export default function BusinessCardPage() {
  const {
    myBusinesses,
    myLoading,
    fetchMyBusinesses,
    fetchCard,
    uploadCard,
    replaceCard,
    deleteCard,
  } = useBusinessesStore();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const business = myBusinesses[0];

  useEffect(() => {
    fetchMyBusinesses();
  }, [fetchMyBusinesses]);

  useEffect(() => {
    if (business) {
      setLoading(true);
      fetchCard(business.id)
        .then((c) => setCard(c))
        .catch(() => setCard(null))
        .finally(() => setLoading(false));
    }
  }, [business, fetchCard]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !business) return;

    setUploading(true);
    setMessage(null);
    try {
      let result: BusinessCard;
      if (card) {
        result = await replaceCard(business.id, file);
      } else {
        result = await uploadCard(business.id, file);
      }
      setCard(result);
      setMessage({
        type: "success",
        text: card ? "Business card replaced!" : "Business card uploaded!",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: (err as Error).message || "Failed to upload business card",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!business || !card || !confirm("Delete your business card?")) return;
    setDeleting(true);
    setMessage(null);
    try {
      await deleteCard(business.id);
      setCard(null);
      setMessage({ type: "success", text: "Business card deleted." });
    } catch (err) {
      setMessage({
        type: "error",
        text: (err as Error).message || "Failed to delete business card",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (myLoading || loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          No business found. Create a business first.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Business Card
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload your digital business card (image or PDF)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {uploading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {card ? "Replace Card" : "Upload Card"}
          </Button>
          {card && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        className="hidden"
        onChange={handleUpload}
      />

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400" : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"}`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-auto">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>Digital Business Card</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {card ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                {card.fileType === "pdf" ? (
                  <FileText className="h-5 w-5 text-red-500" />
                ) : (
                  <ImageIcon className="h-5 w-5 text-blue-500" />
                )}
                <span className="uppercase font-medium">{card.fileType}</span>
                <span className="text-gray-400">•</span>
                <span>
                  Uploaded {new Date(card.createdAt).toLocaleDateString()}
                </span>
              </div>
              {card.fileType === "pdf" ? (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <iframe
                    src={card.cardUrl}
                    className="h-[500px] w-full"
                    title="Business Card PDF"
                  />
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <img
                    src={card.cardUrl}
                    alt="Business Card"
                    className="max-h-[500px] w-full object-contain bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 transition-colors hover:border-emerald-400 dark:border-gray-600 dark:hover:border-emerald-500"
              onClick={() => fileInputRef.current?.click()}
            >
              <CreditCard className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                No business card uploaded
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click to upload an image or PDF of your business card
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Supported: JPEG, PNG, WebP, PDF
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
