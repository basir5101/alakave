// styles/StyledComponents.ts
import styled from 'styled-components';

export const StyledMainSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: screen;
`;

export const StyledIntroSection = styled.section`
  background-size: cover;
  background-position: center;
  padding: 6rem 0;
  color: ${({ theme }) => {
    console.log(theme); // Debug: Log the theme object
    return theme.colors.text;
  }};
  background-image: url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg');
`;

export const StyledContentSection = styled.section<{ layout: string }>`
  padding: 2.5rem 0;
  background-color: ${({ layout, theme }) => (layout === "right-aligned-img" ? theme.colors.background : "#ffffff")};
`;

export const StyledContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const StyledTextContainer = styled.div<{ layout: string }>`
  width: 100%;
  padding: ${({ layout }) => (layout === "left-aligned-img" ? "0 2rem 0 0" : "0 0 0 2rem")};
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const Heading = styled.h3`
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const Paragraph = styled.p`
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
`;
