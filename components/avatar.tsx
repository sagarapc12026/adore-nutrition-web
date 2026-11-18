// Gradient initial avatars. Three distinct combinations so a row never looks monotonous.
const gradients = [
  'bg-[linear-gradient(135deg,#F8B48A,#C45F36)]',
  'bg-[linear-gradient(135deg,#F4C2B0,#E89B89_50%,#9A4825)]',
  'bg-[linear-gradient(135deg,#A6C2A8,#6B8A6E_55%,#5A3F33)]',
  'bg-[linear-gradient(135deg,#FCD2B6,#E07A4D)]',
];

export function Avatar({
  initial,
  index = 0,
  size = 40,
  className = '',
}: {
  initial: string;
  index?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display text-white ${gradients[index % gradients.length]} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initial}
    </span>
  );
}
