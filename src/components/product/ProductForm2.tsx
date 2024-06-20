import React, { useState } from 'react';
import { years, regions } from '../../data/data'; // Ensure the path is correct based on your project structure

interface Year {
  year: number;
}

interface Region {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  price: string;
  vintage: string;
  region: string;
  qty: string;
  storage_place: string;
  crd_capsule: string;
  description: string;
  files: null, 
  self_shipping: string;
  shipping_company: string;
  shipping_cost: string;
  pickup_address: string;
}

//files: new FileList(),

const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        price: '',
        vintage: '',
        region: '',
        qty: '',
        storage_place: '',
        crd_capsule: '',
        description: '',
        files: null, 
        self_shipping: '',
        shipping_company: '',
        shipping_cost: '',
        pickup_address: '',
      });


      const [files, setFiles] = useState<FileList | null>(null); // Adjusted to allow null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(fileList);
    } else {
      // Handle the null case. Depending on your requirements, you might set `files` to `null` or take other actions.
      // For now, let's just log to the console.
      console.log('No files selected.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="py-6 px-6 lg:px-10">
      <div className="border-b pb-3 mb-5">
        <h5 className="text-lg mb-0">Ajouter une nouvelle bouteille</h5>
      </div>
      <form method="post" id="add_product" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom de la bouteille</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={100}
            />
          </div>
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix de vente</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              maxLength={7}
              inputMode="numeric"
              pattern="[0-9]*.[0-9]*"
            />
          </div>
          {/* Year Selection */}
          <div>
            <label htmlFor="vintage" className="block text-sm font-medium text-gray-700">Millésime</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="vintage"
              name="vintage"
              value={formData.vintage}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez l&#39;`année</option>
              {years.map((year, index) => (
                <option key={index} value={year.year}>{year.year}</option>
              ))}
            </select>
          </div>
          {/* Region Selection */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Région</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              required
            >
              <option value="">Choisissez une région</option>
              {regions.map((region, index) => (
                <option key={index} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
          {/* Quantity */}
          <div>
            <label htmlFor="qty" className="block text-sm font-medium text-gray-700">Quantité</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              id="qty"
              name="qty"
              value={formData.qty}
              onChange={handleInputChange}
              required
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          {/* Storage place */}
          <fieldset className="mt-4">
            <legend className="block text-sm font-medium text-gray-700">Sélectionnez un lieu de stockage</legend>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <input
                  id="underground_cellar"
                  name="storage_place"
                  type="radio"
                  value="Underground Cellar"
                  required
                  checked={formData.storage_place === 'Underground Cellar'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="underground_cellar" className="ml-3 block text-sm font-medium text-gray-700">
                  Cave souterraine
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="electric_cellar"
                  name="storage_place"
                  type="radio"
                  value="Electric Cellar"
                  required
                  checked={formData.storage_place === 'Electric Cellar'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="electric_cellar" className="ml-3 block text-sm font-medium text-gray-700">
                  Cave électrique 10° à 12°
                </label>
              </div>
              <div className="flex items-center">
  <input
    id="storage_temp"
    name="storage_place"
    type="radio"
    value="Storage Temp"
    required
    checked={formData.storage_place === "Storage Temp"}
    onChange={handleInputChange}
    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
  />
  <label htmlFor="storage_temp" className="ml-3 block text-sm font-medium text-gray-700">
    Conservation à température ambiante
  </label>
</div>  
                
                <div className="flex items-center">
                <input
                  id="storage_temp"
                  name="storage_place"
                  type="radio"
                  value="Storage Temp"
                  required
                  checked={formData.storage_place === 'Storage Temp'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="storage_temp" className="ml-3 block text-sm font-medium text-gray-700">
                  Conservation à température ambiante
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="other"
                  name="storage_place"
                  type="radio"
                  value="Other"
                  required
                  checked={formData.storage_place === 'Other'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="other" className="ml-3 block text-sm font-medium text-gray-700">
                  Autre
                </label>
              </div>
            </div>
          </fieldset>

          {/* CRD Capsule */}
          <fieldset className="mt-4">
            <legend className="block text-sm font-medium text-gray-700">CRD Capsule</legend>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <input
                  id="yes"
                  name="crd_capsule"
                  type="radio"
                  value="Yes"
                  required
                  checked={formData.crd_capsule === 'Yes'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="yes" className="ml-3 block text-sm font-medium text-gray-700">
                  Oui
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="no"
                  name="crd_capsule"
                  type="radio"
                  value="No"
                  required
                  checked={formData.crd_capsule === 'No'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="no" className="ml-3 block text-sm font-medium text-gray-700">
                  Non
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="wax"
                  name="crd_capsule"
                  type="radio"
                  value="Wax"
                  required
                  checked={formData.crd_capsule === 'Wax'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="wax" className="ml-3 block text-sm font-medium text-gray-700">
                  La cire
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="too_old"
                  name="crd_capsule"
                  type="radio"
                  value="Too Old"
                  required
                  checked={formData.crd_capsule === 'Too Old'}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor="too_old" className="ml-3 block text-sm font-medium text-gray-700">
                  Trop vieux
                </label>
              </div>
            </div>
          </fieldset>

          {/* Image upload */}
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700">
              Image de la bouteille
            </label>
            <input
              type="file"
              name="files[]"
              id="file-input"
              multiple
              accept="image/*"
              required
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description de la bouteille
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
  
            {/* Submit Button */}
            <div className="mt-5">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ajouter une nouvelle bouteille
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  
  export default ProductForm;