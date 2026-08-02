import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
}

export function SEO({ 
  title = "Microsoft Learn Student Ambassadors - SRM", 
  description = "Empowering students through technology. Join the Microsoft Learn Student Ambassadors at SRM community.",
  url = "https://mlsa-srm.vercel.app",
  image = "/og-image.png",
  type = "website"
}: SEOProps) {
  const fullTitle = title === "Microsoft Learn Student Ambassadors - SRM" ? title : `${title} | MLSA SRM`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Microsoft Learn Student Ambassadors SRM",
          "url": url,
          "logo": image,
          "description": description
        })}
      </script>
    </Helmet>
  );
}
