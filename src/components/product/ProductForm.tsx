import React from 'react';
import { years, regions } from '../../data/data'; // Ensure the path is correct based on your project structure

interface Year {
  year: number;
}

interface Region {
  id: number;
  name: string;
}

const ProductForm: React.FC = () => {
  return (
    <div className="py-6 px-6 lg:px-10">
      <div className="border-b pb-3 mb-5">
        <h5 className="text-lg mb-0">Ajouter une nouvelle bouteille</h5>
      </div>
      <form method="post" id="add_product" encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-3">
          {/* Year Selection */}
          <div>
            <label htmlFor="vintage" className="block text-sm font-medium text-gray-700">Millésime</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="vintage" name="vintage" required>
              <option value="">Sélectionnez l&#39;`année</option>
              {years.map((year, index) => (
                <option key={index} value={year.year}>{year.year}</option>
              ))}
            </select>
          </div>
          {/* Region Selection */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">Région</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="region" name="region" required>
              <option value="">Choisissez une région</option>
              {regions.map((region, index) => (
                <option key={index} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-5">
          <button type="submit" className="btn btn-primary w-full sm:w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Ajouter une nouvelle bouteille</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
