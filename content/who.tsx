import WhatIs from "@/content/what_is.mdx";
import Founder from "@/content/founder.mdx";
import Image from "next/image";

export default function Who() {
    // These styles mimic the Tailwind classes but are applied directly.
    // This is a diagnostic step to bypass any potential CSS conflicts.
    const containerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'start',
        minHeight: '50vh',
        padding: '0 1.5rem',
        margin: '0 auto',
        maxWidth: '1280px'
    };

    const imageWrapperStyle: React.CSSProperties = {
        float: 'left',
        marginRight: '1.5rem',
        marginBottom: '1rem'
    };

    const clearStyle: React.CSSProperties = {
        clear: 'both'
    };

    return (
        <div style={containerStyle}>
            <div id="what_is" className="prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
                <WhatIs />
            </div>
            <div id="founder">
                <h2 className="prose prose-slate prose-headings:mt-8 prose-headings:font-semibold prose-h2:text-4xl">Meet the Founder</h2>
                <div style={imageWrapperStyle}>
                    <Image src="/founder.jpg" alt="Ms. María" width={320} height={320} className="rounded-lg" />
                </div>
                <div className="prose prose-slate">
                    <Founder/>
                </div>
                <div style={clearStyle} />
            </div>
        </div>
    )
}
