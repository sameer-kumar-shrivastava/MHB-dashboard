// pages/user/[username].js
import { useRouter } from 'next/router';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <h1>User Page: {username}</h1>
      
    </div>
  );
};

UserPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default UserPage;
