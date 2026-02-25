import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
};

const SEO = ({ title, description }: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEO;
