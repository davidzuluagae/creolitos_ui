import WhatIs from "@/content/what_is.mdx";
import Founder from "@/content/founder.mdx";
import { MaskedImage } from "@/app/ui/masked-image";

export default function About() {
    return (
        <div className="container mx-auto flex min-h-[50vh] flex-col items-start gap-16 md:flex-row">
            <div id="what_is" className="w-full md:w-2/5 md:flex-none">
                <div className="prose prose-slate w-full max-w-none text-[1.1rem] prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
                    <WhatIs />
                </div>
            </div>
            <div id="founder" className="w-full md:w-3/5 md:flex-none">
                <div className="prose prose-slate w-full max-w-none prose-headings:mt-8 prose-headings:font-semibold prose-h2:text-4xl">
                    <h2>Meet the Founder</h2>
                    <MaskedImage
                        src="/founder.jpg"
                        alt="Ms. María"
                        width={320}
                        height={320}
                        className="float-left mr-6 mb-4"
                    />
                    <Founder/>
                </div>
            </div>
        </div>
    )
}
