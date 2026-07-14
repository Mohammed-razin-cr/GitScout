'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { beginCardRequest } from '@/lib/card-count';
import { cn } from '@/lib/utils';
const schema = z.object({ username: z.string().trim().min(1, 'Enter a GitHub username').max(39).regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/, 'Use a valid GitHub username') });
export function ProfileSearch({ compact = false, defaultValue = '' }) {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), defaultValues: { username: defaultValue } });
    return <form onSubmit={handleSubmit(({ username }) => {
        beginCardRequest(username);
        router.push(`/player/${username}`);
    })} className={cn('w-full', compact ? 'max-w-xl' : 'max-w-2xl')}>
    <div className="group grid gap-3 min-[480px]:grid-cols-[minmax(0,1fr)_8rem]" aria-busy={isSubmitting}>
      <Input {...register('username')} aria-invalid={!!errors.username} aria-label="GitHub username" placeholder="github username" className="h-14 rounded-2xl border-primary/25 bg-card/65 px-6 font-mono text-base shadow-[0_22px_60px_oklch(.04_.03_18/.42),0_0_35px_oklch(.65_.15_24/.06)] backdrop-blur-2xl transition-all placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/30 sm:h-16"/>
      <Button type="submit" size={compact ? 'default' : 'lg'} className="premium-button h-14 rounded-2xl bg-[linear-gradient(120deg,var(--accent),oklch(.57_.2_24))] font-mono text-sm font-black uppercase tracking-[.18em] text-accent-foreground sm:h-16" disabled={isSubmitting}>{isSubmitting ? <><LoaderCircle className="animate-spin" data-icon="inline-start"/>Scanning</> : <>Scout <ArrowRight data-icon="inline-end"/></>}</Button>
    </div>
    {errors.username && <p role="alert" className="mt-2 pl-3 text-sm text-destructive">{errors.username.message}</p>}
  </form>;
}
