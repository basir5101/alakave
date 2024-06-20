// import React, { useState } from 'react';

// const SearchBar: React.FC = () => {
//   const [formValue, setFormValue] = useState('');

//   const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Implement your search logic here
//   };

//   return (
//     <form className="flex items-center w-3/4 mx-auto" onSubmit={handleSearch}>
//       <input 
//         type="search" 
//         placeholder="Rechercher des bouteilles" 
//         className="flex-grow px-4 py-2 border rounded-l-md" 
//         style={{ padding: '11px 16px' }} // Adjust padding as needed
//         value={formValue}
//         onChange={setFormValue}
//       />
//       <button 
//         type="submit" 
//         className="bg-transparent p-2 text-gray-700 border-l-0 rounded-r-md"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
//           <circle cx="11" cy="11" r="8"></circle>
//           <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//         </svg>
//       </button>
//     </form>
//   );
// };

// export default SearchBar;
