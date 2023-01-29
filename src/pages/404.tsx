import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Box, Container, Button } from '@mui/material';

export default function Custom404() {
  return (
    <>
      <AppBar
        color="inherit"
        sx={{
          height: { xs: '5rem', md: '6.25rem' },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
        }}>
        <Box sx={{ p: { md: '0 20px 0 40px' }, display: 'flex', alignItems: 'center' }}>
          <Link href="/" title="Planning Poker Online" className="max-w-[219px]:ml-6">
            <Image width="40" height="40" src="/logo.svg" alt="logo" />
          </Link>

          <h1 className="px-4 text-xl font-bold">Planning Poker Online</h1>
        </Box>
      </AppBar>

      <Container
        sx={{
          mt: '8rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          columnGap: '8rem',
        }}>
        <div className="">
          <img src="/404-page/404-text.svg" alt="404" />

          <div className="my-10">
            <h2 className="text-4xl	font-bold mb-3">Page Not Found</h2>
            <p className="w-fit">Sorry, we can’t find what you are looking for.</p>
          </div>

          <Link href="/">
            <Button fullWidth variant="contained" sx={{ height: '3.5rem' }}>
              Go Back
            </Button>
          </Link>
        </div>

        <img
          src="/404-page/404-image.svg"
          alt="404"
          className="min-[800px]:max-w-[400px] max-w-[540px]"
        />
      </Container>
    </>
  );
}
