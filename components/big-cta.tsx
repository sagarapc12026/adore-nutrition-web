import { getWaitlistCount } from '@/lib/waitlist';
import { LogoMark } from './logo';
import { Avatar } from './avatar';
import { WaitlistForm } from './waitlist-form';

export async function BigCta() {
  const count = await getWaitlistCount();

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="relative overflow-hidden py-24 sm:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_45%,#FCD2B6_0%,#FFE9DA_45%,#FBF4EB_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-peach-300/40 blur-[90px]"
      />

      <div className="mx-auto flex max-w-[720px] flex-col items-center px-5 text-center sm:px-8">
        <LogoMark size={56} />
        <h2 id="waitlist-title" className="display-lg mt-8 text-balance text-ink">
          Be the first to feel
          <br />
          this kind of <span className="accent">calm</span>.
        </h2>
        <p className="mt-5 max-w-[520px] text-[18px] leading-relaxed text-ink-mid">
          Join the early circle of mamas. We’ll quietly let you know when Adore Nutrition opens its doors.
        </p>

        <WaitlistForm variant="cta" className="mt-10" />

        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {['A', 'S', 'P', '+'].map((initial, i) => (
              <Avatar key={initial} initial={initial} index={i} size={34} className="ring-[3px] ring-peach-50" />
            ))}
          </div>
          <p className="text-[14px] font-medium text-ink-mid">
            {count != null ? (
              <>
                <span className="font-display text-[17px] font-medium text-ink">{count.toLocaleString('en-US')}</span>{' '}
                mamas already on the list
              </>
            ) : (
              'Mamas are already joining the list'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
