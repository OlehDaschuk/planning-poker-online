import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';

import { Header, Footer } from '@/components/shared/home-page';

import { PricingModal } from '@/components/payment/PricingModal';
import { LoginModal } from '@/components/auth/modals/LoginModal';
import { SignUpModal } from '@/components/auth/modals/SignUpModal';

export default function Home() {
  return (
    <>
      <Head>
        <title>Planning poker online | Home</title>
      </Head>

      <Header />

      <main className="pt-40 flex">
        <section className="mx-auto flex items-center justify-between flex-wrap max-w-[108rem]">
          <div>
            <div>
              <h1 className="mb-6">Scrum Poker for happy agile teams</h1>
              <p className="mb-6">Fun, easy and reliable estimations</p>
            </div>
            <div>
              <Link href="/new-game">
                <Button variant="contained" color="primary">
                  Start new game
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div>
              <img src="/main-page/crew.svg" alt="hero image" />
            </div>
            <div>
              <video
                className="rounded-xl drop-shadow-[0_4px_12px_rgba(26,41,53,.12)]"
                src="/main-page/planning-poker-voting.mp4"
                autoPlay
                loop
                muted
                playsInline></video>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <PricingModal />
      <LoginModal />
      <SignUpModal />
    </>
  );
}
