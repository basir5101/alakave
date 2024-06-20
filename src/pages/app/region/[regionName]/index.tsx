import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import regionsData, { IRegionData } from '@/data/regionsData';
import Image from 'next/image';
import styles from './RegionPage.module.css'; // Make sure to create this CSS module file
import Navbar from '@/components/common/Navbar';

const RegionPage = () => {
  const [region, setRegion] = useState<IRegionData | null>(null);
  const router = useRouter();
  const { regionName } = router.query;

  useEffect(() => {
    if (regionName && typeof regionName === 'string') {
      const data = regionsData[regionName];
      setRegion(data);
    }
  }, [regionName]);

  if (!region) {
    return <p>Region not found</p>;
  }

  return (
    <>
    <Navbar />
      <section className={styles.headerSection} style={{ backgroundImage: `url('${region?.imageUrl}')` }}>
        {/* Header Text or any overlay content goes here */}
      </section>
      <section className="bg-blue-950 text-white py-10">
        <div className='container mx-auto'>
        <div className={styles.headerText}>
          {region?.headerText} {/* This is where the header text is rendered */}
        </div>
      <div className={styles.gridContainer}>
        {region.blocks.map((block, index) => (
          <div key={index} className={styles.gridItem}>
            <h2 className='font-bold text-accent'>{block.title}</h2>
            <p>{block.description}</p>
          </div>
        ))}
      </div>

        </div>
     

      </section>
  
     
      <div className={styles.productContainer}>
        {region.products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <Image src={product.imageUrl} alt={product.name} layout="responsive" width={300} height={300} />
          </div>
        ))}
      </div>
    </>
  );
};

export default RegionPage;
