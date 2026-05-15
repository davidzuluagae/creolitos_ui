import StoryTime from '@/content/story_time.mdx';
import ParentLedSpanish from '@/content/parent-led_spanish.mdx';
import SRF from '@/content/srf.mdx';
import Tabs from '@/app/ui/Tabs';

const familyServices = [
  {
    name: 'Summer Reading Fiesta',
    info: <SRF />,
    imageSrc: '/IMG_5776.jpg',
  },
  {
    name: 'Parent-Led Spanish Class',
    info: <ParentLedSpanish />,
    imageSrc: '/ParentClass.jpg',
  },
  {
    name: 'Creolitos Storytime™',
    info: <StoryTime />,
    imageSrc: '/Storytime.jpg',
  },
] as const

export default function ServicesFamilies() {
  return (
    <div className="mb-6">
      <h2>For Families</h2>
      <p>You don't want your child to just learn Spanish; you want them to live it.</p>
      <Tabs contents={[...familyServices]} />
    </div>
  )
}
