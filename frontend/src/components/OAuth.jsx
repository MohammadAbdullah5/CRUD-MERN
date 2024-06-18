import { useDispatch } from 'react-redux';
import { signin } from '../app/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: "1" }),
      });
      const data = await res.json();
      if (data.success) {
        await dispatch(signin(data.user)); // Adjust the data as per the structure you receive
        navigate('/');
      } else {
        console.error('Google sign-in failed', data.message);
      }
    } catch (error) {
      console.error('Could not login with Google', error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
