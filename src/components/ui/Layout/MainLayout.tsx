import React from 'react';
import Footer from '../../Footer';
import MainNav from './MainNav';
import SliderComponent from '../animations/Slider';
import ContentLayout from './ContentLayout';


type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <div>
        <MainNav />
        </div>

      </nav>
      <SliderComponent />
      <ContentLayout>
        <main className="flex-grow">{children}</main>
      </ContentLayout>
      <Footer />
    </div>
  );
};

export default MainLayout;
