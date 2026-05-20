import { createContext, useContext, useState, ReactNode } from "react";

export interface DocItem {
  id: string;
  name: string;
  type: "pdf" | "docx" | "doc";
  pages: number;
  shortUrl: string;
  uploadedAt: string;
}

interface DocumentsContextValue {
  documents: DocItem[];
  addDocument: (d: Omit<DocItem, "id" | "shortUrl" | "uploadedAt" | "pages"> & { pages?: number }) => DocItem;
  removeDocument: (id: string) => void;
  getDocument: (id: string) => DocItem | undefined;
}

const seed: DocItem[] = [
  {
    id: "doc-1",
    name: "Q2 Business Report",
    type: "pdf",
    pages: 24,
    shortUrl: "/ez/Q2biz24",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "doc-2",
    name: "Employee Handbook",
    type: "docx",
    pages: 58,
    shortUrl: "/ez/EmpHb58",
    uploadedAt: new Date().toISOString(),
  },
  {
    id: "doc-3",
    name: "Product Roadmap 2026",
    type: "pdf",
    pages: 16,
    shortUrl: "/ez/Roadmap26",
    uploadedAt: new Date().toISOString(),
  },
];

const DocumentsContext = createContext<DocumentsContextValue | null>(null);

const rand = (n: number) =>
  Array.from({ length: n }, () =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]
  ).join("");

export const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const [documents, setDocuments] = useState<DocItem[]>(seed);

  const addDocument: DocumentsContextValue["addDocument"] = ({ name, type, pages }) => {
    const doc: DocItem = {
      id: `doc-${Date.now()}`,
      name,
      type,
      pages: pages ?? Math.floor(Math.random() * 40) + 6,
      shortUrl: `/ez/${rand(8)}`,
      uploadedAt: new Date().toISOString(),
    };
    setDocuments((prev) => [doc, ...prev]);
    return doc;
  };

  const removeDocument = (id: string) =>
    setDocuments((prev) => prev.filter((d) => d.id !== id));

  const getDocument = (id: string) => documents.find((d) => d.id === id);

  return (
    <DocumentsContext.Provider value={{ documents, addDocument, removeDocument, getDocument }}>
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  const ctx = useContext(DocumentsContext);
  if (!ctx) throw new Error("useDocuments must be used within DocumentsProvider");
  return ctx;
};
