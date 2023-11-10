// pages/user/[username].js
import { useRouter } from 'next/router';

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <h1>User Page: {username}</h1>
      
    </div>
  );
};

export default UserPage;
