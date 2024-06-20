"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
// import { createProduct } from '../../functions/src';
import Navbar2 from "@/components/common/Navbar2";
import Footer from "@/components/Footer";
import { uploadImageToStorage } from "@/lib/uploadImageToStorage";
import { Textarea } from "@/components/ui/textarea";
import { years, regions } from "@/lib/data";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalProps } from "@/components/ui/animations/Modal";
import toast, { Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useLocale, useTranslations } from "next-intl";

type ProductCreateInput = {
  title: string;
  description: string;
  price: number | null;
  quantity: number | null;
  category: string;
  region: string | null;
  vintage: string | null;
  storage: string;
  crdCapsule: string;
  image: string | null;
  images: string[];
  createdAt?: Date;
  typeOfWine?: string;
};

export default function Form({ currentUser }: any) {
  const t = useTranslations("addProduct");
  const local = useLocale();
  const router = useRouter();
  // const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [product, setProduct] = useState<ProductCreateInput>({
    title: "",
    description: "",
    price: null,
    quantity: null,
    category: "",
    region: null,
    vintage: null,
    storage: "",
    crdCapsule: "",
    image: null,
    images: [],
    createdAt: new Date(),
    typeOfWine: "",
  });
  const onDrop = useCallback((acceptedFiles: any) => {
    setImages(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // useEffect(() => {
  //     if (status !== 'loading' && !session) {
  //         console.log('User not authenticated');
  //         setIsModalOpen(true); // Show the modal if the user is not authenticated
  //     }
  // }, [session, status]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Redirect to login or any other action
    router.push(`/${local}/login`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(event.target.files || []));
  };

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  // Prevent default behavior for dragover to allow drop
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);
  const handleRemoveImage = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    // Create a new array excluding the file at the specified index
    const updatedFiles = images.filter(
      (_: any, fileIndex: number) => fileIndex !== index
    );
    setImages(updatedFiles);

    // Optionally, if you're generating preview URLs, remember to revoke them to avoid memory leaks
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Adding product...");

    if (!currentUser || !currentUser.uid) {
      console.error("User not authenticated");
      return;
    }

    // Upload each selected file, associating it with the current user's ID
    const uploadPromises = images.map((file) =>
      uploadImageToStorage(file, currentUser.uid)
    );
    const imageUrls = await Promise.all(uploadPromises);

    // Prepare your product data including the uploaded image URLs
    const productData = {
      ...product,
      images: imageUrls, // URLs from the uploaded images
      userId: currentUser.uid,
      userName: currentUser.displayName,
    };

    // Submit the product data to your backend or database
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      toast.dismiss();
      if (response.ok) {
        toast.success("Successfully added.");
        const result = await response.json();
        router.push(`/${local}/products/${result.productId}`);
      } else {
        toast.error("Failed to create product");
        const errorResult = await response.json();
        console.error("Error creating product:", errorResult.error);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const stocks = [
    "Cave souterraine",
    "Cave électrique 10° a 12°",
    "Conservation à temperature ambiante",
    "Autre",
  ];
  // Inside your file handling or right before rendering
  const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
  // Use `previewUrls` for image src in rendering

  return (
    <div>
      <Toaster />
      {/* Header */}

      <main>
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold my-3"> {t("title")} </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid  gap-3">
              <Input
                name="title"
                onChange={handleChange}
                placeholder={t("form.title")}
              />
            </div>

            <Textarea
              className="my-3"
              name={t("form.description")}
              onChange={handleChange}
              rows={5}
              placeholder={t("form.description")}
            />
            <div className="grid lg:grid-cols-2 gap-3">
              <Select
                onValueChange={(value: string) =>
                  setProduct({ ...product, vintage: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("form.vintage")} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year, index) => (
                    <SelectItem key={index} value={`${year.year}`}>
                      {" "}
                      {year.year}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value: string) =>
                  setProduct({ ...product, region: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("form.region")} />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={`${region.value}`}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                name="price"
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
                className="mb-3"
                type="number"
                placeholder={t("form.price")}
              />
              <Input
                name="quantity"
                onChange={(e) =>
                  setProduct({ ...product, quantity: parseInt(e.target.value) })
                }
                className="mb-3"
                placeholder={t("form.quantity")}
              />
              {/* <Input
                name="category"
                onChange={handleChange}
                className="mb-3"
                placeholder="Catégorie"
              /> */}
              <Select
                onValueChange={(value: string) =>
                  setProduct({ ...product, storage: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("form.storage_location")} />
                </SelectTrigger>
                <SelectContent>
                  {stocks.map((stock, index) => (
                    <SelectItem key={index} value={stock}>
                      {" "}
                      {stock}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value: string) =>
                  setProduct({ ...product, crdCapsule: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("form.crd_capsule")} />
                </SelectTrigger>
                <SelectContent>
                  {[
                    t("form.yes"),
                    t("form.no"),
                    t("form.wax"),
                    t("form.too_old"),
                  ].map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {" "}
                      {item}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value: string) =>
                  setProduct({ ...product, typeOfWine: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("form.type_of_wine")} />
                </SelectTrigger>
                <SelectContent>
                  {[
                    t("form.organic_wine"),
                    t("form.biodynamic_wine"),
                    t("form.natural_wine"),
                    t("form.kosher_wine"),
                  ].map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {" "}
                      {item}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative border p-0.5 border-dotted  my-3 text-center">
              <div className="py-16 bg-white" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>{t("form.drop_files_here")}</p>
                ) : (
                  <p>{t("form.drag_drop_select")}</p>
                )}
              </div>
              <div className="absolute left-0 bottom-0 flex flex-wrap">
                {images &&
                  images.map((img: any, index: number) => (
                    <div key={index} className="relative mr-2">
                      <Image
                        src={URL.createObjectURL(img)}
                        height={200}
                        width={300}
                        alt={"profile"}
                        style={{ height: "80px", width: "auto" }}
                      />
                      <div className="absolute top-0 right-0 m-1">
                        <X
                          className="h-6 w-6 cursor-pointer rounded-full bg-pink-700 text-white p-1"
                          onClick={(e) => handleRemoveImage(e, index)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="mt-5 bg-accent text-white px-10 rounded-2xl"
              >
                {t("form.add_bottle")}
              </Button>
            </div>
          </form>
        </div>
      </main>
      {/* Footer */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <p>You must be logged in to submit a product.</p>
        <button onClick={handleModalClose} className="btn">
          Close
        </button>
      </Modal>
    </div>
  );
}
