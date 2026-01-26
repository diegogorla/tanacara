import { GetServerSideProps } from 'next';
import { OFFERS } from '../../lib/offers';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = String(params?.slug ?? '');
  const item = OFFERS.find((o) => o.slug === slug);

  if (!item) {
    return {
      redirect: {
        destination: '/ofertas',
        permanent: false
      }
    };
  }

  return {
    redirect: {
      destination: item.url,
      permanent: false
    }
  };
};

export default function Go() {
  return null;
}
