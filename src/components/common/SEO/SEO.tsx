import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../../../context/LanguageContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO: FC<SEOProps> = ({
    title,
    description,
    image = '/images/og-logo.png', // Default optimized image for social media
    url = 'https://vicmano.com/',
    type = 'website'
}) => {
    const { t } = useLanguage();

    // Use translated values if props are not provided
    const seoTitle = title || t('title', 'seo');
    const seoDescription = description || t('description', 'seo');

    // Ensure the image path is absolute for meta tags (requires full URL in production)
    const siteUrl = 'https://vicmano.com';
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={fullImageUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* Structured Data (JSON-LD) for AI & Search Engines */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "MusicGroup",
                    "name": "Vicmano",
                    "url": siteUrl,
                    "image": fullImageUrl,
                    "description": seoDescription,
                    "genre": ["Minimal Techno", "Tech House", "Hard Techno"],
                    "sameAs": [
                        "https://instagram.com/vicmano.minimal",
                        "https://youtube.com/@vicmanomusic"
                    ]
                })}
            </script>

            {/* Additional verification/theme tags can be added here */}
        </Helmet>
    );
};

export default SEO;
