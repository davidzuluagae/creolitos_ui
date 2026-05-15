import WhatIs from "@/content/what_is.mdx";
import Founder from "@/content/founder.mdx";
import MaskedImage from "@/app/ui/masked-image";

export default function About() {
    return (
        <div className="container mx-auto flex min-h-[50vh] flex-col items-start gap-16 md:flex-row">
            <div id="what_is" className="w-full md:w-2/5 md:flex-none">
                <div className="w-full max-w-none">
                    <h2>What is Creolitos™?</h2>
                    <div className="markdown">
                    <WhatIs />
                    </div>
                </div>
            </div>
            <div id="founder" className="w-full md:w-3/5 md:flex-none">
                <div className="w-full max-w-none">
                    <h2>Meet the Founder</h2>
                    <figure className="float-left mr-6 mb-4">
                    <div className="relative aspect-square w-96">
                        <MaskedImage
                            src="/IMG_14882.jpeg"
                            alt="Ms. María"
                            mask="blob-3"
                        />
                        </div>
                        <figcaption className="m-0 text-left leading-tight">
                            <p className="m-0 font-bold">Maria Lasso</p>
                            <p className="m-0 text-sm">Founder & Lead Educator, Creolitos™</p>
                        </figcaption>
                    </figure>
                    <div className="markdown">

                    <Founder />
                    </div>
                </div>
            </div>
        </div>
    )
}
