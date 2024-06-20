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
import { Product } from "@/types/product";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { useLocale } from "next-intl";

export default function Form({
  product,
  currentUser,
}: {
  product: Product;
  currentUser: any;
}) {
  const router = useRouter();
  const locale = useLocale();
  const [images, setImages] = useState<File[]>([]);
  const [changedData, setChangedData] = useState<any>({});

  const onDrop = useCallback((acceptedFiles: any) => {
    setImages([...images, ...acceptedFiles]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setChangedData((prevProduct: any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    toast.loading("updating product...");

    if (!currentUser || !currentUser.uid) {
      console.error("User not authenticated");
      return;
    }

    // // Upload each selected file, associating it with the current user's ID
    // const uploadPromises = images.map((file) =>
    //   uploadImageToStorage(file, currentUser.uid)
    // );
    // const imageUrls = await Promise.all(uploadPromises);

    // Prepare your product data including the uploaded image URLs
    // const productData = {
    //   ...product,
    //   images: imageUrls, // URLs from the uploaded images
    //   userId: currentUser.uid,
    //   userName: currentUser.displayName,
    // };

    // Submit the product data to your backend or database
    try {
      const collectionRef = collection(db, "products");
      const docRef = doc(collectionRef, product.id);

      await updateDoc(docRef, {
        ...changedData,
      });
      toast.dismiss();

      toast.success("Successfully updated.");
      console.log("Product created successfully");
      router.push(`/${locale}/products/${product.id}`);
      // router.push(`/products/${result.productId}`);
    } catch (error) {
      toast.dismiss();
      toast.error("Update failed");
      console.error("Error updating product:", error);
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

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom de la bouteille</label>
          <Input
            name="title"
            defaultValue={product.title}
            onChange={handleChange}
            placeholder="Titre"
          />
        </div>
        <div className="mb-3">
          <label>Décrivez votre article</label>
          <Textarea
            className="my-3"
            name="description"
            onChange={handleChange}
            rows={5}
            placeholder="Décrivez votre article"
            defaultValue={product.description}
          />
        </div>

        <div className="mb-3">
          <label>Millésime</label>
          <Select
            onValueChange={(value: string) =>
              setChangedData({ ...changedData, vintage: value })
            }
            defaultValue={product?.vintage || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Millésime" />
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
        </div>
        <div className="mb-3">
          <label>Région</label>
          <Select
            onValueChange={(value: string) =>
              setChangedData({ ...changedData, region: value })
            }
            defaultValue={product?.region || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Région" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.id} value={`${region.name}`}>
                  {" "}
                  {region.name}{" "}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-3">
          <label>Prix</label>
          <Input
            name="price"
            onChange={(e) =>
              setChangedData({
                ...changedData,
                price: parseFloat(e.target.value),
              })
            }
            className="mb-3"
            type="number"
            placeholder="Prix"
            defaultValue={product?.price || ""}
          />
        </div>
        <div className="mb-3">
          <label> Quantité </label>
          <Input
            name="quantity"
            onChange={(e) =>
              setChangedData({
                ...changedData,
                quantity: parseInt(e.target.value),
              })
            }
            className="mb-3"
            placeholder="Quantité"
            defaultValue={product.quantity || ""}
          />
        </div>
        <div className="mb-3">
          <label> Catégorie </label>
          <Input
            name="category"
            onChange={handleChange}
            className="mb-3"
            placeholder="Catégorie"
            defaultValue={product?.category || ""}
          />
        </div>
        <div className="mb-3">
          <label>Sélectionnez un lieu de stockage</label>
          <Select
            onValueChange={(value: string) =>
              setChangedData({ ...changedData, storage: value })
            }
            defaultValue={product.storage || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un lieu de stockage" />
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
        </div>
        <div className="mb-3">
          <label>CRD Capsule</label>
          <Select
            onValueChange={(value: string) =>
              setChangedData({ ...changedData, crdCapsule: value })
            }
            defaultValue={product.crdCapsule || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="CRD Capsule:" />
            </SelectTrigger>
            <SelectContent>
              {["Oui", "NON", "La cire", "Trop vieux"].map((item, index) => (
                <SelectItem key={index} value={item}>
                  {" "}
                  {item}{" "}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <label>Image de la bouteille</label>
        <div className="relative border shadow border-dotted py-16 mb-3 text-center">
          <div className="" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>{`Glissez-déposez ou cliquez pour télécharger des images`}</p>
            )}
          </div>
          <div className="absolute left-0 bottom-0 flex flex-wrap">
            {images &&
              product.images.map((img: any, index: number) => (
                <div key={index} className="relative mr-2">
                  <Image
                    src={img}
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
        <Button type="submit" className="mt-5">
          Update
        </Button>
      </form>
    </div>
  );
}
