'use client'

import { useState } from 'react'

type MethodologyPillar = {
  title: string
  description: string
  chipColor: string
  borderColor: string
  bgColor: string
}

const challengePoints = [
  'Engagement is inconsistent.',
  'Heritage language is often lost over time.',
  'Instruction can lack cultural depth and real connection.',
]

const methodologyPillars: MethodologyPillar[] = [
  {
    title: 'Storytelling',
    description: 'Language grows through narrative, rhythm, repetition, and emotional connection.',
    chipColor: 'bg-creoCont-pink',
    borderColor: 'border-creoCont-pink',
    bgColor: 'bg-creoCont-pink',
  },
  {
    title: 'Performance & Movement',
    description: 'Songs, gesture, and embodied play help learners participate with confidence.',
    chipColor: 'bg-creoCont-yellow',
    borderColor: 'border-creoCont-yellow',
    bgColor: 'bg-creoCont-yellow',
  },
  {
    title: 'Cultural Context',
    description: 'Language becomes meaningful when it is tied to identity, tradition, and lived experience.',
    chipColor: 'bg-creoCont-purple',
    borderColor: 'border-creoCont-purple',
    bgColor: 'bg-creoCont-purple',
  },
]

const outcomes = [
  {
    eyebrow: 'More Engagement',
    description: 'Students participate more readily when language feels joyful, embodied, and culturally relevant.',
    accent: 'bg-creoCont-yellow',
  },
  {
    eyebrow: 'Stronger Comprehension',
    description: 'Context, repetition, and performance help learners make meaning and retain language longer.',
    accent: 'bg-creoCont-blue',
  },
  {
    eyebrow: 'Deeper Belonging',
    description: 'Programs affirm identity and help multilingual learners feel seen in the classroom community.',
    accent: 'bg-creoCont-purple',
  },
] as const

function MethodologyFlipCard({
  title,
  description,
  chipColor,
  borderColor,
  bgColor,
  isFlipped,
  onToggle,
}: (typeof methodologyPillars)[number] & {
  isFlipped: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group h-72 w-full cursor-pointer text-left transition-transform duration-200 hover:-translate-y-1 [perspective:1200px] sm:flex-1"
      aria-pressed={isFlipped}
      aria-label={`${title}: flip card to read more`}
    >
      <div
        className={`relative h-full w-full transform-gpu transition-transform duration-500 [transform-style:preserve-3d] [will-change:transform] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div
          className={`absolute inset-0 flex h-full flex-col justify-between rounded-3xl px-4 py-5 text-creoSkin-100 shadow-lg [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)_translateZ(1px)] ${bgColor}`}
        >
          <div className="flex flex-1 items-center justify-center px-3 text-center">
            <h4 className="w-full text-lg leading-tight">{title}</h4>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-creoSkin-200">
            <span>Flip to learn more</span>
            <span className="inline-flex text-2xl transition-transform duration-200 group-hover:rotate-[-20deg] group-hover:translate-x-0.5">
              ↺
            </span>
          </div>
        </div>

        <div
          className={`absolute inset-0 flex h-full flex-col justify-between rounded-3xl border-4 bg-creoCont-neutral1 px-4 py-5 shadow-lg [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)] ${borderColor}`}
        >
          <div className="space-y-3">
            <span className={`${chipColor} inline-flex rounded-full px-3 py-1 text-xs font-semibold`}>
              {title}
            </span>
            <p className="text-sm leading-relaxed">{description}</p>
          </div>
          <div className="flex items-center justify-end text-creoSkin-200">
            <span className="inline-flex text-2xl transition-transform duration-200 group-hover:rotate-[-20deg] group-hover:translate-x-0.5">
              ↺
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function Methodology() {
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  function toggleCard(index: number) {
    setFlippedCards((current) =>
      current.includes(index) ? current.filter((value) => value !== index) : [...current, index]
    )
  }

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row">
        <article className="rounded-3xl border-4 border-creoCont-pink bg-creoCont-pink-soft p-6 lg:w-2/5 lg:flex-none">
          <h3 className="mb-4">The Challenge</h3>
          <ul className="space-y-3">
            {challengePoints.map((point) => (
              <li key={point} className="rounded-2xl bg-creoCont-neutral1/80 px-4 py-3 leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border-4 border-creoCont-mint bg-creoCont-mint-soft p-6 lg:w-3/5 lg:flex-none">
          <div className="mb-4">
            <h3>The Creolitos Approach</h3>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {methodologyPillars.map(({ title, description, chipColor, borderColor, bgColor }, index) => {
              const isFlipped = flippedCards.includes(index)

              return (
                <MethodologyFlipCard
                  key={title}
                  title={title}
                  description={description}
                  chipColor={chipColor}
                  borderColor={borderColor}
                  bgColor={bgColor}
                  isFlipped={isFlipped}
                  onToggle={() => toggleCard(index)}
                />
              )
            })}
          </div>
        </article>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-creoCont-yellow-soft via-creoCont-blue-soft to-creoCont-purple-soft px-6 py-7">
        <div className="mb-5 max-w-2xl space-y-2">
          <h3>Outcomes</h3>
          <p className="leading-relaxed">
            The impact shows up not just in language growth, but in participation, confidence, and connection.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          {outcomes.map(({ eyebrow, description, accent }) => (
            <div key={eyebrow} className="space-y-3 md:flex-1">
              <div className={`h-2 w-16 rounded-full ${accent}`} />
              <h4 className="text-xl">{eyebrow}</h4>
              <p className="max-w-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
