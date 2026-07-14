import { CompareSearch } from '@/components/compare-search';
import { DeveloperCard } from '@/components/developer-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getDeveloper } from '@/lib/github';
export default async function ComparePage({ searchParams }) {
    const { left = '', right = '' } = await searchParams;
    const [a, b] = await Promise.all([left ? getDeveloper(left) : null, right ? getDeveloper(right) : null]);
    return (<>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mx-auto w-fit">Side by side</p>
          <h1 className="mt-5 font-heading text-5xl font-black tracking-tight">
            Compare two GitHub cards.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Enter two public usernames to see their cards next to each other, with the same scoring model and profile layout.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <CompareSearch left={left} right={right}/>
        </div>

        {a && b && (<div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
            <div className="card-stage">
              <DeveloperCard developer={a}/>
            </div>
            <div className="card-stage">
              <DeveloperCard developer={b}/>
            </div>
          </div>)}

        {(left || right) && (!a || !b) && (<p className="mt-10 text-center text-destructive">One or both GitHub profiles could not be found.</p>)}
      </main>
      <SiteFooter />
    </>);
}
