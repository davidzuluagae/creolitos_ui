import MaskedImage from '@/app/ui/masked-image'

type ProgramFormat = {
  title: string
  description: string
  accent: string
  wash: string
}

const programFormats: ProgramFormat[] = [
  {
    title: 'In-School Residencies',
    description: 'Short-term immersive experiences inspired by the Summer Reading Fiesta model.',
    accent: 'bg-creoCont-pink',
    wash: 'bg-creoCont-pink-soft',
  },
  {
    title: 'After-School Programs',
    description: 'Ongoing enrichment for language exposure, confidence, and development.',
    accent: 'bg-creoCont-mint',
    wash: 'bg-creoCont-mint-soft',
  },
  {
    title: 'Family Engagement Events',
    description: 'Interactive bilingual experiences that bring families into the learning process.',
    accent: 'bg-creoCont-yellow',
    wash: 'bg-creoCont-yellow-soft',
  },
  {
    title: 'Professional Development',
    description: 'Training for educators on story-based, culturally responsive language practices.',
    accent: 'bg-creoCont-purple',
    wash: 'bg-creoCont-purple-soft',
  },
]

function ProgramFormatCard({
  title,
  description,
  accent,
  wash,
}: (typeof programFormats)[number]) {
  return (
    <article className={`flex items-start gap-4 rounded-3xl px-5 py-5 ${wash}`}>
      <div className={`mt-1 h-16 w-3 rounded-full ${accent}`} />
      <div className="space-y-2">
        <h4>{title}</h4>
        <p className="leading-relaxed">{description}</p>
      </div>
    </article>
  )
}

export default function ServicesInstitutions() {
  return (
    <section className="mb-6 space-y-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="space-y-5 lg:flex-1">
          <div className="space-y-3">
            <h2>For Institutions</h2>
            <p className="max-w-2xl text-lg leading-relaxed">
              Culturally responsive language development through story, culture, and immersion.
            </p>
          </div>

          <div className="rounded-3xl border-4 border-creoCont-blue bg-creoCont-blue-soft p-6 shadow-xl">
            <p className="text-base leading-relaxed">
              Creolitos delivers story-based, culturally grounded programming that supports language
              development while affirming identity. Our work helps institutions create bilingual
              learning experiences that feel joyful, relevant, and deeply human.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm lg:w-96 lg:flex-none">
          <MaskedImage
            src="/Storytime.jpg"
            alt="Creolitos learners and families participating in a story-based bilingual experience"
            mask="blob-1"
            rotation="right"
            className="w-full"
            priority
          />
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="max-w-2xl space-y-2">
          <h3>Program Formats</h3>
          <p className="leading-relaxed">
            We can shape these experiences to fit the rhythm, goals, and community needs of your school
            or organization.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {programFormats.map(({ title, description, accent, wash }) => (
            <ProgramFormatCard
              key={title}
              title={title}
              description={description}
              accent={accent}
              wash={wash}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
